import { Elysia, t } from "elysia";
import { prisma } from "~libs/prisma";
import { comparePassword, hashPassword, md5hash } from "~utils/bcrypt";
import { isAuthenticated } from "~middlewares/auth";

export const auth = (app: Elysia) =>
	app.group("/auth", (app) =>
		app
			.post(
				"/signup",
				async ({ body, set }) => {
					const { email, name, password, username, role  } = body;
					// validate duplicate email address
					const emailExists = await prisma.user.findUnique({
						where: {
							email,
						},
						select: {
							id: true,
						},
					});
					if (emailExists) {
						set.status = 400;
						return {
							success: false,
							data: null,
							message: "Email address already in use.",
						};
					}

					// validate duplicate username
					const usernameExists = await prisma.user.findUnique({
						where: {
							username,
						},
						select: {
							id: true,
						},
					});

					if (usernameExists) {
						set.status = 400;
						return {
							success: false,
							data: null,
							message: "Someone already taken this username.",
						};
					}

					// handle password
					const { hash, salt } = await hashPassword(password);
					const emailHash = md5hash(email);
					const profileImage = `https://robohash.org/${emailHash}.png?set=set2 `;

					const newUser = await prisma.user.create({
						data: {
							name,
							email,
							hash,
							salt,
							username,
							role,
							profileImage,
						},
					});

					return {
						success: true,
						message: "Account created",
						data: {
							user: {
								id: newUser.id,
								email: newUser.email,
								username: newUser.username,
								profileImage: newUser.profileImage,
								role: newUser.role,
							},
						},
					};
				},
				{
					body: t.Object({
						name: t.String(),
						email: t.String(),
						username: t.String(),
						password: t.String(),
						role: t.String()
					}),
				},
			)
			.post(
				"/login",
				async ({ body, set, jwt, setCookie }) => {
					const { username, password } = body;
					// verify email/username
					const user = await prisma.user.findFirst({
						where: {
							OR: [
								{
									email: username,
								},
								{
									username,
								},
							],
						},
						select: {
							id: true,
							hash: true,
							salt: true,
						},
					});

					if (!user) {
						set.status = 400;
						return {
							success: false,
							data: null,
							message: "Invalid credentials",
						};
					}

					// verify password
					const match = await comparePassword(password, user.salt, user.hash);
					if (!match) {
						set.status = 400;
						return {
							success: false,
							data: null,
							message: "Invalid credentials",
						};
					}

					// generate access

					const accessToken = await jwt.sign({
						userId: user.id,
					});

					setCookie("access_token", accessToken, {
						httpOnly: true,
						maxAge: 24 * 3600, // 15 minutes
						path: "/",
					});

					return {
						success: true,
						data: null,
						message: "Account login successfully",
					};
				},
				{
					body: t.Object({
						username: t.String(),
						password: t.String(),
					}),
				},
			)
			.post(
				"/reset/generate",
				async ({ body, set, jwt }) => {

					const user = await prisma.user.findFirst({ where: { email:body.email } })

					if(!user) {
						set.status = 400
						return {
							success: false,
							data: null,
							message: "No user found with this email",
						}
					}
					const token : string = jwt.sign({ userId: user.id, exp: '1h'})

					const newUser = await prisma.user.update({
						where: {
							email:body.email
						},
						data: {
							token
						},
					});
					// Send email to user with url and token
					console.log(token) // TODO: implement sending of email with url and token

					return {
						success: true,
						message: "Request sent successfully",
						data: {
							email: user.email
						},
					};
				},
				{
					body: t.Object({
						email: t.String(),
					}),
				},
			)
			.post(
				"/reset/validate",
				async ({ body, set, jwt }) => {

					const { userId } = await jwt.verify(body.token)
					const userExists = await prisma.user.findFirst({ where: { id: userId }})
					if(!userExists) {
						set.status = 400
						return {
							success: false,
							data: null,
							message: "No user found with this email",
						}
					}

					const { hash, salt } = await hashPassword(body.password);
					const newUser = await prisma.user.update({
						where: {
							id: userId,
						},
						data: {
							hash,
							salt,
						},
					});

					return {
						success: true,
						message: "Password reset successfully",
						data: {
							user: {
								id: newUser.id,
								email: newUser.email,
								username: newUser.username,
								profileImage: newUser.profileImage,
								role: newUser.role,
							},
						},
					};
				},
				{
					body: t.Object({
						token: t.String(),
						password: t.String(),
					}),
				},
			)
			.use(isAuthenticated)
			// protected route
			.get("/me", ({ user }) => {
				return {
					success: true,
					message: "Fetch authenticated user details",
					data: {
						user,
					},
				};
			}),
	);

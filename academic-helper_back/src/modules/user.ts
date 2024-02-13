import { Elysia, t } from "elysia";
import { prisma } from "~libs/prisma";
import { User } from "@prisma/client";
import { isAuthenticated } from "~middlewares/auth";

export const users = (app: Elysia) =>
	app.group("/users", (app) =>
		app
			.use(isAuthenticated)
			.get("/:id", async ({ params, set }) => {
				const user = await prisma.user.findFirst({
					where: {
						id: params.id,
					},
					select: {
						id: true,
						email: true,
						username: true,
						profileImage: true,
					},
				});

				if (!user) {
					set.status = 400;
					return {
						success: false,
						data: null,
						message: "No user found",
					};
				}

				return {
					success: true,
					data: user,
				};
			})
			.get(
				"/find",
				async ({ body, set }) => {
					const users = await prisma.user.findMany({
						where: {
							...body,
						},
						skip: body?.skip || 0,
						take: body?.take || 10,
						select: {
							id: true,
							email: true,
							username: true,
							profileImage: true,
						},
					});

					if (!users || !users?.length) {
						set.status = 400;
						return {
							success: false,
							data: null,
							message: "No users found",
						};
					}

					return {
						success: true,
						data: users,
					};
				},
				{
					body: t.Object({
						email: t.String(),
						username: t.String(),
						skip: t.Number(),
						take: t.Number(),
					}),
				},
			)
			.patch(
				"/update/:id/",
				async ({ body, params, set }) => {
					const user: User = await prisma.user.update({
						where: {
							id: params.id,
						},
						data: body,
					});

					if (!user) {
						set.status = 400;
						return {
							success: false,
							data: null,
							message: "Not user updated",
						};
					}

					return {
						success: true,
						data: user,
					};
				},
				{
					body: t.Object({
						email: t.String(),
						username: t.String(),
						profileImage: t.String(),
					}),
				},
			),
	);

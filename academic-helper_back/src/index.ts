import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { auth } from "~modules/authentication";
import { users } from "~modules/user";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
	.use(cors({
		origin: true,
		allowedHeaders: "Content-Type, authorization",
		exposedHeaders: "Content-Type, authorization",
		credentials: true
	}))
	.use(
		jwt({
			name: "jwt",
			secret: Bun.env.JWT_SECRET,
		}),
	)
	.use(cookie())
	.use(auth)
	.use(users)
	.listen(Bun.env.PORT);
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

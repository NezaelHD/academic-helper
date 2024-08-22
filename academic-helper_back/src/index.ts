import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { auth } from "~modules/authentication";
import { users } from "~modules/user";
import { cors } from '@elysiajs/cors'
import {conversations} from "~modules/conversations";
import {messages} from "~modules/messages";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
	.use(swagger(
		{
			documentation: {
				info: {
					title: 'Academic Helper - API Documentation',
					version: '1.0.0'
				}
			}
		}
	))
	.use(cors({
		origin: true,
		allowedHeaders: "Content-Type, authorization",
		exposedHeaders: "Content-Type, authorization",
		methods: ["GET", "POST", "PUT", "DELETE"],
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
	.use(conversations)
	.use(messages)
	.listen(Bun.env.PORT);
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

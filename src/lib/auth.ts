import { betterAuth } from "better-auth";
import { checkout, polar, portal } from "@polar-sh/better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "@/lib/db";
import { polarClient } from "./polar";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql", // or "mysql", "postgresql", ...etc
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	// trustedOrigins: [
	// 	"https://3000-firebase-nodebase-1760493652353.cluster-fbfjltn375c6wqxlhoehbz44sk.cloudworkstations.dev",
	// ],
	plugins: [
		polar({
			client: polarClient,
			createCustomerOnSignUp: true,
			use: [
				checkout({
					products: [
						{
							productId: "759fe2da-b44d-432d-b4d8-a0a4c90ceda0",
							slug: "Chatcells-Pro", // Custom slug for easy reference in Checkout URL, e.g. /checkout/Chatcells-Pro
						},
					],
					successUrl: process.env.POLAR_SUCCESS_URL,
					authenticatedUsersOnly: true,
				}),
				portal(),
			],
		}),
	],
});

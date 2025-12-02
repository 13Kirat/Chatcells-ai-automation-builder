import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
export const appRouter = createTRPCRouter({
	testAi: protectedProcedure.mutation(async () => {
		await inngest.send({
			name: "execute/ai",
		});
		return { success: true, message: "Job queued" };
	}),
	getWorflows: protectedProcedure.query(({ ctx }) => {
		console.log({ userId: ctx.auth.user.id });
		return prisma.workflow.findMany();
	}),
	createWorkflow: protectedProcedure.mutation(async () => {
		await inngest.send({
			name: "test/hello.world",
			data: {
				email: "test@ndc.com",
			},
		});
		return { success: true, message: "Job Queued" };
	}),
});
// export type definition of API
export type AppRouter = typeof appRouter;

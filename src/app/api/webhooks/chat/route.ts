import { NextResponse } from "next/server";
import { sendWorkflowExecution } from "@/inngest/utils";
import { z } from "zod";

const requestSchema = z.object({
  workflowId: z.string(),
  message: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workflowId, message } = requestSchema.parse(body);

    await sendWorkflowExecution({
      workflowId,
      initialData: { message },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error triggering workflow:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to trigger workflow" },
      { status: 500 }
    );
  }
}

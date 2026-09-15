import {
  NextRequest,
  NextResponse,
} from "next/server";

import { getTaskById } from "@/lib/tasks";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const task = await getTaskById(id);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "Todo tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Todo berhasil diambil",
      data: task,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil todo",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}
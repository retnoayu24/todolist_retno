import {
  NextRequest,
  NextResponse,
} from "next/server";

import { getTasks } from "@/lib/tasks";
import { todoService } from "@/services/todoService";

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const limit = Number(
      searchParams.get("limit") || 15
    );

    const skip = Number(
      searchParams.get("skip") || 0
    );

    const result = await getTasks({
      limit,
      skip,
    });

    return NextResponse.json({
      success: true,
      message:
        "Data todos berhasil diambil",
      data: result.tasks,
      count: result.tasks.length,
      total: result.total,
      timestamp:
        new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal mengambil data todos",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    if (!body.todo) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Field todo wajib diisi",
        },
        { status: 400 }
      );
    }

    const createdTodo =
      await todoService.createTodo({
        todo: body.todo,
        completed:
          body.completed ?? false,
        userId:
          body.userId ?? 1,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Todo berhasil dibuat",
        data: createdTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal membuat todo",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}
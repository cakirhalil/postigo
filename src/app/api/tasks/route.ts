interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface CreateTaskRequest {
  title: string;
}

let tasks: Task[] = [
  { id: 1, title: "Next.js öğren", completed: false },
  { id: 2, title: "Proje build et", completed: false },
];

export async function GET() {
  return Response.json(tasks);
}

export async function POST(request: Request) {
  try {
    const body: CreateTaskRequest = await request.json();

    if (!body.title) {
      return Response.json({ error: "Başlık zorunlu" }, { status: 400 });
    }
    const newTask: Task = {
      id: tasks.length + 1,
      title: body.title,
      completed: false,
    };

    tasks.push(newTask);
    return Response.json(newTask, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Geçersiz istek" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");

    if (!id) {
      return Response.json({ error: "Task ID gerekli" }, { status: 400 });
    }

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return Response.json({ error: "Task bulunamadı" }, { status: 404 });
    }

    tasks = tasks.filter((task) => task.id !== id);
    return Response.json({ message: "Task silindi" });
  } catch (error) {
    return Response.json({ error: "Geçersiz istek" }, { status: 400 });
  }
}
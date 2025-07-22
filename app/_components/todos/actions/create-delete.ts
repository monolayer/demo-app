"use server";

import { prisma } from "@/app/_lib/db/prisma";
import type { Channels } from "@/workloads/broadcast";
import { BroadcastPublisher } from "@monolayer/sdk";
import type { Todos } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addTodo(_: unknown, formData: FormData) {
	const text = formData.get("todo") as string;

	if (text.trim()) {
		const createdTodo = await prisma.todos.create({ data: { text } });
		revalidatePath("/");
		await publishUpdate(createdTodo, "add");
		return { input: "" };
	}

	return { error: "Todo cannot be empty", input: text };
}

export async function deleteTodo(todo: Todos) {
	const deleted = await prisma.todos.delete({ where: { id: todo.id } });
	await publishUpdate(deleted, "delete");
	revalidatePath("/");
}

async function publishUpdate(todo: Todos, action: "add" | "delete") {
	const publisher = new BroadcastPublisher<Channels>();
	await publisher.publishTo("/todos", {}, [{ ...todo, action }]);
}

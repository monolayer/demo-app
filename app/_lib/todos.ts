import type { Todos } from "@prisma/client";
import { prisma } from "./db/prisma";

type Item = Todos & { action?: "add" | "delete" };

export function combineTodos(contextItems: Item[], subscriptionItems: Item[]) {
	return Object.values(
		contextItems.concat(subscriptionItems).reduce<Record<string, Item>>((acc, val) => {
			if (acc[val.id] === undefined || new Date(acc[val.id].updatedAt) <= new Date(val.updatedAt)) {
				acc[val.id] = val;
			}
			return acc;
		}, {}),
	).filter((i) => i.action === undefined || i.action !== "delete");
}

export async function allTodos() {
	return await prisma.todos.findMany({ orderBy: { createdAt: "asc" } });
}

"use client";
import { useSubscription } from "@/app/_lib/broadcast-client";
import { combineTodos } from "@/app/_lib/todos";
import type { TodosData } from "@/workloads/broadcast";
import type { Todos } from "@prisma/client";
import { createContext, use, type ReactNode } from "react";

export type TodosContext = {
	todos: Promise<Todos[]>;
	subscription: { all: TodosData[]; last: TodosData | null };
};

export const TodosProvider = createContext<TodosContext>({
	todos: new Promise((resolve) => resolve([])),
	subscription: { all: [], last: null },
});

export interface TodosContextProviderProps {
	initialTodos: Promise<Todos[]>;
	children: ReactNode;
}

export default function TodosContextProvider({
	initialTodos,
	children,
}: TodosContextProviderProps) {
	const subscription = useSubscription("/todos", {});
	return (
		<TodosProvider.Provider value={{ todos: initialTodos, subscription }}>
			{children}
		</TodosProvider.Provider>
	);
}

export function useTodoSubscription() {
	const context = use(TodosProvider);
	if (!context) {
		throw new Error("useTodoSubscription must be used within a <TodosProvider />");
	}
	return context.subscription;
}

export function useTodos() {
	const context = use(TodosProvider);
	if (!context) {
		throw new Error("useTodos must be used within a <TodosProvider />");
	}
	return combineTodos(use(context.todos), context.subscription.all).sort((a, b) => {
		return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
	});
}

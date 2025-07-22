import { allTodos } from "@/app/_lib/todos";
import type { ReactNode } from "react";
import TodosContextProvider from "./context";

export function TodosProvider({ children }: { children: ReactNode }) {
	return <TodosContextProvider initialTodos={allTodos()}>{children}</TodosContextProvider>;
}

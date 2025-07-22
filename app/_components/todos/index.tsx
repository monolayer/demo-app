import { View } from "reshaped";
import { AddTodo } from "./add-todo";
import { TodoList } from "./list";

export function Todos() {
	return (
		<View gap={4} grow direction="column" paddingInline={8}>
			<AddTodo />
			<TodoList />
		</View>
	);
}

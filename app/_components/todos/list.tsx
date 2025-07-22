"use client";

import { Card, Text, View } from "reshaped";
import { DeleteTodo } from "./delete-todo";
import { useTodos } from "./provider/context";

export function TodoList() {
	const todos = useTodos();

	return (
		<View as="ul" gap={2} grow>
			{todos.map((todo) => (
				<Card as="li" key={todo.id}>
					<input type="hidden" name="id" value={todo.id} />
					<View direction="row" align="center" gap={2}>
						<View grow>
							<Text maxLines={1}>{todo.text}</Text>
						</View>
						<DeleteTodo item={todo} />
					</View>
				</Card>
			))}
		</View>
	);
}

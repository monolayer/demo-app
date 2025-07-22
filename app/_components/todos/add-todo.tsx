"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { Button, FormControl, Loader, Text, TextField, View } from "reshaped";
import { addTodo } from "./actions/create-delete";

export function AddTodo() {
	const [state, action, isPending] = useActionState(addTodo, {
		input: "",
	});
	return (
		<form action={action}>
			<View direction="row" gap={2} grow>
				<View grow textAlign={"start"}>
					<FormControl hasError={state.error !== undefined}>
						<View gap={1}>
							<TextField
								name="todo"
								placeholder="Add a new todo"
								defaultValue={state.input || ""}
							/>
							<FormControl.Error>
								<Text variant="body-3">{state.error}</Text>
							</FormControl.Error>
						</View>
					</FormControl>
				</View>
				<Button
					type="submit"
					disabled={isPending}
					color="primary"
					icon={isPending ? Loader : PlusIcon}
					attributes={{ tabIndex: 0 }}
					fullWidth
				/>
			</View>
		</form>
	);
}

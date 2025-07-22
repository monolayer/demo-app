"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import type { Todos } from "@prisma/client";
import { useState } from "react";
import { Button, Dismissible, Loader, Modal, Text, useToggle, View } from "reshaped";
import { deleteTodo } from "./actions/create-delete";

export function DeleteTodo({ item }: { item: Todos }) {
	const { active, activate, deactivate } = useToggle(false);
	const [loading, setLoading] = useState(false);

	return (
		<>
			<Button
				icon={loading ? Loader : TrashIcon}
				onClick={activate}
				variant="outline"
				color="critical"
				disabled={loading}
				attributes={{ tabIndex: 0 }}
			/>
			<Modal active={active} onClose={deactivate}>
				<View gap={3}>
					<Dismissible onClose={deactivate} closeAriaLabel="Close modal">
						<Modal.Title>Delete Todo</Modal.Title>
						<View gap={2} paddingBlock={2}>
							<Text>Do you want to delete the following todo?</Text>
							<Text color="neutral-faded" maxLines={1}>
								{item.text}
							</Text>
						</View>
					</Dismissible>
					<Button
						color="critical"
						attributes={{ tabIndex: 0 }}
						onClick={async () => {
							setLoading(true);
							deactivate();
							try {
								await new Promise((resolve) => {
									setTimeout(async () => {
										resolve(await deleteTodo(item));
									}, 250);
								});
							} catch {
								setLoading(false);
							}
						}}
					>
						Delete
					</Button>
				</View>
			</Modal>
		</>
	);
}

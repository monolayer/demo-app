"use client";

import { LabelWithBadge } from "../label-with-badge";
import { useTodoSubscription } from "./provider/context";

export function TodosTabLabel({ tabValue }: { tabValue: string }) {
	const { last } = useTodoSubscription();
	return (
		<LabelWithBadge tabValue={tabValue} activeTab="file-storage" label="Todo List" last={last} />
	);
}

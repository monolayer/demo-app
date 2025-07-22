"use client";

import { useSubscription } from "@/app/_lib/broadcast-client";
import { byNameASC, combineItems, type BucketItem } from "@/app/_lib/bucket-items";
import { createContext, startTransition, use, useReducer, type ReactNode } from "react";

export interface ItemAction {
	kind: "add" | "remove" | "replace";
	items: BucketItem[];
}

export type BucketItemsContext = {
	items: Promise<BucketItem[]>;
	subscription: { all: BucketItem[]; last: BucketItem | null };

	setItems: (action: ItemAction) => void;
};

export const BucketItemsProvider = createContext<BucketItemsContext | null>(null);

export interface BucketItemsContextProviderProps {
	items: Promise<BucketItem[]>;
	children: ReactNode;
}

export function BucketItemsContextProvider({ items, children }: BucketItemsContextProviderProps) {
	const [state, dispatch] = useReducer(async (currentState, action: ItemAction) => {
		const awaitedItems = await currentState;
		const itemsKeys = action.items.map((item) => item.key);
		switch (action.kind) {
			case "add":
			case "replace":
				return sortedItems([
					...awaitedItems.filter((item) => !itemsKeys.includes(item.key)),
					...action.items,
				]);
			case "remove":
				return sortedItems(awaitedItems.filter((item) => !itemsKeys.includes(item.key)));
		}
	}, items);

	const subscription = useSubscription("/files", {});

	const setItems = (action: ItemAction) => {
		startTransition(() => dispatch(action));
	};

	return (
		<BucketItemsProvider.Provider value={{ items: state, setItems, subscription }}>
			{children}
		</BucketItemsProvider.Provider>
	);
}

function sortedItems(items: BucketItem[]) {
	return items.sort(byNameASC);
}

export function useBucketItemsSubscription() {
	const context = use(BucketItemsProvider);
	if (!context) {
		throw new Error("useTodoSubscription must be used within a <TodosProvider />");
	}
	return context.subscription;
}

export function useBucketItems() {
	const context = use(BucketItemsProvider);
	if (!context) {
		throw new Error("useBucketItems must be used within a <BucketItemsProvider />");
	}
	const items = combineItems(use(context.items), context.subscription.all);
	return { items, setItems: context.setItems };
}

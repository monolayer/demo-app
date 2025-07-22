"use client";

import { Item } from "./item";
import { NoItems } from "./no-items";
import { useBucketItems } from "./provider/context";

export function Items() {
	const { items } = useBucketItems();

	return items.length === 0 ? (
		<NoItems />
	) : (
		items.map((item, idx) => <Item key={idx} item={item} />)
	);
}

"use client";

import { LabelWithBadge } from "../label-with-badge";
import { useBucketItemsSubscription } from "./provider/context";

export function FileStorageTabLabel({ tabValue }: { tabValue: string }) {
	const { last } = useBucketItemsSubscription();
	return <LabelWithBadge tabValue={tabValue} activeTab="todos" label="File Storage" last={last} />;
}

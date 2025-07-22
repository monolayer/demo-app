import type { Channels } from "@/workloads/broadcast";
import { BroadcastPublisher } from "@monolayer/sdk";
import type { BucketItem } from "./bucket-items";

export async function publishBucketUpdate(items: BucketItem[]) {
	const publisher = new BroadcastPublisher<Channels>();
	await publisher.publishTo("/files", {}, items);
}

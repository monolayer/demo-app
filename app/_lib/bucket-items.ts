import documents from "@/workloads/documents";
import { paginateListObjectsV2 } from "@aws-sdk/client-s3";
import { s3Client } from "./s3-client";

export async function bucketItems() {
	const result = paginateListObjectsV2({ client: s3Client }, { Bucket: documents.name });
	const keys: BucketItem[] = [];

	for await (const page of result) {
		keys.push(
			...(page.Contents ?? [])
				.filter((e) => e.Key !== undefined && e.LastModified !== undefined)
				.map((e) => {
					return {
						key: e.Key!,
						status: "uploaded" as const,
						updatedAt: e.LastModified!.toISOString(),
					};
				})
				.sort(byNameASC),
		);
	}
	return keys;
}

export function byNameASC(a: BucketItem, b: BucketItem) {
	return a.key.toLowerCase().localeCompare(b.key.toLowerCase(), "en", {
		ignorePunctuation: true,
	});
}

export function combineItems(contextItems: BucketItem[], subscriptionItems: BucketItem[]) {
	return Object.values(
		contextItems.concat(subscriptionItems).reduce<Record<string, BucketItem>>((acc, val) => {
			if (
				acc[val.key] === undefined ||
				new Date(acc[val.key].updatedAt) <= new Date(val.updatedAt)
			) {
				acc[val.key] = val;
			}
			return acc;
		}, {}),
	)
		.filter((i) => i.status !== "deleted")
		.sort(byNameASC);
}

export interface BucketItem {
	key: string;
	status: "uploaded" | "uploading" | "failed" | "added" | "deleted";
	updatedAt: string;
}

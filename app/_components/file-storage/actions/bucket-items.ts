"use server";

import { publishBucketUpdate } from "@/app/_lib/broadcast-publisher";
import type { BucketItem } from "@/app/_lib/bucket-items";
import { s3Client } from "@/app/_lib/s3-client";
import documents from "@/workloads/documents";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function deleteBucketItem(item: BucketItem) {
	await s3Client.send(
		new DeleteObjectCommand({
			Bucket: documents.name,
			Key: item.key,
		}),
	);
	await publishBucketUpdate([{ ...item, status: "deleted" }]);
	return true;
}

export async function bucketItemsAdded(items: BucketItem[]) {
	await publishBucketUpdate(items.map((item) => ({ ...item, status: "uploaded" })));
	return true;
}

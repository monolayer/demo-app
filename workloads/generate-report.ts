import { publishBucketUpdate } from "@/app/_lib/broadcast-publisher";
import { s3Client } from "@/app/_lib/s3-client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Task } from "@monolayer/sdk";
import documents from "./documents";

const generateReport = new Task<{ id: string }>("generate-report", async ({ data }) => {
	const key = `report-${data.id}`;
	await s3Client.send(
		new PutObjectCommand({
			Bucket: documents.name,
			Key: key,
			Body: Buffer.from("this is a test"),
		}),
	);
	await publishBucketUpdate([
		{ key: key, status: "uploaded", updatedAt: new Date().toISOString() },
	]);
});

export default generateReport;

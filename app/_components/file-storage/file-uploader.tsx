"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { FileUpload, Icon, Text, View } from "reshaped";
import { bucketItemsAdded } from "./actions/bucket-items";
import { presignedUploadUrls } from "./actions/presigned-urls";
import { useBucketItems, type ItemAction } from "./provider/context";

export function FileUploader() {
	const { setItems } = useBucketItems();

	return (
		<FileUpload
			name="file"
			onChange={async ({ value: files }) => {
				const date = new Date().toISOString();
				const newFiles = files.map((file) => ({
					key: file.name,
					status: "uploading" as const,
					updatedAt: date,
				}));
				setItems({
					kind: "add",
					items: newFiles,
				});
				try {
					await uploadFiles(files, date, setItems);
					try {
						await bucketItemsAdded(newFiles);
					} catch {
						//
					}
				} catch {
					setItems({
						kind: "replace",
						items: files.map((file) => ({
							key: file.name,
							status: "failed" as const,
							updatedAt: date,
						})),
					});
				}
			}}
		>
			<View gap={2}>
				<Icon svg={ArrowUpTrayIcon} size={6} />
				<Text color="neutral-faded" variant="body-2">
					Drop files to upload
				</Text>
			</View>
		</FileUpload>
	);
}

export async function uploadFiles(
	files: File[],
	date: string,
	setItems: (action: ItemAction) => void,
) {
	const links = await presignedUploadUrls({ keys: files.map((file) => file.name) });
	for (const link of links) {
		const file = files.find((file) => file.name === link.key);
		if (file) {
			try {
				await uploadToS3(link.url, file);
				setItems({
					kind: "replace",
					items: [
						{
							key: file.name,
							status: "uploaded" as const,
							updatedAt: date,
						},
					],
				});
			} catch {
				setItems({
					kind: "replace",
					items: [
						{
							key: file.name,
							status: "failed" as const,
							updatedAt: date,
						},
					],
				});
			}
		}
	}
}

async function uploadToS3(presignedUrl: string, file: File) {
	// Upload the file to S3 using the presigned URL
	const result = await fetch(presignedUrl, {
		method: "PUT",
		headers: {
			"Content-Type": file.type,
		},
		body: file,
	});

	if (!result.ok) {
		throw new Error(`File upload failed ${result.statusText}`);
	}
}

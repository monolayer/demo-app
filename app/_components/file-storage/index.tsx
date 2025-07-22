"use client";

import { Suspense } from "react";
import { Table, View } from "reshaped";
import { FileUploader } from "./file-uploader";
import { GenerateReport } from "./generate-report";
import { Items } from "./items";
import { ItemsSkeleton } from "./skeleton";

export function FileStorage() {
	return (
		<View paddingInline={8} gap={4}>
			<GenerateReport />
			<View backgroundColor="primary-faded" borderRadius={"medium"}>
				<FileUploader />
			</View>
			<Table border>
				<Table.Row highlighted>
					<Table.Heading colSpan={2}>File</Table.Heading>
				</Table.Row>
				<Suspense fallback={<ItemsSkeleton />}>
					<Items />
				</Suspense>
			</Table>
		</View>
	);
}

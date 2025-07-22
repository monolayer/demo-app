"use client";

import { useState, type ReactNode } from "react";
import { Tabs as ReshapedTabs, View } from "reshaped";
import { FileStorageTabLabel } from "../file-storage/tab-label";
import { TodosTabLabel } from "../todos/tab-label";
import { TabItem } from "./item";

export type Tabs = "todos" | "file-storage";

export function Tabs({ children }: { children: ReactNode }) {
	const [tabValue, setTabValue] = useState<Tabs>("todos");
	return (
		<View grow textAlign={"center"}>
			<ReshapedTabs
				value={tabValue}
				onChange={({ value }) => {
					setTabValue(value as Tabs);
				}}
				variant="pills-elevated"
			>
				<ReshapedTabs.List>
					<TabItem tabName="todos">
						<TodosTabLabel tabValue={tabValue} />
					</TabItem>
					<TabItem tabName="file-storage">
						<FileStorageTabLabel tabValue={tabValue} />
					</TabItem>
				</ReshapedTabs.List>
				{children}
			</ReshapedTabs>
		</View>
	);
}

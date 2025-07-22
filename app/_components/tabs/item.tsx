import type { ReactNode } from "react";
import { Tabs as ReshapedTabs } from "reshaped";
import type { Tabs } from ".";

export function TabItem({ tabName, children }: { tabName: Tabs; children: ReactNode }) {
	return <ReshapedTabs.Item value={tabName}>{children}</ReshapedTabs.Item>;
}

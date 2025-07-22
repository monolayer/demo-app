import type { ReactNode } from "react";
import { Tabs as ReshapedTabs } from "reshaped";
import type { Tabs } from ".";

export function Tab({ tabName, children }: { tabName: Tabs; children: ReactNode }) {
	return <ReshapedTabs.Panel value={tabName}>{children}</ReshapedTabs.Panel>;
}

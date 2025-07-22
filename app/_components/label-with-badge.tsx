"use client";

import { useEffect, useState } from "react";
import { Badge, Text } from "reshaped";

export function LabelWithBadge({
	tabValue,
	activeTab,
	label,
	last,
}: {
	tabValue: string;
	activeTab: string;
	label: string;
	last: unknown | null;
}) {
	const [showBadge, setShowBadge] = useState(false);

	useEffect(() => {
		if (tabValue === activeTab && last !== null) {
			setShowBadge(true);
		}
	}, [tabValue, last, activeTab]);

	useEffect(() => {
		setShowBadge(false);
	}, [tabValue]);

	return (
		<Badge.Container>
			{showBadge ? <Badge color="positive" rounded size="small" /> : null}
			<Text variant="body-2">{label}</Text>
		</Badge.Container>
	);
}

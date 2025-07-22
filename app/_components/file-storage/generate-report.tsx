"use client";

import { report } from "@/app/_actions/generate-report";
import { useState } from "react";
import { Button, View } from "reshaped";

export function GenerateReport() {
	const [isGenerating, setGenerating] = useState(false);

	return (
		<View align={"center"}>
			<Button
				variant="solid"
				color="neutral"
				onClick={async () => {
					setGenerating(true);
					await report();
					setGenerating(false);
				}}
				disabled={isGenerating}
			>
				Generate Random Report
			</Button>
		</View>
	);
}

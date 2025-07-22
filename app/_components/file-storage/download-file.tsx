"use client";

import type { BucketItem } from "@/app/_lib/bucket-items";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Button } from "reshaped";
import { presignedDownloadUrl } from "./actions/presigned-urls";

export function DownloadFile({ item }: { item: BucketItem }) {
	const [href, setHref] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (href && buttonRef.current) {
			buttonRef.current.click();
		}
	}, [href, buttonRef]);

	return (
		<Button
			icon={ArrowDownTrayIcon}
			variant="outline"
			ref={buttonRef}
			href={href}
			loading={loading}
			attributes={{
				"aria-label": "Download file",
				download: href ? true : undefined,
				onClickCapture: async (event) => {
					if (!href) {
						event.preventDefault();
						setLoading(true);
						const url = await presignedDownloadUrl({ key: item.key });
						setHref(url);
						setLoading(false);
					}
				},
			}}
		/>
	);
}

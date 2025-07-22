import { bucketItems } from "@/app/_lib/bucket-items";
import type { ReactNode } from "react";
import { BucketItemsContextProvider } from "./context";

export function FileStorageProvider({ children }: { children: ReactNode }) {
	return <BucketItemsContextProvider items={bucketItems()}>{children}</BucketItemsContextProvider>;
}

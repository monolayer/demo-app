"use server";

import generateReport from "@/workloads/generate-report";
import { randomUUID } from "crypto";

export async function report() {
	await generateReport.performLater({ id: randomUUID() });
}

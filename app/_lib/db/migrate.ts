import database from "@/workloads/postgres";
import { loadEnvConfig } from "@next/env";
import { execSync } from "child_process";
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const credentials = process.env[database.connectionStringEnvVar];

if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD && !credentials) {
	throw new Error(`${database.connectionStringEnvVar} environment variable is not set`);
}

const mode = process.env.NODE_ENV === "production" ? "deploy" : "dev";

try {
	execSync(`npx prisma migrate ${mode}`);
} catch {
	process.exit(1);
}

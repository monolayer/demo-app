import database from "@/workloads/postgres";
import { loadEnvConfig } from "@next/env";
import { loremIpsum } from "lorem-ipsum";
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";
import { prisma } from "./prisma";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const credentials = process.env[database.connectionStringEnvVar];

if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD && !credentials) {
	throw new Error(`${database.connectionStringEnvVar} environment variable is not set`);
}

async function main() {
	const sentences = loremIpsum({
		count: 4,
		format: "plain",
		units: "sentences",
	});

	for (const sentence of sentences.split(". ")) {
		await prisma.todos.create({
			data: {
				text: `${sentence}.`,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

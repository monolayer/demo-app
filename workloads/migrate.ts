import { Bootstrap as BeforeRollout } from "@monolayer/sdk";

const migrateDatabase = new BeforeRollout("migrate-database", {
	script: "db:migrate",
});

export default migrateDatabase;

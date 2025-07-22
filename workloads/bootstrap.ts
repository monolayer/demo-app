import { Bootstrap } from "@monolayer/sdk";

const bootstrapDatabase = new Bootstrap("database", {
	script: "db:bootstrap",
});

export default bootstrapDatabase;

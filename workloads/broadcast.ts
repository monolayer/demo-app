import type { BucketItem } from "@/app/_lib/bucket-items";
import { Broadcast, ChannelData } from "@monolayer/sdk";
import type { Todos } from "@prisma/client";

export type FilesData = BucketItem;
export type TodosData = Todos & { action: "add" | "delete" };

const broadcast = new Broadcast({
	session: async () => ({}),
	channels: {
		"/files": {
			data: new ChannelData<FilesData>(),
			auth: async () => true,
		},
		"/todos": {
			data: new ChannelData<TodosData>(),
			auth: async () => true,
		},
	},
});

export default broadcast;
export type Channels = typeof broadcast._channelDataType;

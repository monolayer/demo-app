import type { Channels } from "@/workloads/broadcast";
import { broadcastClient } from "@monolayer/sdk";

export const { useSubscription } = broadcastClient<Channels>();

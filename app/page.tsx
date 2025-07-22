import { FileStorage } from "@/app/_components/file-storage";
import { FileStorageProvider } from "@/app/_components/file-storage/provider";
import { PanelHeader } from "@/app/_components/panel-header";
import { Tabs } from "@/app/_components/tabs";
import { Tab } from "@/app/_components/tabs/tab";
import { Todos } from "@/app/_components/todos";
import { TodosProvider } from "@/app/_components/todos/provider";
import { View } from "reshaped";

export const dynamic = "force-dynamic";

export default function Page() {
	return (
		<TodosProvider>
			<FileStorageProvider>
				<Tabs>
					<Tab tabName={"todos"}>
						<View gap={2}>
							<PanelHeader text="Todo List" />
							<Todos />
						</View>
					</Tab>
					<Tab tabName={"file-storage"}>
						<View gap={2}>
							<PanelHeader text="File Storage" />
							<FileStorage />
						</View>
					</Tab>
				</Tabs>
			</FileStorageProvider>
		</TodosProvider>
	);
}

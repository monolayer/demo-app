import { Text, View } from "reshaped";

export function PanelHeader({ text }: { text: string }) {
	return (
		<View paddingBlock={8}>
			<Text as="h1" variant="title-6">
				{text}
			</Text>
		</View>
	);
}

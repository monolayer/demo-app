import { BroadcastProvider } from "@monolayer/sdk";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Container, Reshaped, View } from "reshaped";
import "reshaped/themes/slate/theme.css";
import "./globals.css";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "monolayer demo",
	description: "demo application with the monolayer SDK.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-rs-theme="slate" data-rs-color-mode="light">
			<body className={`${geistMono.variable} antialiased`}>
				<BroadcastProvider>
					<Reshaped theme="slate" defaultColorMode="light">
						<Container width="100%" align="center">
							<View paddingBlock={10} grow maxWidth={200} width="100%">
								{children}
							</View>
						</Container>
					</Reshaped>
				</BroadcastProvider>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { PlaygroundCanvas } from "@/components/playground-canvas";

export const metadata: Metadata = { title: "Playground" };

export default function PlaygroundPage() {
  return <PlaygroundCanvas />;
}

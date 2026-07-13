import { createFileRoute } from "@tanstack/react-router";
import { WellnessVedaLanding } from "./wellness-veda";

export const Route = createFileRoute("/wellness-veda/")({
  component: WellnessVedaLanding,
});

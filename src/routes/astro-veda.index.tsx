import { createFileRoute } from "@tanstack/react-router";
import { AstroVedaLanding } from "./astro-veda";

export const Route = createFileRoute("/astro-veda/")({
  component: AstroVedaLanding,
});

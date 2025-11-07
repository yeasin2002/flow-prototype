import { generateClientEntry } from "./entry-client";
import { generateServerEntry } from "./entry-server";

export * from "./entry-client";
export * from "./entry-server";

export function createRuntime() {
  return {
    generateClientEntry,
    generateServerEntry,
  };
}
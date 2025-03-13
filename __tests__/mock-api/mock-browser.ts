import { setupWorker } from "msw/browser";
import { mswHandler } from "./handlers";

export const mockInBrowser = setupWorker(...mswHandler);

import { setupWorker } from "msw/browser";
import { mswHandler } from "./handlers/handler";

export const mockInBrowser = setupWorker(...mswHandler);

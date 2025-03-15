// src/mocks/node.js
import { setupServer } from "msw/node";
import { mswHandler } from "./handlers/handler";

export const mockServer = setupServer(...mswHandler);

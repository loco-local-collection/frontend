import { mockServer } from "../../__tests__/mock-api/mockServer";

const enableMock = () => {
  mockServer.listen();
};

enableMock();

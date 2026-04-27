import { describe, test, expect } from "bun:test";
import { api, authenticatedApi, signUpTestUser, expectStatus, connectWebSocket, connectAuthenticatedWebSocket, waitForMessage } from "./helpers";

describe("API Integration Tests", () => {
  test("GET /api/greeting returns greeting", async () => {
    const res = await api("/api/greeting");
    await expectStatus(res, 200);
    const data = await res.json();
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("message");
    expect(data).toHaveProperty("createdAt");
  });
});

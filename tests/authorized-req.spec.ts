import { expect } from "@playwright/test";
import { test } from "./request.fixture";

test.use({ authData: { email: "psp@gm.com" } });

test("create article - it should created", async ({ request }) => {
  // Arrange
  const requestBody = {
    article: {
      author: {},
      title: "some article",
      description: "some description",
      body: "asfaqsfa\nasfasf\n\nasfasfa",
      tagList: ["qa", "dojo", "cool"],
    },
  };

  // Act
  const response = await request.post("/api/articles", {
    data: requestBody,
  });

  // Assert
  const responseJson = await response.json();

  expect(response.status()).toBe(200);
});

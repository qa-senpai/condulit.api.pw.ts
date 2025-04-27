import { FullConfig } from "@playwright/test";
import { UserController } from "./controllers/Users/UserController";
import { request, expect } from "@playwright/test";

export default async function globalSetup(config: FullConfig) {
  console.log("Starting....");
  const apiContext = await request.newContext();

  const userController = new UserController(apiContext);
  const requestBody = {
    email: "admin@gm.com",
    password: "admin1234",
    username: "admin1234",
  };

  const response = await userController.registerUser(requestBody);

  expect(response.status()).toBe(200);
}

import { FullConfig } from "@playwright/test";
import { UserController } from "./controllers/Users/UserController";
import { request, expect } from "@playwright/test";

export default async function globalSetup(config: FullConfig) {
  console.log("Starting...");
  const apiContext = await request.newContext();

  const userController = new UserController(apiContext);

  try {
    const requestBody = {
      email: process.env.EMAIL!,
      password: process.env.PASSWORD!,
      username: process.env.USERNAME!,
    };

    console.log(requestBody.email);
    console.log(requestBody.password);
    console.log(requestBody.username);

    console.log("THIS IS MY ENV VARIABLE:");
    console.log(requestBody);

    const response = await userController.registerUser(requestBody);

    expect(response.status()).toBe(200);
  } catch (e) {
    console.log("User already exist");
  }
}

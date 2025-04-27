import { test, expect } from "@playwright/test";
import { UserController } from "../controllers/Users/UserController";

///api/articles?offset=0&limit=10

test("request articles - verify count more then one", async ({ request }) => {
  // Arrange

  // Act
  const response = await request.get("/api/articles?offset=0&limit=10");

  // Assert
  const responseJson = await response.json();
  expect(responseJson.articlesCount).toBeGreaterThan(1);
});

test("request article - it should exist", async ({ request }) => {
  // Arrange

  // Act
  const response = await request.get("/api/articles/demo-article-rjd94l");

  // Assert
  const responseJson = await response.json();
  expect(responseJson.article.title).toBe("Demo Article");
});

/*
Request URL:
/api/users
Request Method: POST
Status Code: 200

Payload example: {"user":{"email":"psp@asfgasfg.com","password":"1234","username":"psp"}}

Response example: {
    "user": {
        "username": "psp",
        "email": "psp@asfgasfg.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDkxNWIyZGI0MTIyYTUwNGYzMzFhMiIsInVzZXJuYW1lIjoicHNwIiwiZXhwIjoxNzUwNjA5ODQyLCJpYXQiOjE3NDU0MjU4NDJ9.8qlENm3H97ah8noilcFzKKf7YtbCdZz801-wOUv_V0E"
    }
}
*/

test("register user - it should registered", async ({ request }) => {
  // Arrange

  // Act
  const response = await request.post("/api/users", {
    data: {
      user: { email: "psp@gm.com", password: "1234", username: "psp1" },
    },
  });

  // Assert
  const responseJson = await response.json();

  expect(response.status()).toBe(200);
  expect(responseJson.user.token).toBeTruthy();
});

test("MQA-1515 register user - it should registered", async ({ request }) => {
  // Arrange

  // Act
  const response = await request.post("/api/users", {
    data: {
      user: { email: "psp@gm.com", password: "1234", username: "psp1" },
    },
  });

  // Assert
  const responseJson = await response.json();

  expect(response.status()).toBe(200);
  expect(responseJson.user.token).toBeTruthy();
});

/*
Request URL:
https://conduit-api.learnwebdriverio.com/api/users/login
Request Method: POST
Status Code: 200

Payload example: {"user":{"email":"psp@gm.com","password":"1234"}}

*/

test("login user - it should logged", async ({ request }) => {
  // Arrange
  const requestBody = {
    user: { email: "psp@gm.com", password: "1234" },
  };

  // Act
  const response = await request.post("/api/users/login", {
    data: requestBody,
  });

  // Assert
  const responseJson = await response.json();

  expect(response.status()).toBe(200);
  expect(responseJson.user.token).toBeTruthy();
});

test("MQA-151 login user - it should logged", async ({ request }) => {
  // Arrange
  const userController = new UserController(request);
  const requestBody = { email: "psp@gm.com", password: "1234" };

  // Act
  const response = await userController.loginUser(requestBody);

  // Assert
  const responseJson = await response.json();

  expect(response.status()).toBe(200);
  expect(responseJson.user.token).toBeTruthy();
});

/*
Request URL:
https://conduit-api.learnwebdriverio.com/api/articles
Request Method: POST
Status Code: 200

Payload example: {"article":{"author":{},"title":"some article","description":"some description","body":"asfaqsfa\nasfasf\n\nasfasfa","tagList":["qa","dojo","cool"]}}
*/

test("create article - it should created", async ({ request }) => {
  // Arrange
  const authRequestBody = {
    user: { email: "psp@gm.com", password: "1234" },
  };

  const authResponse = await request.post("/api/users/login", {
    data: authRequestBody,
    failOnStatusCode: true,
  });

  const authResponseJson = await authResponse.json();
  const token = authResponseJson.user.token;

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
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: `Token ${token}`,
      "Content-Type": "application/json;charset=UTF-8",
      Origin: "https://demo.learnwebdriverio.com",
    },
  });

  // Assert
  const responseJson = await response.json();

  expect(response.status()).toBe(200);
});

import { test, expect } from "./request.fixture";
import { Article } from "../controllers/Articles/ArticleType";
import { ArticlesController } from "../controllers/Articles/ArticlesController";

test.use({ authData: { email: "admin@gm.com" } });

// beforeEach
// afterEach

// beforeAll
// afterAll

// fixture

// globalSetup
// globalTeardown

test("test static method", async ({}) => {
  ArticlesController.printBaseUrl();
  console.log(ArticlesController.baseUrl);
});

test("MQA-125151 create article - it should created", async ({ request }) => {
  // Arrange
  const articlesController = new ArticlesController(request);
  const requestBody: Article = {
    title: "some title",
    body: "some body",
    tagList: ["qa", "dojo", "test"],
  };

  // Act
  const response = await articlesController.createArticle(requestBody);

  // Assert
  expect(response.status()).toBe(200);
});

test("MQA-125151 get article - it should exist", async ({ request }) => {
  // Arrange
  const articlesController = new ArticlesController(request);

  // Act
  const response = await articlesController.getArticle("");

  // Assert
  expect(response.status()).toBe(200);
});

test("MQA-125151 get articles - it should return 10 article", async ({
  request,
}) => {
  // Arrange
  const articlesController = new ArticlesController(request);

  // Act
  const response = await articlesController.getArticles(0, 10);

  // Assert
  expect(response.status()).toBe(200);
});

import { test, expect } from "@playwright/test";
import { loginWith, createBlog } from "./helper";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: { name: "test", username: "test", password: "test" },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = page.getByText("Log in to application");
    await expect(locator).toBeVisible();
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByText("login")).toBeVisible();
  });

  test.describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username").fill("test");
      await page.getByLabel("password").fill("test");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("test logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("test");
      await page.getByLabel("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();
      await expect(
        page.getByText("Failed to login because invalid username or password"),
      ).toBeVisible();
    });
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByLabel("username").fill("test");
      await page.getByLabel("password").fill("test");
      await page.getByRole("button", { name: "login" }).click();
      await page.getByRole("button", { name: "Create Blog" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByLabel("Title:").fill("test");
      await page.getByLabel("Author:").fill("test");
      await page.getByLabel("Url:").fill("test");
      await page.getByRole("button", { name: "Create Blog" }).click();
      await expect(
        page.getByText("A new blog test by test added"),
      ).toBeVisible();
      await expect(page.getByText("test-test")).toBeVisible();
    });

    test.describe("After logged in", () => {
      test.beforeEach(async ({ page }) => {
        await page.getByLabel("Title:").fill("test");
        await page.getByLabel("Author:").fill("test");
        await page.getByLabel("Url:").fill("test");
        await page.getByRole("button", { name: "Create Blog" }).click();
        await page.getByRole("button", { name: "show" }).click();
      });

      test("Blog can be liked", async ({ page }) => {
        await expect(page.getByText("Like: 0")).toBeVisible();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("Like: 1")).toBeVisible();
      });

      test("Blog can be deleted by the creator", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "Remove" }).click();
        await expect(page.getByText("Blog deleted")).toBeVisible();
        await expect(page.getByText("test-test")).not.toBeVisible();
      });
    });
  });
});

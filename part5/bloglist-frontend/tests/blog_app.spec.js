import { test, expect } from "@playwright/test";
import { loginWith, createBlog } from "./helper";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: { name: "test", username: "test", password: "test" },
    });
    await request.post("/api/users", {
      data: { name: "fake", username: "fake", password: "fake" },
    });
    await page.goto("/login");
  });

  test.describe("Login", () => {
    test("Login succeeds with the correct username/password combination", async ({
      page,
    }) => {
      await loginWith(page, "test", "test");
      await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "test", "wrong");
      await expect(
        page.getByText("Failed to login because invalid username or password"),
      ).toBeVisible();
    });
  });

  test.describe("To login", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "test", "test");
      await page.getByRole("link", { name: "New Blog" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "test", "test", "test");
      await expect(page.getByText("test test")).toBeVisible();
    });

    test.describe("After logged in", () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, "test", "test", "test");
        await page.getByRole("link", { name: "test test" }).click();
      });

      test("Blog can be liked", async ({ page }) => {
        await expect(page.getByText("Like: 0")).toBeVisible();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("Like: 1")).toBeVisible();
      });

      test("Blog can be deleted by the creator", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "Remove" }).click();
        await expect(page.getByText("test test")).not.toBeVisible();
      });
    });
  });
});

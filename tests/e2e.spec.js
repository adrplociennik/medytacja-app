const { test, expect } = require("@playwright/test");

async function openStill(page, width=390, height=844) {
  await page.setViewportSize({ width, height });
  await page.addInitScript(() => localStorage.setItem("still.tutorial.v2", "1"));
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await expect(page.locator("body")).toHaveAttribute("data-app-ready", "true");
  return pageErrors;
}

test("mobile core interactions work", async ({ page }) => {
  const errors = await openStill(page);

  await expect(page.locator("#sessionList .session-card")).toHaveCount(14);

  await page.locator('.mode-grid [data-session="reset-3"]').click();
  await expect(page.locator("#playerDialog")).toBeVisible();
  await expect(page.locator("#playerTitle")).toHaveText("Szybki reset");
  await page.locator("#togglePlayer").click();
  await expect(page.locator("#togglePlayer")).toHaveText("Wznów");
  await page.locator("#closePlayer").click();
  await expect(page.locator("#playerDialog")).not.toBeVisible();

  await page.locator("#mobileSettingsButton").click();
  await expect(page.locator("#settingsDialog")).toBeVisible();
  await page.locator("#gongEnabled").uncheck();
  await page.locator("#gongEnabled").check();
  await page.locator("#settingsDialog .modal-close").click();
  await expect(page.locator("#settingsDialog")).not.toBeVisible();

  await page.locator("#breathList .breath-card").first().click();
  await expect(page.locator("#breathDialog")).toBeVisible();
  await page.locator("#toggleBreath").click();
  await expect(page.locator("#toggleBreath")).toHaveText("Wznów");
  await page.locator("#closeBreath").click();

  await page.locator('[data-mood="tense"]').click();
  await page.locator('[data-goal="calm"]').click();
  await page.locator('[data-time="5"]').click();
  await expect(page.locator("#recommendationCard")).toBeVisible();
  await page.locator("#startRecommendation").click();
  await expect(page.locator("#playerDialog")).toBeVisible();
  await page.locator("#closePlayer").click();

  await page.locator('[data-freq="432"]').click();
  await expect(page.locator('[data-freq="432"]')).toHaveClass(/active/);
  await page.locator("#stopFrequency").click();

  expect(errors).toEqual([]);
});

test("desktop navigation and controls work", async ({ page }) => {
  const errors = await openStill(page, 1440, 1000);

  await expect(page.locator(".desktop-sidebar")).toBeVisible();
  await expect(page.locator(".bottom-nav")).not.toBeVisible();

  await page.locator("#settingsButton").click();
  await expect(page.locator("#settingsDialog")).toBeVisible();
  await page.locator("#settingsDialog .modal-close").click();

  await page.locator('.side-nav a[href="#practice"]').click();
  await expect(page.locator("#practice")).toBeInViewport();

  await page.locator("#plusMinute").click();
  await expect(page.locator("#timerMinutes")).toHaveText("11");
  await page.locator("#startCustomTimer").click();
  await expect(page.locator("#playerTitle")).toHaveText("Własny timer");
  await page.locator("#closePlayer").click();

  expect(errors).toEqual([]);
});

import env from "../env.json";
import models from "../models";
import { mockContext } from "../src/utils";
import { getCategory } from "../src/store";

beforeAll(() => {
  process.env = {
    NODE_ENV: "development",
    ...env,
  };
});

test("get category list", async () => {
  const db = await models.init();
  const context = mockContext(db);

  try {
    const category = await getCategory(null, context);
    expect(category).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          display_name: expect.any(String),
          display_order: expect.any(Number),
        }),
      ]),
    );
  } catch (error) {
    expect(error).toBe(null);
  } finally {
    await db.end();
  }
});

import env from "../env.json";
import models from "../models";
import { mockContext } from "../src/utils";
import { getProductCategories } from "../src/store";

beforeAll(() => {
  process.env = {
    NODE_ENV: "development",
    ...env,
  };
});

test("get product category list", async () => {
  const db = await models.init();
  const context = mockContext(db);
  const productObject = await db.Product.findOne({ where: { sku: "NG-001" }});

  try {
    const productCategories = await getProductCategories(productObject, context);
    expect(productCategories).toEqual(
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

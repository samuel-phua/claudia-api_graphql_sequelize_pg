import env from "../env.json";
import models from "../models";
import { mockContext } from "../src/utils";
import { getCategoryProducts } from "../src/store";

beforeAll(() => {
  process.env = {
    NODE_ENV: "development",
    ...env,
  };
});

test("get category product list", async () => {
  const db = await models.init();
  const context = mockContext(db);
  const categoryObject = await db.Category.findOne({ where: { display_order: 0 }});

  try {
    const categoryProducts = await getCategoryProducts(categoryObject.toJSON(), context);
    expect(categoryProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sku: expect.any(String),
          display_name: expect.any(String),
          unit_description: expect.any(String),
          unit_selling_price: expect.any(String), // JSON doesn't support float as a data type
        }),
      ]),
    );
  } catch (error) {
    expect(error).toBe(null);
  } finally {
    await db.end();
  }
});

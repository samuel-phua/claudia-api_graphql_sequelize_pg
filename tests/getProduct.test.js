import env from "../env.json";
import models from "../models";
import { mockContext } from "../src/utils";
import { getProduct } from "../src/store";

beforeAll(() => {
  process.env = {
    NODE_ENV: "development",
    ...env,
  };
});

test("get product list", async () => {
  const db = await models.init();
  const context = mockContext(db);

  try {
    const product = await getProduct(null, context);
    expect(product).toEqual(
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

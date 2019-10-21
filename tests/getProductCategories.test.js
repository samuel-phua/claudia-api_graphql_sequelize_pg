import { development_db_conn_str } from "../env.json";
import pg from "../models";
import { mockContext } from "../src/utils";
import { getProductCategories } from "../src/store";

beforeAll(() => {
  process.env.NODE_ENV = "development";
  process.env.development_db_conn_str = development_db_conn_str;
});

test("get product category list", async () => {
  const context = mockContext(pg.initClient());
  const productObject = await pg.Product.findOne({ where: { sku: "" }});

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
    await pg.disconnect();
  }
});

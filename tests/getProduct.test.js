import { development_db_conn_str } from "../env.json";
import pg from "../models";
import { mockContext } from "../src/utils";
import { getProduct } from "../src/store";

beforeAll(() => {
  process.env.NODE_ENV = "development";
  process.env.development_db_conn_str = development_db_conn_str;
});

test("get product list", async () => {
  const context = mockContext(pg.initClient());

  try {
    const product = await getProduct(null, context);
    expect(product).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sku: expect.any(String),
          display_name: expect.any(String),
          unit_description: expect.any(String),
          unit_selling_price: expect.any(Number),
        }),
      ]),
    );
  } catch (error) {
    expect(error).toBe(null);
  } finally {
    await pg.disconnect();
  }
});

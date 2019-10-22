import env from "../../env.json";
import models from "../../models";
import { mockContext } from "../utils";
import {
  getProduct,
  getProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./ProductStore";

beforeAll(() => {
  process.env = {
    NODE_ENV: "development",
    ...env,
  };
});

describe("ProductStore CRUD tests", () => {

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

});

import env from "../../env.json";
import models from "../../models";
import { mockContext } from "../utils";
import {
  getCategory,
  getCategoryProducts,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./CategoryStore";

beforeAll(() => {
  process.env = {
    NODE_ENV: "development",
    ...env,
  };
});

describe("CategoryStore CRUD tests", () => {

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

  test("get category product list", async () => {
    const db = await models.init();
    const context = mockContext(db);
    const categoryObject = await db.Category.findOne({ where: { display_order: 0 }});

    try {
      const categoryProducts = await getCategoryProducts(categoryObject, context);
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

});

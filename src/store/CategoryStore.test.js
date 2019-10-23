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

describe("CategoryStore List tests", () => {

  let db, context;

  beforeEach(async () => {
    db = await models.init();
    context = mockContext(db);
  });

  afterEach(async () => {
    await db.end();
    context = null;
  });

  test("get category list", async () => {
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
    }
  });

  test("get category product list", async () => {
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
    }
  });

});

describe("CategoryStore CRUD tests", () => {

  let db, context, categoryId;

  beforeEach(async () => {
    db = await models.init();
    context = mockContext(db);
  });

  afterEach(async () => {
    await db.end();
    context = null;
  });

  test("create category", async () => {
    try {
      const category = {
        display_name: "Test Category 123",
        display_order: 999,
      };
      const createdCategory = await createCategory(category, context);
      expect(createdCategory).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          display_name: expect.any(String),
          display_order: expect.any(Number),
        }),
      );
      categoryId = createdCategory.id;
    } catch (error) {
      expect(error).toBe(null);
    }
  });

  test("read category", async () => {
    try {
      expect(categoryId).toBeDefined();
      const readCategory = await getCategory(categoryId, context);
      expect(readCategory).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            display_name: expect.any(String),
            display_order: expect.any(Number),
          }),
        ]),
      );
      expect(readCategory).toHaveLength(1);
      expect(readCategory[0].id).toBe(categoryId);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

  test("update category", async () => {
    try {
      expect(categoryId).toBeDefined();
      const updateCategoryObject = {
        id: categoryId,
        display_order: 998,
      };
      const updatedCategoryCount = await updateCategory(updateCategoryObject, context);
      expect(updatedCategoryCount).toEqual(
        expect.arrayContaining([
          expect.any(Number),
        ]),
      );
      expect(updatedCategoryCount).toHaveLength(1);
      expect(updatedCategoryCount[0]).toEqual(1);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

  test("delete category", async () => {
    try {
      expect(categoryId).toBeDefined();
      const deletedCategoryCount = await deleteCategory(categoryId, context);
      expect(deletedCategoryCount).toEqual(1);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

});

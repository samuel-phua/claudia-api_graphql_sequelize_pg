import env from "../../env.json";
import models from "../../models";
import { mockContext } from "../utils";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./ProductStore";
import {
  validateCategory,
  validateCategories,
  validateProduct,
  validateProducts,
} from "./validate";

beforeAll(() => {
  process.env = {
    NODE_ENV: "development",
    ...env,
  };
});

describe("ProductStore List tests", () => {

  let db, context;

  beforeEach(async () => {
    db = await models.init();
    context = mockContext(db);
  });

  afterEach(async () => {
    await db.end();
    context = null;
  });

  test("get product list", async () => {
    try {
      const products = await getProduct(null, context);
      validateProducts(products);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

  test("get product list by category", async () => {
    const categoryObject = await db.Category.findOne({ where: { display_order: 0 }});

    try {
      const products = await getProduct({ categoryId: categoryObject.id }, context);
      validateProducts(products);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

});

describe("ProductStore CRUD tests", () => {

  let db, context, productId;

  beforeEach(async () => {
    db = await models.init();
    context = mockContext(db);
  });

  afterEach(async () => {
    await db.end();
    context = null;
  });

  test("create product", async () => {
    try {
      const product = {
        sku: "A-001",
        display_name: "Alpha Zero Zero One",
        unit_description: "piece",
        unit_selling_price: 0.01,
      };
      const createdProduct = await createProduct(product, context);
      validateProduct(createdProduct);
      productId = createdProduct.id;
    } catch (error) {
      expect(error).toBe(null);
    }
  });

  test("read product", async () => {
    try {
      expect(productId).toBeDefined();
      const readProduct = await getProduct({ id: productId }, context);
      validateProduct(readProduct);
      // expect(readProduct).toHaveLength(1);
      expect(readProduct.id).toBe(productId);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

  test("update product", async () => {
    try {
      expect(productId).toBeDefined();
      const updateProductObject = {
        id: productId,
        unit_selling_price: 0.02,
      };
      const updatedProductCount = await updateProduct(updateProductObject, context);
      expect(updatedProductCount).toEqual(
        expect.arrayContaining([
          expect.any(Number),
        ]),
      );
      expect(updatedProductCount).toHaveLength(1);
      expect(updatedProductCount[0]).toEqual(1);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

  test("delete product", async () => {
    try {
      expect(productId).toBeDefined();
      const deletedProductCount = await deleteProduct(productId, context);
      expect(deletedProductCount).toEqual(1);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

});

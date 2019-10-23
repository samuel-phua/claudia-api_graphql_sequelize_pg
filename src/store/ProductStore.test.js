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

describe("ProductStore List tests", () => {

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

describe("ProductStore CRUD tests", () => {

  let productId = null;

  test("create product", async () => {
    const db = await models.init();
    const context = mockContext(db);

    try {
      const product = {
        sku: "A-001",
        display_name: "Alpha Zero Zero One",
        unit_description: "piece",
        unit_selling_price: 0.01,
      };
      const createdProduct = await createProduct(product, context);
      expect(createdProduct).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          sku: expect.any(String),
          display_name: expect.any(String),
          unit_description: expect.any(String),
          unit_selling_price: expect.any(String), // JSON doesn't support float as a data type
        }),
      );
      productId = createdProduct.id;
    } catch (error) {
      expect(error).toBe(null);
    } finally {
      await db.end();
    }
  });

  test("read product", async () => {
    const db = await models.init();
    const context = mockContext(db);

    try {
      expect(productId).toBeDefined();
      const readProduct = await getProduct(productId, context);
      expect(readProduct).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            sku: expect.any(String),
            display_name: expect.any(String),
            unit_description: expect.any(String),
            unit_selling_price: expect.any(String), // JSON doesn't support float as a data type
          }),
        ]),
      );
      expect(readProduct).toHaveLength(1);
      expect(readProduct[0].id).toBe(productId);
    } catch (error) {
      expect(error).toBe(null);
    } finally {
      await db.end();
    }
  });

  test("update product", async () => {
    const db = await models.init();
    const context = mockContext(db);

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
    } finally {
      await db.end();
    }
  });

  test("delete product", async () => {
    const db = await models.init();
    const context = mockContext(db);

    try {
      expect(productId).toBeDefined();
      const deletedProductCount = await deleteProduct(productId, context);
      expect(deletedProductCount).toEqual(1);
    } catch (error) {
      expect(error).toBe(null);
    } finally {
      await db.end();
    }
  });

});

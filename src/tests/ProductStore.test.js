import env from '../../env.json';
import models from '../models';
import { mockContext } from '../utils';
import { getProduct, createProduct, updateProduct, deleteProduct } from '../store';
import { productSchema, validateProduct, validateProducts } from './validate';

beforeAll(() => {
  process.env = {
    NODE_ENV: 'development',
    ...env,
  };
});

describe('ProductStore List tests', () => {
  let db;
  let context;

  beforeEach(async () => {
    db = await models.init();
    context = mockContext(db);
  });

  afterEach(async () => {
    await db.end();
    context = null;
  });

  test('get product list', async () => {
    const products = await getProduct(null, context);
    validateProducts(products);
  });

  test('get product list by category', async () => {
    const categoryObject = await db.Category.findOne({ where: { display_order: 0 } });

    const products = await getProduct({ categoryId: categoryObject.id }, context);
    validateProducts(products);
  });
});

describe('ProductStore CRUD tests', () => {
  let db;
  let context;
  let productId;

  beforeEach(async () => {
    db = await models.init();
    context = mockContext(db);
  });

  afterEach(async () => {
    await db.end();
    context = null;
  });

  test('create product', async () => {
    const product = {
      sku: 'A-001',
      display_name: 'Alpha Zero Zero One',
      unit_description: 'piece',
      unit_selling_price: 0.01,
    };
    const createdProduct = await createProduct(product, context);
    validateProduct(createdProduct);
    productId = createdProduct.id;
  });

  test('read product', async () => {
    expect(productId).toBeDefined();
    const readProduct = await getProduct({ id: productId }, context);
    validateProduct(readProduct);
    // expect(readProduct).toHaveLength(1);
    expect(readProduct.id).toBe(productId);
  });

  test('update product', async () => {
    expect(productId).toBeDefined();
    const updateProductObject = {
      id: productId,
      unit_selling_price: 0.02,
    };
    const updatedProductResult = await updateProduct(updateProductObject, context);
    expect(updatedProductResult).toEqual(
      expect.arrayContaining([expect.any(Number), expect.arrayContaining([productSchema])]),
    );
    expect(updatedProductResult).toHaveLength(2);
    expect(updatedProductResult[0]).toEqual(1);
    expect(updatedProductResult[1]).toHaveLength(1);
    expect(updatedProductResult[1][0].id).toEqual(productId);
    expect(updatedProductResult[1][0].unit_selling_price).toEqual(0.02);
  });

  test('delete product', async () => {
    expect(productId).toBeDefined();
    const deletedProductCount = await deleteProduct(productId, context);
    expect(deletedProductCount).toEqual(1);
  });
});

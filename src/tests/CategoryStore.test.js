import env from '../../env.json';
import models from '../models';
import { mockContext } from '../utils';
import { getCategory, createCategory, updateCategory, deleteCategory } from '../store';
import { categorySchema, validateCategory, validateCategories } from './validate';

beforeAll(() => {
  process.env = {
    NODE_ENV: 'development',
    ...env,
  };
});

describe('CategoryStore List tests', () => {
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

  test('get category list', async () => {
    const categories = await getCategory(null, context);
    validateCategories(categories);
  });

  test('get category list by product', async () => {
    const productObject = await db.Product.findOne({ where: { sku: 'NG-001' } });

    const categories = await getCategory({ productId: productObject.id }, context);
    validateCategories(categories);
  });
});

describe('CategoryStore CRUD tests', () => {
  let db;
  let context;
  let categoryId;

  beforeEach(async () => {
    db = await models.init();
    context = mockContext(db);
  });

  afterEach(async () => {
    await db.end();
    context = null;
  });

  test('create category', async () => {
    const category = {
      display_name: 'Test Category 123',
      display_order: 999,
    };
    const createdCategory = await createCategory(category, context);
    validateCategory(createdCategory);
    categoryId = createdCategory.id;
  });

  test('read category', async () => {
    expect(categoryId).toBeDefined();
    const readCategory = await getCategory({ id: categoryId }, context);
    validateCategory(readCategory);
    // expect(readCategory).toHaveLength(1);
    expect(readCategory.id).toBe(categoryId);
  });

  test('update category', async () => {
    expect(categoryId).toBeDefined();
    const updateCategoryObject = {
      id: categoryId,
      display_order: 998,
    };
    const updatedCategoryResult = await updateCategory(updateCategoryObject, context);
    expect(updatedCategoryResult).toEqual(
      expect.arrayContaining([expect.any(Number), expect.arrayContaining([categorySchema])]),
    );
    expect(updatedCategoryResult).toHaveLength(2);
    expect(updatedCategoryResult[0]).toEqual(1);
    expect(updatedCategoryResult[1]).toHaveLength(1);
    expect(updatedCategoryResult[1][0].id).toEqual(categoryId);
    expect(updatedCategoryResult[1][0].display_order).toEqual(998);
  });

  test('delete category', async () => {
    expect(categoryId).toBeDefined();
    const deletedCategoryCount = await deleteCategory(categoryId, context);
    expect(deletedCategoryCount).toEqual(1);
  });
});

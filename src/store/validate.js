const categorySchema = expect.objectContaining({
  id: expect.any(String),
  display_name: expect.any(String),
  display_order: expect.any(Number),
});

export const validateCategory = (category) => {
  expect(category).toEqual(categorySchema);
};

export const validateCategories = (categories) => {
  expect(categories).toEqual(
    expect.arrayContaining([ categorySchema ]),
  );
};

const productSchema = expect.objectContaining({
  id: expect.any(String),
  sku: expect.any(String),
  display_name: expect.any(String),
  unit_description: expect.any(String),
  unit_selling_price: expect.any(String), // JSON doesn't support float as a data type
});

export const validateProduct = (product) => {
  expect(product).toEqual(productSchema);
};

export const validateProducts = (products) => {
 expect(products).toEqual(
   expect.arrayContaining([ productSchema ]),
 );
};

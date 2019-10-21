import { development_db_conn_str } from "../env.json";
import pg from "../bin/models";
import { mockContext } from "../bin/utils";
import { getCategory } from "../bin/store";

beforeAll(() => {
  process.env.NODE_ENV = "development";
  process.env.development_db_conn_str = development_db_conn_str;
});

test("get category list", async () => {
  const db = pg.initClient();
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
    await pg.disconnect();
  }
});

import { createConnection } from "typeorm";
import { Category, CategoryType } from "../../domain/entity/Category";
import { CategoryService } from "../../services/CategoryService";
import { User } from "../../domain/entity/User";
import { UserService } from "../../services/UserService";
import faker from "faker";
import { debugLogger } from "../../utils/log";

describe("CategoryService", () => {
  let categoryService: CategoryService;
  let user: User;
  beforeAll(async (done) => {
    await createConnection("default");
    const userService = new UserService();
    const result = await userService.create({
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    if (!result) throw new Error();
    user = result;
    categoryService = new CategoryService(user);
    done();
  });

  beforeEach(async (done) => {
    jest.useFakeTimers();
    done();
  });

  it("should create an category", async (done) => {
    const result = await categoryService.create({
      name: faker.lorem.word(),
      type: CategoryType.DEFAULT,
      owner: user,
    });
    expect(result).not.toBeFalsy();
    done();
  });

  it("should find all categories", async (done) => {
    const result = await categoryService.findAll({
      page: 1,
      pageSize: 10,
      categoryType: CategoryType.DEFAULT,
    });
    expect(result[0]).not.toBeUndefined();
    expect(typeof result[1]).toBe("number");
    done();
  });

  it("should create and find the category", async (done) => {
    const created = await categoryService.create({
      name: faker.lorem.word(),
      type: CategoryType.DEFAULT,
      owner: user,
    });
    if (!created) throw new Error();
    const result = await categoryService.findById(created.category_id);
    expect(result).not.toBeUndefined();
    done();
  });

  it("should create and update the category", async (done) => {
    const created = await categoryService.create({
      name: faker.lorem.word(),
      type: CategoryType.DEFAULT,
      owner: user,
    });
    if (!created) throw new Error();
    const result = await categoryService.updateById(created.category_id, {
      name: faker.lorem.word(),
    });
    expect(result).not.toBeUndefined();
    debugLogger.debug(result);
    done();
  });

  it("should create and delete the category", async (done) => {
    const created = await categoryService.create({
      name: faker.lorem.word(),
      type: CategoryType.DEFAULT,
      owner: user,
    });
    if (!created) throw new Error();
    const result = await categoryService.deleteById(created.category_id);
    expect(result).not.toBeUndefined();
    debugLogger.debug(result);
    done();
  });
});

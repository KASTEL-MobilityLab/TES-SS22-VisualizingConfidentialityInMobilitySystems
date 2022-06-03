import { expect, it } from "vitest";
import { User } from "./../dataFields/User";
import { DataLoader, loadTransform, readJsonFile } from "./../DataLoader";

const firstUser = new User(
  "U01",
  "Theo",
  "Schweitzer",
  "02256708826",
  "theo.schweitzer@gmail.com"
);

it("test read json file with fs", async () => {
  const users: Record<string, unknown>[] = await readJsonFile(
    "src/data/users.json"
  );
  expect(users[0]).toMatchObject({
    email: "theo.schweitzer@gmail.com",
    forename: "Theo",
    id: "U01",
    phoneNumber: "02256708826",
    surname: "Schweitzer",
  });
});

it("test loadTransform user", async () => {
  const users: User[] = await loadTransform<User>(User, "src/data/users.json");

  expect(users[0]).toBeInstanceOf(User);
  expect(users[0]).toEqual(firstUser);
});

it("test DataLoader::loadUser", async () => {
  const users: User[] = await new DataLoader().loadUsers();

  expect(users[0]).toBeInstanceOf(User);
  expect(users[0]).toEqual(firstUser);
});

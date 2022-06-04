import { describe, expect, it } from "vitest";
import { DataLoader } from "../DataLoader";
import { Company } from "./../dataFields/Company";

describe("Loading Companies from JSON", () => {
  const dl = new DataLoader();
  const firstCompany = new Company("C01", "Fire Runner");

  it("test load all companies", () => {
    const companies: Company[] = dl.loadAllCompanies();
    const loadedCompany = companies[0];
    expect(loadedCompany).toBeInstanceOf(Company);
    expect(loadedCompany).toEqual(firstCompany);
  });
});

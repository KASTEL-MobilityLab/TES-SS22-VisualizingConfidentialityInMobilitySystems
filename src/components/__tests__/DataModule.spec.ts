import DataModule from "@/components/DataModule.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(DataModule, { props: { dataField: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});

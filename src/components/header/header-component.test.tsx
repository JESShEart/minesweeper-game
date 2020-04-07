import { h } from "preact";
import { shallow } from "enzyme";
import { ReactElement } from "react";
import { HeaderComponent } from "./header-component";

describe("HeaderComponent", () => {
    test("should render header and 2 nav items", () => {
        const wrapper = shallow((<HeaderComponent />) as ReactElement);
        expect(wrapper.find("h1").text()).toBe("Mine Sweeper Game");
        expect(wrapper.find("Link").length).toBe(2);
    });
});

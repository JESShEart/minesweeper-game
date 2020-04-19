import { shallow, ShallowWrapper } from "enzyme";
import { h } from "preact";
import { ReactElement } from "react";
import { StatLineComponent } from "./stat-line-component";
import * as style from "./stat-line-component.css";

describe("StatLineComponent", function() {
    let wrapper: ShallowWrapper;

    function setup(label: string, value: string | number): void {
        wrapper = shallow(
            (<StatLineComponent label={label} value={value} />) as ReactElement
        );
    }

    test("should render with string value", function() {
        setup("FOO", "BAR");
        expect(wrapper.find(`.${style.label}`).text()).toBe("FOO");
        expect(wrapper.find(`.${style.value}`).text()).toBe("BAR");
        expect(wrapper.find(`.${style.line}`).text()).toBe("FOOBAR");
    });

    test("should render with number value", function() {
        setup("BAZ", 1);
        expect(wrapper.find(`.${style.label}`).text()).toBe("BAZ");
        expect(wrapper.find(`.${style.value}`).text()).toBe("1");
        expect(wrapper.find(`.${style.line}`).text()).toBe("BAZ1");
    });
});

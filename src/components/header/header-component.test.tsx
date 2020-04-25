/// <reference types="enzyme-adapter-preact-pure" />
import { h } from "preact";
import { shallow, ShallowWrapper } from "enzyme";
import { HeaderComponent } from "./header-component";
import { statsRouteProps } from "../stats/stats-route-props";
import { RouteProps } from "../route-props";
import { minesweeperRouteProps } from "../minesweeper/minesweeper-route-props";
import * as style from "./header-component.css";

describe("HeaderComponent", () => {
    let wrapper: ShallowWrapper<h.JSX.Element>;

    beforeEach(function() {
        wrapper = shallow(<HeaderComponent />);
    });

    test("should render header and 2 nav items", function() {
        expect(wrapper.find("h1").text()).toBe("Minesweeper Game");
        expect(wrapper.find("Link").length).toBe(2);
    });

    test("should render both links with their route props", function() {
        function expectRoute(routeProps: RouteProps): void {
            const foundLink = wrapper
                .find("Link")
                .filterWhere(
                    item =>
                        item.prop("activeClassName") === style.active &&
                        item.prop("href") === routeProps.path &&
                        item.props().children === routeProps.title
                );
            expect(foundLink.length).toBe(1);
        }

        expectRoute(minesweeperRouteProps);
        expectRoute(statsRouteProps);
    });
});

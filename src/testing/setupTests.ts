/// <reference types="enzyme-adapter-preact-pure" />

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-preact-pure/build/src";

Enzyme.configure({ adapter: new Adapter() });

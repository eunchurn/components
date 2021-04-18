import React from "react";
import { shallow, mount } from "enzyme";
import { render } from "@testing-library/react";
import { defaultExelbidData } from "../defaultProps";
import { Exelbid } from "../Exelbid";

describe("<Exelbid />", () => {
  it("with shallow", () => {
    shallow(<Exelbid {...defaultExelbidData} />);
  });
  it("with mount", () => {
    mount(<Exelbid {...defaultExelbidData} />);
  });
  it("match snapshot", () => {
    expect(render(<Exelbid {...defaultExelbidData} />)).toMatchSnapshot();
  });
});

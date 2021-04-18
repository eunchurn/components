import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
process.env.TZ = "Asia/Seoul";
configure({ adapter: new Adapter() });
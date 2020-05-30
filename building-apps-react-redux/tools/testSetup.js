import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

//to configures enzyme to work with react 16,as newer versions of react are released you will use the corresponding adapter for that version,we need to tell jest to call this adapter

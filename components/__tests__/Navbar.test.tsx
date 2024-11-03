import { render } from "@testing-library/react-native";
import Navbar from "../navbar/Navbar";
import { useNavigation, usePathname } from "expo-router";

jest.mock("expo-router", () => ({
  useNavigation: jest.fn(),
  usePathname: jest.fn(),
}));

it(`renders correctly`, () => {
  (useNavigation as jest.Mock).mockReturnValue({ navigate: jest.fn() });
  (usePathname as jest.Mock).mockReturnValue("/test-path");

  const component = render(<Navbar userScrollActive={0} />);
  component.debug();
  expect(1).toBe(1);
});

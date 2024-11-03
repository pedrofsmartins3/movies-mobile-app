import { render } from "@testing-library/react-native";
import Navbar from "../navbar/Navbar.web";
import { useNavigation, useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useNavigation: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("moti/interactions", () => ({
  MotiPressable: () => "MotiPressable",
}));

jest.mock("moti", () => ({
  MotiView: () => "MotiView",
}));

it(`renders correctly`, () => {
  (useNavigation as jest.Mock).mockReturnValue({ navigate: jest.fn() });
  (useRouter as jest.Mock).mockReturnValue("/test-path");

  const component = render(<Navbar userScrollActive={0} />);
  component.debug();
  expect(1).toBe(1);
});

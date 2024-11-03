import { render } from "@testing-library/react-native";
import Navbar from "../navbar/Navbar";

jest.mock("moti", () => ({ Skeleton: () => "Skeleton" }));
jest.mock("moti", () => ({ MotiPressable: () => "MotiPressable" }));
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: () => "LinearGradient",
}));
jest.mock("expo-router", () => ({
  useNavigation: () => "useNavigation",
}));
jest.mock("expo-router", () => ({
  usePathname: () => "usePathname",
}));

it(`renders correctly`, () => {
  const component = render(<Navbar userScrollActive={0} />);
  component.debug();
  expect(1).toBe(1);
});

// it(`renders correctly`, () => {
//   const component = render(
//     <Button
//       title="Title1"
//       variant="Variant1"
//       color="Color1"
//       onPress={() => {}}
//     />
//   );
//   component.debug();
//   expect(1).toBe(1);
// });

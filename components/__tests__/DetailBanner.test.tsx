import { render } from "@testing-library/react-native";
import Logo from "../logo/Logo";

jest.mock("moti", () => ({ Skeleton: () => "Skeleton" }));
jest.mock("moti", () => ({ MotiPressable: () => "MotiPressable" }));
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: () => "LinearGradient",
}));

it(`renders correctly`, () => {
  const component = render(<Logo />);
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

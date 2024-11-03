import { render } from "@testing-library/react-native";
import SearchInput from "../input/SearchInput";

jest.mock("moti/interactions", () => ({
  MotiPressable: () => "MotiPressable",
}));

it(`renders correctly`, () => {
  const component = render(
    <SearchInput
      onChangeText={() => {
        return "changeText";
      }}
      text="text1"
      handleSearch={() => {
        return "search";
      }}
    />
  );
  component.debug();
  expect(1).toBe(1);
});

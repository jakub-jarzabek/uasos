import { SelectItem } from "./style";
import { Text, ViewStyle } from "react-native";

type Props<T> = {
  value: T;
  title: string | JSX.Element;
  itemPressFunction: (value: T) => void;
  setShowOptions: (isVisible: boolean) => void;
  selected?: boolean;
  style?: ViewStyle;
  selectedStyle?: ViewStyle;
};

export function Item<T>({
  value,
  title,
  itemPressFunction,
  setShowOptions,
  selected = false,
  style,
  selectedStyle,
}: Props<T>) {
  const handleClick = () => {
    itemPressFunction(value);
    setShowOptions(false);
  };
  return (
    <SelectItem
      onPress={handleClick}
      selected={selected}
      style={[style, selected && selectedStyle]}
    >
      <Text>{title}</Text>
    </SelectItem>
  );
}

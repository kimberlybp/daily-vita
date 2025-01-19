import { TextProps } from "react-native";

export type CommonTextProps = Omit<TextProps, 'children'> & {
  children: string;
}


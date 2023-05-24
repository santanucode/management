export type InputType =
  | "text"
  | "email"
  | "password"
  | "phone"
  | "number"
  | "textarea"
  | "alpha"
  | "num"
  | "percentage"
  | "price"
  | "date"
  | "Edate"
  | "website"
  | "uanno"
  | "unionno"
  | "datetime-local";

export interface InputProps {
  onChangeText: (e: any) => void;
  type?: InputType;
  placeholder?: string;
  Value?: any;
  Required?: boolean;
  CustomErrorLine?: string;
  label?: string;
  hidden?: boolean;
  isError?: boolean;
  isEffective?: any;
}

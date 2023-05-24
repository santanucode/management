export type InputType = 'text' | 'email' | 'password' | 'phone' | 'number' | 'textarea' | 'alpha' | 'num' | 'percentage' | 'price' | 'date' | 'website';


export interface InputProps {
    onChangeText: (e: any) => void,
    type: InputType,
    placeholder: string,
    Value: string,
    Required: boolean,
    CustomErrorLine: string,
    label: string
}
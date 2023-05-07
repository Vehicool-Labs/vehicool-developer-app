import { FieldValues, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

export type RegisterFunction = <TName>(name: TName, options?: RegisterOptions<FieldValues, TName & string> | undefined) => UseFormRegisterReturn<TName & string>;
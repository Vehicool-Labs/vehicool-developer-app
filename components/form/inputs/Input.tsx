import { FC, InputHTMLAttributes } from 'react';

import { RegisterFunction } from '../input.types';

type InputProperties = {
	label?: string;
	labelClassName?: string;
	inputClassName?: string;
	register: ReturnType<RegisterFunction>;
	error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProperties> = ({ label = '', labelClassName = '', inputClassName = '', register, error, ...rest }) => {

	return (
		<label className={ `mb-4 flex flex-col gap-1 ${ labelClassName }` }>
			{ label }
			<input
				className={ `border-[1px] rounded-md focus:outline-none p-2 ${ error ? 'border-red-500' : 'border-gray-300' } focus:border-blue-500 ${ inputClassName }` }
				{ ...register }
				{ ...rest }
			/>
			{ error ? <p className="text-red-500 text-sm">{ error }</p> : null }
		</label>
	);
};

export default Input;
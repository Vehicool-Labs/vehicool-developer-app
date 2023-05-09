import { ButtonHTMLAttributes, FC } from 'react';

type ButtonProperties = { } & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonVariants = {
	Primary: FC<ButtonProperties>;
	Danger: FC<ButtonProperties>;
}

const Button: FC<ButtonProperties> & ButtonVariants = ({ className = '', ...rest }) => {

	return (
		<button
			className={ `rounded-md px-4 py-2 cursor-pointer flex gap-2 justify-center items-center ${ className }` }
			type="submit"
			{ ...rest }
		/>
	);
};

const ButtonPrimary: FC<ButtonProperties> = ({ className = '', ...rest }: ButtonProperties) => (
	<Button
		className={ `bg-blue-500 hover:bg-blue-600 text-white disabled:hover:bg-blue-500 disabled:opacity-60 disabled:cursor-default ${ className }` }
		{ ...rest }
	/>
);

const ButtonDanger: FC<ButtonProperties> = ({ className = '', ...rest }: ButtonProperties) => (
	<Button
		className={ `bg-red-500 hover:bg-red-600 text-white disabled:hover:bg-red-500 disabled:opacity-60 disabled:cursor-default ${ className }` }
		{ ...rest }
	/>
);

Button.Primary = ButtonPrimary;
Button.Danger = ButtonDanger;

export default Button;
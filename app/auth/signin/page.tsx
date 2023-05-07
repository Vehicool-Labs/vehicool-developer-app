import Link from 'next/link';

const SigninPage = () => {

	return (
		<div className="h-full flex justify-center items-center">
			<div className="drop-shadow bg-white p-6 rounded-md w-96">
				<h2 className="text-xl text-blue-500 font-medium">Vehicool</h2>
				<h1 className="text-2xl text-blue-500 font-bold">Sign in</h1>
				<div className="border-b-[1px] border-blue-500 my-6"></div>
				<div className="mb-4 flex flex-col gap-1">
					<label htmlFor="email">Email</label>
					<input
						className="border-[1px] rounded-md border-gray-300 p-2"
						id="email"
						type="email"
					/>
				</div>
				<div className="mb-4 flex flex-col gap-1">
					<label htmlFor="password">Password</label>
					<input
						className="border-[1px] rounded-md border-gray-300 p-2"
						id="password"
						type="password"
					/>
				</div>
				<div className="flex flex-col gap-4 items-center">
					<button
						className="bg-blue-500 hover:bg-blue-600 rounded-md text-white px-4 py-2 cursor-pointer"
						type="submit"
					>
						Sign in
					</button>
					<Link
						className="text-blue-500 hover:text-blue-600 cursor-pointer"
						href="/auth/signup"
					>Create an account
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SigninPage;
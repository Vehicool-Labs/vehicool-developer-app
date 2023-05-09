import { NextResponse } from 'next/server';

export const sendError = (error: any) => {
	const errorObj = {
		...error,
		status: error?.status || 500,
	};
	return NextResponse.json(errorObj, { status: errorObj.status });
};

export const buildError = ({ message, status }: { message: string, status?: number }) => {
	return {
		message,
		status,
	};
};
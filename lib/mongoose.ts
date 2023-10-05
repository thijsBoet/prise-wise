import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URI) {
		console.error('MONGODB_URI is not defined');
	}

	if (isConnected) {
		console.log('=> using existing MongoDB database connection');
		return Promise.resolve();
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI as string);

		isConnected = true;

		console.log('=> using new MongoDB database connection');
	} catch (error: any) {
		console.log(
			'=> an error occurred when connecting to the database',
			error.message,
		);
	}
};
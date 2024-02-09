import mongoose from 'mongoose';

export class DatabaseConnection {
  public static async connect(): Promise<void> {
    try {
      if (!process.env.MONGODB_URL) {
        throw new Error('MONGODB_URL not found');
      }
      await mongoose.connect(process.env.MONGODB_URL);
      console.log('Successfully connected to search service database');
    } catch (e) {
      console.log(e, 'Mongodb connection failed');
    }
  }
}

'use server'
import clientPromise from '../../database/mongodb';

export async function save(json: any) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await clientPromise;
            const db = client.db('bridge');
            const transactionExist = await db
            .collection('transactions')
            .find({
                hash: json.hash,
            })
            .toArray();
            if (!transactionExist.length) {
                await db.collection('transactions').insertOne(json);
            }
            resolve(json);
        } catch (error) {
            reject(error);    
        }
      });
}
/* eslint-disable no-undef */
import { Db, MongoClient, ObjectId } from 'mongodb'

describe('DB', () => {
    let connection: MongoClient
    let db: Db

    beforeAll(async () => {
        const mongoUrl = process.env.MONGO_URL as string
        connection = await MongoClient.connect(mongoUrl)
        db = connection.db()
    })

    beforeEach(async () => {
        await db.collection('users').deleteMany({})
    })
      
    afterAll(async () => {
        await connection.close()
    })

    it('should insert a doc into collection', async () => {
        const users = db.collection('users')
        const newObjectId = new ObjectId()
        const mockUser = { _id: newObjectId, name: 'John' }
        await users.insertOne(mockUser)
          
        const insertedUser = await users.findOne({ _id: newObjectId })
        expect(insertedUser).toEqual(mockUser)
    })
})

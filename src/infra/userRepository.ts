export interface IUserRepository {
  index: () => Promise<FirebaseFirestore.DocumentData[] | undefined>
  findById: (userId: string) => Promise<FirebaseFirestore.DocumentData | undefined>
}

export class UserRepository implements IUserRepository {
  constructor(
    private readonly db: FirebaseFirestore.Firestore
  ) { }

  async index() {
    const querySnapshot = await this.db.collection('users').get()
    const users = querySnapshot.docs.map(doc => doc.data())
    return users
  }

  async findById(userId: string) {
    const querySnapshot = await this.db.collection('users').doc(userId).get()
    const user = querySnapshot.data()
    return user
  }
}

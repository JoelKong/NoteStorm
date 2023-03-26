import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },

  callbacks: {
    async session(session, token) {
      if (!session) return null;
      // const client = await MongoClient.connect(process.env.MONGODB_URI);
      // const db = client.db();
      // const collection = db.collection("user");
      // console.log(session);
      // // const userData = await collection.findOne({ id: session.token.sub });
      // // if (userData) {
      // //   session.session.user.currentBalance = userData.currentBalance;
      // //   session.session.user.id = userData.id;
      // // }
      // client.close();
      return session;
    },

    async signIn(user) {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();
      const collection = db.collection("user");
      if (await collection.findOne({ id: user.user.id })) {
        client.close();
        return true;
      } else {
        await collection.updateOne(
          { id: user.user.id },
          {
            $set: {
              id: user.user.id,
              email: user.user.email,
              name: user.user.name,
              image: user.user.image,
            },
          },
          { upsert: true }
        );
        client.close();
        return true;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

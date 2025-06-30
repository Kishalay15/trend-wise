import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

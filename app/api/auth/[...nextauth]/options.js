// import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
const baseURL = process.env.BASE_URL 

export const options = {
    providers: [
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "#2F2E2E", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log("user", user, "account", account, "profile", profile);
            const randomNumber = Math.floor(Math.random() * 1000); 
            const newUser = {
                name: user.name,
                email: user.email,
                authImageUrl: user.image,
                oAuthId: user.id,
                slug: `${user.name.toLowerCase().replace(/ /g, '-')}-${randomNumber}`
              };
              const response = await fetch(`${baseURL}/user/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
              });
              // const data = await response.json();
              if (response.status === 201) {
                return true;
              }
        },
        async session({ session }) {
            const response = await fetch(`${baseURL}/user/email/${session.user.email}`, { method: 'GET' });
              const data = await response.json();
              session.user._id = data[0]._id;
              session.user.slug = data[0].slug;
            return session
        }
    }
} 
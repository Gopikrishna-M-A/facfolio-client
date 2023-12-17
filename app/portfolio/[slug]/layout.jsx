import Navbar from "../../../components/PublicNavbar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, params }) {
 
  return (
    <html lang="en">
      <body>
        <Navbar slug={params.slug}/>
        <div className="page">{children}</div>
      </body>
    </html>
  );
}
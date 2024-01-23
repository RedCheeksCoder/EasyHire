import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import Head from "next/head";
export const metadata = {
  title: "Easy Hire",
  description: "Simplifying Job search and connecting people.",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <Provider>
          <div className="main"></div>
          <main className="app">
            {" "}
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import toast, { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Lakbay PH",
  description: "Live like in your own home. Booking cheaper than hotels.",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
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

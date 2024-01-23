import Feed from "@components/Feed";
import "@styles/globals.css";

export const metadata = {
  title: "EasyHire",
  description: "Simplifying Job search and connecting people",
};

function Home() {
  return (
    <section className="section_setup">
      <h1 className="head_text text-center">
        <span className="blue_gradient ">
          Simplifying <span>Job Search</span>
        </span>{" "}
        <br />
        Connecting people
      </h1>
      <p className="description text-center text-balance">
        Connecting job seekers with employers seamlessly. Simplifying job search
        and connection experience.
      </p>
      <Feed />
    </section>
  );
}

export default Home;

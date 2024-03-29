import Link from "next/link";

const Form = ({ type, jobPost, setJobPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} a job post</span>
      </h1>
      <p className="desc text-left max-w-md mt-5">
        {type} a job post to find top talents that will help you grow your
        business.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            What are you looking for?
          </span>
          <input
            value={jobPost.title}
            onChange={(e) => setJobPost({ ...jobPost, title: e.target.value })}
            type="text"
            placeholder="Title"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Give some details
          </span>

          <textarea
            value={jobPost.post}
            onChange={(e) => setJobPost({ ...jobPost, post: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            For easy finding create a tag{" "}
            <span className="font-normal">
              (#webdeveloper, #networkEngineer, #CSR, etc.)
            </span>
          </span>
          <input
            value={jobPost.tag}
            onChange={(e) => setJobPost({ ...jobPost, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex_end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="mx-2 px-8 py-2 text-sm bg-emerald-400 rounded-full text-white">
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

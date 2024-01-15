import JobPostItem from "./JobPostItem";

const Profile = ({ name, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Listings</span>
      </h1>
      <p className="mt-4 text-gray-500">These are the list of posted jobs</p>

      <div className="mt-10 prompt_layout">
        {data.map((jobPost) => (
          <JobPostItem
            key={jobPost._id}
            jobPost={jobPost}
            handleEdit={() => handleEdit && handleEdit(jobPost)}
            handleDelete={() => handleDelete && handleDelete(jobPost)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;

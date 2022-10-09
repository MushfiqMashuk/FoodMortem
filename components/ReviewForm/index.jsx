const ReviewForm = () => {
  return (
    <div>
      <form action="">
        <p>Review Title</p>
        <input type="text" placeholder="Write your title here" />
        <br />
        <textarea
          cols="30"
          rows="10"
          placeholder="Write your review here"
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;

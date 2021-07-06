const Home = () => {
  return (
    <div className="page">
      <div className="intro">
        <div className="intro-text">
          <h1>Create Your Own Portfolio Page</h1>
          <h2>Make Your Presence More Noticeable</h2>
        </div>
        <div className="intro-image">
          <img alt="" src="./images/blob2.svg" className="blob" />
        </div>
      </div>
      <h1 className="sub-heading">How to Works</h1>
      <ul className="list">
        <li>Upload your professional photograph.</li>
        <li>Add You bio and your skills.</li>
        <li>Add you work experience and projects.</li>
        <li>Get your sharable Portfolio Page ready!</li>
      </ul>
    </div>
  );
};

export default Home;

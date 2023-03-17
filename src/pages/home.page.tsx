import ListComponent from "../components/listComponent";

const Home = () => {
  return (
    <div>
      <div className="row">
        {Array(4)
          .fill(0)
          .map((value, index) => {
            return <ListComponent key={index} ListId={index} />;
          })}
      </div>
    </div>
  );
};

export default Home;

import Group from "modules/group";
import MessageBox from "modules/message-box";
import withAuth from "HOCs/withAuth";
import "./home.css";

const Home = () => {
  return (
    <div className="home-section">
      <Group className="col-des-3" />
      <MessageBox className="col-des-9" />
    </div>
  );
};

export default withAuth(Home);

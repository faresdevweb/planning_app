import "./Main.scss";
import HeaderDate from "../HeaderDate/HeaderDate";
import Events from "../Events/Events";

const Main = () => {
  return (
    <div className="main_container">
      <HeaderDate />
      <Events />
    </div>
  );
};

export default Main;

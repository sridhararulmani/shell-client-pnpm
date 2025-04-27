import { appCard } from "../../../util/mui/MUIUtils";
import "./AboutPage.min.css";

const About = () => {
  return (
    <div className="d-flex flex-column p-3 gap-5" data-aos="fade">
      <div className="row">
        <div className={`${appCard}`}>
          <h2>About</h2>
        </div>
      </div>
    </div>
  );
};

export default About;

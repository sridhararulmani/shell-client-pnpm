import { appContainerStyle, dataAosAnimationForContainers, dataAosOnce } from "../../../util/AppUtils";
import { appCard } from "../../../util/mui/MUIUtils";
import "./AboutPage.min.css";

const About = () => {
  return (
    <div className={`${appContainerStyle}`} data-aos={dataAosAnimationForContainers} data-aos-once={dataAosOnce}>
      <div className="row">
        <div className={`${appCard}`}>
          <h2>About</h2>
        </div>
      </div>
    </div>
  );
};

export default About;

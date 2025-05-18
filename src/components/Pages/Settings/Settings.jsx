import {
  appContainerStyle,
  appTextWithIconStyle,
  dataAosAnimationForContainers,
  dataAosOnce,
} from "../../../util/AppUtils";
import { SettingsSuggest } from "@mui/icons-material";
import AppConstant from "../../../util/constant/AppConstant";
import { AppMUIDivider } from "../../../util/mui/MUIUtils";

const Settings = () => {
  const { AppThemeChange } = AppConstant();
  return (
    <div
      className={`d-flex flex-column ${appContainerStyle}`}
      data-aos={dataAosAnimationForContainers}
      data-aos-once={dataAosOnce}
    >
      <h3 className={`${appTextWithIconStyle} mb-3`}>
        <SettingsSuggest /> Settings
      </h3>
      <div className="row">
        {AppThemeChange().map((menu, index) => {
          return (
            <div key={menu.key}>
              <div>
                <h6 className={appTextWithIconStyle}>
                  {menu.startIcon} {menu.title}
                </h6>
                <h6>{menu.subTitle}</h6>
                <p>{menu.content}</p>
                {menu.children}
              </div>
              {index < AppThemeChange().length - 1 && <AppMUIDivider />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;

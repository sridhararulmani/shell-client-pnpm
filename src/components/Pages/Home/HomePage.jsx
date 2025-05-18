import "./HomePage.min.css";

import { useSelector } from "react-redux";
import ImageSkeleton from "../../../util/skeleton/AppImageSkeleton.jsx";
import getFileIntoBase64 from "../../../util/config/GetFileIntoBase64.jsx";
import { useState } from "react";
import { useEffect } from "react";
import AppSkeleton from "../../../util/skeleton/AppSkeleton";
import { appCard } from "../../../util/mui/MUIUtils.jsx";
import { appContainerStyle, dataAosAnimationForContainers, dataAosOnce } from "../../../util/AppUtils.jsx";

const Home = () => {
  const { TextSkeleton } = AppSkeleton();

  let user = useSelector((state) => state.user);

  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    console.log("Home rendering");
  }, []);

  useEffect(() => {
    setUserProfile(() =>
      user != null
        ? getFileIntoBase64(user.profileImage, user.profileImageType)
        : ""
    );
  }, [user]);

  return (
    <div className={`flex flex-column gap-4 ${appContainerStyle}`} data-aos={dataAosAnimationForContainers} data-aos-once={dataAosOnce}>
      <div className="row gap-4">
        <div className={`${appCard}`}>
          <h2 className="card-title">Home</h2>

          <h1 className="">Home h1</h1>
          <h2 className="">Home h2</h2>
          <h3 className="">Home h3</h3>
          <h4 className="">Home h4</h4>
          <h5 className="">Home h5</h5>
          <h6 className="">Home h6</h6>
        </div>
        <div className={`${appCard}`}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            deleniti tempore. Molestias cumque et accusamus exercitationem
            quibusdam voluptates ex eveniet debitis sit doloremque consequuntur
            accusantium fugiat magnam, odit eos doloribus eius nam fugit
            voluptatibus nisi quis labore tempora veniam. Fugiat dicta atque
            doloribus possimus deserunt. Enim quas eum corporis tempore.
          </p>
        </div>
        <div className={`${appCard}`}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            assumenda tempora porro fugit quod molestiae eius temporibus vitae
            labore nulla at nobis optio deserunt repellendus aspernatur, aperiam
            doloremque excepturi sit! Illo fugit ducimus in molestias
            recusandae. A quibusdam at quaerat, nisi et ab facere voluptatem
            animi in consequatur, deserunt sapiente adipisci debitis ipsam?
            Perferendis ullam aperiam voluptate porro dolores voluptas itaque
            assumenda voluptatem, consequatur, ducimus cum explicabo voluptatum
            aliquid vero natus doloremque, mollitia et nemo pariatur commodi!
            Magni, sapiente culpa illum enim libero facere quidem eos molestias,
            dolorem laboriosam illo voluptatem alias a quibusdam est sint
            officiis eveniet quis minima!
          </p>
        </div>
        <div className={`${appCard}`}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            assumenda tempora porro fugit quod molestiae eius temporibus vitae
            labore nulla at nobis optio deserunt repellendus aspernatur, aperiam
            doloremque excepturi sit! Illo fugit ducimus in molestias
            recusandae. A quibusdam at quaerat, nisi et ab facere voluptatem
            animi in consequatur, deserunt sapiente adipisci debitis ipsam?
            Perferendis ullam aperiam voluptate porro dolores voluptas itaque
            assumenda voluptatem, consequatur, ducimus cum explicabo voluptatum
            aliquid vero natus doloremque, mollitia et nemo pariatur commodi!
            Magni, sapiente culpa illum enim libero facere quidem eos molestias,
            dolorem laboriosam illo voluptatem alias a quibusdam est sint
            officiis eveniet quis minima!
          </p>
        </div>
        {user.userName != null && (
          <div className="card profile-card d-flex gap-3 p-0">
            <div
              className="card-img-top"
              style={{ height: "60%", overflow: "hidden" }}
            >
              <ImageSkeleton imgSrc={userProfile} altText={user.userName} />
            </div>
            <div className="card-body">
              <h2 className="card-title">
                {<TextSkeleton text={user.userName} delay={500} />}
              </h2>
              <p>{<TextSkeleton text={user.userEmail} delay={500} />}</p>
            </div>
          </div>
        )}
      </div>
      <div className="row gap-4">
        <div className={`${appCard}`}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            autem explicabo iure corporis at totam aliquid reiciendis cupiditate
            exercitationem illum voluptas soluta perspiciatis. Porro, fugiat?ஃ
          </p>
        </div>
        <div className={`${appCard}`}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            veniam natus, fugiat distinctio mollitia blanditiis ratione eaque
            fuga nemo possimus enim nihil repudiandae deserunt perspiciatis!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

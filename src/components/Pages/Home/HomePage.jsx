import AppSkeleton from "../../../util/skeleton/AppSkeleton";
import "./HomePage.min.css";

import { useSelector } from "react-redux";
import ImageSkeleton from "../../../util/skeleton/ImageSkeleton";
import getFileIntoBase64 from "../../../util/config/GetFileIntoBase64";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  let user = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState();
  const { TextSkeleton } = AppSkeleton();

  useEffect(() => {
    setUserProfile(() =>
      user != null
        ? getFileIntoBase64(user.profileImage, user.profileImageType)
        : ""
    );
  }, [user]);

  return (
    <div className="container p-3 d-flex flex-column gap-4" data-aos="fade">
      <div className="row gap-4">
        <div className="card p-5 d-flex">
          <h2 className="card-title">Home</h2>
        </div>
        <div className="card p-5 d-flex">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex assumenda
          tempora porro fugit quod molestiae eius temporibus vitae labore nulla
          at nobis optio deserunt repellendus aspernatur, aperiam doloremque
          excepturi sit! Illo fugit ducimus in molestias recusandae. A quibusdam
          at quaerat, nisi et ab facere voluptatem animi in consequatur,
          deserunt sapiente adipisci debitis ipsam? Perferendis ullam aperiam
          voluptate porro dolores voluptas itaque assumenda voluptatem,
          consequatur, ducimus cum explicabo voluptatum aliquid vero natus
          doloremque, mollitia et nemo pariatur commodi! Magni, sapiente culpa
          illum enim libero facere quidem eos molestias, dolorem laboriosam illo
          voluptatem alias a quibusdam est sint officiis eveniet quis minima!
        </div>
        <div className="card p-5 d-flex">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
          deleniti tempore. Molestias cumque et accusamus exercitationem
          quibusdam voluptates ex eveniet debitis sit doloremque consequuntur
          accusantium fugiat magnam, odit eos doloribus eius nam fugit
          voluptatibus nisi quis labore tempora veniam. Fugiat dicta atque
          doloribus possimus deserunt. Enim quas eum corporis tempore.
        </div>
        <div className="d-flex justify-content-between gap-5 p-0">
          <div className="card p-4 w-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            autem explicabo iure corporis at totam aliquid reiciendis cupiditate
            exercitationem illum voluptas soluta perspiciatis. Porro, fugiat?
          </div>
          <div className="card p-4 w-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            veniam natus, fugiat distinctio mollitia blanditiis ratione eaque
            fuga nemo possimus enim nihil repudiandae deserunt perspiciatis!
          </div>
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
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBlog, RootStore } from "../utils/TypeScript";
import CardVert from "../components/cards/CardVert";
import Loading from "../components/global/Loading";
import Helmetglobal from "../components/global/Helmetglobal";
import { getHomeBlogs } from "../redux/actions/blogAction";
import InfiniteScroll from "react-infinite-scroll-component";
import Referal from "../components/global/Referal";
import { Link } from "react-router-dom";
import Homevert from "../components/ads/Homevert";
import Aibox from "../components/global/Preferance";

const Home = () => {
  const { homeBlogs, categories, darkMode, auth } = useSelector(
    (state: RootStore) => state
  );
  //const [promo, setPromo] = useState<IBlog>()
  const { isdarkMode } = darkMode;
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeBlogs(`?page=${1}`, auth));
  }, []);
  useEffect(() => {
    setHasMore(homeBlogs.count <= homeBlogs.total);
  }, [homeBlogs]);
  const fetchMore = () => {
    dispatch(getHomeBlogs(`?page=${homeBlogs.count + 1}`, auth));
    return;
  };

  if (homeBlogs.blogs.length === 0) return <Loading />;

  return (
    <>

      <div className="home_page">

        <div className="card mb-3" style={{ maxWidth: '600px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src="https://nationaltoday.com/wp-content/uploads/2022/06/41-Holistic-Therapy-640x514.jpg" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title"><strong>Holistic Therapy Day! 26th of July</strong></h5>
                <h6 className="card-text" style={{ color: 'black' }}>Write an article on
                Holistic Therapy Day and get a chance to feature your blog on the top
                of Home with 4000 viewers every day visiting Pediageek to accumulate
          knowledge.<Link to='/login?create_blog'>Start Here</Link></h6>
              </div>
            </div>
          </div>

        </div>

        <Referal />
        <Helmetglobal
          title="Home-PediaGeek"
          description="PediaGeek is the best way to express your idea to the World."
          keyword="Home,explore,blogs,social_media"
        />
        <InfiniteScroll
          dataLength={homeBlogs.count * 8} //This is important field to render the next data
          next={fetchMore}
          hasMore={hasMore}
          loader={<Loading />}
          scrollThreshold={0.7}
          endMessage={
            <p
              style={{
                textAlign: "center",
                color: isdarkMode ? "white" : "black",
              }}
            >
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className={`home_blogs`}>
            {homeBlogs.blogs.map((blog, index) => (
              <>
                <CardVert key={index} blog={blog} />
                {index % 6 === 0 && (
                  //&& window.location.origin !== "http://localhost:3000"
                  <Homevert />
                )}
              </>
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <Aibox />
    </>
  );
};
export default Home;

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
        <div className="card mb-3" style={{ maxWidth: "600px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="https://images.thequint.com/thequint%2F2015-07%2F97be9998-56b5-4ad4-84fa-e05566f760e5%2FQ%409%20Hero%20Image.jpg?rect=0%2C0%2C960%2C540&amp;auto=format%2Ccompress&amp;fmt=webp&amp;width=720"
                className="img-fluid rounded-start"
                alt="APJ Abdul Kalam's Death Anniversary"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="badge bg-primary">On this day in India History</p>
                <h5 className="card-title">
                  <strong>APJ Abdul Kalam's Death Anniversary ! 27th July</strong>
                </h5>
                <h6 className="card-text" style={{ color: "black" }}>

                  Some of the brightest minds in the country can be found on the
                  last benches of the classroom. — Dr APJ Abdul Kalam.
                  <Link to="/login?create_blog">Create Post</Link>
                </h6>
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

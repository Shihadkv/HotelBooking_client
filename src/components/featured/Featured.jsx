import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

  const {data,loading, error} = useFetch("/hotels/countBycity?cities=china,america,russia")

  return (
    <div className="featured">
     { loading ?("loading please wait ") :(  <><div className="featuredItem">
        <img
          src="https://toim.b-cdn.net/pictures/tourintro/kerala-with-exotic-goa-938.jpeg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Munnar</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://www.holidify.com/images/bgImages/KOCHI.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Kochi</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Kochi_Skyline.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ernakulam</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div></>)}
    </div>
  );
};

export default Featured;

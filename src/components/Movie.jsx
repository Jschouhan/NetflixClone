import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../utils/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { user } = UserAuth();
  const movieID =
    db && user?.email ? doc(db, 'users', `${user.email}`) : null;
  const saveShow = async () => {
    if (user?.email && movieID) {
      setLike(!like);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert('Please login to save a movie');
    }
  };
  return (
    <>
      <div
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
        onClick={() => setShowDetails(true)}
      >
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            {item?.title}
          </p>
          <p
            onClick={(event) => {
              event.stopPropagation();
              saveShow();
            }}
          >
            {like ? (
              <FaHeart className=" text-2xl absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart className="text-2xl absolute top-4 left-4 text-red-500 " />
            )}
          </p>
        </div>
      </div>
      {showDetails && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="relative max-w-2xl overflow-hidden rounded bg-gray-900 text-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="absolute right-3 top-2 z-10 text-2xl text-white"
              onClick={() => setShowDetails(false)}
              aria-label="Close movie details"
            >
              &times;
            </button>
            <img
              className="max-h-80 w-full object-cover"
              src={`https://image.tmdb.org/t/p/w780/${item?.backdrop_path}`}
              alt={item?.title}
            />
            <div className="p-5">
              <h2 className="text-2xl font-bold">{item?.title}</h2>
              <p className="mt-2 text-sm text-gray-300">
                Released: {item?.release_date || 'Unknown'}
              </p>
              <p className="mt-4 text-gray-200">
                {item?.overview || 'No description available.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;

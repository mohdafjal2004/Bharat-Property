import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchListing = async () => {
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      };
      fetchListing();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [listingId]);
  return (
    <main>
      {loading && <p className="text-center mt-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center mt-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  alt="listing_images"
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className=" flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} -{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}{" "}
              {listing.type === "rent" && "/month"}
            </p>
            {/*  */}
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <div className="text-slate-800 ">
              <p>
                {" "}
                <span className="font-semibold text-black">
                  Description - {"  "}
                </span>{" "}
                {listing.description}
              </p>
              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBed className="text-lg " />
                  {listing.bedRooms > 1
                    ? `${listing.bedRooms} beds`
                    : `${listing.bedRooms} bed`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-lg " />
                  {listing.bathRooms > 1
                    ? `${listing.bathRooms} baths`
                    : `${listing.bathRooms} bath`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg " />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg " />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;

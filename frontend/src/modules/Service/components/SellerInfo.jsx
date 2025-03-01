import {
  StarIcon,
} from "@heroicons/react/24/solid";


const SellerInfo = ({ name, reviews, rating }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="seller-picture w-20 h-20">
        <img
          src="https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/ebb73a001fd32840ca44de2e5f38bb85-1586882167229/b3333077-c23c-4099-a259-d6793a2e269d.jpg"
          alt="seller-picture"
          className="w-full h-full rounded-full object-cover border-2 border-white shadow-md"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-800">{name}</h1>
        <div className="flex items-center gap-2">
          <div className="inline-flex">
            {Array.from({ length: rating }, (_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-600">
            {rating}.0 <span>({reviews} reviews)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;

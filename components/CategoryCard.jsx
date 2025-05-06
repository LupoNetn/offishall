import { FaLaptop, FaTshirt, FaBook } from 'react-icons/fa';

const CategoryCard = ({ category , index}) => {
  // Choose the right icon based on the category
  let icon;
  switch (index) {
    case 0:
      icon = <FaLaptop className="text-3xl text-orange-500" />;
      break;
    case 1:
      icon = <FaTshirt className="text-3xl text-orange-500" />;
      break;
    case 2:
      icon = <FaBook className="text-3xl text-orange-500" />;
      break;
    default:
      icon = <FaLaptop className="text-3xl text-orange-500" />;
  }
  

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden p-4">
      <div className="flex justify-center items-center bg-gray-800 h-32">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-100 mt-3">{category}</h3>
      <p className="text-sm text-gray-400">shop now</p>
    </div>
  );
};

export default CategoryCard;

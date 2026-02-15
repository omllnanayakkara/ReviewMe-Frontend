/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa6";

const RatingStart = ({rating}) => {
    const maxLength = 5;
  return (
    
    <div className="flex">
        {
            Array.from({length:maxLength}, (_,index)=>(
                <FaStar key={index} size={14} className={index < rating ? `text-yellow-500`: `text-indigo-200`} />
            ))
        }
    </div>
  )
}

export default RatingStart
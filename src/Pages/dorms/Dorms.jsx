import React from 'react'
import roomimage1 from "../../Components/images/dorms/roomphoto1.jpg";
const rooms = [
       {
         id: 1,
         img: roomimage1,
         title: "Single Room",
         description: "Room description",
         pricingText: "100 dollar",
         features: ["Free Wifi", "Free breakfast"],
         clickEvent: "sliderClick",
       },
       {
         id: 2,
         img: roomimage1,
         title: "Double Room",
         description: "Room description",
         pricingText: "100 dollar",
         features: ["Free Wifi", "Free breakfast"],
         clickEvent: "sliderClick",
       },
       {
         id: 3,
         img: roomimage1,
         title: "Suit",
         description: "Room description",
         pricingText: "100 dollar",
         features: ["Free Wifi", "Free breakfast"],
         clickEvent: "sliderClick",
       },
       {
         id: 4,
         img: roomimage1,
         title: "King Suit",
         description: "Room description",
         pricingText: "100 dollar",
         features: ["Free Wifi", "Free breakfast"],
         clickEvent: "sliderClick",
       },
     ];
const Dorms = () => {
  return (
    <div>
      <button 
      key={rooms.id}
      > Dorms </button>
    </div>
  )
}

export default Dorms

// import React from 'react';
// import Aside from "../components/Aside";

// function Favorites () {
//     return (
//     <div>
//         <Aside></Aside>
//     </div>);
// }

// export default Favorites;

import React from "react";
import CategoryFilter, { Category } from "../components/CategoryFilter";

function Favorites() {
  function handleChange(e: React.ChangeEvent, index: number) {
    console.log(e, index);
  }

  var categorys: Category[] = [
    {name:"Hello", selected:false},
    {name:"World", selected:false},
    {name:"test", selected:false},
    {name:"temp", selected:false},
  ]


  return (
    <CategoryFilter items={categorys} onChange={handleChange}></CategoryFilter>
  );
}

export default Favorites;

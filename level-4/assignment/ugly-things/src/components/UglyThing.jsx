import React, { useContext } from "react";
import Edit from "./Edit";
import { UglyContext } from "../uglyContext";

export default function UglyThing() {
  const { uglyList, deleteUglyItem } = useContext(UglyContext);

  const listElements = uglyList.map((item) => (
    <div className="list-div" key={item._id}>
      <div >
      {item.value === false &&   <div className="list-info-div">
        <h1 className="ugly-title">{item.title}</h1>
        <h1 className="ugly-description">{item.description}</h1>
       <img className="ugly-img" src={item.imgUrl} /></div>}
        <Edit item={item} />
      </div>
     
    </div>
  ));

  return <>{listElements}</>;
}

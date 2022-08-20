/*@author: Peace Cyebukayire
 * created: 19th Aug 2022*/

import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { DataItem } from "../../component/dataItem";
import Navbar from "../../component/Navbar";
import { getData } from "../../services/data";
import { useNavigate } from "react-router-dom";
const DataTable = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  useEffect(() => {
    const usertype = localStorage.getItem("usertype");
    console.log(usertype);
    usertype.toLocaleLowerCase()
    if(usertype != null){
    getData(usertype)
      .then((res) => {
        setItems(res.data);
      })
      .catch((e) => {
        console.error(e);
      });}
  }, []);
  console.log("items: ", items);
  return (
    <>
    <Navbar/>
      {items && (
        <div className="data">
          {items && localStorage.getItem("usertype")=="admin" ? (
            Object.keys(items.data).map((key, index) => {
              return (
                <DataItem key={index} data={items.data[key]} title={key} />
              );
            })
          ) : (
            <DataItem data={items?.data} title={items?.title} />
          )}
        </div>
      )}
    </>
  );
};

export default DataTable;

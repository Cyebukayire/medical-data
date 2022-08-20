import React, { useState } from "react";
import { useEffect } from "react";
import { DataItem } from "../../component/dataItem";
import { getData } from "../../services/data";

const DataTable = () => {
  const [items, setItems] = useState(null);
  useEffect(() => {
    const usertype = localStorage.getItem("usertype");
    console.log(usertype);
    getData(usertype)
      .then((res) => {
        setItems(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  console.log("items: ", items);
  return (
    <>
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

import React, { useState } from "react";
import { useEffect } from "react";
import { DataItem } from "../../component/dataItem";
import { getData } from "../../services/data";

const DataTable = () => {
  const [items, setItems] = useState(null);
  useEffect(()=>{
    getData(localStorage.getItem("usertype"))
    .then((res)=>{
      setItems(res.data)
    })
    .catch((e)=>{
      console.error(e)
    })
  },[])
    return(
      <>
      <div>
        {items && Object.keys(items.data).length > 1 ? ( 
          Object.keys(items.data).map((key, index) => (
            <DataItem
              key={index}
              data={items.data[key]}
              title={key}
            />
          ))
        ) : (
          <DataItem data={items?.data} title={items?.title} />
        )}
      </div>
    </>
    )
    
}

export default DataTable;
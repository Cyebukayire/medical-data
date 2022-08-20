import "../styles/common.css";
export function DataItem({ data, title }) {
  console.log("data: ", data);
  return (
    <div className="data-container">
      {data && (
        <>
          <table>
            <caption>{title}</caption>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key, index) => (
                  <th key={index}>{data[0][key]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => {
                if (index == 0) return null;
                return (
                  <tr key={index}>
                    {Object.keys(obj).map((key, index) => (
                      <td key={index}>{obj[key]}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

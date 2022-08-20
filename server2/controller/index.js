/* @author Peace
   created: 19th Aug 2022*/

const { data } = require("../util/data");
const Data = (req, res) => {
  switch (req.body.usertype) {
    case "admin":
      return res.status(200).json({ success: true, data: data() });
    case "patient":
      return res.send({
        data: data()["Patient illnesses 2000 - 2002"],
        title: "Patient illnesses 2000 - 2002",
      });
    case "pharmacist":
      return res.send({
        data: data()["Most bough drugs 2000 - 2002"],
        title: "Most bough drugs 2000 - 2002",
      });
    case "physician":
      return res.send({
        data: data()["Physicians missions 2000 - 2002"],
        title: "Physicians missions 2000 - 2002",
      });
    default:
      console.log("USER TYPE DOES NOT EXIST");
      break;
  }
};
module.exports.Data = Data;

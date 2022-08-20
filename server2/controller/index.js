const { data } = require("../services/data");

const Data = (req, res) => {
  const usertype = req.body.usertype;
  console.log(data());
  if (usertype === "admin") {
    return res.status(200).json({ success: true, data: data() });
  } else if (usertype === "patient") {
    return res.send({
      data: data()["Patient illnesses 2000 - 2002"],
      title: "Patient illnesses 2000 - 2002",
    });
  } else if (usertype === "pharmacist") {
    return res.send({
      data: data()["Most bough drugs 2000 - 2002"],
      title: "Most bough drugs 2000 - 2002",
    });
  } else if (usertype === "physician") {
    return res.send({
      data: data()["Physicians missions 2000 - 2002"],
      title: "Physicians missions 2000 - 2002",
    });
  } else {
    console.log("USER TYPE DOES NOT EXIST");
  }
};

module.exports.Data = Data;

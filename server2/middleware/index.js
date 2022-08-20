const isUserAuthenicated = (req, res, next) => {
    const usertype = req.body.usertype
    if(usertype == 'admin' || usertype == 'patient' || usertype == 'pharmacist' || usertype == 'physician'){
       next()}
    else{return res.send({message:"Unauthorized"}) }}
 module.exports.isUserAuthenicated = isUserAuthenicated;
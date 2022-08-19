import { medicalInfo } from "../services/data"

export const medicalData = (req, res) => {
    const userType = req.body.userType
    userType.toLowerCase()

    if(userType === 'admin'){
        return res.send({data: medicalInfo()})
    }else if(userType === 'patient'){
        return res.send({data: medicalInfo()["Patient illnesses 2000 - 2002"], title: "Patient illnesses 2000 - 2002"})
    }else if(userType === 'pharmacist'){
        // pharmacist
        return res.send({data: medicalInfo()["Most bough drugs 2000 - 2002"], title: "Most bough drugs 2000 - 2002" })
    }else if( userType === 'physician'){
        // physician records
        return res.send({data: medicalInfo()["Physicians missions 2000 - 2002"], title: "Physicians missions 2000 - 2002"})
    }
}
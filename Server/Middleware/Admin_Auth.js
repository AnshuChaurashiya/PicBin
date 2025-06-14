module.exports.AdminMideleware = (req, res, nex) => {
    if(!req.user){
        return res.status(401).send({message: "You are not Not authenticated"})
    }

    if(req.res.role !== "admin"){
        return res.status(403).send({message: "You are not authorized to access this resourc " })
}
next()
}
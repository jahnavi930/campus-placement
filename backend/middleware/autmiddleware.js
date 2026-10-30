import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "secretkey");

      req.user = decoded; // store user info
      next();

    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};
 const isadmin=(req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        res.status(403).json({message:"Admin access only"});
    }
};
export {isadmin};

export default protect;
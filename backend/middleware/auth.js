import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, SECRET);

            req.userId = decodedData?.id;
            req.userRole = decodedData?.role
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
            req.userRole = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
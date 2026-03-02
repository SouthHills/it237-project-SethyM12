import jwt from "jsonwebtoken";
export function checkBearerToken(sentToken, secretKey) {
    if (!sentToken) {
        return false;
    }
    try {
        const tokenParts = sentToken.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return false;
        }
        const token = tokenParts[1];
        const decoded = jwt.verify(token, secretKey);
        return !!decoded.userId;
    }
    catch (error) {
        console.error("Error verifying token: ", error);
        return false;
    }
}

import jwt from 'jsonwebtoken'
import { config } from 'src/config'
let secretKey = config.jsonwebtoken

const generateToken = (user: any) => {
	return jwt.sign({ id: user._id, email: user.email }, secretKey, {
		expiresIn: '1h'
	});
};

const verifyToken = (token: JsonWebKey) => {
	return jwt.verify(token, secretKey);
};

export default {
	generateToken,
	verifyToken
}

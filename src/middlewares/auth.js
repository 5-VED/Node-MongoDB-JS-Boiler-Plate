const jwt = require("jsonwebtoken");
const apiResponse = require('../Utils/api.response');
const messages = require("../Constants/message");
const { UserModel } = require("../Models");

const auth = ({ isTokenRequired = true, usersAllowed = [] }) => {
	return async (req, res, next) => {
		try {
			let token = (req.header('x-auth-token') || req.header('Authorization'))?.replace(/Bearer +/g, '') 

			if (isTokenRequired && !token) {				
                return apiResponse.BAD_REQUEST({                    
                    res,        
                    message: messages.TOKEN_REQUIRED
                  })				
			}

			if (!isTokenRequired && !token) return next();

			let decoded = jwt.decode(token);
			logger.info(`[DECODED] [CONTENT: ${JSON.stringify(decoded)}]`);

			if (!decoded?.id) {				
                return apiResponse.UNAUTHORIZED({                    
                    res,        
                    message: messages.INVALID_TOKEN
                  })								
			}

			const user = await UserModel.findOne({
				where: {
					id: decoded.id,
					isActive: true,
				},
				include: [{ model: RoleModel, as: 'roleData' }],
				raw: true,
				nest: true,
			});

			if (!user) {				
                return apiResponse.UNAUTHORIZED({                    
                    res,        
                    message: messages.INVALID_TOKEN
                  })												
			}

			req.user = {
				...decoded,
				// ...user,
				id: user?.id,
				role: user?.roleData?.role,
				email: user?.email,
			};

			if (req?.user?.role === ROLE.ADMIN || usersAllowed.includes('*')) {
				return next();
			}

			if (usersAllowed.includes(req?.user?.role)) return next();

            return apiResponse.UNAUTHORIZED({                    
                res,        
                message: messages.UNAUTHORIZED
              })											
		} catch (error) {
			logger.error(`[AUTH ERROR]: ${error.message}`);						
            return apiResponse.INTERNAL_SERVER_ERROR({                    
                res,        
                message: message.INTERNAL_SERVER_ERROR,
                data: error
              })								
		}
	};
};


module.exports = auth;
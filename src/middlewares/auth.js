const apiResponse = require('../Utils/api.response');
const { decodeToken } = require("../Utils/utils");
const messages = require("../Constants/message");
const { UserModel } = require("../Models");
const ROLE = require("../Constants/roles");	

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

			let decoded = decodeToken({ token });
			// logger.info(`[DECODED] [CONTENT: ${JSON.stringify(decoded)}]`);

			if (!decoded?._id) {
                return apiResponse.UNAUTHORIZED({                    
                    res,        
                    message: messages.INVALID_TOKEN
                  })								
			}

			const user = await UserModel.findOne({
				_id: decoded._id,
				isActive: true}).populate({
				path: 'roleId',
				select: 'role',
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
				role: user?.roleId?.role,
				email: user?.email,
			};


			if (req?.user?.role === ROLE.superAdmin || usersAllowed.includes('*')) {
				return next();
			}

			if (usersAllowed.includes(req?.user?.role)) return next();

            return apiResponse.UNAUTHORIZED({                    
                res,        
                message: messages.UNAUTHORIZED
              })											
		} catch (error) {
			// logger.error(`[AUTH ERROR]: ${error.message}`);						
            return apiResponse.CATCH_ERROR({                    
                res,        
                message: messages.INTERNAL_SERVER_ERROR,
                data: error
              })								
		}
	};
};


module.exports = auth;
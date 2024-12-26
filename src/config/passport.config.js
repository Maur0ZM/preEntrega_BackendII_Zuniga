import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { userModel } from '../models/mongodb/user.model.js';

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['tokenCookie'];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET || 'coderSecret',
      },
      async (jwt_payload, done) => {
        try {
          const user = await userModel.findById(jwt_payload.id).select('-password');
          if (!user) return done(null, false, { message: 'Usuario no encontrado' });
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

export default initializePassport;

const passport = require("passport");

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const secret = process.env.JWT_Secret;
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  console.log({ payload });
  done(null, true);
});

module.exports = (passport) => {
  passport.use(strategy);
};

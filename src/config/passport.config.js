const passport = require("passport");
const local = require("passport-local");
const GitHubStrategy = require("passport-github2");
const { userModel } = require("../../dao/models/ecommerceModels");
const bcrypt = require("bcrypt");

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        let { firstName, lastName, email, age, role } = req.body;

        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            console.log("user already exists");
            return done(null, false);
          }

          role = role ? role : "usuario";
          const newUser = {
            firstName,
            lastName,
            email,
            age,
            role,
            password: bcrypt.hashSync(password, 10),
          };
          let result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("error al obtener el usuario " + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          let user = await userModel.findOne({ email: username });

          //El usuario no existe
          if (!user) {
            console.log("user doesn't exist");
            return done(null, false);
          }

          //Las contrasenas no coinciden
          if (!bcrypt.compareSync(password, user._doc.password)) {
            return done(null, false);
          }

          delete user._doc.password;
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.10fc84a9db543be7",
        clientSecret: "aa340092da41fda2065295bd09a109bbfaa911c0",
        callbackURL: "http://localhost:8080/api/login/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          let user = await userModel.findOne({ email: profile._json.email });

          if (!user) {
            let newUser = {
              firstName: profile._json.name,
              lastName: "",
              age: 18,
              email: profile._json.email,
              role: "usuario",
              password: "",
            };

            let result = await userModel.create(newUser);

            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser(async (user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

module.exports = initializePassport;

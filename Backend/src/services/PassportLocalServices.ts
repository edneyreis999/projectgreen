import * as Passport from "passport";
import { Strategy } from "passport-local";
import { Service, BeforeRoutesInit, AfterRoutesInit, ServerSettingsService, Inject, ExpressApplication, Use } from "@tsed/common";
import { BadRequest, NotFound } from "ts-httpexceptions";
import { User } from '../models/User'
import { MongooseModel } from "@tsed/mongoose";

@Service()
export class PassportLocalService implements BeforeRoutesInit, AfterRoutesInit {
    @Inject(User)
    private userModel: MongooseModel<User>

    constructor(private serverSettings: ServerSettingsService,
        @Inject(ExpressApplication) private expressApplication: ExpressApplication) {
        Passport.serializeUser(PassportLocalService.serialize);

        // used to deserialize the user
        Passport.deserializeUser(this.deserialize.bind(this));
    }

    static serialize(user, done) {
        done(null, user._id);
    }

    public async deserialize(id, done) {
        const user = await this.userModel.findById(id)
        done(null, user);
    }


    $beforeRoutesInit() {
        const options: any = this.serverSettings.get("passport") || {} as any;
        const { userProperty, pauseStream } = options; // options stored with ServerSettings

        this.expressApplication.use(Passport.initialize({ userProperty }));
        this.expressApplication.use(Passport.session({ pauseStream }));
    }

    $afterRoutesInit() {
        this.initializeSignup();
        this.initializeLogin();
    }

    public initializeSignup() {

        Passport
            .use("signup", new Strategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
                (req, email, password, done) => {
                    const { firstName, lastName } = req.body;
                    // asynchronous
                    // User.findOne wont fire unless data is sent back
                    process.nextTick(() => {
                        let user: User = new User();
                        user.email = email;
                        user.firstName = firstName;
                        user.lastName = lastName;
                        user.password = password;

                        this.signup(user)
                            .then((newUser) => done(null, newUser))
                            .catch((err) => done(err));
                    });
                }));

    }

    /**
     *
     * @param user
     * @returns {Promise<any>}
     */
    async signup(user: User) {

        const exists = await this.userModel.findOne({ email: user.email })

        if (exists) { //User exists
            throw new BadRequest("Email is already registered");
        }

        // Create new User
        return await this.userModel.create(user);
    }

    public initializeLogin() {
        Passport.use("login", new Strategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, (req, email, password, done) => {
            this.login(email, password)
                .then((user) => done(null, user))
                .catch((err) => done(err));
        }));
    }

    async login(email: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ email: email, password: password })
        if (user) {
            return user;
        }

        throw new NotFound("User not found");
    }
}
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


let validname = /^[a-zA-Z\.]+$/;
let emailRegex = /^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/;
let validPhone = /^[6-9]\d{9}$/;
let validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;





/*############################################ 1.Create User Api ###############################################*/


const signUp = async function (req, res) {
    try {
        const data = req.body;
        const { name, phone, email, password } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Body cannot be empty" });
        }

        // Checks whether name is empty or is enter as a string or contains only letters
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Please enter user name" });
        }
        if (!validname.test(name)) {
            return res.status(400).send({ status: false, message: "The user name may contain only letters" });
        }

        // phone validations
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: "Please Enter Phone Number" });
        }
        if (!validPhone.test(phone)) {
            return res.status(400).send({ status: false, message: "The user phone number should be indian may contain only 10 number" });
        }

        // email validations
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please enter E-mail" });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).send({ status: false, message: "Entered email is invalid" });
        }

        // Checks whether password is empty or is enter as a string or a valid pasword.
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password" });
        }
        if (!validPassword.test(password)) {
            return res.status(400).send({ status: false, message: "Please enter password in range of '8-15', with at least a symbol, upper and lower case letters and a number" });
        }

        // checking uniqueness of email and phone
        let duplicatePhone = await userModel.findOne({ phone });
        if (duplicatePhone) {
            return res.status(409).send({ status: false, message: `${phone} already exists` });
        }
        let duplicateEmail = await userModel.findOne({ email });
        if (duplicateEmail) {
            return res.status(409).send({ status: false, message: `${email} already exists` });
        }

        //user creation
        let savedData = await userModel.create(data);
        return res.status(201).send({ status: true, data: savedData });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}






/*############################################ 2. Login ###############################################*/


const login = async function (req, res) {
    try {
        let data = req.body;
        let { email, password } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Body cannot be empty" });
        }

        // Checks whether email is entered or not
        if (!email) {
            return res.status(400).send({ status: false, message: "Please enter E-mail" });
        }
        // Checks whether password is entered or not
        if (!password) {
            return res.status(400).send({ status: false, message: "Please enter Password" });
        }

        //Finding credentials 
        let user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(401).send({ status: false, message: "Invalid credential" });
        }

        //Token generation
        const token = jwt.sign({
            userId: user._id.toString(),
            project: "intoglo_assignment",
        }, "doneByAnil");

        res.setHeader("Authorization", token);
        const output = {
            userId: user._id,
            token: token
        }
        return res.status(200).send({ status: true, message: "User login successfull", data: output });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};



module.exports = { signUp, login }
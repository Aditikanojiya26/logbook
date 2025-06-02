const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.getRegister = (req, res) => {
  res.render("register.ejs");
};

exports.register = async (req, res) => {
  const { name, role, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect(`/register?error=${encodeURIComponent("User already exists")}`);
    }

    const newUser = new User({ name, role, email, password });
    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await User.matchPasswordAndGenerateToken(email, password);
    console.log(user.role);
    
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    if (req.headers.accept?.includes("text/html")) {
      if (user.role === "PDE") return res.redirect("/assign-permission");
      if (user.role === "SCE") {
        return res.redirect(`/logbookform/${user.role}`);
      }
      return res.redirect("/user-dashboard");
    }

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    if (req.headers.accept?.includes("text/html")) {
      return res.render("login.ejs", { error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

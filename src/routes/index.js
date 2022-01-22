const {Router} = require("express")
const router = Router()
const { getUsers, createUser, loginRequest, logoutRequest } = require("../controllers/indexController")

router.get("/users", getUsers)

router.post("/users", createUser)
router.post("/login", loginRequest)
router.post("/logout", logoutRequest)

module.exports = router
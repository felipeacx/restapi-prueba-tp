const {Router} = require("express")
const router = Router()
const { getUsers, createUser, loginRequest } = require("../controllers/indexController")

router.get("/users", getUsers)

router.post("/users", createUser)
router.post("/login", loginRequest)

module.exports = router
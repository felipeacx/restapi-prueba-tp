const {Router} = require("express")
const router = Router()
const { createUser, loginRequest, logoutRequest, getBestPelis, newFavorite, getFavorites, getUsers
} = require("../controllers/indexController")

router.get("/users", getUsers)
router.post("/register", createUser)
router.post("/login", loginRequest)
router.post("/logout", logoutRequest)
router.get("/bestpelis", getBestPelis)
router.post("/newfavorite", newFavorite)
router.get("/favorites", getFavorites)


module.exports = router
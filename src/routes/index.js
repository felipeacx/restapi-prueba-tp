const {Router} = require("express")
const router = Router()
const { getUsers, createUser, loginRequest, logoutRequest, getBestPelis, newFavorite, getFavorites
} = require("../controllers/indexController")

router.get("/users", getUsers)

router.post("/users", createUser)
router.post("/login", loginRequest)
router.post("/logout", logoutRequest)
router.get("/bestpelis", getBestPelis)
router.post("/newfavorite", newFavorite)
router.get("/favorites", getFavorites)


module.exports = router
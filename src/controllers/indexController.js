const { Pool } = require("pg")

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "restapi",
  port: "5432"
})

const getUsers = async (req, res) => {
  const response = await pool.query("select * from Users");
  res.status(200).json(response.rows)
}

const createUser = async (req, res) => {
  try {
    const { name, email, password, rol } = req.body
    await pool.query("insert into Users (name, email, password, rol) values ($1, $2, $3, $4)",[name, email, password, rol])
    res.json({
      status: 200,
      successful: true,
      message: "User added successfully",
      body: {
        user: {name, email}
      }
    })
  } catch (error) {
    res.json({
      status: 400,
      successful: false,
      message: "Error: " + error,
      body: {}
    })
  }
}

const loginRequest = async (req, res) => {
  try {
    const { email, password } = req.body
    //Get user to validate credentials
    const response = await pool.query("select * from Users where email = $1", [email])
    if(email === response.rows[0].email && password === response.rows[0].password){
      const token = btoa(response.rows[0].email)
      res.json({
        status: 200,
        successful: true,
        message: "Login successfully",
        body: {
          user: {
            "name": response.rows[0].name,
            "email": response.rows[0].email,
            "rol": response.rows[0].rol
          },
          token: token
        }
      })
    }else{
      res.json({
        status: 400,
        successful: false,
        message: "Incorrect credentials ",
        body: {}
      })
    }
  } catch (error) {
    res.json({
      status: 400,
      successful: false,
      message: "Error: " + error,
      body: {}
    })
  }
}

const logoutRequest = async (req, res) => {
}

const newFavorite = async (req, res) => {
}

const getFavorites = async (req, res) => {
}

const getBestPelis = async (req, res) => {
}

const getCover = async (req, res) => {
}

module.exports = {
  getUsers,
  createUser,
  loginRequest,
  logoutRequest,
  newFavorite,
  getFavorites,
  getBestPelis,
  getCover,
}
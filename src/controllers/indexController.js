const { default: axios } = require("axios");
const { Pool } = require("pg")
const { encryptString, decryptString } = require("../security/crypto");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "restapi",
  port: "5432"
})

const getUsers = async (req, res) => {
  try {
    const { token, id } = req.query
    if(token === undefined || id == undefined || token === "" || id === ""){      
      return res.json({
        status: 200,
        successful: false,
        message: "Missing token or id",
        body: {}
      })
    }
    const response = await pool.query("select * from Users where id=$1",[id])
    if(response.rowCount === 0){
      return res.json({
        status: 400,
        successful: false,
        message: "The id sent is incorrect",
        body: {}
      })
    }
    var decrypToken = decryptString(token);
    if(decrypToken === response.rows[0].email){
      var users = await pool.query("select * from Users")
      users = users.rows
      res.json({
        status: 200,
        successful: true,
        message: "Users collected successfully",
        body: {
          users
        }
      })
    }else{
      res.json({
        status: 200,
        successful: false,
        message: "Invalid token",
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

const createUser = async (req, res) => {
  try {
    const { name, email, password, rol } = req.body
    var users = await pool.query("select * from Users where email=$1",[email])
    console.log(users,email)
    if(users.rowCount >= 0){
      return res.json({
        status: 200,
        successful: false,
        message: "Email already registered",
        body: {
          email
        }
      })
    }
    var encryptPassword = encryptString(password);
    /* Administrador: 1, Usuario: 2 */
    await pool.query("insert into Users (name, email, password, rol) values ($1, $2, $3, $4)",[name, email, encryptPassword, rol])
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
    var encryptPassword = encryptString(password);    
    //Get user to validate credentials
    const response = await pool.query("select * from Users where email = $1", [email])
    if(response.rowCount <= 0){
      return res.status(200).json({
        status: 200,
        successful: false,
        message: "Credentials error",
        body: {}
      })
    }
    if(email === response.rows[0].email && encryptPassword === response.rows[0].password){
      const token = encryptString(response.rows[0].email)
      res.status(200).json({
        status: 200,
        successful: true,
        message: "Login successfully",
        body: {
          user: {
            "id": response.rows[0].id,
            "name": response.rows[0].name,
            "email": response.rows[0].email,
            "rol": response.rows[0].rol
          },
          authenticated: true,
          token: token
        }
      })
    }else{
      res.status(400).json({
        status: 400,
        successful: false,
        message: "Incorrect credentials ",
        body: {}
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      successful: false,
      message: "Error: " + error,
      body: {}
    })
  }
}

const logoutRequest = async (req, res) => {  
  res.json({
    status: 200,
    successful: true,
    message: "Logout successfully",
    body: {}
  })
}

const getBestPelis = async (req, res) => {
  try {
    const page = req.query.page
    const queryParameters = {
      'api_key': '0d677b16a44d2b5a79edf325bc1ee9b7',
      'language': 'es-CO',
      'sort_by': 'popularity.desc',
      'page': page,
    };
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie",
      {
        params: queryParameters
      }
    )
    res.json({
      status: 200,
      successful: true,
      message: "Data collected successfully",
      body: {
        pelis: response.data
      }
    })
  } catch (error) {
    res.json({
      status: 400,
      successful: false,
      message: "Error: "+error,
      body: {}
    })
  }
}

const newFavorite = async (req, res) => {
  try {
    const { 
      user_id,
      title,
      release_date,
      vote_average,
      vote_count,
      poster_path,
      overview
    } = req.body
    const response = await pool.query("select * from Pelis where user_id = $1",[user_id]);
    if(response.rowCount >= 0){
      return  res.json({
        status: 200,
        successful: false,
        message: "The movie is already registered",
        body: {}
      })
    }
    await pool.query("insert into Pelis (user_id,title,release_date,vote_average,vote_count,poster_path,overview) values ($1,$2,$3,$4,$5,$6,$7);", 
    [user_id, title, release_date, vote_average, vote_count, poster_path, overview])
    res.json({
      status: 200,
      successful: true,
      message: "New favorite movie added successfully",
      body: {
        movie: title
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

const getFavorites = async (req, res) => {
  try {
    const user_id = req.query.user_id
    const response = await pool.query("select * from Pelis where user_id = $1",[user_id]);
    console.log(response.rows)
    res.json({
      status: 200,
      successful: true,
      message: "Favorites movies collected successfully",
      body: {
        movies: response.rows
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

const getCover = async (req, res) => {
  /* "https://image.tmdb.org/t/p/original/" + poster_path) */
}

module.exports = {
  getUsers,
  createUser,
  loginRequest,
  logoutRequest,
  newFavorite,
  getFavorites,
  getBestPelis,
}
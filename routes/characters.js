const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/characters", async (req, res) => {
  let name = req.query.name; //let name = req.query.name;

  let page = Number(req.query.page); //1
  let skip = 100;

  if (page === 1 || !page) {
    skip = 0;
  } else if (page > 1) {
    skip = (page - 1) * skip;
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&page=${page}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router.get("/characters" , async (req,res)=>{
//     try {

//         let name = req.query.name;
//         const response = await axios.get(
//             `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}`
//         );
//       let characters=[];
//     //   let query = req.query.username;

//     //   if(query){
//     //     for(let i=0; i<response.data.results.length;i++){

//     //               if(query.toLowerCase() === response.data.results[i].name.toLowerCase()){

//     //               characters.push({
//     //                 id:response.data.results[i]._id,
//     //                 username: response.data.results[i].name,
//     //                 description:response.data.results[i].description,
//     //                 thumbnail: response.data.results[i].thumbnail,
//     //                 comics:response.data.results[i].comics,
//     //             })
//     //         }
//     //     }

//     //   } else {
//         for(let i=0; i<response.data.results.length;i++){
//             characters.push({
//                 id:response.data.results[i]._id,
//                 username: response.data.results[i].name,
//                 description:response.data.results[i].description,
//                 thumbnail: response.data.results[i].thumbnail,
//                 comics:response.data.results[i].comics,
//             })

//         // }

//       }

//        res.status(200).json(characters);

//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

module.exports = router;

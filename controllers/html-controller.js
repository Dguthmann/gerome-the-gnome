const { response } = require("express");
var express = require("express");

var router = express.Router();

const db = require("../models");

// router.get("/", function (req, res) {
//     // res.render("create", {})
//     window.location.href = "/create"
// })

router.get("/", function (req, res) {
    const lastID = req.query.lastID
    db.Class.findAll().then(classy => {
        const classJson = classy.map(classObj => {
            return classObj.toJSON()
        })
        db.Race.findAll().then(async (racetype) => {
            const raceJson = racetype.map(raceObj => {
                return raceObj.toJSON()
            })

            const charRender = { classes: classJson , races: raceJson }
            // console.log(classJson);
            // console.log(raceJson);
            if(lastID == null){
                console.log('anything')
                res.render("create", {charRender})
            } else {
                const mostRecent=[(await db.Character.findByPk(lastID, { include: [
                    db.Class, db.Race
                ]})).toJSON()]
                console.log(mostRecent)
                res.render("create", {charRender,mostRecent})
            }
            // res.render("create", charRender)
            // res.json(character)
        })
    })
})

// router.get("/createwith", function (req, res) {
//     db.Class.findAll().then(classy => {
//         const classJson = classy.map(classObj => {
//             return classObj.toJSON()
//         })
//         db.Race.findAll().then(racetype => {
//             const raceJson = racetype.map(raceObj => {
//                 return raceObj.toJSON()
//             })
//             db.Character.findOne({
//                 order: [ [ 'createdAt', 'DESC' ]],
//             }).then(characters => {
//                 const charJson = characters.map(charObj => {
//                     return charObj.toJSON()
//                 })
//             const charRender = { classes: classJson , races: raceJson, characters: charJson}
//             // console.log(classJson);
//             // console.log(raceJson);
//             res.render("createwith", charRender)
//             // res.json(character)
//         })
//     })
    
// })
// })

router.get("/characters", function (req, res) {
    db.Character.findAll({ include: [
        db.Class, db.Race
    ]}).then(character => {
        console.log(character)
        const characterJson = character.map(charObj => {
            return charObj.toJSON()
        })
        console.log(characterJson)
        // characterJson.forEach(element => {
        //     element.strMod = Math.floor((element.str - 10) / 2);
        //     element.dexMod = Math.floor((element.dex - 10) / 2);
        //     element.conMod = Math.floor((element.con - 10) / 2);
        //     element.itlMod = Math.floor((element.itl - 10) / 2);
        //     element.wisMod = Math.floor((element.wis - 10) / 2);
        //     element.chaMod = Math.floor((element.cha - 10) / 2);
        // });
        const charRender = { characters: characterJson }
        // console.log(characterJson)
        res.render("allChar", charRender)
        // res.json(character)
    })

})

router.get("/search", function (req, res) {
    console.log("in the search route");
    // console.log(req.body);
    
        db.Character.findAll().then(async (chartype) => {
            const charJson = chartype.map(charObj => {
                return charObj.toJSON()
            })

            const charRender = { characters: charJson }
            res.render("search", {charRender})
            
        })
})

router.get("/search/:id", function (req, res) {
    console.log("in the search route");
    console.log(req);
    const lastID = req.params.id
    console.log(lastID);
        db.Character.findAll().then(async (chartype) => {
            const charJson = chartype.map(charObj => {
                return charObj.toJSON()
            })

            const charRender = { characters: charJson }
            // console.log(classJson);
            // console.log(raceJson);
            if(lastID == null){
                console.log('anything')
                res.render("search", {charRender})
            } else {
                console.log("I made it to else");
                const mostRecent=[(await db.Character.findByPk(lastID, { include: [
                    db.Class, db.Race
                ]})).toJSON()]
                console.log(mostRecent)
                res.render("search", {charRender, mostRecent})
            }
            // res.render("create", charRender)
            // res.json(character)
        })
})

router.get("/edit", function (req, res) {
    res.render("edit", {})
})

router.delete("/api/delete/:id", function (req, res) {
    console.log("hello")
    // db.Character.destroy({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function(characters) {
    //   res.json(characters);
    // });
});

module.exports = router;

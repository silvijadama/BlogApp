//
// // const genUid = require("uid")
// const userDb = require("../models/userSchema")
// const bcrypt = require("bcrypt")
// const productDB = require("../models/productSchema")
// const {jwtEncode} = require("../middleware/authorisation")
// const ai = require("../ai")
//
//
// module.exports = {
//
//     promptAi: async(req, res) => {
//
//     const aiResponse = await ai("tell me 5 animal names")
//
//     res.send({answer: aiResponse})
// },
//
// addUser: async (req, res) => {
//     console.log("req.body:", req.body)
//     const {email, passwordOne, passwordTwo} = req.body
//
//     const userExists = await userDb.findOne(
//         {email: email},
//         {password: 0}
//     )
//     if (userExists) {
//         return res.json({success: false, message: "User already exists!"})
//     }
//     if (passwordOne !== passwordTwo) {
//         return res.json({success: false, message: "Passwords do not match!"})
//     }
//     const passwordOneHashed = await bcrypt.hash(passwordOne, 5)
//     const userRecord = new userDb({
//         username: username,
//         email: email,
//         passwordOne: passwordOneHashed,
//     })
//
//     await userRecord.save()
//     console.log("registration successful!", userRecord)
//
//     res.send({success: true, message: "User created!", userRecord})
//
// },
//     tokenData: async (req, res) => {
//     return res.json({
//         success: true,
//         user: req.user,
//     })
// },
//     login: async (req, res) => {
//     const {email, password} = req.body || {}
//
//     if (!email || !password) {
//         return res.json({success: false, message: "Missing email or password"})
//     }
//     const userExists = await userDb.findOne(
//         {email: email}
//     )
//     if (!userExists) {
//         return res.json({success: false, message: "Invalid email or password!"})
//     }
//
//     if (userExists) {
//         const passwordMatch = await bcrypt.compare(password, userExists.passwordOne)
//         if (passwordMatch) {
//
//             console.log(userExists, "user logged")
//             const newUser = {
//                 username: userExists.username,
//                 email: userExists.email,
//                 id: userExists._id.toString()
//             }
//             // const token = await jwt.sign(newUser, "secret_123")
//             const token = await jwtEncode(newUser)
//             console.log(token, "this is new token")
//             return res.json({
//                 success: true,
//                 secret: userExists.secret,
//                 message: "Login successful!",
//                 token: token,
//                 user: newUser
//             })
//         }
//     } else {
//         return res.json({
//             success: false,
//             message: "invalid email or password!"
//         })
//     }
// },
//     allProducts: async (req, res) => {
//     try {
//         const items = await productDB.find({});
//         console.log(items, "these are items from mongoDB")
//         return res.json({success: true, items});
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({success: false, message: "Server error"});
//     }
// },
//     upload: async (req, res) => {
//
//     const {title, image, price} = req.body
//     console.log(req.user, "current user jwt from create post")
//
//     const user_id = req.user.id
//     const loggedUser = await userDb.findOne({_id: user_id})
//     console.log(loggedUser, "this is logged user")
//     if (!loggedUser) {
//         return res.json({success: false, message: "user not found!"})
//     }
//
//     const newItem = new productDB({
//         title: title,
//         image: image,
//         price: price,
//         user_id: user_id
//     })
//     console.log(newItem, "this is new post")
//     await newItem.save()
//
//     return res.send({success: true, message: "Post created", item: newItem})
// },
//     reserveProduct: async (req, res) => {
//     try {
//         const user_id = req.user.id
//         const {itemId} = req.body
//         console.log(req.body, "this is item data from body, item id")
//
//         const item = await productDB.findById(itemId)
//
//         if (!item) {
//             return res.json({success: false, message: "Item not found!"})
//         }
//
//         if (item.reservedBy) {
//             return res.json({success: false, message: "Item already reserved!"})
//         }
//
//         item.reservedBy = user_id
//         await item.save()
//         console.log(item, "this is reserved item")
//         return res.json({success: true, message: "Item reserved", item})
//
//
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({success: false, message: "Server error"})
//     }
// },
//     cancelRes: async (req, res) => {
//
//     const user_id = req.user.id
//     const {itemId} = req.body
//
//     const item = await productDB.findById(itemId)
//
//     if (item.reservedBy?.toString() !== user_id.toString()) {
//         return res.json({success: false, message: "not your reservation"})
//     }
//     item.reservedBy = null
//     await item.save()
//
//     return res.json({success: true, message: "Reservation canceled", item})
// },
//
//     myProducts: async (req, res) => {
//     const user_id = req.user.id
//     const items = await productDB.find({reservedBy: user_id})
//
//     // const total = items.reduce((sum, item) => sum + (item.price))
//
//     return res.json({success: true, items})
// }
//
//
// // cancelRes: async (req, res) =>{
// //     const {post_id} = req.body
// //     const loggedUser = req.user
// //
// //     // const token = await jwtEncode(newUser)
// //     // console.log(token, "this is new token")
// //
// //     const post = await userPostDb.findOne({ _id: post_id })
// //
// //     if (!post) {
// //         return res.json({ success: false, message: "Post not found" })
// //     }
// //
// //     if (post.user_id.toString() !== loggedUser.id.toString()) {
// //         return res.json({ success: false, message: "Not your post!" })
// //     }
// //
// //     await userPostDb.deleteOne({ _id: post_id })
// //     return res.json({ success: true, message: "Post deleted" })
// // },
// // allProducts: async (req, res) => {
// //     try{
// //         let allUsers = await userDb.find({})
// //         res.json(allUsers)
// //     } catch (error){
// //         res.json({message: "error fetching all users", error})
// //     }
// // },
// }
//
//

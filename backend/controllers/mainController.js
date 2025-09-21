
const userDb = require("../models/userSchema")
const bcrypt = require("bcrypt")
const userPostDb = require("../models/userPostSchema")
const aiPostDb = require("../models/aiPostScema")
const {jwtEncode} = require("../middleware/authorisation")
const ai = require("../ai")

module.exports = {

    addUser: async (req, res) => {
        console.log("req.body:", req.body)
        const {username, email, passwordOne, passwordTwo} = req.body

        const userExists = await userDb.findOne(
            {email: email},
            {password: 0}
        )
        if(userExists){
            return res.json({success: false, message: "User already exists!"})
        }
        if(passwordOne !== passwordTwo){
            return res.json({success: false, message: "Passwords do not match!" })
        }

        const passwordOneHashed = await bcrypt.hash(passwordOne, 5 )
        const userRecord = new userDb({
                                    username: username,
                                    email: email,
                                    passwordOne: passwordOneHashed,
                                })

                    await userRecord.save()
                    console.log("registration successful!", userRecord)

                    res.send({success: true, message: "User created!", userRecord})

    },
    tokenData: async (req, res) => {
        return res.json({
            success: true,
            user: req.user,
        })
    },
    login: async (req, res) => {

        const {email, password} = req.body || {}

        if (!email || !password) {
            return res.json({success: false, message: "Missing email or password"})
        }
        const userExists = await userDb.findOne(
            {email: email}
        )
        if (!userExists) {
            return res.json({success: false, message: "Invalid email or password!"})
        }

        console.log("user found", userExists)
        console.log("Entered password:", password)
        console.log("Stored hash:", userExists.passwordOne)

        const passwordMatch = await bcrypt.compare(password, userExists.passwordOne)
        console.log("is password match", passwordMatch)

        if (!passwordMatch) {
            return res.json({success: false, message: "passwords don't match!"})
        }

        const newUser = {
            username: userExists.username,
            email: userExists.email,
            id: userExists._id.toString()
        }

        const token = await jwtEncode(newUser)
        console.log(token, "this is new token")
        return res.json({
            success: true,
            message: "Login successful!",
            token: token,
            user: newUser
        })
    },

    posts: async (req, res) => {
        let posts = await aiPostDb.find({})

        let sortedPosts = posts.sort((a, b) => a.time - b.time)

        if (req.query.sort === "desc") {
            sortedPosts = posts.sort((a,b) => b.time - a.time)
        }

        return res.json({ success: true, posts: sortedPosts })
    },
    createpost: async (req, res) =>{

        const {mood, image, question} = req.body
        console.log(req.user, "current user jwt from create post")

        const user_id = req.user.id

        const loggedUser = await userDb.findOne({_id: user_id})
        console.log(loggedUser, "this is logged user")
        if(!loggedUser) {
            return res.json({success: false, message: "user not found!"})
        }

        if(!image || !mood) {
            return res.json({success: false, message:"Image and mood are required!"})
        }

        const aiResponse = await ai(`Picked user mood is: ${mood}. Please respond according to the mood and answer
         question: ${question}`)

        const newPost = new aiPostDb({
            image: image,
            description:  aiResponse,
            mood: mood,
            question: question,
            username: loggedUser.username,
            user_id: user_id
        })
        console.log(newPost, "this is new post")
        await newPost.save()

        return res.send({success: true, message: "Post created", post: newPost})
    },

    getPostById: async(req, res) => {

        const postId = req.params.post_id
        console.log(postId, "this is single post id")

        let singlePost = await aiPostDb.findOne({_id: postId})

        return res.json({ success: true, post: singlePost })
    },

    getSingleUserPosts: async (req, res) => {
        const user =  req.params.username
        let usersPosts = await aiPostDb.find({username: user })

        console.log("All user's posts:", usersPosts)

        return res.json({ success: true, posts: usersPosts })
    },

    addComment: async (req, res) => {
        const comment = req.body.text
        const postId = req.params.post_id
        let singlePost = await aiPostDb.findOne({_id: postId})

        const currentUser = req.user
        console.log(currentUser, "this is currently logged user")

        const newComment = {
            username: currentUser.username,
            timestamp:  Date.now() ,
            text: comment,
            user_id: currentUser.id
        }



        singlePost.comments.push(newComment)
        console.log(singlePost, 'single post data', newComment, "new comment added")


        await singlePost.save()
        return res.json({ success: true, post: singlePost })
    },

    getSingleUserProfile: async(req, res)=> {

        const singleUser = req.params.username
        let singleUserInfo = await userDb.findOne({username: singleUser})

        console.log(singleUserInfo, "This is single user, found by username")

        return res.json({ success: true, user: singleUserInfo })
    },
    edit: async (req, res) =>{
        try{
            const { username, email} = req.body
            const loggedUserId = req.user.id
            console.log(loggedUserId, "currently logged user, post owner.")

            const updatedProfile = await userDb.findByIdAndUpdate(
                loggedUserId,
                { username, email },
                { new: true }
            )


            if(!updatedProfile){
                return res.json({ success: false, message: "User not found" })
            }
            console.log(updatedProfile, "this is updated profile info")
            return res.json({success: true, message: "Profile updated!", user: updatedProfile})

        } catch (error){
            return res.json({ success: false, error: error.message })
        }


    },

    allusers: async (req, res) => {
        try{
            let allUsers = await userDb.find({})
            res.json(allUsers)
        } catch (error){
            res.json({message: "error fetching all users", error})
        }
    },

    pokeUser: async (req, res) => {
        try {
            const loggedUserId = req.user.id
            const {pokedUserId} = req.body

            if (loggedUserId === pokedUserId){
                return res.json({success: false, message: "you cannot poke yourself"})
            }

            const loggedUser = await userDb.findById(loggedUserId)
            if(!loggedUser){
                return res.json({success:false, message: "No logged user"})
            }

            const pokedUser = await userDb.findById(pokedUserId)
            if(!pokedUser){
                return res.json({ success: false, message: "No such poked user" })
            }

            // if(pokedUser.pokedUsersArr.includes(loggedUserId)){
            //     return res.json({success: false, message: "already poked this user!"})
            // }

            pokedUser.pokedUsersArr.push(loggedUserId)
            // console.log(pokedUser.pokedUsersArr, "poked users array")
            await pokedUser.save()
            console.log(`User ${loggedUser.username} poked user ${pokedUser.username}`)

            return res.json({success: true, message: "User poked successfully"})

        } catch (error){
            return res.json({success: false, error: error.message})
        }
    },

    pokeHistory: async(req, res) => {
        try{
            const loggedUserId = req.user.id
            const loggedUser = await userDb.findById(loggedUserId).populate("pokedUsersArr", "username email")
            console.log(loggedUser, "currently logged user and pokes array", loggedUser.pokedUsersArr)


            if(!loggedUser){
                return res.json({success: false, message: "User not found"})
            }

            return res.json({success: true, pokes: loggedUser.pokedUsersArr})


        } catch(error){
            return res.json({ success: false, error: error.message })
        }
    },

    loggedUserProfile: async(req, res)=>{
        try{
            const userId = req.params.id
            let singleUserInfo = await userDb.findById(userId)

            console.log(singleUserInfo, "This is single user, found by ID")

            return res.json({ success: true, user: singleUserInfo })

        } catch (error){
            return res.json({ success: false, error: error.message })
        }

    },


    // deletepost: async (req, res) =>{
    //     const {post_id} = req.body
    //     const loggedUser = req.user
    //
    //     // const token = await jwtEncode(newUser)
    //     // console.log(token, "this is new token")
    //
    //     const post = await userPostDb.findOne({ _id: post_id })
    //
    //     if (!post) {
    //         return res.json({ success: false, message: "Post not found" })
    //     }
    //
    //     if (post.user_id.toString() !== loggedUser.id.toString()) {
    //         return res.json({ success: false, message: "Not your post!" })
    //     }
    //
    //     await userPostDb.deleteOne({ _id: post_id })
    //     return res.json({ success: true, message: "Post deleted" })
    // },
}

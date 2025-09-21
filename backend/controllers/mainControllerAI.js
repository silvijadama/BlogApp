// const ai = require("../ai")
//
// module.exports = {
//
//     promptAi: async (req, res) => {
//
//         const homePagePrompt = "Give me html code for travel page home section. Only html code, no comments"
//
//         const aiResponse = await ai(homePagePrompt)
//
//         res.send({answer: aiResponse})
//     },
//
//     chat: async (req, res) => {
//         try{
//             const {message} = req.body
//             if(!message){
//                 return res.json({success: false, error: "Message is required"})
//             }
//
//             const aiResponse = await ai(message)
//             res.json({success: true, answer: aiResponse})
//         } catch(err){
//             console.error(err);
//             res.status(500).json({ success: false, error: "AI request failed" });
//         }
//     }
// }
//

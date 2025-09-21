// import React, {useEffect, useState} from 'react';
//
// const AllUsersNodePage = ({loggedUser}) => {
//
//     const [allUsers, setAllUsers] = useState([])
//
//     useEffect(() => {
//         fetch("http://localhost:2500/api/allusers")
//             .then(res => res.json())
//             .then(data => {
//                 console.log("this is all existing users:", data)
//                 setAllUsers(data)
//             })
//
//     }, []);
//
//
//     function poke(pokedUserId){
//         const token = localStorage.getItem("token")
//
//         fetch("http://localhost:2500/api/poke", {
//             method: "POST"
//             headers: {
//                 "Content-Type": "application/json",
//                 "authorization": token
//             },
//             body: JSON.stringify({ pokedUserId })
//         })
//         console.log(pokedUserId, "this is poked user after button click")
//     }
//     return (
//         <div className="grid-container">
//             {allUsers.map((user)=>
//                 <div key={user._id} className="card flex j-space-between align-center gap10">
//                     <div>{user.username}</div>
//                     <button onClick={() =>poke(user._id)} className="btn"
//                             disabled={loggedUser && loggedUser.id === user._id}>Poke</button>
//                 </div>)}
//         </div>
//     );
// };
//
// export default AllUsersNodePage;
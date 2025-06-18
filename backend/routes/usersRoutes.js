const express = require("express")
const { userDetails, getUserDetails, deleteUser, updateUser, getSingleUser } = require("../controllers/usersControllers")
const router = express.Router()


router.post('/user-details', userDetails)
router.get('/user-details', getUserDetails)
router.put('/update-details/:id', updateUser)
router.delete('/delete-users/:id', deleteUser)
router.get('/user-details/:id', getSingleUser);

module.exports  = router
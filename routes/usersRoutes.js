const express = require("express")
const { userDetails, getUserDetails, deleteUser, updateUser } = require("../controllers/usersControllers")
const router = express.Router()


router.post('/user-details', userDetails)
router.get('/user-details', getUserDetails)
router.put('/update-details/:id', updateUser)
router.post('/delete-users/:id', deleteUser)


module.exports  = router
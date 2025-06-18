const {User}  = require('../models/usersModel')

const userDetails = async (req,res) => {
    
    try {
        const {name, phone_no, email} = req.body;

        const user = await User.create({
            name:name,
            phone_no:phone_no,
            email:email
        })

        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong while creating user. Please try again!"})
    }
}

const getUserDetails = async (req, res) => {
    try {
        const allUsers = await User.findAll()

        res.status(200).json({allUsers})
    } catch (error) {
        res.status(500).json({message:"Something went wrong while fetching the users"})
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email} = req.body



        const user = await User.findByPk(id)

        if(!user){
           return res.status(404).json({message:"User not found"})
        }

        user.set({
            name:name,
            email:email
        })

        await user.save();
        res.status(200).json(`User with ${id} has been updated`)


    } catch (error) {
        res.status(500).json({message:"Something went wrong while updating user."})
    }
}


const deleteUser = async(req,res) => {
        try {
            const {id} = req.params

            const user = await User.findByPk(id);

            if(!user){
                return res.status(404).json({message:"User not found"})
            }

            await user.destroy()
            res.status(200).json(`User with ${id} has been deleted`)
        } catch (error) {
            res.status(500).json({message:"Something went wrong while deleting user. Please try again!"})
        }
}

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data" });
    }
};

module.exports = {userDetails, getUserDetails,updateUser, deleteUser, getSingleUser}
import { userModel } from "../models/mongodb/user.model";

async function getAllUsers() {
    try {
        const users = await userModel.find();
        console.log(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

getAllUsers();
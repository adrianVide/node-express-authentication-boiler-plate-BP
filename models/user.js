import mongoose, { Schema } from 'mongoose';

//Define model
const userSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true }
        confirmPassword
});


// //Create model
// const model = mongoose.model('user', userSchema);

// //Export model
// module.exports = Model;

export default mongoose.model('user', userSchema)
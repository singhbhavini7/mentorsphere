const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['student', 'senior', 'mentor', 'admin'],
      default: 'student',
    },
    college: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: '',
    },
    yearOfStudy: {
      type: Number,
      default: 1,
    },
    skills: [{ type: String }],
    interests: [{ type: String }],
    bio: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: 'No bio added yet',
    },
    learningGoal: {
      type: String,
      default: 'Set your learning goal',
    },
    progress: {
      type: Number,
      default: 0, // Naye user ke liye starting progress 0%
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Password Save hone se pehle Encrypt (Hash) hoga
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Entered Password aur Hashed Password compare karne ka function
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
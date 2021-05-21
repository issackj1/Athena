const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: {
                address: {
                    type: String,
                    required: true
                },
                isVerified: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                confirmation: {
                    token: {
                        type: String,
                        required: false,
                        default: ''
                    },
                    expiration: {
                        type: Date,
                        required: false
                    },
                    required: true
                }
            }
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    bcrypt
        .hash(this.password, 12)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
});

userSchema.methods.isPwdValid = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt
            .compare(password, this.password)
            .then(isValid => {
                resolve(isValid);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports = mongoose.model('User', userSchema);

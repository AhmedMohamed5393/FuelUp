var mongoose              = require('mongoose'),
    db                    = mongoose.connection,
    passportLocalMongoose = require('passport-local-mongoose');
    user                  = mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            unique: false,
            required: false
        },
        address: String,
        phone: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            required: true
        },
        school: {
            type: String,
            required: true
        },
        gov: {
            type: String,
            required: true
        },
        grade: Number,
        certifications: [{
            institute: String,
            gov: String,
            degree: String,
            specifications: String
        }],
        work: [{
            title: String,
            company: String,
            experience: Number
        }],
        startdate: {
            type: Date,
            required: true
        }
    }),
    User                  = mongoose.model('User' , user , 'user');
    user.plugin(passportLocalMongoose);
db.once('open' , () => { console.log('connection with user is succeeded') });
db.on('error' , console.error.bind(console , 'connection with user is failed'));
module.exports = User;
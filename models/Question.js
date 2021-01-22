const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a tittle"],
        minlength: [10, "Please provide a letter at least 10"],
        unique: true
        // Bu bir sorudur. bu-bir-sorudur
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [20, "Please provide a letter at least 20"],
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    answers: [{
        type: mongoose.Schema.ObjectId,
        ref:"Answer"
    }]
});
QuestionSchema.pre("save", function (next) {
    if (!this.isModified("title")) {
        next();
    }
    this.slug = this.makeSlug();
    next();
    
})
QuestionSchema.methods.makeSlug = function () {
    return slugify(this.title, {
        replacment: "-",
        remove: /[*+~.()'"!:@]/g,
        lower:true
     })
 }
module.exports = mongoose.model("Question", QuestionSchema);
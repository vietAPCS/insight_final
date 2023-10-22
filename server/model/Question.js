const mongoose = require("mongoose");
const Resource = require("./Resource");
const Community = require("./Community");
const QuestionSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    question: {
        type: String,
        requried: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        default: 1
    },
    createdFrom: {
        type: mongoose.Types.ObjectId,
        ref: "Resource",
        validate: {
            validator: async function(value) {
                if (!await Resource.isExistingResource(value)) {
                    return false;
                }
                return true;
            }
        }
    },
    community: {
        type: mongoose.Types.ObjectId,
        ref: "Community",
        validate: {
            validator: async function(value) {
                if (!await Community.isExistingCommunity(value)) {
                    return false;
                }
                return true;
            }
        }
    },
});

module.exports = mongoose.model("Question", QuestionSchema);
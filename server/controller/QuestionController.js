const mongoose = require("mongoose");
const Question = require("../model/Question");
const DifficultyEnum = require("../constants/Enum");
const { parseQuery } = require("./utils");
const QuestionController = {
    getQuestionsByDifficulty: async (req, res, next) => {
        const query = await parseQuery(req.query);

        if (!query.courseId || !query.difficulty) {
            next({
                invalidFields: true,
                message: "Missing difficulty."
            });
            return;
        }





        try {
            const questions = await Question.aggregate([
                    {$match: {
                    community:  mongoose.Types.ObjectId("6506c266e586a884adc78409")  // Add the filter for the specific community
                  },},
                {
                  $sample: { size: 20 } // Change the size to the number of random documents you want to select
                },
                {
                  $project: {
                    courseId: 1,
                    question: 1,
                    options: 1,
                    difficulty: 1,
                    answer:1
                  }
                }
              ]);
              console.log(questions)
            res.status(200).json({
                success: true,
                questions: questions
            });
        } catch (err) {
            next({
                success: false,
                message: `No questions available at difficulty ${req.body.difficulty}`
            });
            return;
        }
    },

    addQuestion: async (req, res, next) => {
        if (
            !req.body.question ||
            !req.body.options ||
            !req.body.answer ||
            !req.body.difficulty
        ) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const newQuestion = new Question({
            _id: new mongoose.Types.ObjectId,
            question: req.body.question,
            options: req.body.options,
            answer: req.body.answer,
            createdFrom: req.body.createdFrom,
            difficulty: req.body.difficulty,
            community:"6506c266e586a884adc78409"
        });

        try {
            await newQuestion.save();
        } catch (err) {
            next({
                success: false,
                message: "Question insertion failed.",
                error: err
            });
            return;
        }
        res.send({
            success: true,
            message: "successfully",
            course: newQuestion
        });
    },

    addQuestionList: async(req, res, next) => {
        console.log(req.body.list)
        if (!req.body.list) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        const failed = [];
        for (const q of req.body.list) {
            const newQuestion = new Question({
                _id: new mongoose.Types.ObjectId,
                question: q.question,
                options: q.options,
                answer: q.answer,
                createdFrom: "65203f92fc2d725fd83433dd",
                difficulty: q.difficulty,
                community:"6506c266e586a884adc78409"
            });

            try {
                await newQuestion.save();
            } catch (err) {
                console.log(err)
                failed.push(newQuestion);
            }
        }

        if (failed.length > 0) {
            res.send({
                success: false,
                failOn: failed
            });
        } else {
            res.send({
                success: true,
                message: "successfully"
            });
        }
    },

    verifyAnswer: async (req, res, next) => {
        const query = await parseQuery(req.query);
        if (!query.answer || !query.id) {
            next({
                invalidFields: true,
                message: "Missing fields."
            });
            return;
        }

        try {
            const correctAnswer = await Question.findOne({_id: query.id}).select("answer -_id");
            res.send({
                success: true,
                verification: correctAnswer.answer === query.answer
            });
        } catch (err) {
            next({
                success: false,
                message: "Query error."
            })
            return;
        }
    },
    
    verifyAllQuestions : async (req, res, next) => {

    }
}

module.exports = QuestionController;
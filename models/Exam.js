const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    statement: { type: String, required: true },
    options: [{ type: String, required: true }], // e.g., ["A", "B", "C", "D"]
    correctAnswer: { type: String, required: true },
    weight: { type: Number, default: 1 },
});

const examSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        subject: { type: String, required: true },
        date: { type: Date, required: true },
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        questions: [questionSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);

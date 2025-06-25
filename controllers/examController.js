const Exam = require("../models/Exam");

// Create a new exam
exports.createExam = async (req, res) => {
    try {
        const { title, subject, date, questions } = req.body;

        const exam = await Exam.create({
            title,
            subject,
            date,
            questions,
            teacher: req.user.id, // comes from JWT
        });

        res.status(201).json({ message: "Exam created successfully", exam });
    } catch (err) {
        res.status(500).json({ message: "Failed to create exam", error: err.message });
    }
};

// List exams created by the logged-in teacher
exports.getMyExams = async (req, res) => {
    try {
        const exams = await Exam.find({ teacher: req.user.id }).sort({ createdAt: -1 });
        res.json(exams);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch exams", error: err.message });
    }
};

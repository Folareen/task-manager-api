const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})

    if (!tasks || tasks.length < 1) return res.status(404).json({ message: "No tasks found" });

    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    if (!req.body.name) return res.status(400).json({ message: "Name is required!" })

    const task = await Task.create(req.body)

    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.find({ _id: req.params.id })

    if (!task) return res.status(404).json({ message: "Task does not exist." });

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    if(!req.body.name) return res.status(400).json({ message: "Name is required!" })

    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })

    if (!task) return res.status(404).json({ message: "Task does not exist." });

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id })
    if (!task) return res.status(404).json({ message: "Task does not exist." });
    
    await Task.deleteOne({ _id: req.params.id })

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
};

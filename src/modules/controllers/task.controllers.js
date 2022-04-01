const tasksSchema = require("../../schema/taskSchema");

module.exports.getAllTasks = async (req, res) => {
  try {
    const allTasks = await tasksSchema.find();
    res.send(allTasks);
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports.createNewTask = async (req, res) => {
  try {
    const { isCheck, text } = req.body;
    console.log(req.body);
    if (isCheck !== undefined && text) {
      const newTask = new tasksSchema({
        text,
        isCheck
      });
      await newTask.save().then(async (result) => {
          await tasksSchema.find().then((r) => {
            res.status(200).json(r);
          });
        }).catch((e) => {
          res.status(400).json({ message: "Task dont saved" });
        });
    } else {
      res.status(400).json({ message: "invalid data" });
    }
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports.changeTaskInfo = async (req, res) => {
  try {
    const { text, isCheck, _id } = req.body;
    if (!req.body) return res.status(422).send({ message: "Error! Write correct data" });
    await tasksSchema.updateOne({ _id }, { text, isCheck })
      .then(async (result) => {
        await tasksSchema.find().then((r) => {
          res.status(200).json(r);
        });
      }).catch((e) => {
        res.status(400).json({ message: "Something went wrong" });
      });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.query;
    if (!req.query) return res.status(422).send({ message: "Error! Write correct Id" });
    await tasksSchema.findByIdAndDelete(id).then(async (result) => {
        await tasksSchema.find().then((r) => {
          res.status(200).json(r);
        });
      }).catch((e) => {
        res.status(400).json({ message: "something went wrong" });
      });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};
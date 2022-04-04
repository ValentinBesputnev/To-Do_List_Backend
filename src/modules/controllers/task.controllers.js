const tasksSchema = require("../../schema/taskSchema");

module.exports.getAllTasks = (req, res) => {
  try {
    tasksSchema.find().then((result) => {
      res.send({ data: result });
    });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports.createNewTask = (req, res) => {
  try {
    const task = new tasksSchema(req.body);
    task.save().then(() => {
      tasksSchema.find().then((result) => {
        res.send({ data: result });
      });
    });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports.changeTaskInfo = (req, res) => {
  try {
    const body = req.body;
    const { text, isCheck, _id } = body;
    if (
      body.hasOwnProperty("_id") &&
      (body.hasOwnProperty("text") || body.hasOwnProperty("isCheck"))
    ) {
      tasksSchema.updateOne({ _id }, body).then(() => {
        tasksSchema.find().then((result) => {
          res.send({ data: result });
        });
      });
    } else {
      res.status(422).send("Error! Params not correct");
    }
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports.deleteTask = (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      tasksSchema.deleteOne({ _id: id }).then(() => {
        tasksSchema.find().then((result) => {
          res.send({ data: result });
        });
      });
    } else {
      res.status(422).send("Error! Params not correct");
    }
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};
import express from "express";
// import { idGenerator } from "../utils.js";
import {
  deleteTask,
  insertTask,
  updateTask,
  getTasks,
} from "../models/task/taskModel.js";

const router = express.Router();

//controllers

//get data

router.get("/", async (req, res) => {
  try {
    const result = await getTasks();
    console.log(result);
    res.json({
      status: "success",
      message: `Here are the tasks`,
      task: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
});

//POST data

router.post("/", async (req, res) => {
  //   const id = idGenerator();
  //   fakeDb.push({ ...req.body, id }); //add to the database

  try {
    const result = await insertTask(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: `New data has been added`,
        })
      : res.json({
          status: "failure",
          message: `Failed to add new data`,
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
});

//update data

router.patch("/", async (req, res) => {
  try {
    const result = await updateTask(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "Your task has been updated",
        })
      : res.json({
          status: "failure",
          error: "The ID does not exist in our records",
        });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "something went wrong, try again later" });
  }
});

//delete data
//single delete
// router.delete("/:_id",async(req,res))
router.delete("/", async (req, res) => {
  try {
    const ids = req.body;
    const result = await deleteTask(ids);
    // result?._id
    result?.deletedCount
      ? res.json({
          status: "success",
          message: "Your task has been removed",
        })
      : res.json({
          status: "failure",
          error: "The ID does not exist in our records",
        });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
});

export default router;
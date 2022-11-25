import express from "express";
const router = express.Router();
import {
  createJob,
  appliedJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getAllOpportunities,
  showStats,
} from "../controllers/userJobsController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);
router.route("/opportunities").get(getAllOpportunities);
router.route("/apply/:id").patch(appliedJob);

export default router;
import express from "express";
const router = express.Router();
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
} from "../controllers/jobOpportunityController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
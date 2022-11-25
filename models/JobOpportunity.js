import mongoose from "mongoose";

const JobOpportunitySchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    jobDescription: {
      type: String,
      required: [true, "Please provide job description"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Recruiter",
      required: [true, "Please provide recruiter"],
    },
    usersApplied: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        fileId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("JobOpportunity", JobOpportunitySchema);

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
      enum: ["Full-Time", "Part-Time", "Remote", "Internship"],
      default: "Full-Time",
    },
    jobLocation: {
      type: String,
      default: "My City",
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

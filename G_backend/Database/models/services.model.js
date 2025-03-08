import mongoose, { Schema } from "mongoose";

const BASE_URL = "http://localhost:3000/";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
    eventType: [String],
    packages: [
      {
        type: { type: String },
        title: { type: String },
        description: { type: String, maxLength: 50 },
        features: [String],
        price: { type: Number },
      },
    ],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    questions: [
      {
        text: { type: String },
        details: { type: String },
      },
    ],
    rating: { type: Number, default: 0 },
    tags: [String],
    availableDates: {
      type: [Date],
      default: [],
    },
    video: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ]
  },
  { timestamps: true }
);

ServiceSchema.pre("save", function (next) {
  if (this.images && Array.isArray(this.images)) {
    this.images = this.images.map((img) =>
      img.startsWith("http") ? img : `${BASE_URL}services/images/${img}`
    );
  }

  if (this.video && !this.video.startsWith("http")) {
    this.video = `${BASE_URL}services/video/${this.video}`;
  }

  if (this.documents && Array.isArray(this.documents)) {
    this.documents = this.documents.map((doc) =>
      doc.startsWith("http") ? doc : `${BASE_URL}services/documents/${doc}`
    );
  }

  next();
});

export const ServicesModel = mongoose.model("Service", ServiceSchema);

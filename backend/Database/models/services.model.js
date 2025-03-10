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
    rating: { type: Number, default: 0 },
    tags: [String],
    images: [
      {
        type: String,
      },
    ],
    video: String,
  },
  { timestamps: true }
);

ServiceSchema.pre("save", function (next) {
  if (this.images && Array.isArray(this.images)) {
    this.images = this.images.map((img) =>
      img.startsWith("http") ? img : `${BASE_URL}services/images/${img}`
    );
  }

  next();
});

export const ServicesModel = mongoose.model("Service", ServiceSchema);

import React from "react";
import Header from "./components/Header";

const categories = [
  {
    _id: "67ba1136ac32998562b71051",
    name: "Photography",
    icon: "http://localhost:3000/category/988e963c-79d0-4861-afc5-21efb3c884ff - camera.jpeg",
    description: "Product Photographers, Portrait Photographers",
    subcategories: [
      {
        _id: "67ba0dd9dce6e4d14af441a9",
        name: "Event Photographers",
        category: "67ba1136ac32998562b71051",
        description: "Coverage for weddings, concerts, and corporate events.",
      },
      {
        _id: "67ba0b6cdd9fc1483a754605",
        name: "Product Photographers",
        category: "67ba1136ac32998562b71051",
        description: "Professional product photography",
        createdAt: "2025-02-22T17:37:48.302Z",
        updatedAt: "2025-02-22T17:37:48.302Z",
        __v: 0,
      },
      {
        _id: "67ba0dd9dce6e4d14af441a8",
        name: "Real Estate Photographers",
        category: "67ba1136ac32998562b71051",
        description:
          "High-quality real estate and architectural photography.",
      },
      {
        _id: "67ba0dd9dce6e4d14af441a7",
        name: "Lifestyle & Fashion Photographers",
        category: "67ba1136ac32998562b71051",
        description: "Expert photographers in lifestyle and fashion shoots.",
      },
      {
        _id: "67ba0dd9dce6e4d14af441a6",
        name: "Portrait Photographers",
        category: "67ba1136ac32998562b71051",
        description: "Specialists in portrait and headshot photography.",
      },
      {
        _id: "67ba0dd9dce6e4d14af441aa",
        name: "Food Photographers",
        category: "67ba1136ac32998562b71051",
        description: "Professional food and beverage photography.",
      },
      {
        _id: "67ba0dd9dce6e4d14af441ab",
        name: "Photo Preset Creation",
        category: "67ba1136ac32998562b71051",
        description: "Creation of custom photo editing presets.",
      },
      {
        _id: "67ba0dd9dce6e4d14af441ac",
        name: "Photography Advice",
        category: "67ba1136ac32998562b71051",
        description: "Guidance and consultation for photographers.",
      },
      {
        _id: "67ba0dd9dce6e4d14af441ad",
        name: "Other",
        category: "67ba1136ac32998562b71051",
        description: "Miscellaneous photography-related services.",
      },
    ],
    createdAt: "2025-02-22T18:02:30.459Z",
    updatedAt: "2025-02-22T18:02:30.459Z",
    __v: 0,
  }
];

const MainHeader = () => {
  return (
    <>
      <Header categories={categories} />
    </>
  );
};

export default MainHeader;

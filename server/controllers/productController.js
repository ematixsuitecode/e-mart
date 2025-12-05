import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js"; // Adjust the path as necessary
import slugify from "slugify";


export const generateSKU = (name, category) => {
  const brandCode = name.substring(0, 3).toUpperCase(); 
  const categoryCode = category.substring(0, 3).toUpperCase();
  const randomCode = Math.floor(1000 + Math.random() * 9000); // 4-digit random number

  return `${brandCode}-${categoryCode}-${randomCode}`;
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      stock,
      tags,
      isAvailable,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least 1 image",
      });
    }

    const slug = slugify(name, { lower: true });

    const SKU = generateSKU(name, category);

    // Folder path for this specific product
    const folderPath = `e-mart/products/${slug}`;

    // Upload each file to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: folderPath,
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                console.log("Cloudinary Upload Error:", error);
                reject(error);
              } else {
                resolve({
                  url: result.secure_url,
                  public_id: result.public_id,
                });
              }
            }
          );
          uploadStream.end(file.buffer);
        });
      })
    );

    const product = await Product.create({
      name,
      description,
      brand,
      category,
      price,
      stock,
      imageUrl: uploadedImages, // Store multiple values
      tags: tags ? JSON.parse(tags) : [],
      slug,
      SKU,
      isAvailable,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });

  } catch (error) {
    console.log("Error creating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "reviews.user",
      "name email"
    );
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    // const { id } = req.params;
    const product = await Product.findOne({slug: req.params.slug}).populate(
      "reviews.user",
      "name email"
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    // ⭐ Handle Review Submission
if (updatedData.review) {
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  product.reviews.push(updatedData.review);

  // Recalculate average rating
  const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
  product.ratings = (total / product.reviews.length).toFixed(1);

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Review added successfully",
    data: product,
  });
}


    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Track current images
    let currentImages = [...product.imageUrl];

    // 🔹 Remove specific images if provided
    if (updatedData.removeImages) {
      const removeList =
        typeof updatedData.removeImages === "string"
          ? [updatedData.removeImages]
          : updatedData.removeImages;

      for (const publicId of removeList) {
        await cloudinary.uploader.destroy(publicId);
      }

      currentImages = currentImages.filter(
        (img) => !removeList.includes(img.public_id)
      );
    }

    // 🔹 Upload new images if added
    if (req.files && req.files.length > 0) {
      if (currentImages.length + req.files.length > 4) {
        return res.status(400).json({
          success: false,
          message: "You can upload a maximum of 4 images",
        });
      }

      const newSlug = updatedData.name
        ? slugify(updatedData.name, { lower: true })
        : product.slug;

      const folderPath = `e-mart/products/${newSlug}`;

      const uploadedImages = await Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  folder: folderPath,
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                  });
                }
              );
              uploadStream.end(file.buffer);
            })
        )
      );

      currentImages.push(...uploadedImages);
    }

    // 🔹 Update slug if name changed
    if (updatedData.name) {
      updatedData.slug = slugify(updatedData.name, { lower: true });
    }

    updatedData.imageUrl = currentImages;

    // 🔹 Final DB Update
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log("Update Product Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a review to a product
export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, comment, rating } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.reviews.push({ user, comment, rating });
    product.ratings =
      product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Filter products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Product.find({ category: category });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Filter products by tags
export const getProductsByTags = async (req, res) => {
  try {
    const { tag } = req.query;
    const products = await Product.find({ tags: tag });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update stock
export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { stock },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleFavourite = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    product.isFavourite = !product.isFavourite;
    // product.isFavourite = true;
    await product.save();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
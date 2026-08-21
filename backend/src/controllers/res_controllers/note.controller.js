import Resource from "../../models/resource.model.js";
import cloudinary from "../../lib/cloudinary.js";

const resourceTypes = ["notes", "syllabus", "pyq", "queBankOrSoln"];

const uploadToCloudinary = (buffer, originalName) => new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: "dotconnect/resources",
      resource_type: "raw",
      use_filename: true,
      unique_filename: true,
      filename_override: originalName
    },
    (error, result) => error ? reject(error) : resolve(result)
  );

  uploadStream.end(buffer);
});

const getCloudinaryAsset = (resource) => {
  if (resource.cloudinaryPublicId) {
    return {
      publicId: resource.cloudinaryPublicId,
      resourceType: resource.cloudinaryResourceType || "raw"
    };
  }

  const match = resource.fileUrl.match(/cloudinary\.com\/[^/]+\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return null;

  return { resourceType: match[1], publicId: match[2] };
};

const getFileExtension = (fileName) => {
  const extension = fileName?.split(".").pop();
  return extension && extension !== fileName ? extension : "bin";
};

export const getResources = async (req, res) => {
  try {
    const { resourceType } = req.params;

    if (!resourceTypes.includes(resourceType)) {
      return res.status(400).json({ message: "Invalid resource type" });
    }

    const resources = await Resource.find({ resourceType }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};

export const createResource = async (req, res) => {
  try {
    const { resourceType, title } = req.body;

    if (!resourceTypes.includes(resourceType)) {
      return res.status(400).json({ message: "Invalid resource type" });
    }
    if (!title?.trim() || !req.file) {
      return res.status(400).json({ message: "Title and file are required" });
    }

    const uploadResponse = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    const resource = await Resource.create({
      resourceType,
      title: title.trim(),
      fileUrl: uploadResponse.secure_url,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      cloudinaryPublicId: uploadResponse.public_id,
      cloudinaryResourceType: uploadResponse.resource_type,
      sharedBy: req.user.userId
    });
    res.status(201).json(resource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ message: "Failed to upload resource" });
  }
};

export const downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    const cloudinaryAsset = getCloudinaryAsset(resource);
    const downloadUrl = cloudinaryAsset
      ? cloudinary.utils.private_download_url(
          cloudinaryAsset.publicId,
          getFileExtension(resource.fileName || resource.title),
          {
            secure: true,
            resource_type: cloudinaryAsset.resourceType,
            type: "upload",
            attachment: true
          }
        )
      : resource.fileUrl;
    const fileResponse = await fetch(downloadUrl);
    if (!fileResponse.ok) {
      const cloudinaryError = fileResponse.headers.get("x-cld-error");
      console.error("Cloudinary download failed:", fileResponse.status, cloudinaryError || downloadUrl);
      return res.status(502).json({ message: "Unable to fetch resource file" });
    }

    const fileName = resource.fileName || resource.title || "resource-file";
    const safeFileName = fileName.replace(/[\\"\r\n]/g, "_");
    const contentType = resource.mimeType || fileResponse.headers.get("content-type") || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${safeFileName}"`);
    const contentLength = fileResponse.headers.get("content-length");
    if (contentLength) res.setHeader("Content-Length", contentLength);

    const reader = fileResponse.body.getReader();
    res.on("close", () => reader.cancel());

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } catch (error) {
    console.error("Error downloading resource:", error);
    res.status(500).json({ message: "Failed to download resource" });
  }
};

export const modifyResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json({ message: "Resource deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

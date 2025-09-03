// utils/uploadToCloudinary.js
export const uploadToCloudinary = async (file, folder = "projects") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_unsigned_preset"); // tumhara preset name
  formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dzqonzhli/auto/upload`, // tumhara cloud name
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id }; // return uploaded file URL + id
};

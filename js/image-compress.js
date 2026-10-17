// ─── Upload Image Compression ────────────────────────────
// Phone photos are often 3–5 MB. Before an image is saved, shrink it so its
// longest side is at most `maxSize` px and re-encode it as JPEG, which keeps
// product photos around 100–250 KB instead of several MB.

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode image"));
    img.src = src;
  });
}

// Returns a data URL. Falls back to the original file if the browser can't decode it
// (e.g. HEIC photos outside Safari), so an upload never fails because of compression.
export async function compressImageFile(file, maxSize = 1200, quality = 0.8) {
  const originalDataUrl = await readAsDataUrl(file);

  try {
    const img = await loadImage(originalDataUrl);
    const scale = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
    const width = Math.round(img.naturalWidth * scale);
    const height = Math.round(img.naturalHeight * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    // JPEG has no transparency: paint white first so transparent PNGs don't turn black
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const compressed = canvas.toDataURL("image/jpeg", quality);
    // Keep whichever is smaller (a tiny original PNG can beat its JPEG version)
    return compressed.length < originalDataUrl.length ? compressed : originalDataUrl;
  } catch (err) {
    console.warn("Image compression skipped:", err);
    return originalDataUrl;
  }
}

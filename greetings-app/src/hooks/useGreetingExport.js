const canvasWidth = 800;
const canvasHeight = 1000;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawCoverImage(context, image) {
  const imageRatio = image.width / image.height;
  const canvasRatio = canvasWidth / canvasHeight;
  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;
  let x = 0;
  let y = 0;

  if (imageRatio > canvasRatio) {
    drawWidth = canvasHeight * imageRatio;
    x = (canvasWidth - drawWidth) / 2;
  } else {
    drawHeight = canvasWidth / imageRatio;
    y = (canvasHeight - drawHeight) / 2;
  }

  context.drawImage(image, x, y, drawWidth, drawHeight);
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

async function createGreetingCanvas(template, user) {
  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const context = canvas.getContext("2d");
  const templateImage = await loadImage(template.image);
  const displayName = user.name?.trim() || "Your Name";

  drawCoverImage(context, templateImage);

  context.save();
  context.beginPath();
  context.arc(400, 210, 92, 0, Math.PI * 2);
  context.fillStyle = "#ffffff";
  context.fill();
  context.clip();

  if (user.photo) {
    const profileImage = await loadImage(user.photo);
    context.drawImage(profileImage, 308, 118, 184, 184);
  } else {
    context.fillStyle = "#ccfbf1";
    context.fillRect(308, 118, 184, 184);
    context.fillStyle = "#0f766e";
    context.font = "bold 76px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(displayName.charAt(0).toUpperCase(), 400, 210);
  }

  context.restore();
  context.lineWidth = 10;
  context.strokeStyle = "#ffffff";
  context.beginPath();
  context.arc(400, 210, 92, 0, Math.PI * 2);
  context.stroke();

  context.save();
  context.shadowColor = "rgba(15, 23, 42, 0.28)";
  context.shadowBlur = 24;
  context.shadowOffsetY = 10;
  roundedRect(context, 110, 735, 580, 130, 18);
  context.fillStyle = "rgba(255, 255, 255, 0.92)";
  context.fill();
  context.restore();

  context.fillStyle = "#0f766e";
  context.font = "bold 24px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(template.category.toUpperCase(), 400, 775);

  context.fillStyle = "#0f172a";
  context.font = "bold 44px Arial";
  context.fillText(displayName, 400, 828, 500);

  return canvas;
}

export function useGreetingExport() {
  const downloadGreeting = async (template, user, fileName = "custom-greeting.png") => {
    const canvas = await createGreetingCanvas(template, user);
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const shareGreeting = async (template, user, fileName = "custom-greeting.png") => {
    const canvas = await createGreetingCanvas(template, user);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

    if (!blob) return false;

    const file = new File([blob], fileName, { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "My Greeting",
        text: "Sharing my greeting card.",
        files: [file]
      });
      return true;
    }

    return false;
  };

  return { downloadGreeting, shareGreeting };
}

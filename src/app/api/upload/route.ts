import { NextRequest, NextResponse } from "next/server";
import * as Minio from "minio";
import { env } from "@/env";

const minioClient = new Minio.Client({
  endPoint: env.MINIO_ENDPOINT!,
  useSSL: true, // Set to true if using HTTPS
  accessKey: env.MINIO_ACCESS_KEY!,
  secretKey: env.MINIO_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" });
    }

    // Generate a unique file name to avoid conflicts
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await minioClient.putObject(
      env.MINIO_BUCKET_NAME!,
      uniqueFileName,
      fileBuffer
    );

    // Generate the file URL
    const fileUrl = `https://${env.MINIO_ENDPOINT}/${env.MINIO_BUCKET_NAME}/${uniqueFileName}`;

    // Return the URL in the response
    return NextResponse.json({ success: true, fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

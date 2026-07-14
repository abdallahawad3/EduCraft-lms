import { S3 } from '@/lib/S3Clinet';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const key = body.key;

    if (!key || typeof key !== 'string') {
      return NextResponse.json(
        { error: 'Invalid Request Body' },
        {
          status: 400,
        },
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGE,
      Key: key,
    });

    await S3.send(command);

    return NextResponse.json(
      { message: 'File deleted successfully' },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete file ${error}` },
      {
        status: 500,
      },
    );
  }
}

import { requiredAdmin } from '@/app/data/admin/required-admin';
import arcjet, { detectBot, fixedWindow } from '@/lib/arcjet';
import { S3 } from '@/lib/S3Clinet';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';

export const fileUploaderScheme = z.object({
  fileName: z.string().min(1, { message: 'File name is required' }),
  contentType: z.string().min(1, { message: 'Content type is required' }),
  size: z.number().min(1, { message: 'Size is required' }),
  isImage: z.boolean(),
});

// This route handler i use to create an "presigned" url to protect upload file in the client side //
const aj = arcjet
  .withRule(
    detectBot({
      mode: 'LIVE',
      allow: [],
    }),
  )
  .withRule(
    fixedWindow({
      mode: 'LIVE',
      window: '1m',
      max: 5,
    }),
  );
export async function POST(request: Request) {
  const session = await requiredAdmin();
  try {
    const decision = await aj.protect(request, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      return NextResponse.json(
        {
          error: 'Duuuud not good',
        },
        { status: 429 },
      );
    }
    const body = await request.json();
    const validation = fileUploaderScheme.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid Request Body' },
        {
          status: 400,
        },
      );
    }

    const { contentType, fileName } = validation.data;
    const uniqueKey = `${uuidv4()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGE,
      ContentType: contentType,
      Key: uniqueKey,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to generate presigned Url ${error}` },
      { status: 500 },
    );
  }
}

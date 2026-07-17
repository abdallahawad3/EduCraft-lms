import { S3 } from '@/lib/S3Clinet';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function getImageUrl(key: string) {
  const url = await getSignedUrl(
    S3,
    new GetObjectCommand({
      Bucket: 'abdullah-lms',
      Key: key,
    }),
  );

  return url;
}

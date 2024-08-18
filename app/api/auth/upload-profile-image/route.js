import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/authOptions';
import cloudinary from '@/libs/cloudinary';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ message: 'Invalid file' }), { status: 400 });
    }

    // Check file type and size
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validMimeTypes.includes(file.type)) {
      return new Response(JSON.stringify({ message: 'Invalid file type' }), { status: 400 });
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({ message: 'File size exceeds the 5MB limit' }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: `${session.user.id}/profile/${uuidv4()}`,
          folder: `${session.user.id}/profile/`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Upload failed: No URL returned');
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: uploadResult.secure_url },
    });

    return new Response(JSON.stringify({ imageUrl: uploadResult.secure_url }), { status: 200 });
  } catch (error) {
    console.error('Upload Error:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload profile picture', error: error.message }), { status: 500 });
  }
}

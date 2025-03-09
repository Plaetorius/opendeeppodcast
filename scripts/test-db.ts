// scripts/test-db.ts
import { PrismaClient } from '@prisma/client';

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    // Simple query to test connection
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('✅ Database connection successful!');
    console.log('Query result:', result);

    await prisma.podcast.deleteMany()
		// const podcast = await prisma.podcast.create({
    //   data: {
    //     title: "My title",
    //     storedName: "MyTitle-123.wav"
    //   }
    // })
    // console.log(podcast)
    // Optional: Test access to a table (replace with your actual model)
    // const users = await prisma.user.findMany({ take: 1 });
    // console.log('First user:', users[0] || 'No users found');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
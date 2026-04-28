import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  // Delete in reverse order of relationships
  await prisma.voteTransaction.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.votingCategory.deleteMany();
  await prisma.eventDay.deleteMany();
  await prisma.siteSetting.deleteMany();

  console.log('Seeding Event Days...');
  const startDate = new Date('2026-05-11T00:00:00.000Z');

  const days = [
    { title: 'Monday: Debate and Talk Show', description: "Intellectual discourses framing the university's future." },
    { title: 'Tuesday: College Lecture', description: 'Lecture from the College of Agriculture, Computing and Engineering.' },
    { title: 'Wednesday: Talent Show', description: 'Showcasing the diverse talents of Venite University students.' },
    { title: 'Thursday: Cultural Day', description: 'Celebrating our rich heritage and cultural diversity.' },
    { title: "Friday: Founder's Day Ceremony", description: 'The peak of the week honoring the visionary founders.' },
    { title: 'Saturday: Sports & Awards Night', description: 'Morning sports and evening premium dinner and awards.' },
    { title: 'Sunday: Thanksgiving', description: 'Closing out the week with gratitude and thanksgiving.' }
  ];

  for (let i = 0; i < days.length; i++) {
    const curDate = new Date(startDate);
    curDate.setDate(curDate.getDate() + i);
    await prisma.eventDay.create({
      data: {
        date: curDate,
        title: days[i].title,
        description: days[i].description,
      }
    });
  }

  console.log('Seeding Voting Categories and Candidates...');
  
  const categories = [
    { name: 'Dinner King', description: 'The most distinguished male student.' },
    { name: 'Dinner Queen', description: 'The most elegant female student.' },
    { name: 'Best Dressed Male', description: 'Setting the standard for male fashion.' },
    { name: 'Best Dressed Female', description: 'Setting the standard for female fashion.' },
    { name: 'Most Talented Student', description: 'Outstanding performances across all fields.' },
    { name: 'Student of the Year', description: 'Overall academic, social, and moral excellence.' }
  ];

  for (const cat of categories) {
    const createdCategory = await prisma.votingCategory.create({
      data: {
        name: cat.name,
        description: cat.description,
        isOpen: true,
        candidates: {
          create: [
            { name: `Candidate 1 for ${cat.name}`, department: 'Computer Science', level: '100L' },
            { name: `Candidate 2 for ${cat.name}`, department: 'Agriculture', level: '200L' },
            { name: `Candidate 3 for ${cat.name}`, department: 'Engineering', level: '300L' }
          ]
        }
      }
    });
    console.log(`Created category: ${createdCategory.name}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  await prisma.plugin.upsert({
    where: {id: 'dooboo-github'},
    update: {},
    create: {
      apiUrl: 'https://',
      id: 'dooboo-github',
      description: 'Github plugin for dooboo stats',
      json: [
        {
          tier: 'Iron',
          score: 0,
        },
        {
          tier: 'Bronze',
          score: 5,
        },
        {
          tier: 'Silver',
          score: 20,
        },
        {
          tier: 'Gold',
          score: 40,
        },
        {
          tier: 'Platinum',
          score: 60,
        },
        {
          tier: 'Diamond',
          score: 80,
        },
        {
          tier: 'Master',
          score: 90,
        },
        {
          tier: 'Challenger',
          score: 95,
        },
      ],
    },
  });
};

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

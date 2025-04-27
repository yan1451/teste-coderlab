import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const rootCategory = await prisma.category.create({
    data: {
      name: 'Eletrônicos',
    },
  });

  const subCategory1 = await prisma.category.create({
    data: {
      name: 'Celulares',
      parentId: rootCategory.id,
    },
  });

  const subCategory2 = await prisma.category.create({
    data: {
      name: 'Computadores',
      parentId: rootCategory.id,
    },
  });

  await prisma.category.create({
    data: {
      name: 'Smartphones',
      parentId: subCategory1.id,
    },
  });

  await prisma.category.create({
    data: {
      name: 'Notebooks',
      parentId: subCategory2.id,
    },
  });

  console.log('Seed de categorias criada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

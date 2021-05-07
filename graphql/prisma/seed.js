const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const cardData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    game: {
      create: [
        {
          name: 'Jolteon',
          types: 'Lightning',
          images: 'https://images.pokemontcg.io/ex2/6.png',
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          name: 'Wailord',
          types: 'Water',
          images: 'https://images.pokemontcg.io/ex12/14.png',
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          name: 'Chimecho',
          types: 'Psychic',
          images: 'https://images.pokemontcg.io/ex9/12.png',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const i of cardData) {
    const card = await prisma.card.create({
      data: i,
    })
    console.log(`Created card with id: ${card.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

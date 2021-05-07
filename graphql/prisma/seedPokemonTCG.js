const { PrismaClient } = require('@prisma/client')
const pokemontcg = require('./pokemontcg.json')

const prisma = new PrismaClient()

const card_prefixes = ['id', 'name', 'types']

async function loadPokemonCards() {
    const allCardsData = pokemontcg['data'].data
    const cetCardsData = allCardsData.filter(
        (data) => card_prefixes.includes(data.prefix._text)
    )
    return cetCardsData.map((crs) => {
        return{
            data: {
                id: crs.id._text,
                name: crs.name._text,
                types: crs.types._text,
                images: crs.images._text
            }
        }
    })
}

async function main() {
    const allCardsData = await loadPokemonCards()
    for (const crs of allCardsData) {
        try {
            await prisma.card.create(crs)
        } catch (error) {
            console.log('Error creating card: ${error}')
        }
    }
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
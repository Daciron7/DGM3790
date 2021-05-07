const {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} = require('nexus')
const { GraphQLDateTime } = require('graphql-iso-date')

const DateTime = asNexusMethod(GraphQLDateTime, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allCards', {
      type: 'Card',
      resolve: (_parent, _args, context) => {
        return context.prisma.card.findMany()
      },
    })
    t.nonNull.list.nonNull.field('allPokemon', {
      type: 'Pokemon',
      resolve: (_parent, _args, context) => {
        return context.prisma.pokemon.findMany()
      },
    })

    t.nullable.field('cardbyId', {
      type: 'Pokemon',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.pokemon.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })

/* t.nonNull.list.nonNull.field('pokemonbyId', {
      type: '',
      args: {
        searchString: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({
          type: 'PostOrderByUpdatedAtInput',
        }),
      },
      resolve: (_parent, args, context) => {
        const or = args.searchString
          ? {
              OR: [
                { title: { contains: args.searchString } },
                { content: { contains: args.searchString } },
              ],
            }
          : {}

        return context.prisma.post.findMany({
          where: {
            published: true,
            ...or,
          },
          take: args.take || undefined,
          skip: args.skip || undefined,
          orderBy: args.orderBy || undefined,
        })
      },
    })

    t.list.field('draftsByUser', {
      type: 'Post',
      args: {
        userUniqueInput: nonNull(
          arg({
            type: 'UserUniqueInput',
          }),
        ),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.user
          .findUnique({
            where: {
              id: args.userUniqueInput.id || undefined,
              email: args.userUniqueInput.email || undefined,
            },
          })
          .posts({
            where: {
              published: false,
            },
          })
      },
    }) */
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createPokemon', {
      type: 'Pokemon',
      args: {
        data: nonNull(
          arg({
            type: 'PokemonCreateInput',
          }),
        ),
      },
      resolve: (_, args, context) => {
        return context.prisma.pokemon.create({
          data: {
            name: args.data.name,
            types: args.data.types,
            images: args.data.images,
          },
        })
      },
    })

    t.field('createCard', {
      type: 'Pokemon',
      args: {
        data: nonNull(
          arg({
            type: 'PokemonCreateInput',
          }),
        ),
        pokemonEmail: nonNull(stringArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.pokemon.create({
          data: {
            name: args.data.name,
            types: args.data.types,
            images: args.data.images,
            pokemon: {
              connect: { email: args.pokemonEmail },
            },
          },
        })
      },
    })

   /* t.field('togglePublishPost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, args, context) => {
        const post = await context.prisma.post.findUnique({
          where: { id: args.id || undefined },
          select: {
            published: true,
          },
        })

        if (!post) {
          throw new Error(
            `Post with ID ${args.id} does not exist in the database.`,
          )
        }

        return context.prisma.post.update({
          where: { id: args.id || undefined },
          data: { published: !post.published },
        })
      },
    })

    t.field('incrementPostViewCount', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.post.update({
          where: { id: args.id || undefined },
          data: {
            viewCount: {
              increment: 1,
            },
          },
        })
      },
    }) */

    t.field('deletePokemon', {
      type: 'Pokemon',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.pokemon.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

const Pokemon = objectType({
  name: 'Pokemon',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('types')
    t.nonNull.list.nonNull.field('pokemon', {
      type: 'Pokemon',
      resolve: (parent, _, context) => {
        return context.prisma.pokemon
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .pokemon()
      },
    })
  },
})

const Pokemon = objectType({
  name: 'Pokemon',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.string('name')
    t.string('types')
    t.string('images')
    t.field('pokemon', {
      type: 'Pokemon',
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .pokemon()
      },
    })
  },
})

/*const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const PostOrderByUpdatedAtInput = inputObjectType({
  name: 'PostOrderByUpdatedAtInput',
  definition(t) {
    t.nonNull.field('updatedAt', { type: 'SortOrder' })
  },
})

const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.int('id')
    t.string('email')
  },
})

const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('content')
  },
})*/

const PokemonCreateInput = inputObjectType({
  name: 'PokemonCreateInput',
  definition(t) {
    t.nonNull.string('name')
    t.string('types')
    t.string('images')
  },
})

const CardCreateInput = inputObjectType({
  name: 'CardCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.string('id')
  },
})

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Pokemon,
    Card,
    //UserUniqueInput,
    PokemonCreateInput,
    CardCreateInput,
    //SortOrder,
    //PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

module.exports = {
  schema: schema,
}


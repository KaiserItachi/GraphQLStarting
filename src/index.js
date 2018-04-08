const { GraphQLServer } = require ('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
	Query: {
		info: () => `This is the API for HackerNews CLone`,
		
		feed: (root, args, context, info) => {
			return context.db.query.links({}, info)
		},

		get: (root, args) => {
			for(let i=0; i< links.length; i++){
				if(links[i].id == args.id){
					return links[i];
				}
			}
		},
	},
	Mutation: {
		post: (root, args, context, info) => {
			return context.db.mutation.createLink({
				data:{
					url: args.url,
					description: args.description
				}
			}, info)
		},

		put: (root, args, context, info) => {
			return context.db.mutation.updateLink({
				where:{
					id: args.id
				},
				data:{
					url: args.url,
					description: args.description
				}		
			}, info)	
		},

		delete: (root, args, context, info) => {
			return context.db.mutation.deleteLink({
				where:{
					id: args.id
				}	
			}, info)
		}
	}
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		db: new Prisma({
			typeDefs: 'src/generated/prisma.graphql',
			endpoint: 'https://eu1.prisma.sh/public-petalskull-364/hackernews-node/dev',
			secret: 'mysecret123',
			debug: true,
		}),
	}),
})
server.start(()=> console.log(`Server is running on  http://localhost:4000`));
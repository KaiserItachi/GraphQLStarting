const { GraphQLServer } = require ('graphql-yoga')


let links = [{
	id: 'link-0',
	url: 'www.howtographql.com',
	description: 'Fullstack tutorial for GraphQL'
}]

//1
let idCount = links.length;
const resolvers = {
	Query: {
		info: () => `This is the API for HackerNews CLone`,
		
		feed: () => links,

		get: (root, args) => {
			for(let i=0; i< links.length; i++){
				if(links[i].id == args.id){
					return links[i];
				}
			}
		},
	},
	Mutation: {
		//2
		post: (root, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			}
			links.push(link);
			return link;
		},

		

		put: (root, args) => {
			for(let i=0; i< links.length; i++){
				if(links[i].id == args.id){
					links[i].url = args.url;
					links[i].description = args.description;
					return links[i];
				}
			}
			return links[0];	
		},

		delete: (root, args) => {
			let newLinks = [];
			for(let i =0; i< links.length; i++){
				if(links[i].id != args.id){
					newLinks.push(links[i]);
				}
			}
			links = newLinks;
			return newLinks;
		}
	}
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
})
server.start(()=> console.log(`Server is running on  http://localhost:4000`));
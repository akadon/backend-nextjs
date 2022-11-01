import axios from "axios";

const endpoint = "https://graphqlzero.almansi.me/api";
const headers = {
	"content-type": "application/json"
};

export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await axios.get("https://api.github.com/users");
        return users.data.map(({ id, login, avatar_url }:any) => ({
          id,
          login,
          avatar_url
        }));
      } catch (error) {
        throw error;
      }
    },
    getUser: async (parent:any, args:any, context:any, info:any) => {
      try {
        const user = await axios.get(`https://api.github.com/users/${args.name}`);
        return {
          id: user.data.id,
          login: user.data.login,
          avatar_url: user.data.avatar_url
        };
      } catch (error) {
        throw error;
      }
    },
    getposts: async (parent:any, args:any, context:any, info:any) => {
      try {
        const gpguery = `    
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `;
      
        const response = await axios({
          url: endpoint,
          method: 'post',
          headers: headers,
          data: {
            query: gpguery,
            variables: { id: 1 }
          }
        });
        
        return response.data.data.posts.data;
      } catch (error) {
        throw error;
      }
    },
    getpost: async (_:any, args:any) => {
      try {
        const gpguery = `    
          query {
            post(id: ${args.id}) {
              id
              title
              body
            }
          }
        `;
        
        const response = await axios({
          url: endpoint,
          method: 'post',
          headers: headers,
          data: {
            query: gpguery
          }
        });
        
        return response.data.data.post;
      } catch (error) {
        throw error;
      }
    }
  }
};

import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, post){
                state.loadedPosts.push(post)
            },
            editPost(state, editedPost){
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id) 

                state.loadedPosts[postIndex] = editedPost
            },
            setToken(state, token){
                state.token = token
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context){
               return axios.get(process.env.baseUrl + '/posts.json')
               .then(res => {
                const postsArray = []
                for (const key in res.data) {
                    postsArray.push({...res.data[key], id: key})
                }
                vuexContext.commit('setPosts', postsArray)
               })
               .catch(e => console.log(e))
            },
            async addPost(vuexContext, post){
                const createdPost =  { ...post, updatedDate: new Date() }
                try {
                    const res = await axios.post(
                        process.env.baseUrl + "/posts.json?auth=" + vuexContext.state.token,
                        createdPost
                    )
                    vuexContext.commit('addPost', { ...createdPost, id: res.data.name })
                } catch (e) {
                    return console.log(e)
                }
            },
            async editPost(vuexContext, editedPost){
                try {
                    const res = await axios.put(
                    process.env.baseUrl + "/posts/" +
                        editedPost.id +
                        ".json?auth=" + vuexContext.state.token,
                    editedPost
                    );
                    if (res) {
                        vuexContext.commit('editPost', editedPost)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            setPosts(vuexContext, posts){
                vuexContext.commit('setPosts', posts)
            },
            async authenticateUser(vuexContext, authData){
                let authUrl =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                    process.env.fbAPIKey;
                if (!authData.isLogin) {
                    authUrl =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
                    process.env.fbAPIKey;
                }

               try {
                    const result = await this.$axios
                        .$post(authUrl, {
                            email: authData.email,
                            password: authData.password,
                            returnSecureToken: true,
                        })
                    vuexContext.commit('setToken', result.idToken)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state){
                return state.token != null;
            }
        }
    })
}

export default createStore
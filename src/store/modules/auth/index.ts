export default {
  state() {
    return {
      token: null,
    };
  },
  getters: {
    token(state: any) {
      return state.token;
    },
    isAuthenticated(state: any) {
      return !!state.token;
    },
  },
  mutations: {
    setUser(state: any, payload: any) {
      state.token = payload.token;
    },
  },
  actions: {
    async signIn(context: any, payload: any) {
      const data = {
        email: payload.value.email,
        password: payload.value.password,
      };

      const url = "https://api.escuelajs.co/api/v1/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to authenticate"
        );
        throw error;
      }

      const token = responseData.access_token;

      localStorage.setItem("access_token", token);
      context.commit("setUser", {
        token: token,
      });
    },

    logout(context: any) {
      context.commit("setUser", {
        token: null,
      });
    },

    tryLogin(context: any) {
      const token = localStorage.getItem("access_token");

      if (token) {
        context.commit("setUser", {
          token: token,
        });
      }
    },
  },
};

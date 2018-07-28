module.exports = {
    dbUser: "gaster",
    password: "trident17",
    uri: "ds247141.mlab.com:47141",
    db: "task-manager-app",
    jwtKey: "iamalive",
    corsOptions: {
        origin: "http://localhost:3000",
        credentials: true,
        exposedHeaders: "Authorization"
    }
};

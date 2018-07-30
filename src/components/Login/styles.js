export default ({ breakpoints }) => ({
    loginForm: {
        width: "40%",
        [breakpoints.down("sm")]: {
            width: "80%"
        },
        [breakpoints.up("md")]: {
            width: "40%"
        },
        [breakpoints.up("lg")]: {
            width: "30%"
        },
        margin: "0 auto",
        marginTop: "10%",
        verticalAlign: "center"
    },
    link: {
      textDecoration: "none",
      color: "white"
    },
    input: {
      marginBottom: "15px"
    },
    buttons: {
        width: "100%",
        marginBottom: "10px"
    }
});

export default ({ breakpoints }) => ({
    regForm: {
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
        marginTop: "7%"
    },
    input: {
      marginBottom: "15px"
    },
    link: {
      textDecoration: "none",
      color: "white"
    },
    buttons: {
        width: "100%",
        marginBottom: "10px"
    },
    circular: {
        paddingLeft: "15px",
    }
});

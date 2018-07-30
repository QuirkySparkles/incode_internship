export default ({ breakpoints }) => ({
    root: {
        flexGrow: 1
    },
    general: {
        width: "50%",
        margin: "0 auto",
        marginBottom: "60px",
        [breakpoints.down("sm")]: {
            width: "90%"
        },
        [breakpoints.up("md")]: {
            width: "40%"
        },
        [breakpoints.up("lg")]: {
            width: "30%"
        }
    },
    title: {
        margin: "20px 0"
    },
    note: {
        fontSize: "1em"
    },
    editIcon: {
        float: "right",
        position: "relative",
        right: "5%"
    },
    tip: {
        paddingLeft: "30px"
    }
});

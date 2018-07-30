export default ({ breakpoints }) => ({
    commentsBlock: {
        margin: "0 auto",
        width: "60%",
        [breakpoints.down("sm")]: {
            width: "90%"
        },
        [breakpoints.up("md")]: {
            width: "40%"
        },
        [breakpoints.up("lg")]: {
            width: "30%"
        }
    }
});

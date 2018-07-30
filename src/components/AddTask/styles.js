export default ({ breakpoints }) => ({
  editForm: {
      padding: "30px",
      width: "50%",
        [breakpoints.down("sm")]: {
            width: "70%"
        },
        [breakpoints.up("md")]: {
            width: "40%"
        },
        [breakpoints.up("lg")]: {
            width: "30%"
        },
      margin: "4px auto 60px",
      border: "3px solid #ededed",
      borderTop: "none"
  },
  input: {
      marginBottom: "20px"
  },
  cancel: {
    textDecoration: "none",
    color: "white"
  },
  submitButtom: {
      marginRight: "20px"
  },
  serverMessage: {
      marginTop: "20px"
  },
  circular: {
      marginLeft: "5px"
  }
});

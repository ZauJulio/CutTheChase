import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      fontFamily: "Roboto",
      fontSize: theme.typography.pxToRem(18),
    },
    typography: {
      height: 100,
      width: "100%",
      position: "relative",
    },
    formControl: {
      margin: theme.spacing(3),
      color: "black",
      borderRadius: 40,
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: 600,
      color: "#022e40",
    },
  })
);

export default useStyles;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const labels: { [index: string]: string } = {
  0.5: "Péssimo",
  1: "Ruim",
  1.5: "Não Gostei",
  2: "OK",
  2.5: "Ok+",
  3: "Gostei",
  3.5: "Legal",
  4: "Bom",
  4.5: "Ótimo",
  5: "Excelente+",
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

function Appraiser(onChange: any) {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
}

export function Evaluation(rate: any) {
  return (
    <div>
      <Rating name="read-only" value={rate} readOnly />
    </div>
  );
}

export default Appraiser;

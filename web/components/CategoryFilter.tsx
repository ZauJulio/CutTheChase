import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Accordion,
  AccordionSummary,
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Category } from "../services/interfaces";
import { SelectedCategory } from "../services/interfaces";

import useStyles from "../styles/components/CategoryFilter";

interface PropsCategoryFilter {
  items: Category[];
  onChange: any;
}

function CategoryFilter(props: PropsCategoryFilter) {
  // console.log(navigator.geolocation.getCurrentPosition(console.log))
  return<div></div>;

  // const [categorys, setCategory] = useState<SelectedCategory[]>(tempCategories);
  // const classes = useStyles();

  // const handleChange = (index: number) => (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   let newArr = [...categorys];
  //   newArr[index].selected = event.target.checked;
  //   setCategory(newArr);
  //   props.onChange(categorys);
  // };

  // return (
  //   <Box
  //     bgcolor="white"
  //     color="white"
  //     height="4em"
  //     width="13rem"
  //     marginLeft="2em"
  //     p={1}
  //     position="absolute"
  //     borderRadius={50}
  //     boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
  //   >
  //     <Accordion elevation={0} style={{ borderRadius: 40 }}>
  //       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
  //         <Typography className={classes.heading}>categorias</Typography>
  //       </AccordionSummary>
  //       <FormControl component="fieldset" className={classes.formControl}>
  //         <FormGroup>
  //           {categorys.map((category, index) => {
  //             return (
  //               <FormControlLabel
  //                 control={
  //                   <Checkbox
  //                     checked={category.selected}
  //                     onChange={handleChange(index)}
  //                     name={category.name}
  //                   />
  //                 }
  //                 label={category.name}
  //               />
  //             );
  //           })}
  //         </FormGroup>
  //       </FormControl>
  //     </Accordion>
  //   </Box>
  // );
}

export default CategoryFilter;

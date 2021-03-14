import React, { useContext, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Category } from "../services/interfaces";
import { SelectableCategory } from "../services/interfaces";

import { EventsContext } from "../contexts/EventsContext";

import styles from "../styles/components/Categories.module.scss";

function CategoryFilter() {
  const { categories, updateCategories } = useContext(EventsContext);
  const [expanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(!expanded);
  }

  const handleChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    var newArr = JSON.parse(JSON.stringify(categories));
    newArr[index].selected = event.target.checked;
    updateCategories(newArr);
  };

  return (
    <div className={styles.categoriesContainer}>
      <button className={styles.expand} type="button" onClick={expand}>
        Categorias
        {!expanded && <IoIosArrowDown />}
        {expanded && <IoIosArrowUp />}
      </button>
      {expanded && (
        <div className={styles.formContainer}>
          <form className={styles.form}>
            {categories.map((category, index) => {
              return (
                <div key={index} className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name={`${category.name}_${index}`}
                    checked={category.selected}
                    value={category.name}
                    onChange={handleChange(index)}
                  />
                  <label htmlFor={`${category.name}_${index}`}>
                    {category.name}
                  </label>
                </div>
              );
            })}
          </form>
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;

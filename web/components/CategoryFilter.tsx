import React, { useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { EventsContext } from "../contexts/EventsContext";
import styles from "../styles/components/Categories.module.scss";

interface CategoryFilterProps {
  className?: string;
}

function CategoryFilter(props: CategoryFilterProps) {
  const role: string = "user";
  const { categories, updateCategories } = useContext(EventsContext);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    var newArr = JSON.parse(JSON.stringify(categories));
    newArr[index].selected = event.target.checked;
    updateCategories(newArr);
  };

  return (
    <div className={`${styles.categoriesContainer} ${props.className}`}>
      <button
        className={styles.expand}
        type="button"
        onClick={() => setExpanded(!expanded)}
      >
        Categorias
        {!expanded && <IoIosArrowDown />}
        {expanded && <IoIosArrowUp />}
      </button>
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
    </div>
  );
}

export default CategoryFilter;

import { useState, useEffect } from "react";

import MealItem from "./MealItem";
import { getMeals } from "../../services/getMealsAPI";
import { MenuProps } from "../../utils/type";
import style from "./Meals.module.scss";

function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  async function fetchMeals() {
    try {
      const response = await getMeals();
      if (response) {
        setLoadedMeals(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <ul className={style.Meals_container}>
      {loadedMeals.map((meal: MenuProps) => (
        <MealItem
          key={meal.productId}
          productId={meal.productId}
          place={meal.place}
          selling={meal.selling}
          name={meal.name}
          imageUrl={meal.imageUrl}
          isActive={meal.isActive}
        />
      ))}
    </ul>
  );
}
export default Meals;

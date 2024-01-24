import { useState, useEffect } from "react";

import MealItem from "./MealItem";
import Loading from "../error/Loading";
import { getMeals } from "../../services/getMealsAPI";
import { MenuProps } from "../../utils/type";
import style from "./Meals.module.scss";

function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  async function fetchMeals() {
    try {
      const response = await getMeals();
      if (response) {
        setLoadedMeals(response.data.data);
        setIsLoading(false);
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
      {isLoading && <Loading />}
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

// import { Category } from "../types/Category";

import type { Category } from "../types/Category";
import type { Question } from "../types/Question";

const API_URL = "https://opentdb.com";

export const fetchCategories = async (): Promise<{
  trivia_categories: Category[];
}> => {
  try {
    const response = await fetch(`${API_URL}/api_category.php`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (!Array.isArray(data.trivia_categories)) {
      throw new Error("Invalid categories data");
    }
    return data as { trivia_categories: Category[] };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchQuestions = async ({
  amount,
  category,
  difficulty,
}: {
  amount: number;
  category?: string;
  difficulty?: string;
}): Promise<{ response_code: number; results: Question[] }> => {
  try {
    let url = `${API_URL}/api.php?amount=${amount}`;
    if (category) {
      url += `&category=${category}`;
    }
    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data as { response_code: number; results: Question[] };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

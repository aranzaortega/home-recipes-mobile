import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

import { Recipe, THREE_RECIPES } from "../data/recipes";

let dbInstance: SQLite.SQLiteDatabase | null = null;
let inMemoryCache: Recipe[] | null = null;

async function getDb(): Promise<SQLite.SQLiteDatabase | null> {
  if (Platform.OS === "web") return null;
  if (!dbInstance) {
    try {
      dbInstance = await SQLite.openDatabaseAsync("home_recipes.db");
    } catch (e) {
      console.warn("SQLite openDatabaseAsync failed:", e);
      return null;
    }
  }
  return dbInstance;
}

export async function initDatabase(): Promise<void> {
  const db = await getDb();
  if (!db) {
    inMemoryCache = [...THREE_RECIPES];
    return;
  }

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS recipes (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        prepTime TEXT,
        category TEXT
      );
    `);

    // Check if table is empty
    const result = await db.getFirstAsync<{ count: number }>("SELECT COUNT(*) as count FROM recipes;");
    if (!result || result.count === 0) {
      // Seed default recipes into SQLite offline store
      for (const recipe of THREE_RECIPES) {
        await db.runAsync(
          "INSERT OR REPLACE INTO recipes (id, title, description, image, prepTime, category) VALUES (?, ?, ?, ?, ?, ?);",
          [recipe.id, recipe.title, recipe.description, recipe.image, recipe.prepTime, recipe.category]
        );
      }
    }
  } catch (error) {
    console.warn("Error initializing SQLite database:", error);
    inMemoryCache = [...THREE_RECIPES];
  }
}

export async function getRecipesFromDatabase(): Promise<Recipe[]> {
  const db = await getDb();
  if (!db) {
    return inMemoryCache || THREE_RECIPES;
  }

  try {
    const rows = await db.getAllAsync<Recipe>("SELECT * FROM recipes ORDER BY rowid DESC;");
    inMemoryCache = rows;
    return rows;
  } catch (error) {
    console.warn("Failed to fetch recipes from SQLite:", error);
    return inMemoryCache || THREE_RECIPES;
  }
}

export async function addRecipeToDatabase(recipe: Omit<Recipe, "id">): Promise<Recipe> {
  const newId = `db-recipe-${Date.now()}`;
  const newRecipe: Recipe = {
    id: newId,
    ...recipe,
  };

  const db = await getDb();
  if (!db) {
    if (!inMemoryCache) inMemoryCache = [...THREE_RECIPES];
    inMemoryCache.unshift(newRecipe);
    return newRecipe;
  }

  try {
    await db.runAsync(
      "INSERT INTO recipes (id, title, description, image, prepTime, category) VALUES (?, ?, ?, ?, ?, ?);",
      [newRecipe.id, newRecipe.title, newRecipe.description, newRecipe.image, newRecipe.prepTime, newRecipe.category]
    );

    if (inMemoryCache) {
      inMemoryCache.unshift(newRecipe);
    }
  } catch (error) {
    console.warn("Failed to insert recipe into SQLite:", error);
  }

  return newRecipe;
}

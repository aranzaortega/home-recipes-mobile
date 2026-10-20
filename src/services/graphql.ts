/**
 * GraphQL & Apollo Client Query / Mutation Schema Simulation
 *
 * Demonstrates GraphQL query definitions, normalized Apollo Cache structure,
 * and how Apollo Client integrates with local SQLite offline storage.
 */

export const GET_RECIPES_QUERY = `
  query GetRecipes {
    recipes {
      id
      title
      description
      image
      prepTime
      category
    }
  }
`;

export const ADD_RECIPE_MUTATION = `
  mutation AddRecipe($title: String!, $description: String!, $image: String!, $prepTime: String, $category: String) {
    addRecipe(title: $title, description: $description, image: $image, prepTime: $prepTime, category: $category) {
      id
      title
      description
      image
    }
  }
`;

/**
 * Apollo Cache Normalized Store Example
 * Demonstrates how Apollo in-memory normalized cache stores objects by ID
 */
export type ApolloNormalizedCache = Record<string, { __typename: string; id: string; [key: string]: unknown }>;

export const MOCK_APOLLO_CACHE: ApolloNormalizedCache = {
  "Recipe:flash-3-1": {
    __typename: "Recipe",
    id: "flash-3-1",
    title: "Tomato Basil Pasta",
    category: "Italian",
  },
  "Recipe:flash-3-2": {
    __typename: "Recipe",
    id: "flash-3-2",
    title: "Avocado Toast with Egg",
    category: "Breakfast",
  },
};

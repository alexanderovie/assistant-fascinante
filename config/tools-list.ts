// List of tools available to the assistant
// No need to include the top-level wrapper object as it is added in lib/tools/tools.ts
// More information on function calling: https://platform.openai.com/docs/guides/function-calling

export const toolsList = [
  {
    name: "get_keyword_volume",
    description: "Get search volume data for keywords using DataForSEO",
    parameters: {
      keywords: {
        type: "string",
        description: "Comma-separated list of keywords to analyze (e.g., 'seo, marketing, digital')",
      },
    },
  },
  {
    name: "get_serp_results",
    description: "Get Google search results (SERP) for a query using DataForSEO",
    parameters: {
      query: {
        type: "string",
        description: "Search query to analyze",
      },
      location: {
        type: "string",
        description: "Location for search results (e.g., 'United States', 'Spain')",
        optional: true,
      },
    },
  },
];

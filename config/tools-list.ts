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
  {
    name: "get_ranked_keywords",
    description: "Get keywords that a domain ranks for (competitor analysis)",
    parameters: {
      domain: {
        type: "string",
        description: "Domain to analyze (e.g., 'competitor.com')",
      },
      limit: {
        type: "number",
        description: "Maximum number of keywords to return (default: 20)",
        optional: true,
      },
    },
  },
  {
    name: "get_keyword_ideas",
    description: "Get related keyword ideas based on seed keywords",
    parameters: {
      keywords: {
        type: "string",
        description: "Comma-separated list of seed keywords (e.g., 'restaurant, food, dining')",
      },
      limit: {
        type: "number",
        description: "Maximum number of ideas to return (default: 20)",
        optional: true,
      },
    },
  },
  {
    name: "get_keyword_difficulty",
    description: "Get keyword difficulty scores for ranking analysis",
    parameters: {
      keywords: {
        type: "string",
        description: "Comma-separated list of keywords to analyze difficulty",
      },
    },
  },
  {
    name: "get_domain_analysis",
    description: "Get comprehensive domain analysis including traffic and ranking data",
    parameters: {
      domain: {
        type: "string",
        description: "Domain to analyze (e.g., 'competitor.com')",
      },
    },
  },
      {
        name: "get_backlinks_analysis",
        description: "Get backlinks analysis for a domain",
        parameters: {
          domain: {
            type: "string",
            description: "Domain to analyze backlinks (e.g., 'competitor.com')",
          },
        },
      },
      {
        name: "get_google_my_business_info",
        description: "Get Google My Business information for a local business",
        parameters: {
          keyword: {
            type: "string",
            description: "Business name or keyword to search (e.g., 'Pizza Palace', 'Best Restaurant')",
          },
          location: {
            type: "string",
            description: "Location for the search (e.g., 'New York, NY', 'Miami, FL')",
            optional: true,
          },
        },
      },
      {
        name: "get_google_my_business_results",
        description: "Get results from a Google My Business search task",
        parameters: {
          task_id: {
            type: "string",
            description: "Task ID from get_google_my_business_info response",
          },
        },
      },
    ];

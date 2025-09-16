// Functions mapping to tool calls
// Define one function per tool call - each tool call should have a matching function
// Parameters for a tool call are passed as an object to the corresponding function

export const get_keyword_volume = async ({
  keywords,
}: {
  keywords: string;
}) => {
  const res = await fetch(
    `/api/functions/get_keyword_volume?keywords=${encodeURIComponent(keywords)}`
  ).then((res) => res.json());

  return res;
};

export const get_serp_results = async ({
  query,
  location,
}: {
  query: string;
  location?: string;
}) => {
  const locationParam = location ? `&location=${encodeURIComponent(location)}` : '';
  const res = await fetch(
    `/api/functions/get_serp_results?query=${encodeURIComponent(query)}${locationParam}`
  ).then((res) => res.json());

  return res;
};

export const get_ranked_keywords = async ({
  domain,
  limit,
}: {
  domain: string;
  limit?: number;
}) => {
  const limitParam = limit ? `&limit=${limit}` : '';
  const res = await fetch(
    `/api/functions/get_ranked_keywords?domain=${encodeURIComponent(domain)}${limitParam}`
  ).then((res) => res.json());

  return res;
};

export const get_keyword_ideas = async ({
  keywords,
  limit,
}: {
  keywords: string;
  limit?: number;
}) => {
  const limitParam = limit ? `&limit=${limit}` : '';
  const res = await fetch(
    `/api/functions/get_keyword_ideas?keywords=${encodeURIComponent(keywords)}${limitParam}`
  ).then((res) => res.json());

  return res;
};

export const get_keyword_difficulty = async ({
  keywords,
}: {
  keywords: string;
}) => {
  const res = await fetch(
    `/api/functions/get_keyword_difficulty?keywords=${encodeURIComponent(keywords)}`
  ).then((res) => res.json());

  return res;
};

export const get_domain_analysis = async ({
  domain,
}: {
  domain: string;
}) => {
  const res = await fetch(
    `/api/functions/get_domain_analysis?domain=${encodeURIComponent(domain)}`
  ).then((res) => res.json());

  return res;
};

export const get_backlinks_analysis = async ({
  domain,
}: {
  domain: string;
}) => {
  const res = await fetch(
    `/api/functions/get_backlinks_analysis?domain=${encodeURIComponent(domain)}`
  ).then((res) => res.json());

  return res;
};

export const functionsMap = {
  get_keyword_volume: get_keyword_volume,
  get_serp_results: get_serp_results,
  get_ranked_keywords: get_ranked_keywords,
  get_keyword_ideas: get_keyword_ideas,
  get_keyword_difficulty: get_keyword_difficulty,
  get_domain_analysis: get_domain_analysis,
  get_backlinks_analysis: get_backlinks_analysis,
};

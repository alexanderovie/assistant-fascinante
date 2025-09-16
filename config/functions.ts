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

export const functionsMap = {
  get_keyword_volume: get_keyword_volume,
  get_serp_results: get_serp_results,
};

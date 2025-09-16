import { dataForSEO } from '@/lib/dataforseo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const location = searchParams.get('location') || 'United States';

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Llamar a DataForSEO API
    const result = await dataForSEO.serpResults(query, location);

    // Procesar la respuesta
    if (result.success && result.data && result.data.length > 0) {
      const serpData = result.data[0];
      
      // Formatear los resultados orgánicos
      const organicResults = (serpData.items || [])
        .filter((item: any) => item.type === 'organic')
        .slice(0, 10) // Top 10 resultados
        .map((item: any) => ({
          title: item.title,
          url: item.url,
          description: item.description,
          position: item.rank_group,
          domain: item.domain
        }));

      return new Response(JSON.stringify({
        success: true,
        query: query,
        location: location,
        organic_results: organicResults,
        total_results: organicResults.length,
        search_info: {
          total_results: serpData.seo_stats?.total_results || 0,
          time_taken: serpData.seo_stats?.time_taken || 0
        },
        cost: result.cost
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: false,
      error: 'No SERP results found for the provided query',
      raw_response: result 
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting SERP results:', error);
    return new Response(JSON.stringify({ 
      error: 'Error getting SERP results',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

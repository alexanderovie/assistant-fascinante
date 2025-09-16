import { dataForSEO } from '@/lib/dataforseo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    const limit = searchParams.get('limit') || '20';

    if (!domain) {
      return new Response(JSON.stringify({ error: 'Domain parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Llamar a DataForSEO API
    const result = await dataForSEO.rankedKeywords(domain, parseInt(limit));

    // Procesar la respuesta
    if (result.success && result.data && result.data.length > 0) {
      // Formatear los datos para el chat
      const formattedData = result.data.map((item: any) => ({
        keyword: item.keyword_data?.keyword_info?.keyword || 'N/A',
        search_volume: item.keyword_data?.keyword_info?.search_volume || 0,
        competition: item.keyword_data?.keyword_info?.competition_level || 'unknown',
        cpc: item.keyword_data?.keyword_info?.cpc || 0,
        position: item.ranked_serp_element?.serp_item?.rank_group || 0,
        url: item.ranked_serp_element?.serp_item?.url || 'N/A',
        title: item.ranked_serp_element?.serp_item?.title || 'N/A'
      }));

      return new Response(JSON.stringify({
        success: true,
        domain: domain,
        keywords: formattedData,
        total_keywords: formattedData.length,
        cost: result.cost
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: false,
      error: 'No ranked keywords found for the provided domain',
      raw_response: result 
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting ranked keywords:', error);
    return new Response(JSON.stringify({ 
      error: 'Error getting ranked keywords',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

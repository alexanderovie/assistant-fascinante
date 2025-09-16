import { dataForSEO } from '@/lib/dataforseo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keywords = searchParams.get('keywords');
    const limit = searchParams.get('limit') || '20';

    if (!keywords) {
      return new Response(JSON.stringify({ error: 'Keywords parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Convertir string de keywords separados por comas a array
    const keywordArray = keywords.split(',').map(k => k.trim());

    // Llamar a DataForSEO API
    const result = await dataForSEO.keywordIdeas(keywordArray, parseInt(limit));

    // Procesar la respuesta
    if (result.success && result.data && result.data.length > 0) {
      const keywordData = result.data[0];
      
      // Formatear los datos para el chat
      const formattedData = keywordData.items?.map((item: any) => ({
        keyword: item.keyword || 'N/A',
        search_volume: item.keyword_info?.search_volume || 0,
        competition: item.keyword_info?.competition_level || 'unknown',
        cpc: item.keyword_info?.cpc || 0,
        difficulty: item.keyword_properties?.keyword_difficulty || 0,
        intent: item.search_intent_info?.main_intent || 'unknown'
      })) || [];

      return new Response(JSON.stringify({
        success: true,
        seed_keywords: keywordArray,
        keyword_ideas: formattedData,
        total_ideas: formattedData.length,
        cost: result.cost
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: false,
      error: 'No keyword ideas found for the provided keywords',
      raw_response: result 
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting keyword ideas:', error);
    return new Response(JSON.stringify({ 
      error: 'Error getting keyword ideas',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

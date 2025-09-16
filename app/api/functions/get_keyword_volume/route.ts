import { dataForSEO } from '@/lib/dataforseo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keywords = searchParams.get('keywords');

    if (!keywords) {
      return new Response(JSON.stringify({ error: 'Keywords parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Convertir string de keywords separados por comas a array
    const keywordArray = keywords.split(',').map(k => k.trim());

    // Llamar a DataForSEO API
    const result = await dataForSEO.searchVolume(keywordArray);

    // Procesar la respuesta
    if (result.success && result.data && result.data.length > 0) {
      // Formatear los datos para el chat
      const formattedData = result.data.map((item: any) => ({
        keyword: item.keyword,
        search_volume: item.search_volume || 0,
        competition: item.competition || 'unknown',
        cpc: item.cpc || 0,
        monthly_searches: item.monthly_searches || []
      }));

      return new Response(JSON.stringify({
        success: true,
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
      error: 'No data found for the provided keywords',
      raw_response: result 
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting keyword volume:', error);
    return new Response(JSON.stringify({ 
      error: 'Error getting keyword volume',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

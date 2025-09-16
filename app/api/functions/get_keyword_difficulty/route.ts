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
    const result = await dataForSEO.keywordDifficulty(keywordArray);

    // Procesar la respuesta
    if (result.success && result.data && result.data.length > 0) {
      // Formatear los datos para el chat
      const formattedData = result.data.map((item: any) => ({
        keyword: item.keyword || 'N/A',
        difficulty: item.keyword_difficulty || 0,
        difficulty_level: item.keyword_difficulty < 30 ? 'Easy' : 
                         item.keyword_difficulty < 70 ? 'Medium' : 'Hard'
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
      error: 'No difficulty data found for the provided keywords',
      raw_response: result 
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting keyword difficulty:', error);
    return new Response(JSON.stringify({ 
      error: 'Error getting keyword difficulty',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

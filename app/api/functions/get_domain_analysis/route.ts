import { dataForSEO } from '@/lib/dataforseo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return new Response(JSON.stringify({ error: 'Domain parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Llamar a DataForSEO API
    const result = await dataForSEO.domainRankOverview(domain);

    // Procesar la respuesta
    if (result.success && result.data && result.data.length > 0) {
      const domainData = result.data[0];
      
      // Formatear los datos para el chat
      const formattedData = {
        domain: domain,
        organic_traffic: domainData.rank_info?.organic?.etv || 0,
        paid_traffic: domainData.rank_info?.paid?.etv || 0,
        total_keywords: domainData.rank_info?.organic?.count || 0,
        top_keywords: domainData.rank_info?.organic?.pos_1 || 0,
        ranking_distribution: {
          position_1_3: domainData.rank_info?.organic?.pos_1_3 || 0,
          position_4_10: domainData.rank_info?.organic?.pos_4_10 || 0,
          position_11_20: domainData.rank_info?.organic?.pos_11_20 || 0,
          position_21_50: domainData.rank_info?.organic?.pos_21_50 || 0,
          position_51_100: domainData.rank_info?.organic?.pos_51_100 || 0
        }
      };

      return new Response(JSON.stringify({
        success: true,
        domain_analysis: formattedData,
        cost: result.cost
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: false,
      error: 'No domain analysis found for the provided domain',
      raw_response: result 
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting domain analysis:', error);
    return new Response(JSON.stringify({ 
      error: 'Error getting domain analysis',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

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
    const result = await dataForSEO.backlinksSummary(domain);

    // Procesar la respuesta
    if (result.success && result.data && result.data.length > 0) {
      const backlinksData = result.data[0];
      
      // Formatear los datos para el chat
      const formattedData = {
        domain: domain,
        total_backlinks: backlinksData.backlinks || 0,
        referring_domains: backlinksData.referring_domains || 0,
        referring_pages: backlinksData.referring_pages || 0,
        dofollow_backlinks: backlinksData.dofollow || 0,
        nofollow_backlinks: backlinksData.nofollow || 0,
        referring_networks: backlinksData.referring_networks || 0,
        referring_main_domains: backlinksData.referring_main_domains || 0,
        broken_backlinks: backlinksData.broken_backlinks || 0,
        broken_pages: backlinksData.broken_pages || 0,
        lost_backlinks: backlinksData.lost_backlinks || 0,
        lost_referring_domains: backlinksData.lost_referring_domains || 0
      };

      return new Response(JSON.stringify({
        success: true,
        backlinks_analysis: formattedData,
        cost: result.cost
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: false,
      error: 'No backlinks data found for the provided domain',
      raw_response: result 
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting backlinks analysis:', error);
    return new Response(JSON.stringify({ 
      error: 'Error getting backlinks analysis',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

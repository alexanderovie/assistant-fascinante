import { dataForSEO } from '@/lib/dataforseo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('task_id');

    if (!taskId) {
      return new Response(JSON.stringify({ error: 'Task ID parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Llamar a DataForSEO API para obtener los resultados
    const result = await dataForSEO.getGoogleMyBusinessResults(taskId);

    if (result.success && result.data && result.data.length > 0) {
      const businessData = result.data[0];

      // Formatear los datos para el chat
      const formattedData = {
        business_name: businessData.business_name || 'N/A',
        address: businessData.address || 'N/A',
        phone: businessData.phone || 'N/A',
        website: businessData.website || 'N/A',
        rating: businessData.rating || 0,
        reviews_count: businessData.reviews_count || 0,
        business_type: businessData.business_type || 'N/A',
        hours: businessData.hours || {},
        photos: businessData.photos || [],
        description: businessData.description || 'N/A',
        categories: businessData.categories || [],
        location: {
          latitude: businessData.location?.latitude || 0,
          longitude: businessData.location?.longitude || 0
        },
        verified: businessData.verified || false,
        price_range: businessData.price_range || 'N/A',
        amenities: businessData.amenities || []
      };

      return new Response(JSON.stringify({
        success: true,
        task_id: taskId,
        business_info: formattedData,
        cost: result.cost
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'No Google My Business results found for the provided task ID',
      raw_response: result
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting Google My Business results:', error);
    return new Response(JSON.stringify({
      error: 'Error getting Google My Business results',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

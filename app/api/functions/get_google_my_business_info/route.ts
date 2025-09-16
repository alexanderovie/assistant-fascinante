import { dataForSEO } from '@/lib/dataforseo';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    const location = searchParams.get('location') || 'United States';

    if (!keyword) {
      return new Response(JSON.stringify({ error: 'Keyword parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Llamar a DataForSEO API para crear la tarea
    const result = await dataForSEO.googleMyBusinessInfo(keyword, location);

    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        keyword: keyword,
        location: location,
        task_id: result.task_id,
        status: 'Task created successfully',
        cost: result.cost,
        message: 'Task created. Use get_google_my_business_results with the task_id to get results.'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'No Google My Business data found for the provided keyword',
      raw_response: result
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting Google My Business info:', error);
    return new Response(JSON.stringify({
      error: 'Error getting Google My Business info',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

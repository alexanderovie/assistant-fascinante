/**
 * DataForSEO API Client
 * Cliente para interactuar con la API de DataForSEO
 */

export class DataForSEOClient {
  private baseUrl = 'https://api.dataforseo.com/v3';
  private auth: string;

  constructor() {
    this.auth = process.env.DATAFORSEO_BASE64 || '';
  }

  /**
   * Obtiene el volumen de búsqueda de keywords
   */
  async searchVolume(keywords: string[]): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/keywords_data/google/search_volume/live`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            keywords: keywords,
            language_code: 'en',
            location_code: 2840, // United States
          }
        ])
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DataForSEO API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Verificar si hay errores en la respuesta
      if (data.status_code !== 20000) {
        throw new Error(`DataForSEO API error: ${data.status_message}`);
      }

      // Retornar solo los resultados de keywords
      if (data.tasks && data.tasks.length > 0 && data.tasks[0].result) {
        return {
          success: true,
          data: data.tasks[0].result,
          cost: data.cost
        };
      }

      return { success: false, message: 'No data found' };
    } catch (error) {
      console.error('Error getting search volume:', error);
      throw error;
    }
  }

  /**
   * Obtiene resultados de SERP (Search Engine Results Page)
   */
  async serpResults(query: string, location: string = 'United States'): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/serp/google/organic/live/advanced`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            keyword: query,
            location_name: location,
            language_code: 'en',
            device: 'desktop',
            os: 'windows'
          }
        ])
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DataForSEO SERP API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Verificar si hay errores en la respuesta
      if (data.status_code !== 20000) {
        throw new Error(`DataForSEO SERP API error: ${data.status_message}`);
      }

      // Retornar solo los resultados de SERP
      if (data.tasks && data.tasks.length > 0 && data.tasks[0].result) {
        return {
          success: true,
          data: data.tasks[0].result,
          cost: data.cost
        };
      }

      return { success: false, message: 'No SERP data found' };
    } catch (error) {
      console.error('Error getting SERP results:', error);
      throw error;
    }
  }

  /**
   * Obtiene keywords relacionados
   */
  async relatedKeywords(keyword: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/dataforseo_labs/google/keyword_ideas/live/`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            keyword: keyword,
            language_code: 'en',
            location_code: 2840,
            limit: 20
          }
        ])
      });

      if (!response.ok) {
        throw new Error(`DataForSEO Keywords API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting related keywords:', error);
      throw error;
    }
  }

  /**
   * Analiza un dominio
   */
  async domainAnalysis(domain: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/domain_analytics/overview/live/`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            target: domain,
            language_code: 'en',
            location_code: 2840
          }
        ])
      });

      if (!response.ok) {
        throw new Error(`DataForSEO Domain API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting domain analysis:', error);
      throw error;
    }
  }
}

export const dataForSEO = new DataForSEOClient();

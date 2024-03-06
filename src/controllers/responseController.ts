import axios from 'axios';
import { applyFiltersToResponse } from '../utils/responseFilters';
import { FilterType } from '../types/filterType';

async function fetchFilteredResponses(
    formId: string,
    filters: FilterType[],
    limit: number,
    afterDate: string | undefined,
    beforeDate: string | undefined,
    offset: number,
    status: string | undefined,
    includeEditLink: boolean,
    sort: string
): Promise<any> {
    const apiKey: string = process.env.API_KEY as string;
    const apiUrl: string = `https://api.fillout.com/v1/api/forms/${formId}/submissions`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            params: {
                limit,
                afterDate,
                beforeDate,
                offset,
                status,
                includeEditLink,
                sort
            }
        });

        const filteredResponses = response.data.responses
            .filter((response: any) => applyFiltersToResponse(response, filters))
            .slice(0, limit); // Apply limit after filtering

        // Adjust totalResponses and pageCount based on filtered responses and limit
        const totalFilteredResponses = filteredResponses.length;
        const pageCount = Math.ceil(totalFilteredResponses / limit);

        return {
            responses: filteredResponses,
            totalResponses: totalFilteredResponses,
            pageCount: pageCount
        };
    } catch (error) {
        console.error('Error fetching responses from Fillout.com API:', (error as Error).message);
        throw new Error('Error fetching responses from Fillout.com API');
    }
}

export { fetchFilteredResponses };

import { FilterType } from '../types/filterType';

function applyFiltersToResponse(response: any, filters: FilterType[]): boolean {
    // Iterate through each filter and apply them to the response
    for (const filter of filters) {
        const { id, condition, value } = filter;

        // Find the question in the response based on its id
        const question = response.questions.find((q: any) => q.id === id);

        if (!question || !question.value) {
            return false;
        }

        const responseValue = question.value;

        // Perform the appropriate comparison based on the condition
        switch (condition) {
            case 'equals':
                if (responseValue !== value) {
                    return false;
                }
                break;
            case 'does_not_equal':
                if (responseValue === value) {
                    return false;
                }
                break;
            case 'greater_than':
                if (new Date(responseValue) <= new Date(value)) {
                    return false;
                }
                break;
            case 'less_than':
                if (new Date(responseValue) >= new Date(value)) {
                    return false;
                }
                break;
            default:
                return false;
        }
    }

    return true;
}

export { applyFiltersToResponse };

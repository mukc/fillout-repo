interface FilterType {
    id: string;
    condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
    value: number | string;
}

export { FilterType };

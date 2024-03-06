import express, { Request, Response, Router } from 'express';
import { fetchFilteredResponses } from '../controllers/responseController';
import { FilterType } from '../types/filterType';

const router: Router = express.Router();

router.get('/:formId/filteredResponses', async (req: Request, res: Response) => {
    try {
        const formId: string = req.params.formId;
        const filters: FilterType[] = req.query.filters ? JSON.parse(req.query.filters as string) : [];
        const limit: number = req.query.limit ? parseInt(req.query.limit as string, 10) : 150; // Default limit is 150
        const afterDate: string | undefined = req.query.afterDate ? req.query.afterDate as string : undefined;
        const beforeDate: string | undefined = req.query.beforeDate ? req.query.beforeDate as string : undefined;
        const offset: number = req.query.offset ? parseInt(req.query.offset as string, 10) : 0; // Default offset is 0
        const status: string | undefined = req.query.status ? req.query.status as string : undefined;
        const includeEditLink: boolean = req.query.includeEditLink === 'true';
        const sort: string = req.query.sort === 'desc' ? 'desc' : 'asc';

        const responses = await fetchFilteredResponses(formId, filters, limit, afterDate, beforeDate, offset, status, includeEditLink, sort);
        res.json(responses);
    } catch (error) {
        console.error('Error fetching filtered responses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

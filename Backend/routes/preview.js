import { Router } from 'express';
import { getPublicWebsite, getPublicWebsiteBySlug } from '../controllers/websiteController.js';

const router = Router();


// Get a public website preview by slug (no authentication required)
router.get('/:slug', getPublicWebsiteBySlug);

export default router; 
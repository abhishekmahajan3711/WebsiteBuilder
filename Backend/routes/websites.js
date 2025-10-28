import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getUserWebsites, getWebsiteById, createWebsite, deleteWebsite, updateWebsite, updateWebsiteSlug, updateWatermarkStatus, updateCustomTitle, updateCustomLogo, exportUserWebsites, exportSingleWebsite, getFeaturePrices } from '../controllers/websiteController.js';

const router = Router();

// Get all websites for the authenticated user
router.get('/', authMiddleware, getUserWebsites);

// Authenticated route to get feature prices (must come before /:id routes)
router.get('/feature-prices', authMiddleware, getFeaturePrices);

// Export all websites for the authenticated user
router.get('/export/all', authMiddleware, exportUserWebsites);

// Get a single website by ID
router.get('/:id', authMiddleware, getWebsiteById);

// Create a new website
router.post('/', authMiddleware, createWebsite);

// Delete a website by ID
router.delete('/:id', authMiddleware, deleteWebsite);

// Update a website by ID
router.put('/:id', authMiddleware, updateWebsite);

// Update a website slug by ID
router.put('/:id/slug', authMiddleware, updateWebsiteSlug);

// Update a website watermark status by ID
router.put('/:id/watermark', authMiddleware, updateWatermarkStatus);

// Custom SEO endpoints
router.put('/:id/custom-title', authMiddleware, updateCustomTitle);
router.put('/:id/custom-logo', authMiddleware, updateCustomLogo);

// Export a single website for the authenticated user
router.get('/:id/export', authMiddleware, exportSingleWebsite);

export default router; 
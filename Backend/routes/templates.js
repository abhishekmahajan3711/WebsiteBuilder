import express from 'express';
import { getTemplates } from '../controllers/templateController.js';
import { getTemplateWithComponents } from '../controllers/templateController.js';

const router = express.Router();

// GET /api/templates?role=doctor
router.get('/', getTemplates);
// GET /api/templates/with-components?key=...
router.get('/with-components', getTemplateWithComponents);

export default router; 
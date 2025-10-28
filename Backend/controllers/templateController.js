import Template from '../models/Template.js';
import Component from '../models/Component.js';

export const getTemplates = async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    if (role) query.role = role;
    const templates = await Template.find(query);
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch templates' });
  }
};

export const getTemplateWithComponents = async (req, res) => {
  const { key } = req.query;
  const template = await Template.findOne({ key });
  if (!template) return res.status(404).json({ message: 'Template not found' });

  // Fetch all relevant components for this template
  const availableTypes = template.availableComponents || [];
  const components = await Component.find({ type: { $in: availableTypes }, customName: { $regex: template.role, $options: 'i' }, category: template.category });
  
  // Attach to template object (for frontend use only)
  const templateWithComponents = {
    ...template.toObject(),
    components,
  };

  res.json(templateWithComponents);
}; 
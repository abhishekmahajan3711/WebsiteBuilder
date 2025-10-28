import Website from '../models/Website.js';
import Template from '../models/Template.js';
import Component from '../models/Component.js';
import UserFeatureAccess from '../models/UserFeatureAccess.js'; // Added import for UserFeatureAccess
import FeaturePrice from '../models/FeaturePrice.js';


// Helper to generate slug from title
function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const getUserWebsites = async (req, res) => {
  try {
    const websites = await Website.find({ userId: req.user._id });
    res.json(websites);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch websites' });
  }
};

export const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findOne({ _id: req.params.id, userId: req.user._id });
    if (!website) {
      return res.status(404).json({ message: 'Website not found or unauthorized' });
    }
    res.json(website);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch website', error: err.message });
  }
};

export const getPublicWebsite = async (req, res) => {
  try {
    const website = await Website.findOne({ _id: req.params.id });
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    
    // Check if website is published
    if (!website.isPublished) {
      return res.status(403).json({ message: 'Website is not published' });
    }
    
    // Only return basic website data for public preview
    // const publicWebsite = {
    //   _id: website._id,
    //   title: website.title,
    //   slug: website.slug,
    //   role: website.role,
    //   templateKey: website.templateKey,
    //   components: website.components,
    //   theme: website.theme,
    //   createdAt: website.createdAt,
    //   updatedAt: website.updatedAt
    // };
    
    res.json(website);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch website', error: err.message });
  }
};

export const getPublicWebsiteBySlug = async (req, res) => {
  try {
    const website = await Website.findOne({ slug: req.params.slug });
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    if (!website.isPublished) {
      return res.status(403).json({ message: 'Website is not published' });
    }
    // const publicWebsite = {
    //   _id: website._id,
    //   title: website.title,
    //   slug: website.slug,
    //   role: website.role,
    //   templateKey: website.templateKey,
    //   components: website.components,
    //   theme: website.theme,
    //   createdAt: website.createdAt,
    //   updatedAt: website.updatedAt
    // };
    res.json(website);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch website', error: err.message });
  }
};

export const createWebsite = async (req, res) => {
  try {
    const { role, templateKey, title, slug } = req.body;
    const userId = req.user._id;

    // Fetch template
    const template = await Template.findOne({ key: templateKey, role });
    if (!template) return res.status(400).json({ message: 'Template not found' });

    // Fetch default components for this role and category
    const availableTypes = template.availableComponents || [];
    const defaultComponents = await Component.find({ type: { $in: availableTypes }, customName: { $regex: role, $options: 'i' }, category: template.category });
    // Order components as in availableComponents
    const orderedComponents = availableTypes.map((type, idx) => {
      const comp = defaultComponents.find(c => c.type === type);
      if (!comp) return null;
      return {
        type: comp.type,
        content: comp.content,
        order: idx + 1,
        layout: comp.layout,
        customName: comp.customName,
        style: comp.style,
        customFields: comp.customFields,
        category: comp.category,
      };
    }).filter(Boolean);

    // Generate title and slug
    const websiteTitle = title || 'My Website';
    let websiteSlug = slug || generateSlug(websiteTitle);
    // Ensure slug is unique
    let slugExists = await Website.findOne({ slug: websiteSlug });
    let count = 1;
    while (slugExists) {
      websiteSlug = `${generateSlug(websiteTitle)}-${count}`;
      slugExists = await Website.findOne({ slug: websiteSlug });
      count++;
    }

    // Create website
    const website = await Website.create({
      userId,
      role,
      title: websiteTitle,
      slug: websiteSlug,
      templateKey,
      components: orderedComponents,
      theme: {},
      addOnsUsed: [],
    });
    res.status(201).json(website);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create website', error: err.message });
    console.log(err);
  }
};

export const updateWebsite = async (req, res) => {
  try {
    const website = await Website.findOne({ _id: req.params.id, userId: req.user._id });
    if (!website) return res.status(404).json({ message: 'Website not found or unauthorized' });

    // List all fields you want to allow updating
    const updatableFields = [
      'title', 'components', 'isPublished', 'slug', 'theme', 'watermark', 'seo'
    ];

    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        website[field] = req.body[field];
      }
    });

    await website.save();
    res.json(website);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update website', error: err.message });
  }
};

// New endpoint for updating watermark status
export const updateWatermarkStatus = async (req, res) => {
  try {
    const { watermark } = req.body;
    
    // Find website and user
    const website = await Website.findOne({ _id: req.params.id, userId: req.user._id });
    if (!website) {
      return res.status(404).json({ message: 'Website not found or unauthorized' });
    }

    // Find user's feature access
    const userFeatureAccess = await UserFeatureAccess.findOne({ userId: req.user._id });
    if (!userFeatureAccess || !userFeatureAccess.features.watermark_removal.enabled) {
      return res.status(403).json({ message: 'Feature not available' });
    }

    // Check if user has enough credits when trying to remove watermark
    if (!watermark && userFeatureAccess.features.watermark_removal.value < 1) {
      return res.status(403).json({ message: 'Insufficient credits' });
    }

    // Update watermark status
    website.watermark = watermark;
    await website.save();

    // Update feature access value
    userFeatureAccess.features.watermark_removal.value += watermark ? 1 : -1;
    await userFeatureAccess.save();

    res.json({
      website,
      featureAccess: userFeatureAccess
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update watermark status', error: err.message });
  }
};

export const updateWebsiteSlug = async (req, res) => {
  try {
    const { slug } = req.body;
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ message: 'Invalid slug format.' });
    }
    // Check uniqueness
    const exists = await Website.findOne({ slug, _id: { $ne: req.params.id } });
    if (exists) {
      return res.status(400).json({ message: 'Slug already in use.' });
    }
    const website = await Website.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { slug },
      { new: true }
    );
    if (!website) {
      return res.status(404).json({ message: 'Website not found or unauthorized.' });
    }
    res.json({ slug: website.slug });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update slug.' });
  }
};

export const deleteWebsite = async (req, res) => {
  try {
    const website = await Website.findOne({ _id: req.params.id, userId: req.user._id });
    if (!website) return res.status(404).json({ message: 'Website not found or unauthorized' });
    await Website.deleteOne({ _id: req.params.id });
    res.json({ message: 'Website deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete website', error: err.message });
  }
}; 

// Update only custom title (enable/disable/update)
export const updateCustomTitle = async (req, res) => {
  try {
    const website = await Website.findOne({ _id: req.params.id, userId: req.user._id });
    if (!website) return res.status(404).json({ message: 'Website not found or unauthorized' });
    let userFeatureAccess = await UserFeatureAccess.findOne({ userId: req.user._id });
    if (!userFeatureAccess || !userFeatureAccess.features.title?.enabled) {
      return res.status(403).json({ message: 'Custom title feature not enabled.' });
    }
    const prevTitle = website.seo?.title || 'Website Builder';
    const newTitle = req.body.title;
    const isDefaultTitle = (t) => !t || t === 'Website Builder';
    if (!isDefaultTitle(prevTitle) && isDefaultTitle(newTitle)) {
      // Disabling custom title, increment
      userFeatureAccess.features.title.value += 1;
    } else if (isDefaultTitle(prevTitle) && !isDefaultTitle(newTitle)) {
      // Enabling custom title, decrement if possible
      if (userFeatureAccess.features.title.value > 0) {
          userFeatureAccess.features.title.value -= 1;
      } else {
        return res.status(403).json({ message: 'No SEO title changes left.' });
      }
    }
    website.seo.title = newTitle;
    await website.save();
    await userFeatureAccess.save();
    res.json({ website, featureAccess: userFeatureAccess });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update custom title', error: err.message });
  }
};

// Update only custom logo (enable/disable/update)
export const updateCustomLogo = async (req, res) => {
  try {
    const website = await Website.findOne({ _id: req.params.id, userId: req.user._id });
    if (!website) return res.status(404).json({ message: 'Website not found or unauthorized' });
    let userFeatureAccess = await UserFeatureAccess.findOne({ userId: req.user._id });
    if (!userFeatureAccess || !userFeatureAccess.features.logoUrl?.enabled) {
      return res.status(403).json({ message: 'Custom logo feature not enabled.' });
    }
    const prevLogo = website.seo?.logoUrl || '';
    const newLogo = req.body.logoUrl;
    const isDefaultLogo = (l) => !l;
    if (!isDefaultLogo(prevLogo) && isDefaultLogo(newLogo)) {
      // Disabling custom logo, increment
      userFeatureAccess.features.logoUrl.value += 1;
    } else if (isDefaultLogo(prevLogo) && !isDefaultLogo(newLogo)) {
      // Enabling custom logo, decrement if possible
      if (userFeatureAccess.features.logoUrl.value > 0) {
        userFeatureAccess.features.logoUrl.value -= 1;
      } else {
        return res.status(403).json({ message: 'No logo changes left.' });
      }
    }
    website.seo.logoUrl = newLogo;
    await website.save();
    await userFeatureAccess.save();
    res.json({ website, featureAccess: userFeatureAccess });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update custom logo', error: err.message });
  }
}; 

export const exportUserWebsites = async (req, res) => {
  try {
    const websites = await Website.find({ userId: req.user._id }).lean();
    // Optionally, remove fields you don't want to export (e.g., userId, __v)
    const exportData = websites.map(({ userId, __v, ...rest }) => rest);
    res.setHeader('Content-Disposition', 'attachment; filename="websites_export.json"');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(exportData, null, 2));
  } catch (err) {
    res.status(500).json({ message: 'Failed to export websites' });
  }
}; 

export const exportSingleWebsite = async (req, res) => {
  try {
    const website = await Website.findOne({ _id: req.params.id, userId: req.user._id }).lean();
    if (!website) {
      return res.status(404).json({ message: 'Website not found or unauthorized' });
    }
    const { userId, __v, ...exportData } = website;
    res.setHeader('Content-Disposition', `attachment; filename=website_${website._id}_export.json`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(exportData, null, 2));
  } catch (err) {
    res.status(500).json({ message: 'Failed to export website' });
  }
}; 

export const getFeaturePrices = async (req, res) => {
  try {
    const pricesArr = await FeaturePrice.find({});
    const prices = {};
    pricesArr.forEach(item => { prices[item.key] = item.price; });
    res.json(prices);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch feature prices' });
  }
}; 
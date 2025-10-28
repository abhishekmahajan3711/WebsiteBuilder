import React from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { useSelector, useDispatch } from 'react-redux';
import { updateFeatureAccess } from '../redux/authSlice';

const ExportImportSection = ({ websiteId, seoTitle, seoLogoUrl }) => {
  const dispatch = useDispatch();
  const featureAccess = useSelector(state => state.auth.featureAccess);
  const exportCredits = featureAccess?.features?.export_website?.value ?? 0;
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = React.useState(false);

  const handlePurchaseExportCredits = async () => {
    // setLoading(true);
    // try {
    //   const res = await axios.post('http://localhost:5000/api/auth/add-export-credits', { credits: 3 }, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   dispatch(updateFeatureAccess(res.data.featureAccess));
    //   alert('Export credits purchased!');
    // } catch (err) {
    //   alert('Failed to purchase export credits.');
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleExport = async (type) => {
    if (exportCredits < 1) {
      alert('You have no export credits left. Please purchase more.');
      return;
    }
    setLoading(true);
    let url, filename;
    if (type === 'json') {
      url = `http://localhost:5000/api/websites/${websiteId}/export`;
      filename = `website_${websiteId}_export.json`;
    }
    try {
      // Decrement export credit first
      await axios.post('http://localhost:5000/api/auth/decrement-export-credit', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update credits in Redux
      const featureRes = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(updateFeatureAccess(featureRes.data.featureAccess));
      // Proceed with export
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      alert('Failed to export website data.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPreviewHtml = async () => {
    if (exportCredits < 1) {
      alert('You have no export credits left. Please purchase more.');
      return;
    }
    setLoading(true);
    try {
      // Decrement export credit first
      await axios.post('http://localhost:5000/api/auth/decrement-export-credit', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update credits in Redux
      const featureRes = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(updateFeatureAccess(featureRes.data.featureAccess));
      // Proceed with export
      const preview = document.querySelector('[data-preview-root]');
      if (!preview) return alert('Preview not found!');
      let html = preview.innerHTML;
      // Remove all Tailwind opacity-0 classes
      html = html.replace(/opacity-0/g, 'opacity-100');
      // Remove inline style="opacity: 0" (and similar)
      html = html.replace(/style="[^"]*opacity\s*:\s*0;?[^"]*"/g, match => {
        // Remove just the opacity: 0 part from the style attribute
        return match.replace(/opacity\s*:\s*0;?/g, '');
      });
      const headTitle = seoTitle || 'Exported Website';
      const faviconTag = seoLogoUrl ? `<link rel=\"icon\" href=\"${seoLogoUrl}\">` : '';
      const htmlContent = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n<title>${headTitle}</title>\n${faviconTag}\n<link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\" rel=\"stylesheet\">\n</head>\n<body>\n${html}\n</body>\n</html>`;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'website_export.html';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to export website as HTML.');
    } finally {
      setLoading(false);
    }
  };

  // Remove handleExportReact and the React export button

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mt-8">
      <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span>⬇️</span>
        Export Website
      </h4>
      <p className="text-gray-600 text-sm mb-4">
        Download a backup of this website in your preferred format. Exporting will decrement your export credits.
      </p>
      <div className="flex flex-col gap-3">
        {exportCredits === 0 ? (
          <>
          <div className="text-xs text-red-600 mb-2">
            You have no export credits left. Please purchase more to export the code.</div>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition"
              onClick={handlePurchaseExportCredits}
              disabled={loading}
            >
              Purchase More Credits
            </button>
            </>
        ) : (
          <div className="mb-2 text-sm text-green-700 font-bold">Export Credits: {exportCredits}</div>
        )}
        {exportCredits > 0 && (
          <>
            <button
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow transition cursor-pointer"
              onClick={() => handleExport('json')}
              disabled={loading}
            >
              Export Raw Data (JSON)
            </button>
            <button
              className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium shadow transition cursor-pointer"
              onClick={handleExportPreviewHtml}
              disabled={loading}
            >
              Export as HTML
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExportImportSection; 
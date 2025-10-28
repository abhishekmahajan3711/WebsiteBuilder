import React, { useState, useRef } from 'react';
import axios from 'axios';
import {QRCodeCanvas} from 'qrcode.react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';
import { updateFeatureAccess } from '../redux/authSlice';
import { updateWebsite as updateWebsiteRedux } from '../redux/websitesSlice';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ExportImportSection from './ExportImportSection';
import { useNavigate } from 'react-router-dom';

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm';
const labelClass = 'block text-sm font-medium text-gray-700 mb-2';

const WebsiteSettings = ({ website, onSave }) => {
  const [currentSlug, setCurrentSlug] = useState(website.slug || '');
  const [newSlug, setNewSlug] = useState(website.slug || '');
  const [savingSlug, setSavingSlug] = useState(false);
  const [slugMsg, setSlugMsg] = useState('');
  const [isPublished, setIsPublished] = useState(website.isPublished || false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageCopy, setMessageCopy] = useState('');
  const [publicUrl, setPublicUrl] = useState(`${window.location.origin}/public/${website.slug}`);
  const [showCongrats, setShowCongrats] = useState(false);
  const qrRef = useRef(null);
  const { width, height } = useWindowSize();
  const dispatch = useDispatch();
  const featureAccess = useSelector(state => state.auth.featureAccess);
  const [watermarkMsg, setWatermarkMsg] = useState('');
  const [seoMsg, setSeoMsg] = useState('');
  const [seoTitle, setSeoTitle] = useState(website.seo?.title || '');
  const [seoLogoUrl, setSeoLogoUrl] = useState(website.seo?.logoUrl || '');
  const [savingSeo, setSavingSeo] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [logoPreview, setLogoPreview] = useState(website.seo?.logoUrl || '');

  const publishLimit = featureAccess?.features?.publish_limit?.value ?? 0;
  const [showPurchasePublish, setShowPurchasePublish] = useState(false);
  const navigate = useNavigate();

 
  // Save slug only
  const handleSaveSlug = async () => {
    setSavingSlug(true);
    setSlugMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/websites/${website._id}/slug`,
        { slug: newSlug },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentSlug(res.data.slug);
      setSlugMsg('Slug updated!');
      setPublicUrl(`${window.location.origin}/public/${res.data.slug}`);
      setTimeout(() => setSlugMsg(''), 2000);
    } catch (err) {
      setSlugMsg(err.response?.data?.message || 'Failed to update slug.');
    } finally {
      setSavingSlug(false);
    }
  };

  // Publish website (calls onSave with isPublished)
  const handlePublish = async () => {
    setPublishing(true);
    setShowPurchasePublish(false);
    if (publishLimit < 1) {
      setShowPurchasePublish(true);
      setPublishing(false);
      return;
    }
    try {
      const result = await onSave();
      if (result) {
        setMessage('Website data saved');
      }
      // Decrement publish_limit in backend
      const res = await axios.post('http://localhost:5000/api/auth/decrement-publish-limit', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.data && res.data.featureAccess) {
        dispatch(updateFeatureAccess(res.data.featureAccess));
      }
      const publishRes = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${website._id}`, {
        isPublished: true,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsPublished(true);
      setShowCongrats(true);
      setMessage('Website published!');
      setTimeout(() => setMessage(''), 2000);
      dispatch(updateWebsiteRedux(publishRes.data));
      return publishRes.data;
    } catch (err) {
      console.log(err);
      setMessage('Failed to publish website');
      return null;
    } finally {
      setPublishing(false);
    }
    
  };

  // unpublish website
  const handleUnpublish = async () =>{
    setPublishing(true);
    try {
      // Increment publish_limit in backend
      const res = await axios.post('http://localhost:5000/api/auth/increment-publish-limit', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.data && res.data.featureAccess) {
        dispatch(updateFeatureAccess(res.data.featureAccess));
      }
      const result = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${website._id}`, {
        isPublished: false,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsPublished(false);
      setMessage('Website unpublished!');
      setTimeout(() => setMessage(''), 2000);
      dispatch(updateWebsiteRedux(result.data));
    } catch (err) {
      setMessage('Failed to unpublish website');
    }
    setPublishing(false);

  }

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setMessageCopy('Link copied!');
    setTimeout(() => setMessageCopy(''), 1500);
  };

  // Download QR code
  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `website-qr.png`;
    link.click();
  };


  // Remove Watermark handler
  const handleRemoveWatermark = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${website._id}/watermark`,
        { watermark: false },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      dispatch(updateWebsiteRedux(res.data.website));
      dispatch(updateFeatureAccess(res.data.featureAccess));
      setWatermarkMsg('Watermark removed!');
      setTimeout(() => setWatermarkMsg(''), 2000);
    } catch (err) {
      setWatermarkMsg(err.response?.data?.message || 'Failed to remove watermark');
    }
  };

  // Restore Watermark handler
  const handleRestoreWatermark = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${website._id}/watermark`,
        { watermark: true },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      dispatch(updateWebsiteRedux(res.data.website));
      dispatch(updateFeatureAccess(res.data.featureAccess));
      setWatermarkMsg('Watermark restored!');
      setTimeout(() => setWatermarkMsg(''), 2000);
    } catch (err) {
      setWatermarkMsg(err.response?.data?.message || 'Failed to restore watermark');
    }
  };

  // Handle watermark purchase
  const handlePurchaseWatermark = () => {
    navigate('/dashboard/plan');
  };

  // Add new handler for QR code purchase
  const handlePurchaseQRCode = () => {
    navigate('/dashboard/plan');
  };

  const handlePurchasePublishLimit = () => {
    navigate('/dashboard/plan');
  };


  // --- Title Handlers ---
  const isDefaultTitle = (t) => !t || t === 'Website Builder';
  const handleDisableCustomTitle = async () => {
    setSavingSeo(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${website._id}/custom-title`,
        { title: 'Website Builder' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      dispatch(updateWebsiteRedux(res.data.website || res.data));
      if (res.data.featureAccess) dispatch(updateFeatureAccess(res.data.featureAccess));
      setSeoTitle('Website Builder');
      setSeoMsg('Custom title disabled!');
      setTimeout(() => setSeoMsg(''), 2000);
    } catch (err) {
      setSeoMsg(err.response?.data?.message || 'Failed to disable custom title');
    } finally {
      setSavingSeo(false);
    }
  };
  const handleSaveCustomTitle = async () => {
    setSavingSeo(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${website._id}/custom-title`,
        { title: seoTitle },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      dispatch(updateWebsiteRedux(res.data.website || res.data));
      if (res.data.featureAccess) dispatch(updateFeatureAccess(res.data.featureAccess));
      setSeoMsg('SEO title updated!');
      setTimeout(() => setSeoMsg(''), 2000);
    } catch (err) {
      setSeoMsg(err.response?.data?.message || 'Failed to update SEO title');
    } finally {
      setSavingSeo(false);
    }
  };
  const handlePurchaseSeoTitle = () => {
    navigate('/dashboard/plan');
  };

  // --- Logo Handlers ---
  const isDefaultLogo = (l) => !l;
  const handleDisableCustomLogo = async () => {
    setSavingSeo(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${website._id}/custom-logo`,
        { logoUrl: '' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      dispatch(updateWebsiteRedux(res.data.website || res.data));
      if (res.data.featureAccess) dispatch(updateFeatureAccess(res.data.featureAccess));
      setSeoLogoUrl('');
      setSeoMsg('Custom logo disabled!');
      setTimeout(() => setSeoMsg(''), 2000);
    } catch (err) {
      setSeoMsg(err.response?.data?.message || 'Failed to disable custom logo');
    } finally {
      setSavingSeo(false);
    }
  };
  const handleSaveCustomLogo = async () => {
    setSavingSeo(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${website._id}/custom-logo`,
        { logoUrl: seoLogoUrl },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      dispatch(updateWebsiteRedux(res.data.website || res.data));
      if (res.data.featureAccess) dispatch(updateFeatureAccess(res.data.featureAccess));
      setSeoMsg('Logo updated!');
      setTimeout(() => setSeoMsg(''), 2000);
    } catch (err) {
      setSeoMsg(err.response?.data?.message || 'Failed to update logo');
    } finally {
      setSavingSeo(false);
    }
  };
  const handlePurchaseSeoLogo = () => {
    navigate('/dashboard/plan');
  };

  // Logo upload handler
  const handleLogoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingLogo(true);
    setUploadProgress(0);
    try {
      const storageRef = ref(storage, `logos/${website._id}_${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setUploadingLogo(false);
          setUploadProgress(0);
          alert('Upload failed: ' + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setSeoLogoUrl(downloadURL);
          setLogoPreview(downloadURL);
          setUploadingLogo(false);
          setUploadProgress(100);
        }
      );
    } catch (err) {
      setUploadingLogo(false);
      setUploadProgress(0);
      alert('Upload failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Confetti and Congratulations Modal */}
      {showCongrats && (
        <>
          <Confetti width={width} height={height+800} numberOfPieces={900} recycle={false} />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Congratulations!</h2>
              <p className="text-lg text-gray-700 mb-6">Your website is now live.</p>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
                onClick={() => setShowCongrats(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </>
      )}

      {/* Watermark Section */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <span>🏷️</span>
          Watermark Settings
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          {website.watermark
            ? featureAccess?.features?.watermark_removal?.enabled
              ? featureAccess.features.watermark_removal.value >= 1
                ? `You have ${featureAccess.features.watermark_removal.value} watermark removal${featureAccess.features.watermark_removal.value > 1 ? 's' : ''} remaining.`
                : 'You have no watermark removals left. Otherwise restore watermark of your other website if there exists.'
              : 'Remove the "Built using WebBuilder" watermark from your website.'
            : 'Restore the "Built using WebBuilder" watermark to this website.'}
        </p>
        {website.watermark ? (
          featureAccess?.features?.watermark_removal?.enabled ? (
            featureAccess.features.watermark_removal.value >= 1 ? (
              <button
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow transition cursor-pointer"
                onClick={handleRemoveWatermark}
              >
                Remove Watermark
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  className="px-5 py-2 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 transition cursor-pointer"
                  onClick={handlePurchaseWatermark}
                >
                  Purchase
                </button>
                <div className="text-sm text-gray-600">You have no watermark removals left. Otherwise restore watermark of your other website if there exists.</div>
              </div>
            )
          ) : (
            <button
              className="px-5 py-2 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 transition cursor-pointer"
              onClick={handlePurchaseWatermark}
            >
              Purchase
            </button>
          )
        ) : (
          <button
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium shadow transition cursor-pointer"
            onClick={handleRestoreWatermark}
          >
            Restore Watermark
          </button>
        )}
        {watermarkMsg && (
          <div className={`mt-2 text-sm ${watermarkMsg.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
            {watermarkMsg}
          </div>
        )}
      </div>

      {/* SEO Title & Logo Section */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <span>🔍</span>
          SEO Title & Logo
        </h4>
        <p className="text-gray-600 text-sm mb-4">
          Set a custom title and logo for your website (shown in browser tab and search results).
        </p>
        {/* Title */}
        <div className="mb-4">
          <label className={labelClass}>SEO Title</label>
          {featureAccess?.features?.title?.enabled ? (
            <>
              <div className="flex gap-2 mb-2">
                <button
                  className="px-4 py-1 bg-yellow-500 text-white rounded-lg font-medium shadow hover:bg-yellow-600 transition cursor-pointer"
                  onClick={handleDisableCustomTitle}
                  disabled={savingSeo || isDefaultTitle(seoTitle)}
                >
                  Disable Custom Title
                </button>
              </div>
              {isDefaultTitle(website.seo?.title) ? (
                featureAccess.features.title.value >= 1 ? (
                  <>
                    <input
                      className={inputClass}
                      value={seoTitle}
                      onChange={e => setSeoTitle(e.target.value)}
                      placeholder="Enter SEO title"
                      maxLength={60}
                      disabled={savingSeo}
                    />
                    <button
                      className="px-4 py-1 bg-blue-500 text-white rounded-lg font-medium shadow hover:bg-blue-600 transition cursor-pointer mt-2"
                      onClick={handleSaveCustomTitle}
                      disabled={savingSeo || isDefaultTitle(seoTitle) || !seoTitle.trim()}
                    >
                      Save
                    </button>
                    <div className="text-xs text-gray-500 mt-1">
                      {featureAccess.features.title.value > 0
                        ? `You have ${featureAccess.features.title.value} SEO title change${featureAccess.features.title.value > 1 ? 's' : ''} left.`
                        : 'No SEO title changes left. Please purchase more.'}
                    </div>
                  </>
                ) : (
                  <>
                    <input className={inputClass + ' opacity-50'} value={seoTitle} disabled readOnly />
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 transition cursor-pointer mt-2"
                      onClick={handlePurchaseSeoTitle}
                    >
                      Purchase
                    </button>
                    <div className="text-xs text-gray-500 mt-1">
                      You have no SEO title changes left. You can disable the custom title of your other websites if they exist.
                    </div>
                  </>
                )
              ) : (
                <>
                  <input
                    className={inputClass}
                    value={seoTitle}
                    onChange={e => setSeoTitle(e.target.value)}
                    placeholder="Enter SEO title"
                    maxLength={60}
                    disabled={savingSeo}
                  />
                  <button
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg font-medium shadow hover:bg-blue-600 transition cursor-pointer mt-2"
                    onClick={handleSaveCustomTitle}
                    disabled={savingSeo || !seoTitle.trim()}
                  >
                    Save
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex gap-2 items-center">
              <input className={inputClass + ' opacity-50'} value={seoTitle} disabled readOnly />
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 transition cursor-pointer"
                onClick={handlePurchaseSeoTitle}
              >
                Purchase
              </button>
            </div>
          )}
        </div>
        {seoMsg && (
          <div className={`mt-2 text-sm ${seoMsg.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>{seoMsg}</div>
        )}
        {/* Logo URL */}
        <div className="mb-4">
          <label className={labelClass}>Logo URL</label>
          {featureAccess?.features?.logoUrl?.enabled ? (
            <>
              <div className="flex gap-2 mb-2">
                <button
                  className="px-4 py-1 bg-yellow-500 text-white rounded-lg font-medium shadow hover:bg-yellow-600 transition cursor-pointer"
                  onClick={handleDisableCustomLogo}
                  disabled={savingSeo || isDefaultLogo(seoLogoUrl)}
                >
                  Disable Custom Logo
                </button>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <input
                  className={inputClass + ' flex-1'}
                  value={seoLogoUrl}
                  onChange={e => setSeoLogoUrl(e.target.value)}
                  placeholder="Enter logo image URL or upload"
                  disabled={savingSeo || uploadingLogo}
                />
                <label className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 text-sm font-medium">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoFileChange}
                    disabled={savingSeo || uploadingLogo}
                  />
                </label>
              </div>
              {uploadingLogo && (
                <div className="w-full bg-gray-200 rounded h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}
              {logoPreview && (
                <div className="mb-2">
                  <img src={logoPreview} alt="Logo Preview" className="h-12 object-contain border rounded" />
                </div>
              )}
              {isDefaultLogo(website.seo?.logoUrl) ? (
                featureAccess.features.logoUrl.value >= 1 ? (
                  <>
                    <button
                      className="px-4 py-1 bg-blue-500 text-white rounded-lg font-medium shadow hover:bg-blue-600 transition cursor-pointer mt-2"
                      onClick={handleSaveCustomLogo}
                      disabled={savingSeo || isDefaultLogo(seoLogoUrl) || !seoLogoUrl.trim()}
                    >
                      Save
                    </button>
                    <div className="text-xs text-gray-500 mt-1">
                      {featureAccess.features.logoUrl.value > 0
                        ? `You have ${featureAccess.features.logoUrl.value} logo change${featureAccess.features.logoUrl.value > 1 ? 's' : ''} left.`
                        : 'No logo changes left. Please purchase more.'}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 transition cursor-pointer mt-2"
                      onClick={handlePurchaseSeoLogo}
                    >
                      Purchase
                    </button>
                    <div className="text-xs text-gray-500 mt-1">
                      You have no logo changes left. You can disable the custom logo of your other websites if they exist.
                    </div>
                  </>
                )
              ) : (
                <>
                  <button
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg font-medium shadow hover:bg-blue-600 transition cursor-pointer mt-2"
                    onClick={handleSaveCustomLogo}
                    disabled={savingSeo || !seoLogoUrl.trim()}
                  >
                    Save
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex gap-2 items-center">
              <input className={inputClass + ' opacity-50'} value={seoLogoUrl} disabled readOnly />
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 transition cursor-pointer"
                onClick={handlePurchaseSeoLogo}
              >
                Purchase
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Set Slug */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">Your Website URL</h4>
        <div className="mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700 select-text">
            {window.location.origin}/public/{currentSlug}
          </span>
        </div>
        <label className={labelClass}>Current Slug</label>
        <div className="mb-2 text-base text-gray-800 font-mono">{currentSlug}</div>
        <label className={labelClass}>New Slug</label>
        <div className="flex items-center gap-2">
          <input
            className="px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={newSlug}
            onChange={e => setNewSlug(e.target.value.replace(/[^a-z0-9-]/g, ''))}
            placeholder="Enter new slug"
          />
          <button
            className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition"
            onClick={handleSaveSlug}
            disabled={savingSlug}
          >
            {savingSlug ? 'Saving...' : 'Save Slug'}
          </button>
        </div>
        {slugMsg && (
          <div className="mt-2 text-sm text-green-600 animate-fade-in-out">{slugMsg}</div>
        )}
        <div className="flex items-center gap-2 mt-3 bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <span>Want to have url such as <b>https://{currentSlug}.com</b> ? then</span>
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-semibold hover:bg-blue-700 transition"
            onClick={() => window.open('https://your-custom-domain-service.com', '_blank')}
          >
            click here
          </button>
        </div>
      </div>

      {/* Publish/Unpublish Button */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h4 className="text-lg font-semibold mb-2 flex gap-2">Make your website public</h4>
        {isPublished ? (
          <>
            <button
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition mb-2 cursor-pointer"
              onClick={handleUnpublish}
              disabled={publishing}
            >
              {publishing ? 'Unpublishing...' : 'Unpublish'}
            </button>
            <div className="text-xs text-blue-600 mt-2 text-center">
              Note: Unpublished websites are unavailable for public
            </div>
          </>
        ) : (
          <>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition mb-2 cursor-pointer"
              onClick={handlePublish}
              disabled={publishing || publishLimit < 1}
            >
              {publishing ? 'Publishing...' : 'Publish'}
            </button>
            {publishLimit < 1 && (
              <div className="mt-2">
                <div className="text-xs text-red-600 mb-2">You have no publish credits left. Please purchase more to publish a website. Or unpublish your other websites if they exist.</div>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition"
                  onClick={handlePurchasePublishLimit}
                >
                  Purchase Publish Credits
                </button>
              </div>
            )}
          </>
        )}
        {message && (
          <div className={`mt-2 text-sm ${message.includes('success') || message.includes('published') || message.includes('copied') ? 'text-green-700' : 'text-red-600'}`}>{message}</div>
        )}
      </div>

      {/* After Publishing: Share Link */}
      {isPublished && (
        <>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🔗</span>
              Share Link
            </h4>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={publicUrl}
                readOnly
              />
              <button
                className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition cursor-pointer"
                onClick={handleCopyLink}
              >
                Copy
              </button>
            </div>
            {messageCopy && (
              <div className="mt-2 text-sm text-green-700">{messageCopy}</div>
            )}
          </div>

          {/* QR Code Section */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📱</span>
              QR Code
            </h4>
            {featureAccess?.features?.qr_code?.enabled ? (
              <div className="flex flex-col items-center gap-2" ref={qrRef}>
                <QRCodeCanvas value={publicUrl} size={160} />
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                    onClick={handleDownloadQR}
                  >
                    Download QR
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">Scan this QR code to visit your website</div>
                <div className="text-xs text-blue-600 mt-2 text-center">
                  Note: If you update slug in URL then your QR code gets re-generated automatically
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600 text-sm mb-3">
                  Generate QR codes for easy sharing of your website
                </p>
                <button
                  className="px-5 py-2 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 transition cursor-pointer"
                  onClick={handlePurchaseQRCode}
                >
                  Purchase QR Code Feature
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Export/Import Section */}
      <ExportImportSection websiteId={website._id} seoTitle={website.seo?.title} seoLogoUrl={website.seo?.logoUrl} />
    </div>
  );
};

export default WebsiteSettings; 
import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Link as LinkIcon } from 'lucide-react';
import { Asset, AssetCategory, AssetStatus, CreateAssetRequest, UpdateAssetRequest } from '../../types';
import { masterDataApi } from '../../services/api';

interface AssetFormProps {
  asset?: Asset;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (asset: CreateAssetRequest | UpdateAssetRequest) => Promise<void>;
}

const AssetForm: React.FC<AssetFormProps> = ({ asset, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    assetName: '',
    categoryId: 0,
    statusId: 0,
    purchaseDate: '',
    warrantyExpiryDate: '',
    assetImageUrl: '',
  });
  const [categories, setCategories] = useState<AssetCategory[]>([]);
  const [statuses, setStatuses] = useState<AssetStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      console.log('AssetForm opened, loading master data...');
      loadMasterData();
      if (asset) {
        console.log('Editing asset:', asset);
        setFormData({
          assetName: asset.assetName,
          categoryId: asset.categoryId,
          statusId: asset.statusId,
          purchaseDate: asset.purchaseDate,
          warrantyExpiryDate: asset.warrantyExpiryDate || '',
          assetImageUrl: asset.assetImageUrl || '',
        });
      } else {
        console.log('Creating new asset');
        setFormData({
          assetName: '',
          categoryId: 0,
          statusId: 0,
          purchaseDate: '',
          warrantyExpiryDate: '',
          assetImageUrl: '',
        });
      }
    }
  }, [isOpen, asset]);

  const loadMasterData = async () => {
    setIsLoadingData(true);
    setError('');
    
    try {
      console.log('Loading categories and statuses...');
      
      // Test basic connectivity first
      const testResponse = await fetch('http://localhost:8080/api/test');
      if (!testResponse.ok) {
        throw new Error('Backend server is not responding');
      }
      console.log('Backend connectivity test passed');

      // Load categories
      console.log('Fetching categories...');
      const categoriesResponse = await masterDataApi.getCategories();
      console.log('Categories response:', categoriesResponse.data);
      
      // Load statuses
      console.log('Fetching statuses...');
      const statusesResponse = await masterDataApi.getStatuses();
      console.log('Statuses response:', statusesResponse.data);
      
      setCategories(categoriesResponse.data);
      setStatuses(statusesResponse.data);
      
      console.log('Master data loaded successfully');
      console.log('Categories count:', categoriesResponse.data.length);
      console.log('Statuses count:', statusesResponse.data.length);
      
    } catch (err: any) {
      console.error('Error loading master data:', err);
      
      let errorMessage = 'Failed to load form data';
      
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running on http://localhost:8080';
      } else if (err.response?.status === 401) {
        errorMessage = 'Authentication failed. Please login again.';
      } else if (err.response?.status === 403) {
        errorMessage = 'Access denied. Please check your permissions.';
      } else if (err.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.assetName.trim()) {
        throw new Error('Asset name is required');
      }
      if (formData.categoryId === 0) {
        throw new Error('Please select a category');
      }
      if (formData.statusId === 0) {
        throw new Error('Please select a status');
      }
      if (!formData.purchaseDate) {
        throw new Error('Purchase date is required');
      }

      const submitData = {
        ...formData,
        warrantyExpiryDate: formData.warrantyExpiryDate || undefined,
        assetImageUrl: formData.assetImageUrl || undefined,
      };

      console.log('Submitting asset data:', submitData);

      if (asset) {
        await onSubmit({ ...submitData, id: asset.id } as UpdateAssetRequest);
      } else {
        await onSubmit(submitData as CreateAssetRequest);
      }
      onClose();
    } catch (err: any) {
      console.error('Error submitting asset:', err);
      setError(err.response?.data?.message || err.message || 'Failed to save asset');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'categoryId' || name === 'statusId' ? parseInt(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {asset ? 'Edit Asset' : 'Add New Asset'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoadingData ? (
          <div className="p-6 text-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading form data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
                {error.includes('backend') && (
                  <div className="mt-2 text-xs">
                    <p>Troubleshooting steps:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>Ensure backend is running: <code>cd backend && mvn spring-boot:run</code></li>
                      <li>Check if http://localhost:8080/api/test is accessible</li>
                      <li>Verify database connection</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div>
              <label htmlFor="assetName" className="block text-sm font-medium text-gray-700 mb-2">
                Asset Name *
              </label>
              <input
                type="text"
                id="assetName"
                name="assetName"
                required
                value={formData.assetName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter asset name"
              />
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                Category * ({categories.length} available)
              </label>
              <select
                id="categoryId"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value={0}>Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="statusId" className="block text-sm font-medium text-gray-700 mb-2">
                Status * ({statuses.length} available)
              </label>
              <select
                id="statusId"
                name="statusId"
                required
                value={formData.statusId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value={0}>Select a status</option>
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.statusName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Purchase Date *
              </label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                required
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="warrantyExpiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Warranty Expiry Date
              </label>
              <input
                type="date"
                id="warrantyExpiryDate"
                name="warrantyExpiryDate"
                value={formData.warrantyExpiryDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="assetImageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                <LinkIcon className="w-4 h-4 inline mr-1" />
                Image URL
              </label>
              <input
                type="url"
                id="assetImageUrl"
                name="assetImageUrl"
                value={formData.assetImageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || isLoadingData}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{asset ? 'Update' : 'Create'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AssetForm;
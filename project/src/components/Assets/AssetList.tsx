import React, { useState, useEffect } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Asset, CreateAssetRequest, UpdateAssetRequest, PaginatedResponse } from '../../types';
import { assetsApi, testApi } from '../../services/api';
import AssetCard from './AssetCard';
import AssetForm from './AssetForm';

const AssetList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Asset> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | undefined>();
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (connectionStatus === 'connected') {
      loadAssets();
    }
  }, [currentPage, connectionStatus]);

  const checkConnection = async () => {
    try {
      console.log('Checking backend connection...');
      await testApi.test();
      setConnectionStatus('connected');
      console.log('Backend connection successful');
    } catch (err) {
      console.error('Backend connection failed:', err);
      setConnectionStatus('disconnected');
      setError('Cannot connect to backend server. Please ensure it is running on http://localhost:8080');
    }
  };

  const loadAssets = async () => {
    setIsLoading(true);
    setError('');
    try {
      console.log('Loading assets...');
      const response = await assetsApi.getAssets(currentPage, 9);
      console.log('Assets loaded:', response.data);
      setAssets(response.data.content);
      setPagination(response.data);
    } catch (err: any) {
      console.error('Error loading assets:', err);
      
      let errorMessage = 'Failed to load assets';
      if (err.response?.status === 401) {
        errorMessage = 'Authentication failed. Please login again.';
      } else if (err.response?.status === 403) {
        errorMessage = 'Access denied. Please check your permissions.';
      } else if (err.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running.';
        setConnectionStatus('disconnected');
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAsset = async (assetData: CreateAssetRequest) => {
    try {
      console.log('Creating asset:', assetData);
      await assetsApi.createAsset(assetData);
      console.log('Asset created successfully');
      loadAssets();
    } catch (err) {
      console.error('Error creating asset:', err);
      throw err;
    }
  };

  const handleUpdateAsset = async (assetData: UpdateAssetRequest) => {
    try {
      console.log('Updating asset:', assetData);
      await assetsApi.updateAsset(assetData);
      console.log('Asset updated successfully');
      loadAssets();
    } catch (err) {
      console.error('Error updating asset:', err);
      throw err;
    }
  };

  const handleDeleteAsset = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        console.log('Deleting asset:', id);
        await assetsApi.deleteAsset(id);
        console.log('Asset deleted successfully');
        loadAssets();
      } catch (err) {
        console.error('Error deleting asset:', err);
        setError('Failed to delete asset');
      }
    }
  };

  const handleEditAsset = (asset: Asset) => {
    console.log('Editing asset:', asset);
    setEditingAsset(asset);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAsset(undefined);
  };

  const filteredAssets = assets.filter(asset =>
    asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category?.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const retryConnection = () => {
    setConnectionStatus('checking');
    checkConnection();
  };

  if (connectionStatus === 'checking') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Checking backend connection...</p>
        </div>
      </div>
    );
  }

  if (connectionStatus === 'disconnected') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Backend Connection Failed</h3>
          <p className="text-gray-600 mb-4">
            Cannot connect to the backend server. Please ensure it's running on http://localhost:8080
          </p>
          <div className="space-y-2 text-sm text-gray-500 mb-4">
            <p>To start the backend:</p>
            <code className="block bg-gray-100 p-2 rounded">cd backend && mvn spring-boot:run</code>
          </div>
          <button
            onClick={retryConnection}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && assets.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Assets</h1>
          <p className="text-gray-600">Manage your personal assets</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Asset</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
          {error.includes('backend') && (
            <button
              onClick={retryConnection}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Retry connection
            </button>
          )}
        </div>
      )}

      {filteredAssets.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first asset'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Asset</span>
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map(asset => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onEdit={handleEditAsset}
                onDelete={handleDeleteAsset}
              />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {pagination.number * pagination.size + 1} to{' '}
                {Math.min((pagination.number + 1) * pagination.size, pagination.totalElements)} of{' '}
                {pagination.totalElements} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={pagination.first}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 text-sm font-medium">
                  Page {pagination.number + 1} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={pagination.last}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <AssetForm
        asset={editingAsset}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingAsset ? handleUpdateAsset : handleCreateAsset}
      />
    </div>
  );
};

export default AssetList;
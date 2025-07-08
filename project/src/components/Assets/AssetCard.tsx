import React from 'react';
import { Edit, Trash2, Calendar, Shield, ExternalLink } from 'lucide-react';
import { Asset } from '../../types';

interface AssetCardProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onDelete: (id: number) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isWarrantyExpired = asset.warrantyExpiryDate && 
    new Date(asset.warrantyExpiryDate) < new Date();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {asset.assetName}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {asset.category?.categoryName}
              </span>
              <span className={`px-2 py-1 rounded-full ${
                asset.status?.statusName === 'Active' 
                  ? 'bg-green-100 text-green-800'
                  : asset.status?.statusName === 'Sold'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {asset.status?.statusName}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(asset)}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(asset.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Purchased: {formatDate(asset.purchaseDate)}</span>
          </div>

          {asset.warrantyExpiryDate && (
            <div className="flex items-center text-sm">
              <Shield className="w-4 h-4 mr-2" />
              <span className={isWarrantyExpired ? 'text-red-600' : 'text-gray-600'}>
                Warranty: {formatDate(asset.warrantyExpiryDate)}
                {isWarrantyExpired && ' (Expired)'}
              </span>
            </div>
          )}

          {asset.assetImageUrl && (
            <div className="flex items-center text-sm text-gray-600">
              <ExternalLink className="w-4 h-4 mr-2" />
              <a
                href={asset.assetImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View Image
              </a>
            </div>
          )}
        </div>

        {asset.assetImageUrl && (
          <div className="mt-4">
            <img
              src={asset.assetImageUrl}
              alt={asset.assetName}
              className="w-full h-32 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetCard;
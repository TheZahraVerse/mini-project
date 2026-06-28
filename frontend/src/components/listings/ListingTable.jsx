import React from "react";
import Table from "../common/Table/Table";
import Dropdown from "../common/Dropdown";
import Checkbox from "../common/Checkbox";
import StatusBadge from "../common/StatusBadge";
import ScoreBadge from "../common/ScoreBadge";
import {
  Eye,
  Edit,
  Trash2,
  Phone,
  RefreshCw,
  MoreHorizontal,
  MapPin,
  User,
} from "lucide-react";

import { getRelativeTime, formatDate, formatPrice } from "../../helpers/dateHelpers";
import { getPropertyInfo } from "../../helpers/listingHelpers";
import { LISTING_COLUMNS } from "../../constants/tableColumns";

// ============================================
// Status Dropdown
// ============================================
const StatusDropdown = ({ listing, onStatusChange }) => {
  const statusOptions = [
    { value: "reviewed", label: "بررسی شده" },
    { value: "contacted", label: "تماس گرفته شده" },
    { value: "converted", label: "تبدیل شده" },
    { value: "rejected", label: "رد شده" },
  ];

  const items = statusOptions.map((opt) => ({
    label: opt.label,
    active: listing.status === opt.value,
    onClick: () => onStatusChange?.(listing, opt.value),
    color: listing.status === opt.value ? "bg-blue-50 text-blue-600" : "text-gray-700",
  }));

  return (
    <Dropdown
      trigger={
        <button className="text-gray-400 hover:text-gray-600 p-0.5 rounded hover:bg-gray-100">
          <RefreshCw size={12} />
        </button>
      }
      items={items}
      position="right"
    />
  );
};

// ============================================
// Action Menu
// ============================================
const ActionMenu = ({ listing, onViewDetails, onEdit, onDelete, onCall }) => {
  const items = [
    { icon: Eye, label: "جزئیات", onClick: () => onViewDetails?.(listing), color: "text-blue-600" },
    { icon: Edit, label: "ویرایش", onClick: () => onEdit?.(listing), color: "text-green-600" },
    { icon: Phone, label: "تماس", onClick: () => onCall?.(listing), color: "text-purple-600" },
    { icon: Trash2, label: "حذف", onClick: () => onDelete?.(listing), color: "text-red-600" },
  ];

  return (
    <Dropdown
      trigger={
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
          <MoreHorizontal size={16} />
        </button>
      }
      items={items}
      position="left"
    />
  );
};

// ============================================
// Listing Row
// ============================================
const ListingRow = ({
  item,
  index,
  selectedIds,
  onSelectOne,
  onViewDetails,
  onEdit,
  onDelete,
  onStatusChange,
  onCall,
}) => {
  const info = getPropertyInfo(item);

  return (
    <Table.Row>
      <Table.Cell align="center" width="40px">
        <Checkbox
          checked={selectedIds.includes(item.id)}
          onChange={() => onSelectOne?.(item.id)}
        />
      </Table.Cell>

      <Table.Cell align="center" width="48px" className="text-sm text-gray-400">
        {index + 1}
      </Table.Cell>

      <Table.Cell align="center" width="64px">
        <ScoreBadge score={item.score || 0} size="sm" />
      </Table.Cell>

      <Table.Cell width="200px" className="min-w-50">
        <h4 className="text-sm font-semibold text-gray-800 truncate max-w-45">
          {info.title}
        </h4>
        <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5 flex-wrap">
          <MapPin size={10} className="text-gray-400" />
          <span className="truncate max-w-30">{info.address}</span>
          <span className="text-gray-300">|</span>
          <span>{info.area}م</span>
          <span className="text-gray-300">|</span>
          <span>{info.rooms}اتاق</span>
          <span className="text-gray-300">|</span>
          <span>طبقه{info.floor}</span>
        </div>
      </Table.Cell>

      <Table.Cell width="150px" className="min-w-37.5">
        <div className="text-sm font-medium text-gray-700">
          {formatPrice(info.price)} تومان
        </div>
        {info.owner && (
          <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
            <User size={10} className="text-gray-400" />
            <span className="truncate max-w-25">{info.owner.name}</span>
          </div>
        )}
      </Table.Cell>

      <Table.Cell width="180px">
        <div className="flex items-center gap-1.5">
          <StatusBadge status={item.status} />
          <StatusDropdown listing={item} onStatusChange={onStatusChange} />
        </div>
      </Table.Cell>

      <Table.Cell width="140px">
        <div className="text-xs text-gray-500">
          {getRelativeTime(item.created_at)}
          <div className="text-[9px] text-gray-400 mt-0.5">
            {formatDate(item.created_at)}
          </div>
        </div>
      </Table.Cell>

      <Table.Cell align="center" width="40px">
        <ActionMenu
          listing={item}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
          onCall={onCall}
        />
      </Table.Cell>
    </Table.Row>
  );
};

// ============================================
// Main ListingTable
// ============================================
const ListingTable = ({
  listings,
  onViewDetails,
  onEdit,
  onDelete,
  onStatusChange,
  onCall,
  selectedIds = [],
  onSelectOne,
  onSelectAll,
  isAllSelected,
}) => {
  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
        <div className="text-4xl mb-2">📭</div>
        <p className="text-sm text-gray-400">هیچ داده‌ای یافت نشد</p>
      </div>
    );
  }

  return (
    <Table>
      <Table.Header>
        {LISTING_COLUMNS.map((col) => (
          <Table.Column key={col.key} align={col.align || "right"} width={col.width}>
            {col.key === "checkbox" ? (
              <Checkbox checked={isAllSelected} onChange={onSelectAll} />
            ) : (
              col.label
            )}
          </Table.Column>
        ))}
      </Table.Header>

      <Table.Body>
        {listings.map((item, index) => (
          <ListingRow
            key={item.id || index}
            item={item}
            index={index}
            selectedIds={selectedIds}
            onSelectOne={onSelectOne}
            onViewDetails={onViewDetails}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onCall={onCall}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default ListingTable;
import React from "react";
import Table from "../common/Table/Table";
import Dropdown from "../common/dropdown/Dropdown";
import Checkbox from "../common/Checkbox";
import StatusBadge from "../common/StatusBadge";
import ScoreBadge from "../common/ScoreBadge";
import ActionMenu from "../common/ActionMenu";
import StatusDropdown from "../common/dropdown/StatusDropdown";
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

import {
  getRelativeTime,
  formatDate,
  formatTime,
} from "../../helpers/dateHelpers";
import { getPropertyInfo , formatPrice} from "../../helpers/listingHelpers";
import { LISTING_COLUMNS } from "../../constants/tableColumns";

// Listing Row
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
          <StatusDropdown
            type="listing"
            currentStatus={item.status}
            onStatusChange={(newStatus) => onStatusChange?.(item, newStatus)}
          />
        </div>
      </Table.Cell>

      <Table.Cell
        width="140px"
        className="min-w-25 hidden sm:table-cell"
        style={{ minWidth: "100px" }}
      >
        <div className="text-xs text-gray-500">
          {getRelativeTime(item.created_at)}
          <div className="text-[9px] text-gray-400 mt-0.5">
            {formatDate(item.created_at)}
          </div>
          <div className="text-[9px] text-gray-400">
            {formatTime(item.created_at)}
          </div>
        </div>
      </Table.Cell>

      <Table.Cell
        align="center"
        width="40px"
        className="relative overflow-visible"
      >
        <ActionMenu
          onViewDetails={() => onViewDetails?.(item)}
          onEdit={() => onEdit?.(item)}
          onDelete={() => onDelete?.(item)}
          onCall={() => onCall?.(item)}
        />
      </Table.Cell>
    </Table.Row>
  );
};

// Main ListingTable
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
          <Table.Column
            key={col.key}
            align={col.align || "right"}
            width={col.width}
            className={`${
              col.hideOnMobile ? "hidden sm:table-cell" : ""
            } whitespace-nowrap`}
            style={{ minWidth: col.minWidth }}
          >
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

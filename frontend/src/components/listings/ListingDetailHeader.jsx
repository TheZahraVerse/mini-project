import React from "react";
import ScoreBadge from "../common/ScoreBadge";
import {
  getListingStatus,
  getSourceConfig,
  getStatusIcon,
} from "../../constants/statusConfig";
import { formatDate, formatTime } from "../../helpers/dateHelpers";
import { ExternalLink, Calendar, Clock } from "lucide-react";

const ListingDetailHeader = ({ listing, borderColor }) => {
  const { source, source_url, score, status, created_at } = listing;
  const statusConfig = getListingStatus(status);
  const sourceConfig = getSourceConfig(source);

  return (
    <div
      className={`bg-linear-to-r from-white to-gray-50 rounded-xl border-l-4 ${borderColor || "border-gray-300"} p-4 shadow-sm`}
    >
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-3">
          <ScoreBadge
            score={score}
            size="lg"
            showLabel={true}
            showIcon={true}
          />
          <div>
            <p className="text-xs text-gray-400 mb-1">وضعیت آگهی</p>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
            >
              {getStatusIcon(status)}
              <span>{statusConfig.text}</span>
            </div>
          </div>
        </div>

        <div className="text-left">
          <div className="flex items-center gap-2 justify-end mb-2">
            <span className="text-xl">{sourceConfig.icon}</span>
            <span className="text-sm font-semibold text-gray-700">
              {sourceConfig.name}
            </span>
            {source_url && (
              <a
                href={source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors"
                title="مشاهده آگهی در منبع اصلی"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={12} />
            <span>{formatDate(created_at)}</span>
            <Clock size={12} className="mr-2" />
            <span>{formatTime(created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailHeader;

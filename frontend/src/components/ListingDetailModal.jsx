import React from "react";
import Modal from "./common/Modal";
import Label from "./common/Label";
import Field from "./common/Field";
import {
  getListingStatus,
  getPropertyStatus,
  getScoreConfig,
  getSourceConfig,
} from "../constants/statusConfig";

const ListingDetailModal = ({ isOpen, onClose, listing }) => {
  if (!listing) return null;

  const {
    property,
    source,
    source_url,
    image_count,
    score,
    status,
    created_at,
  } = listing;
  const owner = property?.owner;

  const statusConfig = getListingStatus(status);
  const propertyStatusConfig = getPropertyStatus(property?.status);
  const scoreConfig = getScoreConfig(score);
  const sourceConfig = getSourceConfig(source);

  const formattedDate = new Date(created_at).toLocaleDateString("fa-IR");
  const formattedTime = new Date(created_at).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // set colors for borders same as score
  const getBorderColor = (score) => {
    if (score >= 80) return "border-emerald-500";
    if (score >= 60) return "border-emerald-400";
    if (score >= 40) return "border-yellow-500";
    if (score >= 20) return "border-orange-500";
    return "border-red-500";
  };

  const borderColor = getBorderColor(score);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="جزئیات آگهی">
      {/* Section 1: Listing */}
      <div className="mb-8">
        <h3
          className={`text-base sm:text-lg font-bold text-gray-800 border-r-4 pr-3 pb-2 mb-5 ${borderColor}`}
        >
          آگهی
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5">
          <Field label="منبع" value={sourceConfig.name} />
          <Field
            label="امتیاز"
            value={
              <Label
                text={score.toString()}
                bgColor={scoreConfig.bgColor}
                textColor={scoreConfig.textColor}
                className="text-xl"
              />
            }
            className="gap-3"
          />
          <Field label="تعداد عکس" value={image_count} />
          <Field
            label="تاریخ ثبت"
            value={`${formattedTime} - ${formattedDate}`}
          />
          <Field
            label="وضعیت آگهی"
            value={
              <Label
                text={statusConfig.text}
                bgColor={statusConfig.bgColor}
                textColor={statusConfig.textColor}
              />
            }
          />
          {source_url && (
            <div className="sm:col-span-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400">لینک آگهی</span>
                <a
                  href={source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline break-all"
                >
                  {source_url}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Property */}
      <div className="mb-8">
        <h3
          className={`text-base sm:text-lg font-bold text-gray-800 border-r-4 pr-3 pb-2 mb-5 ${borderColor}`}
        >
          مشخصات ملک
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5">
          <Field label="عنوان ملک" value={property?.title} />
          <Field
            label="قیمت"
            value={`${property?.price?.toLocaleString()} تومان`}
          />
          <Field label="متراژ" value={`${property?.area} متر`} />
          <Field label="تعداد اتاق" value={property?.rooms || "ندارد"} />
          <Field
            label="طبقه"
            value={property?.floor === 0 ? "همکف" : property?.floor}
          />
          <Field
            label="وضعیت ملک"
            value={
              <Label
                text={propertyStatusConfig.text}
                bgColor={propertyStatusConfig.bgColor}
                textColor={propertyStatusConfig.color}
              />
            }
          />
          <Field label="آدرس" value={property?.address} isFullWidth />
          {property?.description && (
            <Field label="توضیحات" value={property.description} isFullWidth />
          )}
        </div>
      </div>

      {/* Section 3: Owner */}
      <div className="mb-4 ">
        <h3
          className={`text-base sm:text-lg font-bold text-gray-800 border-r-4 pr-3 pb-2 mb-5 ${borderColor}`}
        >
          مشخصات مالک
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5">
          <Field label="نام مالک" value={owner?.name} />
          <Field label="شماره تماس" value={owner?.phone} />
          {owner?.notes && (
            <Field label="یادداشت" value={owner.notes} isFullWidth />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ListingDetailModal;

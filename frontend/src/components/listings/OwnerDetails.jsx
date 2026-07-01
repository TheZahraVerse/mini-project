// components/listings/OwnerDetails.jsx
import React from "react";
import { User, Phone } from "lucide-react";

const OwnerDetails = ({
  owner,
  isEditMode,
  editedOwnerNotes,
  onOwnerNotesChange,
  borderBg,
}) => {
  if (!owner) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-1 h-5 rounded-full ${borderBg}`} />
          <h3 className="text-base font-bold text-gray-800">اطلاعات مالک</h3>
        </div>
        <div className="bg-gray-50/80 rounded-xl p-4 text-center text-gray-500 border border-dashed border-gray-300">
          <p className="text-sm">اطلاعات مالک برای این آگهی موجود نیست</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-1 h-5 rounded-full ${borderBg}`} />
        <h3 className="text-base font-bold text-gray-800">اطلاعات مالک</h3>
      </div>

      <div className="bg-linear-to-r from-blue-50/50 to-white rounded-xl p-4 border border-blue-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">نام مالک</p>
            <div className="flex items-center gap-1">
              <User size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-800">
                {owner.name}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-0.5">شماره تماس</p>
            <div className="flex items-center gap-1">
              <Phone size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-800 dir-ltr">
                {owner.phone}
              </span>
            </div>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-gray-400 mb-0.5">یادداشت</p>
            {isEditMode ? (
              <textarea
                value={editedOwnerNotes}
                onChange={(e) => onOwnerNotesChange(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-20"
                placeholder="یادداشت جدید..."
              />
            ) : (
              <p className="text-sm text-gray-600 bg-white p-2 rounded-lg border">
                {owner.notes || "یادداشتی ثبت نشده است"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;
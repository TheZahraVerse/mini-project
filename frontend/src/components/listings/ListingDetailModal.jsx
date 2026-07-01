// components/listings/ListingDetailModal.jsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Modal from "../common/modal/Modal";
import ConfirmModal from "../common/modal/ConfirmModal";
import ListingDetailHeader from "./ListingDetailHeader";
import PropertyDetails from "./PropertyDetails";
import OwnerDetails from "./OwnerDetails";
import { getBorderColor } from "../../constants/statusConfig";
import { Edit2, X, Save, Camera, ExternalLink } from "lucide-react";

// ============================================
// Main Component
// ============================================
const ListingDetailModal = ({ 
  isOpen, 
  onClose, 
  listing, 
  mode = "view", // "view" | "edit"
  onSave, 
  onUpdate 
}) => {
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPropertyStatus, setEditedPropertyStatus] = useState("");
  const [editedOwnerNotes, setEditedOwnerNotes] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Reset state when modal opens or listing changes
  useEffect(() => {
    if (isOpen && listing) {
      setEditedPropertyStatus(listing.property?.status || "");
      setEditedOwnerNotes(listing.property?.owner?.notes || "");
      setIsEditMode(false);
    }
  }, [isOpen, listing]);

  if (!listing) return null;

  const { property, score } = listing;
  const owner = listing.property?.owner;
  const borderColor = getBorderColor(score);
  const borderBg = borderColor.replace("border", "bg");

  // ============================================
  // Edit Handlers
  // ============================================
  const handleEditToggle = () => {
    if (isEditMode) {
      setEditedPropertyStatus(property?.status || "");
      setEditedOwnerNotes(owner?.notes || "");
    }
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    try {
      const result = await onSave?.({
        propertyId: property?.id,
        ownerId: owner?.id,
        propertyData: { status: editedPropertyStatus },
        ownerData: { notes: editedOwnerNotes },
      });

      if (result !== false) {
        const updatedListing = {
          ...listing,
          property: {
            ...listing.property,
            status: editedPropertyStatus,
            owner: {
              ...listing.property?.owner,
              notes: editedOwnerNotes,
            },
          },
        };

        if (onUpdate) {
          onUpdate(updatedListing);
        }

        setIsEditMode(false);
        setShowConfirmModal(false);
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges =
    editedPropertyStatus !== property?.status ||
    editedOwnerNotes !== (owner?.notes || "");

  // ============================================
  // Render
  // ============================================
  const isEditable = mode === "edit";

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="جزئیات آگهی">
        <div className="space-y-5">
          {/* Header */}
          <ListingDetailHeader listing={listing} borderColor={borderColor}/>

          {/* Listing Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-1 h-5 rounded-full ${borderBg}`} />
              <h3 className="text-base font-bold text-gray-800">
                اطلاعات آگهی
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-gray-50/80 rounded-xl p-4">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">تعداد عکس</p>
                <div className="flex items-center gap-1.5">
                  <Camera size={14} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-800">
                    {listing.image_count}
                  </span>
                  {listing.image_count === 0 && (
                    <span className="text-xs text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                      بدون عکس
                    </span>
                  )}
                </div>
              </div>
              {listing.source_url && (
                <div className="col-span-2 mt-1 pt-1 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">لینک آگهی</p>
                  <a
                    href={listing.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all flex items-center gap-1"
                  >
                    <ExternalLink size={12} />
                    {listing.source_url.length > 50
                      ? `${listing.source_url.substring(0, 50)}...`
                      : listing.source_url}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-1 h-5 rounded-full ${borderBg}`} />
                <h3 className="text-base font-bold text-gray-800">
                  مشخصات ملک
                </h3>
              </div>
              {isEditable && (
                <button
                  onClick={handleEditToggle}
                  className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 flex items-center gap-1"
                >
                  {isEditMode ? (
                    <>
                      <X size={14} /> انصراف
                    </>
                  ) : (
                    <>
                      <Edit2 size={14} /> ویرایش
                    </>
                  )}
                </button>
              )}
            </div>

            <PropertyDetails
              property={property}
              isEditMode={isEditable && isEditMode}
              editedPropertyStatus={editedPropertyStatus}
              onPropertyStatusChange={setEditedPropertyStatus}
              borderBg={borderBg}
            />
          </div>

          {/* Owner Details */}
          <OwnerDetails
            owner={owner}
            isEditMode={isEditable && isEditMode}
            editedOwnerNotes={editedOwnerNotes}
            onOwnerNotesChange={setEditedOwnerNotes}
            borderBg={borderBg}
          />

          {/* Save Button  */}
          {isEditable && isEditMode && (
            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={handleSaveClick}
                disabled={!hasChanges || isSaving}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  !hasChanges || isSaving
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer "
                }`}
              >
                <Save size={16} />
                {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* Confirm Modal - فقط در حالت edit */}
      {isEditable && (
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmSave}
          title="تأیید ذخیره تغییرات"
          message="آیا از اعمال تغییرات روی وضعیت ملک و یادداشت مالک مطمئن هستید؟"
          confirmText="ذخیره تغییرات"
          cancelText="انصراف"
          variant="info"
          isLoading={isSaving}
        />
      )}
    </>
  );
};

// ============================================
// Sub-components
// ============================================

// show
ListingDetailModal.Show = ({ isOpen, onClose, listing }) => {
  return (
    <ListingDetailModal
      isOpen={isOpen}
      onClose={onClose}
      listing={listing}
      mode="view"
    />
  );
};

// edit
ListingDetailModal.Edit = ({ isOpen, onClose, listing, onSave, onUpdate }) => {
  return (
    <ListingDetailModal
      isOpen={isOpen}
      onClose={onClose}
      listing={listing}
      mode="edit"
      onSave={onSave}
      onUpdate={onUpdate}
    />
  );
};

export default ListingDetailModal;
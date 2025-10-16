
"use client";
import React, { useState } from "react";
import { useRecords } from "@/hooks/useRecords";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Dashboard from "@/src/components/clearing/Dashboard";
import ConsigneeManager from "@/src/components/clearing/ConsigneeManager";
import RecordForm from "@/src/components/clearing/RecordForm";
import RecordsList from "@/src/components/clearing/RecordsList";
import SavedRecordsModal from "@/src/components/clearing/SavedRecordsModal";
import UpdatePaymentModal from "@/src/components/clearing/UpdatePaymentModal";
import BackupManager from "@/src/components/clearing/BackupManager";

const ClearingForm = () => {
  const [consignees, setConsignees] = useLocalStorage("clearingConsignees", ["Consignee A", "Consignee B"]);
  const [records, setRecords] = useLocalStorage("clearingRecords", []);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateRecord, setUpdateRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterConsignee, setFilterConsignee] = useState("");

  


  const {
    editingId,
    setEditingId,
    paymentInputs,
    setPaymentInputs,
    handleSaveRecord,
    handleEditRecord,
    handleDeleteRecord,
    handleSavePaymentFromModal,
    resetForm,
    form,
    setForm,
    errors,
    isLoading
  } = useRecords(records, setRecords, consignees);

  const openUpdateModal = (record) => {
    setUpdateRecord(record);
    setShowUpdateModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-6 rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 uppercase text-center text-gray-700">
        Clearing Records
      </h2>

      <Dashboard records={records} />
      
      <BackupManager 
        records={records} 
        consignees={consignees}
        setRecords={setRecords}
        setConsignees={setConsignees}
        onShowRecords={() => setShowSavedModal(true)}
      />

      <ConsigneeManager 
        consignees={consignees}
        setConsignees={setConsignees}
      />

      <RecordForm
        form={form}
        setForm={setForm}
        errors={errors}
        isLoading={isLoading}
        editingId={editingId}
        consignees={consignees}
        onSaveRecord={handleSaveRecord}
        onResetForm={resetForm}
        onShowSavedModal={() => setShowSavedModal(true)}
      />

      <RecordsList
        records={records}
        onEditRecord={handleEditRecord}
        onDeleteRecord={handleDeleteRecord}
        onOpenUpdateModal={openUpdateModal}
      />

      <SavedRecordsModal
        isOpen={showSavedModal}
        onClose={() => setShowSavedModal(false)}
        records={records}
        consignees={consignees}
        searchTerm={searchTerm}
        filterConsignee={filterConsignee}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterConsignee}
        onEditRecord={handleEditRecord}
        onDeleteRecord={handleDeleteRecord}
        onOpenUpdateModal={(record) => {
          openUpdateModal(record);
          setShowSavedModal(false);
        }}
      />

      <UpdatePaymentModal
        isOpen={showUpdateModal}
        record={updateRecord}
        paymentInputs={paymentInputs}
        onPaymentInputChange={setPaymentInputs}
        // onSavePayment={handleSavePaymentFromModal}
        onSavePayment={(recordId) => handleSavePaymentFromModal(recordId)}
        onClose={() => {
          setShowUpdateModal(false);
          setUpdateRecord(null);
        }}
      />
    </div>
  );
};

export default ClearingForm;
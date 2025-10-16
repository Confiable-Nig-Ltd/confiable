import React from 'react';

const BackupManager = ({ records, consignees, setRecords, setConsignees, onShowRecords }) => {
  const exportData = () => {
    const data = {
      records,
      consignees,
      exportedAt: new Date().toISOString(),
      version: "1.0"
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `confiable-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.records && Array.isArray(imported.records)) {
          if (confirm('This will replace all current data. Continue?')) {
            setRecords(imported.records);
            if (imported.consignees) setConsignees(imported.consignees);
            alert('Data imported successfully!');
          }
        } else {
          alert('Invalid backup file format');
        }
      } catch (error) {
        alert('Failed to import backup file');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="flex gap-2 mb-6 p-4 bg-white rounded-lg border">
      <button 
        onClick={exportData} 
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Export Backup
      </button>
      
      <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
        Import Backup
        <input
          type="file"
          accept=".json"
          onChange={importData}
          className="hidden"
        />
      </label>
      
      <div className="flex-1"></div>
      
      {/* <button 
        onClick={() => exportAsPDF(records)} 
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Export PDF
      </button> */}
      
      <button 
        onClick={onShowRecords} 
        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        View All Records ({records.length})
      </button>
    </div>
  );
};

export default BackupManager;

// src/components/clearing/BackupManager.jsx
// import React from "react";
// import { saveAs } from "file-saver";

// const BackupManager = ({
//   records,
//   consignees,
//   setRecords,
//   setConsignees,
//   onShowRecords,
// }) => {
//   // --- Backup JSON ---
//   const handleBackup = () => {
//     const backupData = { records, consignees };
//     const blob = new Blob([JSON.stringify(backupData, null, 2)], {
//       type: "application/json",
//     });
//     saveAs(blob, "clearing_backup.json");
//   };

//   // --- Restore from JSON ---
//   const handleRestore = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       try {
//         const data = JSON.parse(event.target.result);
//         if (data.records && data.consignees) {
//           setRecords(data.records);
//           setConsignees(data.consignees);
//           alert("Backup restored successfully!");
//         } else {
//           alert("Invalid backup file format.");
//         }
//       } catch (error) {
//         console.error("Error restoring backup:", error);
//         alert("Failed to restore backup.");
//       }
//     };
//     reader.readAsText(file);
//   };

//   return (
//     <div className="flex flex-wrap gap-3 justify-center mb-6">
//       <button
//         onClick={handleBackup}
//         className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
//       >
//         Backup Data
//       </button>

//       <label className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 cursor-pointer">
//         Restore Backup
//         <input
//           type="file"
//           accept=".json"
//           className="hidden"
//           onChange={handleRestore}
//         />
//       </label>

//       <button
//         onClick={onShowRecords}
//         className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
//       >
//         View Saved Records
//       </button>
//     </div>
//   );
// };

// export default BackupManager;

import React from 'react';
import { formatCurrencyDisplay } from '@/utils/currency';
import RecordCard from './RecordCard';

const RecordsList = ({ records, onEditRecord, onDeleteRecord, onOpenUpdateModal }) => {
  if (records.length === 0) {
    return null;
  }

  const recentRecords = records.slice(0, 4);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Recent Records</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {recentRecords.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            onEdit={onEditRecord}
            onDelete={onDeleteRecord}
            onUpdatePayment={onOpenUpdateModal}
          />
        ))}
      </div>
    </div>
  );
};

export default RecordsList;
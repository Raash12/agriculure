import React, { useState } from 'react';
import { 
  FileCheck2, 
  Plus, 
  Check, 
  X, 
  Clock, 
  AlertCircle, 
  User, 
  MessageSquare
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ResourceRequest } from '../types';
import { INITIAL_REQUESTS } from '../services/api';
import { useToast } from '../context/ToastContext';

export const Requests: React.FC = () => {
  const [requests, setRequests] = useState<ResourceRequest[]>(INITIAL_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState<ResourceRequest | null>(null);
  const [officerComment, setOfficerComment] = useState('');

  const { showToast } = useToast();

  const handleApproveReject = (status: 'APPROVED' | 'REJECTED') => {
    if (!selectedReq) return;

    setRequests(requests.map(r => {
      if (r.id === selectedReq.id) {
        return {
          ...r,
          status,
          officerComment: officerComment || (status === 'APPROVED' ? 'Approved by Officer' : 'Quota exceeded'),
          approvedBy: status === 'APPROVED' ? 'Dr. Abdirahman Farah' : undefined
        };
      }
      return r;
    }));

    showToast(
      `Request ${status}`,
      `Request for ${selectedReq.farmerName} has been ${status.toLowerCase()}.`,
      status === 'APPROVED' ? 'success' : 'error'
    );

    setSelectedReq(null);
    setOfficerComment('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck2 className="w-7 h-7 text-emerald-500" />
            Farmer Input Requests & Approval Workflow
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review, approve, or reject farmer applications for seeds, fertilizer, solar pumps, and tools.
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map(req => (
          <Card key={req.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm shrink-0">
                {req.farmerName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{req.farmerName}</h3>
                  <span className="text-xs text-slate-400">({req.village})</span>
                  <Badge variant={req.urgency === 'EMERGENCY' ? 'rose' : req.urgency === 'HIGH' ? 'amber' : 'sky'}>
                    {req.urgency}
                  </Badge>
                </div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                  Requested: {req.requestedQty} {req.unit} of {req.resourceName}
                </p>
                <p className="text-xs text-slate-500 mt-1 italic">
                  "{req.reason}"
                </p>
                {req.officerComment && (
                  <p className="text-[11px] text-amber-500 font-semibold mt-2 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Officer Note: {req.officerComment}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200 dark:border-slate-800">
              <Badge variant={req.status === 'APPROVED' ? 'emerald' : req.status === 'REJECTED' ? 'rose' : 'amber'}>
                {req.status}
              </Badge>

              {req.status === 'PENDING' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedReq(req);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Review & Approve
                  </button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Review Modal */}
      {selectedReq && (
        <Modal
          isOpen={!!selectedReq}
          onClose={() => setSelectedReq(null)}
          title={`Review Request: ${selectedReq.farmerName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
              <p className="font-bold text-slate-900 dark:text-white">Resource Request Details</p>
              <p className="mt-1 text-emerald-500 font-semibold">{selectedReq.requestedQty} {selectedReq.unit} - {selectedReq.resourceName}</p>
              <p className="text-slate-400 mt-1">Reason: {selectedReq.reason}</p>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Officer Assessment Notes</label>
              <textarea
                rows={3}
                placeholder="Enter validation remarks or approval reason..."
                value={officerComment}
                onChange={(e) => setOfficerComment(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleApproveReject('REJECTED')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500 flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Reject Request
              </button>
              <button
                type="button"
                onClick={() => handleApproveReject('APPROVED')}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-1 shadow-md"
              >
                <Check className="w-4 h-4" /> Approve & Issue Receipt
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Calendar,
  Layers
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';

export const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('FARMER');
  const [fileFormat, setFileFormat] = useState<'PDF' | 'EXCEL'>('PDF');
  const { showToast } = useToast();

  const reportModules = [
    { id: 'FARMER', title: 'Cooperative Farmer Directory Report', desc: 'Complete roster of registered farmers, national IDs, GPS boundaries, and phone directory.' },
    { id: 'INVENTORY', title: 'Stock & Warehouse Audit Report', desc: 'Detailed stock levels, re-order threshold alerts, supplier valuations, and SKU barcodes.' },
    { id: 'CROP', title: 'Harvest Yield & Seasonal Production', desc: 'Gu and Der season yield targets vs actual tons harvested across Baladweyne sectors.' },
    { id: 'DISTRIBUTION', title: 'Resource Distribution Log & Receipts', desc: 'Item dispatches, digital signature confirmation tokens, and receipt numbers.' },
    { id: 'FINANCIAL', title: 'Income Statement & Financial Audit', desc: 'Revenues, operational costs, machinery repairs, and grant disbursements ledger.' }
  ];

  const handleGenerate = () => {
    showToast(
      'Report Generation Complete',
      `Downloaded ${reportType}_REPORT_2026.${fileFormat.toLowerCase()}`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <FileSpreadsheet className="w-7 h-7 text-emerald-500" />
          Enterprise Reports & PDF / Excel Exporter
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Generate official cooperative reports for management, donors, ministry, and audit compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Selection */}
        <div className="lg:col-span-2 space-y-3">
          {reportModules.map(mod => (
            <Card
              key={mod.id}
              onClick={() => setReportType(mod.id)}
              className={`cursor-pointer transition-all border ${
                reportType === mod.id
                  ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20'
                  : 'hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{mod.desc}</p>
                </div>
                {reportType === mod.id && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Configuration Panel */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">Export Settings</h3>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 uppercase text-[10px] mb-1.5">Selected Module</label>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-emerald-500">
                  {reportType} REPORT
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-400 uppercase text-[10px] mb-1.5">File Format</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFileFormat('PDF')}
                    className={`flex-1 py-2.5 rounded-xl font-bold transition-all border ${
                      fileFormat === 'PDF'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    PDF Document (.pdf)
                  </button>
                  <button
                    onClick={() => setFileFormat('EXCEL')}
                    className={`flex-1 py-2.5 rounded-xl font-bold transition-all border ${
                      fileFormat === 'EXCEL'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Excel Spreadsheet (.xlsx)
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Cooperative Header:</span>
                  <span className="font-semibold text-slate-200">Baladweyne AMS</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Watermark:</span>
                  <span className="font-semibold text-emerald-400">OFFICIAL VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <button
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-4 h-4" /> Download Report
            </button>
            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl text-xs font-bold border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print Document View
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

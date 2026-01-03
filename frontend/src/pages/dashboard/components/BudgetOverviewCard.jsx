import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetOverviewCard = ({ budgetData }) => {
  const navigate = useNavigate();
  const { totalBudget, spent, remaining, spentPercentage, categories } = budgetData;

  const cardRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (spentPercentage / 100) * circumference;

  const handleExportCard = async (e) => {
    if (e) e.stopPropagation();
    if (!cardRef?.current) return;
    setIsExporting(true);
    try {
      const jspdfModule = await import('jspdf').catch(() => null);
      const html2canvasModule = await import('html2canvas').catch(() => null);

      if (jspdfModule && html2canvasModule) {
        const jsPDF = jspdfModule.jsPDF || jspdfModule.default;
        const html2canvas = html2canvasModule.default || html2canvasModule;
        const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true, allowTaint: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('budget_overview.pdf');
      } else {
        // fallback to print
        const newWin = window.open('', '_blank', 'width=600,height=700');
        newWin.document.write(`<html><head><title>Budget Overview</title><style>body{font-family:system-ui, -apple-system, 'Segoe UI', Roboto, Arial;padding:20px;}</style></head><body>${cardRef.current.innerHTML}</body></html>`);
        newWin.document.close();
        setTimeout(() => newWin.print(), 500);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to export budget overview. Check console for details or install `jspdf` and `html2canvas`.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div ref={cardRef} className="bg-card rounded-2xl shadow-sm hover:shadow-xl p-6 transition-all duration-300 animate-fade-in border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon name="Wallet" size={18} color="#3B82F6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Budget Overview</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e?.stopPropagation();
            }}
            className="text-muted-foreground hover:text-foreground"
            aria-label="More options"
          >
            <Icon name="MoreVertical" size={20} />
          </button>
          <Button
            size="sm"
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={handleExportCard}
            loading={isExporting}
            disabled={isExporting}
            className="h-9"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Circular Progress Chart */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="16"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#3B82F6"
              strokeWidth="16"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{spentPercentage}%</span>
            <span className="text-sm text-muted-foreground">Spent</span>
          </div>
        </div>
      </div>
      {/* Budget Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Budget</span>
          <span className="text-lg font-bold text-foreground">{formatCurrency(totalBudget)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Remaining</span>
          <span className="text-lg font-bold text-green-600">{formatCurrency(remaining)}</span>
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="space-y-3 mb-6">
        {categories?.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={16} color="#3B82F6" />
              </div>
              <span className="text-sm font-medium text-foreground">{category?.name}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{formatCurrency(category?.spent)}</span>
          </div>
        ))}
      </div>
      {/* Manage Budget Button */}
      <button
        onClick={() => navigate('/budget-management')}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        Manage Budget
      </button>
    </div>
  );
};

export default BudgetOverviewCard;
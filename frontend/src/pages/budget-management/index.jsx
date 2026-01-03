import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import BudgetSummaryCard from './components/BudgetSummaryCard';
import CityBudgetRow from './components/CityBudgetRow';
import CategoryBreakdown from './components/CategoryBreakdown';
import RecentExpense from './components/RecentExpense';
import BudgetChart from './components/BudgetChart';
import SpendingTrendChart from './components/SpendingTrendChart';
import BudgetLimitModal from './components/BudgetLimitModal';
import AddExpenseModal from './components/AddExpenseModal';

const BudgetManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const budgetRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const budgetSummary = {
    totalAllocated: 15000.00,
    totalSpent: 8750.50,
    totalRemaining: 6249.50,
    dailyAverage: 437.53
  };

  const cityBudgets = [
    {
      city: "Jaipur, Rajasthan",
      allocated: 4500.00,
      spent: 3200.75,
      remaining: 1299.25,
      dailyAverage: 533.46,
      progress: 71.13
    },
    {
      city: "Udaipur, Rajasthan",
      allocated: 3800.00,
      spent: 2850.25,
      remaining: 949.75,
      dailyAverage: 475.04,
      progress: 75.01
    },
    {
      city: "Jodhpur, Rajasthan",
      allocated: 3200.00,
      spent: 1899.50,
      remaining: 1300.50,
      dailyAverage: 379.90,
      progress: 59.36
    },
    {
      city: "Jaisalmer, Rajasthan",
      allocated: 3500.00,
      spent: 800.00,
      remaining: 2700.00,
      dailyAverage: 200.00,
      progress: 22.86
    }
  ];

  const categoryData = [
    { name: "Transport", spent: 2450.75, count: 18 },
    { name: "Accommodation", spent: 3200.00, count: 8 },
    { name: "Food", spent: 1850.50, count: 32 },
    { name: "Activity", spent: 950.25, count: 12 },
    { name: "Shopping", spent: 299.00, count: 5 }
  ];

  const recentExpenses = [
    {
      id: 1,
      description: "Train tickets to Udaipur",
      amount: 125.50,
      category: "Transport",
      city: "Jaipur, Rajasthan",
      date: "2026-01-02"
    },
    {
      id: 2,
      description: "Hotel Lake Palace View - 2 nights",
      amount: 380.00,
      category: "Accommodation",
      city: "Udaipur, Rajasthan",
      date: "2026-01-01"
    },
    {
      id: 3,
      description: "Dinner at Ambrai Restaurant",
      amount: 95.75,
      category: "Food",
      city: "Udaipur, Rajasthan",
      date: "2026-01-01"
    },
    {
      id: 4,
      description: "City Palace tickets",
      amount: 45.00,
      category: "Activity",
      city: "Udaipur, Rajasthan",
      date: "2025-12-31"
    },
    {
      id: 5,
      description: "Auto-rickshaw to railway station",
      amount: 35.50,
      category: "Transport",
      city: "Jaipur, Rajasthan",
      date: "2025-12-30"
    }
  ];

  const chartData = cityBudgets?.map(city => ({
    city: city?.city?.split(',')?.[0],
    allocated: city?.allocated,
    spent: city?.spent
  }));

  const trendData = [
    { date: "Dec 28", amount: 450.25 },
    { date: "Dec 29", amount: 520.75 },
    { date: "Dec 30", amount: 385.50 },
    { date: "Dec 31", amount: 610.00 },
    { date: "Jan 1", amount: 475.50 },
    { date: "Jan 2", amount: 395.75 },
    { date: "Jan 3", amount: 437.53 }
  ];

  const handleSaveBudgetLimit = (limitData) => {
    console.log('Budget limit saved:', limitData);
  };

  const handleSaveExpense = (expenseData) => {
    console.log('Expense saved:', expenseData);
  };

  const handleExportReport = async () => {
    if (!budgetRef?.current) return;
    setIsExporting(true);
    try {
      const jspdfModule = await import('jspdf').catch(() => null);
      const html2canvasModule = await import('html2canvas').catch(() => null);

      if (jspdfModule && (jspdfModule.jsPDF || jspdfModule.default) && html2canvasModule) {
        const jsPDF = jspdfModule.jsPDF || jspdfModule.default;
        const html2canvas = html2canvasModule.default || html2canvasModule;
        const element = budgetRef.current;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true, scrollY: -window.scrollY });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        // simple pagination if needed
        setTimeout(() => {}, 0);
        const fileName = `budget_report.pdf`;
        pdf.save(fileName);
      } else {
        const elementHtml = budgetRef.current.innerHTML;
        const newWin = window.open('', '_blank', 'width=800,height=600');
        newWin.document.write(`
          <html>
            <head>
              <title>Budget Report</title>
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              <style>body{margin:0;padding:20px;background:white;color:#111;font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;} img{max-width:100%;height:auto}</style>
            </head>
            <body>${elementHtml}</body>
          </html>`);
        newWin.document.close();
        newWin.focus();
        setTimeout(() => { newWin.print(); }, 600);
      }
    } catch (err) {
      console.error(err);
      const msg = (err && err.message) || String(err || 'Unknown error');
      if (/tainted|cross-origin|CORS/i.test(msg)) {
        alert('Export failed due to cross-origin (CORS) issues on images. Use images with CORS enabled or host them on the same origin.');
      } else {
        alert('Export failed. Install `jspdf` and `html2canvas` for best results (`npm install jspdf html2canvas`) or check the console for details.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  const filteredExpenses = filterCategory === 'all' 
    ? recentExpenses 
    : recentExpenses?.filter(exp => exp?.category === filterCategory);

  const spendingPercentage = (budgetSummary?.totalSpent / budgetSummary?.totalAllocated) * 100;

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation isCollapsed={isSidebarCollapsed} />
      <div className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="p-4 md:p-6 lg:p-8">
            <div ref={budgetRef} id="budget-export-area" className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h1 className="text-foreground text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">Budget Management</h1>
                <p className="text-muted-foreground text-sm md:text-base">Track and manage your travel expenses across all destinations</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExportReport}
                  loading={isExporting}
                  disabled={isExporting}
                  className="flex-1 sm:flex-none"
                >
                  {isExporting ? 'Exporting…' : 'Export Report'}
                </Button>
                <Button
                  variant="outline"
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => setIsLimitModalOpen(true)}
                  className="flex-1 sm:flex-none"
                >
                  Set Limits
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setIsExpenseModalOpen(true)}
                  className="flex-1 sm:flex-none"
                >
                  Add Expense
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <BudgetSummaryCard
                title="Total Budget"
                amount={budgetSummary?.totalAllocated}
                icon="Wallet"
                iconColor="var(--color-primary)"
                variant="default"
              />
              <BudgetSummaryCard
                title="Total Spent"
                amount={budgetSummary?.totalSpent}
                icon="TrendingUp"
                iconColor="#F59E0B"
                trend="up"
                trendValue="12.5%"
                variant={spendingPercentage > 75 ? 'warning' : 'default'}
              />
              <BudgetSummaryCard
                title="Remaining"
                amount={budgetSummary?.totalRemaining}
                icon="PiggyBank"
                iconColor="#22C55E"
                variant="success"
              />
              <BudgetSummaryCard
                title="Daily Average"
                amount={budgetSummary?.dailyAverage}
                icon="Calendar"
                iconColor="var(--color-secondary)"
                variant="default"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              <BudgetChart data={chartData} />
              <SpendingTrendChart data={trendData} />
            </div>

            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-foreground text-xl md:text-2xl font-semibold">City-wise Budget Breakdown</h2>
                <button
                  onClick={() => navigate('/trip-detail')}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth text-sm md:text-base"
                >
                  <span>View Itinerary</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:gap-5">
                {cityBudgets?.map((city, index) => (
                  <CityBudgetRow key={index} {...city} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-xl p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6">
                    <h2 className="text-foreground text-lg md:text-xl font-semibold">Recent Expenses</h2>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                      {['all', 'Transport', 'Accommodation', 'Food', 'Activity']?.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFilterCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-smooth whitespace-nowrap ${
                            filterCategory === cat
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {cat === 'all' ? 'All' : cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {filteredExpenses?.map((expense) => (
                      <RecentExpense key={expense?.id} expense={expense} />
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/activity-management')}
                    className="w-full mt-4 py-3 text-primary hover:text-primary/80 font-medium text-sm md:text-base transition-smooth"
                  >
                    View All Expenses
                  </button>
                </div>
              </div>
              <div>
                <CategoryBreakdown categories={categoryData} />
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={24} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground text-lg md:text-xl font-semibold mb-2">Budget Optimization Tips</h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-4">
                    You're spending 71% of your budget with 40% of your trip remaining. Consider reducing daily expenses by ₹500 to stay within budget.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium">
                      Save on Transport
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium">
                      Budget Dining Options
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium">
                      Free Activities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BudgetLimitModal
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        onSave={handleSaveBudgetLimit}
      />
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSave={handleSaveExpense}
      />
    </div>
  );
};

export default BudgetManagement;
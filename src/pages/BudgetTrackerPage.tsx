import ProfessionalPageWrapper from "@/components/ProfessionalPageWrapper";
import BudgetDashboard from "@/components/BudgetDashboard";
import AttractiveCharts from "@/components/AttractiveCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, DollarSign, PiggyBank } from "lucide-react";

const BudgetTrackerPage = () => {
  return (
    <ProfessionalPageWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Main Content - Clean and Simple */}
        <BudgetDashboard />
        <AttractiveCharts />
      </div>
    </ProfessionalPageWrapper>
  );
};

export default BudgetTrackerPage;



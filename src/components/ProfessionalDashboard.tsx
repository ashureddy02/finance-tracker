import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Target, PlusCircle, Users, TrendingUp, DollarSign, PiggyBank, PieChart, TrendingDown, Users2, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProfessionalDashboard = () => {
  const navigate = useNavigate();

  const platformStats = [
    {
      title: "Average Monthly Savings",
      value: "₹32,000",
      icon: TrendingUp,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      iconColor: "text-green-500",
      description: "Across all users"
    },
    {
      title: "Overall Budget Accuracy Rate",
      value: "98%",
      icon: Target,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      iconColor: "text-blue-500",
      description: "Platform average"
    },
    {
      title: "Active Users",
      value: "12,450",
      icon: Users2,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      iconColor: "text-purple-500",
      description: "This month"
    },
    {
      title: "Total Transactions",
      value: "₹2.4M",
      icon: Globe,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      iconColor: "text-orange-500",
      description: "Processed this month"
    }
  ];

  const spendingCategories = [
    { name: "Food & Dining", percentage: 28, amount: "₹8,960", color: "bg-red-500" },
    { name: "Transportation", percentage: 22, amount: "₹7,040", color: "bg-blue-500" },
    { name: "Entertainment", percentage: 18, amount: "₹5,760", color: "bg-green-500" },
    { name: "Shopping", percentage: 15, amount: "₹4,800", color: "bg-purple-500" },
    { name: "Utilities", percentage: 12, amount: "₹3,840", color: "bg-orange-500" },
    { name: "Others", percentage: 5, amount: "₹1,600", color: "bg-gray-500" }
  ];

  const navTabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, active: true },
    { id: "tracker", label: "Budget Tracker", icon: Target, active: false },
    { id: "groups", label: "Groups", icon: Users, active: false },
    { id: "add", label: "Add Transaction", icon: PlusCircle, active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Platform Analytics Header */}
      <section className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Finance Analytics{" "}
              <span className="text-blue-600">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform-wide financial insights and spending analytics across all users
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Card className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-2xl font-bold ${stat.textColor}`}>
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {stat.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {stat.description}
                        </p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Spending Categories Chart */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  Top Spending Categories (Global)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spendingCategories.map((category, index) => (
                    <div key={category.name} className="flex items-center space-x-4">
                      <div className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0">
                        <div className={`w-full h-full rounded-full ${category.color}`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-900">{category.name}</span>
                          <span className="text-sm text-gray-600">{category.amount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${category.color}`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Platform Insights Message */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Insights</h3>
                    <p className="text-gray-700">
                      This month, most users saved more in <span className="font-semibold text-green-600">Entertainment</span> and 
                      overspent on <span className="font-semibold text-red-600">Shopping</span>. 
                      The average user is 15% more efficient with their budget compared to last month.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {navTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={tab.active ? "default" : "ghost"}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  tab.active 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => {
                  switch(tab.id) {
                    case "dashboard":
                      navigate("/");
                      break;
                    case "tracker":
                      navigate("/tracker");
                      break;
                    case "add":
                      navigate("/add");
                      break;
                    case "groups":
                      navigate("/groups");
                      break;
                  }
                }}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalDashboard;

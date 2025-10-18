import ProfessionalPageWrapper from "@/components/ProfessionalPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Brain, TrendingUp, Target, Lightbulb, BarChart3, Zap, Calculator, DollarSign, Shield } from "lucide-react";

const AIAssistantPage = () => {
  return (
    <ProfessionalPageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">AI Financial Assistant</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your AI-powered financial advisor is now available as a floating assistant on every page. Click the chat icon in the bottom-right corner to get started!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 text-blue-800">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Look for the floating chat icon →</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
              <p className="text-sm text-gray-600">AI-powered spending pattern analysis</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Goal Setting</h3>
              <p className="text-sm text-gray-600">Personalized financial goal recommendations</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Predictions</h3>
              <p className="text-sm text-gray-600">Future spending and savings forecasts</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Tips & Advice</h3>
              <p className="text-sm text-gray-600">Personalized money-saving recommendations</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Reports</h3>
              <p className="text-sm text-gray-600">Detailed financial health reports</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Chat Assistant</h3>
              <p className="text-sm text-gray-600">Interactive AI financial advisor</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Features */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-blue-600" />
              Advanced AI Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-green-600" />
                  Smart Calculations
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Retirement corpus planning</li>
                  <li>• Emergency fund calculations</li>
                  <li>• Investment return projections</li>
                  <li>• Tax optimization strategies</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-600" />
                  Personalized Advice
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Budget optimization tips</li>
                  <li>• Debt management strategies</li>
                  <li>• Investment recommendations</li>
                  <li>• Financial goal planning</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Always Available</h4>
                  <p className="text-sm text-gray-600">Access your AI assistant from any page using the floating chat button</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProfessionalPageWrapper>
  );
};

export default AIAssistantPage;



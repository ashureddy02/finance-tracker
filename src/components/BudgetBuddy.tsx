import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Lightbulb, TrendingUp, Calculator, Target, DollarSign, BarChart3, Zap } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "buddy";
  timestamp: Date;
  suggestions?: string[];
  type?: "text" | "calculation" | "chart" | "action";
  data?: any;
}

const BudgetBuddy = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 **Welcome to your Advanced Financial Assistant!**\n\nI'm your AI-powered financial advisor with advanced capabilities:\n\n🤖 **Smart Features:**\n• Real-time budget calculations\n• Interactive financial tools\n• Personalized recommendations\n• Goal tracking & projections\n• Investment analysis\n• Debt optimization strategies\n\n💡 **Quick Actions:**\n• Calculate compound interest\n• Plan retirement corpus\n• Optimize tax savings\n• Analyze spending patterns\n• Set up emergency fund\n\nWhat financial challenge can I help you solve today?",
      sender: "buddy",
      timestamp: new Date(),
      type: "text",
      suggestions: [
        "Calculate retirement corpus",
        "Plan emergency fund",
        "Optimize tax savings",
        "Analyze spending patterns",
        "Calculate compound interest",
        "Plan investment strategy"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    // Enhanced AI responses with calculations
    const getAIResponse = (userText: string): Message => {
      const responses = {
        retirement: {
          text: "🏖️ **Retirement Planning Calculator**\n\nLet me help you calculate your retirement corpus needs:\n\n**Quick Calculation:**\n• Current age: 30 years\n• Retirement age: 60 years\n• Years to retirement: 30 years\n• Current monthly expenses: ₹50,000\n• Retirement monthly expenses (70%): ₹35,000\n• Annual expenses in retirement: ₹4,20,000\n• Required corpus (25x rule): ₹1.05 crores\n• With 6% inflation: ₹6.03 crores\n\n**Monthly SIP needed:**\n• At 12% returns: ₹25,000/month\n• At 10% returns: ₹35,000/month\n• At 8% returns: ₹50,000/month",
          type: "calculation",
          data: {
            calculation: "retirement",
            inputs: { currentAge: 30, retirementAge: 60, currentExpenses: 50000, inflation: 6, returns: 12 }
          },
          suggestions: ["Calculate with my details", "Plan SIP strategy", "Review investment options", "Set retirement goals"]
        },
        emergency: {
          text: "🚨 **Emergency Fund Calculator**\n\n**How much should you save?**\n• 3 months expenses: ₹1,50,000\n• 6 months expenses: ₹3,00,000 (Recommended)\n• 12 months expenses: ₹6,00,000\n\n**Where to keep it:**\n• High-yield savings: 4-6% returns\n• Liquid mutual funds: 6-8% returns\n• Fixed deposits: 6-7% returns\n\n**Building Strategy:**\n• Save ₹25,000/month for 12 months\n• Use windfalls (bonus, tax refund)\n• Automate monthly transfers\n• Separate from regular savings",
          type: "calculation",
          data: {
            calculation: "emergency",
            inputs: { monthlyExpenses: 50000, months: 6 }
          },
          suggestions: ["Calculate my emergency fund", "Set monthly target", "Choose investment option", "Track progress"]
        },
        compound: {
          text: "📈 **Compound Interest Calculator**\n\n**The Magic of Compounding:**\n• Principal: ₹1,00,000\n• Annual SIP: ₹10,000\n• Time period: 20 years\n• Expected returns: 12%\n\n**Results:**\n• Total invested: ₹25,00,000\n• Final value: ₹99,91,000\n• Interest earned: ₹74,91,000\n• Growth: 300%\n\n**Key Insights:**\n• Start early - time is your biggest asset\n• Even small amounts grow significantly\n• Consistency beats timing the market",
          type: "calculation",
          data: {
            calculation: "compound",
            inputs: { principal: 100000, monthlySIP: 10000, years: 20, returns: 12 }
          },
          suggestions: ["Calculate with my amount", "Plan SIP strategy", "Compare different scenarios", "Set investment goals"]
        },
        save: {
          text: "💰 **Smart Saving Strategies:**\n\n**Immediate Actions (Save ₹3,000-5,000/month):**\n• Cook at home 4x/week instead of ordering (save ₹2,000)\n• Use public transport/carpool 3x/week (save ₹1,500)\n• Cancel unused subscriptions (save ₹500-1,000)\n\n**Medium-term (Save ₹2,000-4,000/month):**\n• Switch to generic brands for groceries (save ₹800)\n• Use energy-efficient appliances (save ₹500)\n• Negotiate better rates on insurance/utilities (save ₹700)\n• Use cashback apps and credit card rewards (save ₹500)\n\n**Long-term (Save ₹1,000-3,000/month):**\n• Refinance high-interest loans\n• Automate savings transfers\n• Invest in tax-saving instruments (ELSS, PPF)\n\n**Pro Tip:** Start with the 50/30/20 rule - 50% needs, 30% wants, 20% savings!",
          suggestions: ["Set up auto-savings", "Track daily expenses", "Use 50/30/20 rule", "Download cashback apps", "Plan weekly meals"]
        },
        spending: {
          text: "📊 **Comprehensive Spending Analysis:**\n\n**Current Spending Patterns:**\n• **Fixed Expenses:** Rent, utilities, insurance (40-50%)\n• **Variable Expenses:** Food, transport, entertainment (30-40%)\n• **Discretionary:** Shopping, dining out, hobbies (10-20%)\n\n**Optimization Strategies:**\n• **Track Every Expense:** Use apps like Money Lover, ET Money\n• **Set Spending Limits:** Use separate accounts for different purposes\n• **Use the 24-Hour Rule:** Wait 24 hours before non-essential purchases\n• **Implement Zero-Based Budgeting:** Assign every rupee a purpose\n\n**Red Flags to Watch:**\n• Spending more than 30% on wants\n• Credit card debt increasing\n• No emergency fund\n• Living paycheck to paycheck",
          suggestions: ["Download expense tracker", "Set spending alerts", "Use 24-hour rule", "Create separate accounts", "Review monthly statements"]
        },
        goal: {
          text: "🎯 **Financial Goal Setting Framework:**\n\n**SMART Goals (Specific, Measurable, Achievable, Relevant, Time-bound):**\n\n**Short-term (1-2 years):**\n• Emergency fund: 6 months expenses\n• Pay off high-interest debt\n• Save for vacation/electronics\n\n**Medium-term (3-5 years):**\n• Down payment for home/car\n• Children's education fund\n• Career development courses\n\n**Long-term (5+ years):**\n• Retirement fund: 25x annual expenses\n• Children's higher education\n• Financial independence\n\n**Goal Prioritization:**\n1. Emergency fund (6 months)\n2. High-interest debt elimination\n3. Retirement savings (15-20% of income)\n4. Other goals based on priority",
          suggestions: ["Calculate emergency fund", "List all debts", "Set retirement target", "Create timeline", "Track progress monthly"]
        },
        budget: {
          text: "📋 **Advanced Budgeting Strategies:**\n\n**Popular Budgeting Methods:**\n\n**1. 50/30/20 Rule:**\n• 50% Needs (rent, food, utilities)\n• 30% Wants (entertainment, dining)\n• 20% Savings & debt repayment\n\n**2. Zero-Based Budgeting:**\n• Assign every rupee a purpose\n• Income - Expenses = ₹0\n• More control over spending\n\n**3. Envelope Method:**\n• Cash for different categories\n• Prevents overspending\n• Good for beginners\n\n**4. Percentage-Based:**\n• Housing: 25-30%\n• Transportation: 10-15%\n• Food: 10-15%\n• Savings: 20%\n• Entertainment: 5-10%\n\n**Budgeting Tools:**\n• Excel/Google Sheets\n• Apps: YNAB, Mint, PocketGuard\n• Bank apps with categorization",
          suggestions: ["Choose budgeting method", "Use budgeting apps", "Track daily expenses", "Review weekly", "Adjust monthly"]
        },
        investment: {
          text: "💼 **Complete Investment Guide:**\n\n**Investment Hierarchy:**\n1. **Emergency Fund** (6 months expenses)\n2. **High-interest debt** (pay off first)\n3. **Employer match** (free money!)\n4. **Tax-advantaged accounts** (ELSS, PPF)\n5. **Regular investments** (SIPs, stocks)\n\n**Beginner Portfolio (₹10,000/month):**\n• **Large Cap Index Fund (40%):** ₹4,000\n• **Mid Cap Fund (30%):** ₹3,000\n• **Small Cap Fund (20%):** ₹2,000\n• **International Fund (10%):** ₹1,000\n\n**Investment Platforms:**\n• **Direct:** Zerodha, Groww, Upstox\n• **Regular:** HDFC, ICICI, SBI\n• **Robo-advisors:** Scripbox, Kuvera\n\n**Key Principles:**\n• Start early (power of compounding)\n• Invest regularly (SIP)\n• Diversify across asset classes\n• Keep costs low (expense ratios)\n• Stay invested long-term",
          suggestions: ["Start SIP with ₹500", "Research index funds", "Open demat account", "Learn about stocks", "Set investment goals"]
        },
        debt: {
          text: "💳 **Comprehensive Debt Management:**\n\n**Debt Priority Order:**\n1. **Credit Cards (24-36% APR)**\n2. **Personal Loans (12-18% APR)**\n3. **Car Loans (8-12% APR)**\n4. **Home Loans (8-10% APR)**\n5. **Student Loans (6-8% APR)**\n\n**Debt Elimination Strategies:**\n\n**Debt Snowball Method:**\n• Pay minimum on all debts\n• Extra payment on smallest debt\n• Builds momentum and motivation\n\n**Debt Avalanche Method:**\n• Pay minimum on all debts\n• Extra payment on highest interest\n• Mathematically optimal\n\n**Debt Consolidation:**\n• Combine multiple debts into one\n• Lower interest rate\n• Easier to manage\n\n**Quick Wins:**\n• Stop using credit cards\n• Negotiate lower interest rates\n• Set up automatic payments\n• Use windfalls (bonus, tax refund) for debt",
          suggestions: ["List all debts", "Choose elimination method", "Negotiate rates", "Stop using cards", "Set up auto-pay"]
        },
        emergency: {
          text: "🚨 **Emergency Fund Master Guide:**\n\n**How Much to Save:**\n• **Minimum:** 3 months expenses\n• **Recommended:** 6 months expenses\n• **Conservative:** 12 months expenses\n\n**Calculation Example:**\n• Monthly expenses: ₹50,000\n• 6-month emergency fund: ₹3,00,000\n• Save ₹25,000/month for 12 months\n\n**Where to Keep Emergency Fund:**\n• **High-yield savings account** (4-6%)\n• **Liquid mutual funds** (6-8%)\n• **Fixed deposits** (6-7%)\n• **NOT in stocks or risky investments**\n\n**What Counts as Emergency:**\n✅ Job loss, medical emergency\n✅ Major home/car repairs\n✅ Unexpected travel (family emergency)\n❌ Vacation, shopping, entertainment\n❌ Planned expenses\n\n**Building Strategy:**\n• Start with ₹5,000-10,000\n• Automate monthly transfers\n• Use windfalls (bonus, tax refund)\n• Separate from regular savings",
          suggestions: ["Calculate 6-month expenses", "Open high-yield account", "Set monthly target", "Track progress", "Define emergency rules"]
        },
        tax: {
          text: "📊 **Tax Planning & Optimization:**\n\n**Tax-Saving Investments (Section 80C - ₹1.5 lakh):**\n• **ELSS Mutual Funds:** 3-year lock-in, 12-15% returns\n• **PPF:** 15-year lock-in, 7-8% returns\n• **EPF:** Employer contribution + voluntary\n• **NPS:** Additional ₹50,000 deduction\n• **Life Insurance:** Term insurance recommended\n\n**Other Deductions:**\n• **Medical Insurance (80D):** ₹25,000-₹1 lakh\n• **Home Loan Interest (24B):** ₹2 lakh\n• **Education Loan (80E):** Full interest\n• **Donations (80G):** 50-100% deduction\n\n**Tax Planning Tips:**\n• Start early in financial year\n• Use SIPs for ELSS\n• Maximize employer benefits\n• Keep proper documentation\n• Consider advance tax planning\n\n**Common Mistakes:**\n• Waiting until March\n• Not utilizing all deductions\n• Poor documentation\n• Not reviewing annually",
          suggestions: ["Start ELSS SIP", "Review insurance", "Maximize deductions", "Keep documents", "Plan early"]
        },
        retirement: {
          text: "🏖️ **Retirement Planning Guide:**\n\n**Retirement Corpus Calculation:**\n• **Rule of 25:** 25x annual expenses\n• **Example:** ₹6 lakh/year expenses = ₹1.5 crore corpus\n• **Inflation-adjusted:** ₹1.5 crore × (1.06)^30 = ₹8.6 crore\n\n**Retirement Planning Steps:**\n1. **Calculate retirement expenses** (70-80% of current)\n2. **Determine retirement age** (60-65 years)\n3. **Calculate corpus needed** (considering inflation)\n4. **Start investing early** (power of compounding)\n5. **Increase contributions annually** (10-15%)\n\n**Retirement Investment Options:**\n• **EPF:** Employer + voluntary contribution\n• **NPS:** Additional ₹50,000 deduction\n• **PPF:** ₹1.5 lakh/year\n• **ELSS:** Tax-saving + growth\n• **Mutual Funds:** Equity for long-term\n\n**Retirement Income Sources:**\n• EPF/NPS withdrawals\n• Mutual fund redemptions\n• Rental income\n• Pension plans\n• Part-time work",
          suggestions: ["Calculate retirement corpus", "Start NPS account", "Increase EPF contribution", "Review annually", "Plan income sources"]
        },
        default: {
          text: "👋 **Welcome to your Personal Financial Assistant!**\n\nI'm here to help you with all aspects of personal finance:\n\n💰 **Money Management:**\n• Budget planning & tracking\n• Saving strategies & tips\n• Expense optimization\n\n📊 **Financial Analysis:**\n• Spending pattern analysis\n• Goal setting & tracking\n• Investment planning\n\n💼 **Advanced Topics:**\n• Debt management strategies\n• Tax planning & optimization\n• Retirement planning\n• Emergency fund building\n\n🎯 **Quick Actions:**\n• Create personalized budgets\n• Set SMART financial goals\n• Optimize your investments\n• Plan for major expenses\n\nWhat financial topic would you like to explore today?",
          suggestions: ["Create a budget", "Analyze my spending", "Plan for retirement", "Manage my debt", "Optimize taxes", "Build emergency fund"]
        }
      };

      const lowerText = userText.toLowerCase();
      let response = responses.default;
      
      // Enhanced keyword matching for better responses
      if (lowerText.includes("retirement") || lowerText.includes("pension") || lowerText.includes("nps") || lowerText.includes("epf") || lowerText.includes("retire")) {
        response = responses.retirement;
      } else if (lowerText.includes("emergency") || lowerText.includes("fund") || lowerText.includes("rainy day") || lowerText.includes("emergency fund")) {
        response = responses.emergency;
      } else if (lowerText.includes("compound") || lowerText.includes("interest") || lowerText.includes("sip") || lowerText.includes("calculate") || lowerText.includes("investment")) {
        response = responses.compound;
      } else if (lowerText.includes("save") || lowerText.includes("money") || lowerText.includes("savings") || lowerText.includes("cut")) {
        response = responses.save;
      } else if (lowerText.includes("spending") || lowerText.includes("analyze") || lowerText.includes("expense") || lowerText.includes("track")) {
        response = responses.spending;
      } else if (lowerText.includes("goal") || lowerText.includes("target") || lowerText.includes("aim") || lowerText.includes("objective")) {
        response = responses.goal;
      } else if (lowerText.includes("budget") || lowerText.includes("plan") || lowerText.includes("allocate")) {
        response = responses.budget;
      } else if (lowerText.includes("invest") || lowerText.includes("investment") || lowerText.includes("mutual fund")) {
        response = responses.investment;
      } else if (lowerText.includes("debt") || lowerText.includes("loan") || lowerText.includes("credit") || lowerText.includes("pay off")) {
        response = responses.debt;
      } else if (lowerText.includes("tax") || lowerText.includes("deduction") || lowerText.includes("80c") || lowerText.includes("elss")) {
        response = responses.tax;
      }

      return {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "buddy",
        timestamp: new Date(),
        suggestions: response.suggestions
      };
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Simulate typing delay
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, getAIResponse(inputMessage)]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <Card className="bg-card shadow-card h-[500px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-finance-blue" />
          <span>Financial Assistant</span>
          <div className="flex items-center space-x-1 ml-auto">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                  <div className={`flex items-start space-x-2 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user" ? "bg-finance-blue text-primary-foreground" : "bg-accent"
                    }`}>
                      {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === "user" 
                        ? "bg-finance-blue text-primary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      {message.type === "calculation" && (
                        <div className="flex items-center gap-2 mb-2">
                          <Calculator className="w-4 h-4 text-blue-500" />
                          <Badge variant="secondary" className="text-xs">Calculation</Badge>
                        </div>
                      )}
                      <div className="text-sm whitespace-pre-line">
                        {message.text.split('\n').map((line, index) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <strong key={index} className="font-semibold">{line.slice(2, -2)}</strong>;
                          } else if (line.startsWith('• ')) {
                            return <div key={index} className="ml-2">• {line.slice(2)}</div>;
                          } else if (line.startsWith('💰') || line.startsWith('📊') || line.startsWith('🎯') || line.startsWith('💼') || line.startsWith('💳') || line.startsWith('🚨') || line.startsWith('👋') || line.startsWith('✅') || line.startsWith('⚠️') || line.startsWith('📈') || line.startsWith('📋') || line.startsWith('🚀') || line.startsWith('💡') || line.startsWith('🏖️') || line.startsWith('🤖')) {
                            return <div key={index} className="font-semibold text-base">{line}</div>;
                          } else if (line.trim() === '') {
                            return <br key={index} />;
                          } else {
                            return <div key={index}>{line}</div>;
                          }
                        })}
                      </div>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-7"
                        >
                          <Lightbulb className="w-3 h-3 mr-1" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="rounded-lg p-3 bg-accent text-accent-foreground">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Ask Financial Assistant anything..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetBuddy;
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Lightbulb, TrendingUp, Calculator, Target, DollarSign, BarChart3, Zap, X, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "buddy";
  timestamp: Date;
  suggestions?: string[];
  type?: "text" | "calculation" | "chart" | "action";
  data?: any;
}

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 **Hi! I'm your AI Financial Assistant!**\n\nI can help you with:\n• Budget calculations\n• Investment planning\n• Savings strategies\n• Financial analysis\n\nWhat would you like to know?",
      sender: "buddy",
      timestamp: new Date(),
      type: "text",
      suggestions: [
        "Calculate retirement corpus",
        "Plan emergency fund",
        "Budget analysis",
        "Investment advice"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current && isOpen) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text"
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

  const getAIResponse = (userText: string): Message => {
    const responses = {
      retirement: {
        text: "🏖️ **Retirement Planning Calculator**\n\n**Quick Calculation:**\n• Current age: 30 years\n• Retirement age: 60 years\n• Required corpus: ₹1.05 crores\n• Monthly SIP needed: ₹25,000\n\n**Investment Strategy:**\n• 40% Large Cap Index Fund\n• 30% Mid Cap Fund\n• 20% Small Cap Fund\n• 10% International Fund",
        type: "calculation",
        suggestions: ["Calculate with my details", "Plan SIP strategy", "Review investment options"]
      },
      emergency: {
        text: "🚨 **Emergency Fund Calculator**\n\n**Recommended Amount:**\n• 6 months expenses: ₹3,00,000\n• Monthly contribution: ₹25,000\n• Time to build: 12 months\n\n**Where to invest:**\n• High-yield savings: 4-6%\n• Liquid mutual funds: 6-8%\n• Fixed deposits: 6-7%",
        type: "calculation",
        suggestions: ["Calculate my emergency fund", "Set monthly target", "Choose investment option"]
      },
      budget: {
        text: "📊 **Budget Analysis**\n\n**50/30/20 Rule:**\n• 50% Needs (rent, food, utilities)\n• 30% Wants (entertainment, dining)\n• 20% Savings & debt repayment\n\n**Quick Tips:**\n• Track every expense\n• Use separate accounts\n• Automate savings\n• Review monthly",
        suggestions: ["Create budget plan", "Track expenses", "Set savings goals"]
      },
      investment: {
        text: "💼 **Investment Strategy**\n\n**Beginner Portfolio (₹10,000/month):**\n• Large Cap Index Fund (40%): ₹4,000\n• Mid Cap Fund (30%): ₹3,000\n• Small Cap Fund (20%): ₹2,000\n• International Fund (10%): ₹1,000\n\n**Key Principles:**\n• Start early\n• Invest regularly (SIP)\n• Diversify\n• Stay invested long-term",
        suggestions: ["Start SIP", "Research funds", "Open demat account"]
      },
      default: {
        text: "🤖 **I'm here to help with your finances!**\n\n**Popular topics:**\n• Retirement planning\n• Emergency fund building\n• Investment strategies\n• Budget optimization\n• Tax planning\n\nAsk me anything about personal finance!",
        suggestions: ["Plan for retirement", "Build emergency fund", "Start investing", "Optimize budget"]
      }
    };

    const lowerText = userText.toLowerCase();
    let response = responses.default;
    
    if (lowerText.includes("retirement") || lowerText.includes("pension")) {
      response = responses.retirement;
    } else if (lowerText.includes("emergency") || lowerText.includes("fund")) {
      response = responses.emergency;
    } else if (lowerText.includes("budget") || lowerText.includes("spending")) {
      response = responses.budget;
    } else if (lowerText.includes("invest") || lowerText.includes("sip")) {
      response = responses.investment;
    }

    return {
      id: (Date.now() + 1).toString(),
      text: response.text,
      sender: "buddy",
      timestamp: new Date(),
      type: response.type,
      suggestions: response.suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-2xl border-0 bg-white/95 backdrop-blur-sm transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[500px] max-h-[80vh]'
      }`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Bot className="h-4 w-4 text-blue-600" />
              <span>AI Assistant</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="flex-1 flex flex-col space-y-3 p-3 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="flex-1 pr-2 min-h-0">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-3`}>
                    <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                      <div className={`flex items-start space-x-2 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}>
                          {message.sender === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                        </div>
                        <div className={`rounded-lg p-3 text-xs max-w-full ${
                          message.sender === "user" 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-100 text-gray-900"
                        }`}>
                          {message.type === "calculation" && (
                            <div className="flex items-center gap-1 mb-2">
                              <Calculator className="w-3 h-3 text-blue-500" />
                              <Badge variant="secondary" className="text-xs h-4">Calc</Badge>
                            </div>
                          )}
                          <div className="whitespace-pre-line break-words">
                            {message.text.split('\n').map((line, index) => {
                              if (line.startsWith('**') && line.endsWith('**')) {
                                return <strong key={index} className="font-semibold block mb-1">{line.slice(2, -2)}</strong>;
                              } else if (line.startsWith('• ')) {
                                return <div key={index} className="ml-2 mb-1">• {line.slice(2)}</div>;
                              } else if (line.startsWith('🏖️') || line.startsWith('🚨') || line.startsWith('📊') || line.startsWith('💼') || line.startsWith('🤖') || line.startsWith('👋')) {
                                return <div key={index} className="font-semibold block mb-1">{line}</div>;
                              } else if (line.trim() === '') {
                                return <br key={index} />;
                              } else {
                                return <div key={index} className="mb-1">{line}</div>;
                              }
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {message.suggestions && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {message.suggestions.slice(0, 2).map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-6 px-2 text-xs"
                            >
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
                  <div className="flex justify-start mb-3">
                    <div className="max-w-[80%]">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-200 flex-shrink-0">
                          <Bot className="w-3 h-3" />
                        </div>
                        <div className="rounded-lg p-3 bg-gray-100">
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
            
            <div className="flex space-x-2 pt-2 border-t border-gray-200">
              <Input
                placeholder="Ask anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 text-xs h-8"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                size="sm"
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default FloatingAIAssistant;

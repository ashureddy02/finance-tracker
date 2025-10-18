import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { API } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Calendar, Target, TrendingUp, DollarSign } from "lucide-react";

const Auth = ({ onSuccess }: { onSuccess: () => void }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup" | "preferences">("login");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Budget preferences
  const [budgetPeriod, setBudgetPeriod] = useState("monthly");
  const [budgetMethod, setBudgetMethod] = useState("50-30-20");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [financialGoals, setFinancialGoals] = useState<string[]>([]);

  const submit = async () => {
    try {
      setLoading(true);
      setError(null);
      if (mode === "signup") {
        const res = await API.auth.signup({ accountName, accountNumber, ifsc, password });
        API.token = res.token;
        setMode("preferences");
        return;
      } else if (mode === "preferences") {
        // Save preferences to user profile
        console.log("Saving preferences:", { budgetPeriod, budgetMethod, monthlyIncome, financialGoals });
        onSuccess?.();
        navigate("/", { replace: true });
        return;
      } else {
        const res = await API.auth.login({ accountNumber, password });
        API.token = res.token;
        onSuccess?.();
        navigate("/", { replace: true });
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoalToggle = (goal: string) => {
    setFinancialGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  if (mode === "preferences") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Set Up Your Budget Preferences
            </CardTitle>
            <p className="text-sm text-gray-600">Help us personalize your financial tracking experience</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Budget Period */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                How would you like to track your budget?
              </Label>
              <RadioGroup value={budgetPeriod} onValueChange={setBudgetPeriod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly - Track expenses every week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly - Track expenses every month (Recommended)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quarterly" id="quarterly" />
                  <Label htmlFor="quarterly">Quarterly - Track expenses every 3 months</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Budget Method */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Which budgeting method appeals to you?
              </Label>
              <RadioGroup value={budgetMethod} onValueChange={setBudgetMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="50-30-20" id="50-30-20" />
                  <Label htmlFor="50-30-20">50/30/20 Rule - 50% needs, 30% wants, 20% savings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zero-based" id="zero-based" />
                  <Label htmlFor="zero-based">Zero-Based Budgeting - Assign every rupee a purpose</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="envelope" id="envelope" />
                  <Label htmlFor="envelope">Envelope Method - Separate categories with limits</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage">Percentage-Based - Allocate by income percentages</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Monthly Income */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                What's your approximate monthly income? (Optional)
              </Label>
              <Input 
                type="number" 
                placeholder="e.g., 50000" 
                value={monthlyIncome} 
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />
              <p className="text-xs text-gray-500">This helps us provide better budget recommendations</p>
            </div>

            {/* Financial Goals */}
            <div className="space-y-2">
              <Label>What are your main financial goals? (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Build emergency fund",
                  "Pay off debt",
                  "Save for vacation",
                  "Buy a home",
                  "Plan for retirement",
                  "Start investing",
                  "Save for education",
                  "Buy a car"
                ].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={goal}
                      checked={financialGoals.includes(goal)}
                      onChange={() => handleGoalToggle(goal)}
                      className="rounded"
                    />
                    <Label htmlFor={goal} className="text-sm">{goal}</Label>
                  </div>
                ))}
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
            
            <div className="flex gap-2">
              <Button className="flex-1" onClick={submit} disabled={loading}>
                {loading ? "Setting up..." : "Complete Setup"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Login" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === "signup" && (
            <Input placeholder="Bank Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
          )}
          <Input placeholder="Bank Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
          {mode === "signup" && (
            <Input placeholder="IFSC Number" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
          )}
          <div className="flex gap-2">
            <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="button" variant="outline" onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex gap-2">
            <Button className="flex-1" onClick={submit} disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </Button>
            <Button variant="outline" onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Sign Up" : "Have an account? Login"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;



// Response wrapper type for all API responses
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    status: number;
  };
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  university: string;
  major: string;
  profile_picture_url?: string | null;
  created_at: string;
  updated_at: string;
  role: string;
}

export interface RegisterRequest {
  full_name: string;
  university: string;
  major: string;
  phone: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

// Auth state management
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null;
}

/**
 * Transaction types
 */
export interface TransactionRecurring {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  end_type: "never" | "on_date" | "after_occurrences";
  end_date?: string | null;
  occurrences?: number | null;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
  incomeCount: number;
  expenseCount: number;
}

export interface TransactionSummaryResponse {
  status: boolean;
  message: string;
  data: TransactionSummary;
}

export interface TransactionRequest {
  amount: number;
  type: "income" | "expense";
  description: string;
  category: string;
  transaction_date: string;
  transaction_time: string;
  payment_method: string;
  notes?: string;
  recurring?: TransactionRecurring;
}

// Allow explicit null to remove recurring when update
export interface TransactionUpdateRequest
  extends Omit<Partial<TransactionRequest>, "recurring"> {
  recurring?: TransactionRecurring | null;
}

export interface Transaction {
  id: string | number;
  amount: number;
  type: "income" | "expense";
  description: string;
  category: string;
  transaction_date: string;
  transaction_time: string;
  payment_method: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  recurring?: TransactionRecurring;
}

export interface TransactionResponse {
  status: boolean;
  message: string;
  data: Transaction;
}

export interface TransactionListResponse {
  status: boolean;
  message: string;
  data: Transaction[];
}

export interface TransactionDeleteResponse {
  status: boolean;
  message: string;
}

// UI-specific transaction type for frontend display
export interface UITransaction {
  id: string | number;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number;
  date: string | Date;
}

/**
 * Budget types
 */
export interface Budget {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  spent: number;
  remaining: number;
  month_year: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetRequest {
  category: string;
  amount: number;
  month_year: string;
  notes?: string;
}

export interface BudgetResponse {
  status: boolean;
  message: string;
  data: Budget;
}

export interface BudgetListResponse {
  status: boolean;
  message: string;
  data: {
    budgets: Budget[];
  };
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  month_year: string;
}

export interface BudgetSummaryResponse {
  status: boolean;
  message: string;
  data: BudgetSummary;
}

export interface BudgetDeleteResponse {
  status: boolean;
  message: string;
}

// UI-specific budget type for frontend display
export interface UIBudget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  remaining: number;
  month_year: string;
  notes: string;
}

/**
 * Challenge types
 */
export interface Challenge {
  id: string;
  title: string;
  description: string;
  total_days: number;
  target_amount: number;
  color: string;
  difficulty: number;
  type: string;
  targetText: string;
  features: string[];
}

export interface ChallengeResponse {
  status: boolean;
  message: string;
  data: Challenge;
}

export interface ChallengeListResponse {
  status: boolean;
  message: string;
  data: Challenge[];
}

export interface ChallengeDeleteResponse {
  status: boolean;
  message: string;
}

// UI-specific challenge type for frontend display
export interface UiChallenge {
  id: string;
  challenge_id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: number;
  category: string;
  features: string[];
  targetText: string;
  color: string;
}

/*
 * Active challenge types
 */
export interface ActiveChallenge {
  id: string;
  challenge_id: string;
  title: string;
  description: string;
  progress: string;
  percentComplete: number;
  color: string;
  savingsLabel: string;
  savingsAmount: number;
  actionText: string;
  type: string;
  checkInDescription: string;
  duration: string;
  difficulty: number;
  targetAmount: number;
  status: string;
  startDate: string;
  endDate: string;
  features?: string[];
  steps?: string[];
  tips?: string[];
  activityLog?: ChallengeActivity[];
}

export interface ChallengeActivity {
  id: string;
  action: string;
  date: string;
  amount?: number;
  completed?: boolean;
  difficulty?: number;
  notes?: string;
  shared?: boolean;
}

export interface ActiveChallengesResponse {
  status: boolean;
  message: string;
  data: ActiveChallenge[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

/**
 * Challenge Join Request/Response
 */
export interface ChallengeJoinRequest {
  challenge_id: string;
  goal: string;
  start_date: string;
}

export interface ChallengeJoinResponse {
  status: boolean;
  message: string;
  data: ActiveChallenge;
}

/**
 * Challenge Check-In Request/Response
 */
export interface ChallengeCheckInRequest {
  date: string;
  amount?: number;
  completed?: boolean;
  difficulty: number;
  notes?: string;
  shareProgress: boolean;
}

export interface ChallengeCheckInResponse {
  status: boolean;
  message: string;
  data: ActiveChallenge;
}

/**
 * Profile types
 */
export interface UserProfile
  extends Omit<User, "id" | "created_at" | "updated_at" | "role" | "email"> {
  id?: string;
  email?: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    budget: boolean;
    challenges: boolean;
  };
  display: {
    currency: string;
    dateFormat: string;
    theme: string;
  };
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface FinancialGoal {
  id?: string;
  name: string;
  description: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
}

/**
 * Profile response types
 */
export interface GetProfileResponse {
  success: boolean;
  data: UserProfile;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface UploadProfilePictureResponse {
  success: boolean;
  message: string;
  data: {
    profile_picture_url: string;
  };
}

/**
 * Dashboard types
 */
export interface DashboardSummary {
  balance: number;
  balanceChange: number;
  income: number;
  expenses: number;
  remaining: number;
  goalTarget: number;
  goalProgress: number;
}

export interface DashboardPrediction {
  predictedExpenses: number;
  expenseChangePercent: number;
  topExpenseCategory: string;
  topExpensePercentage: number;
  recommendedSavings: number;
}

export interface DailyTip {
  title: string;
  content: string;
}

export interface DashboardDataResponse {
  status: boolean;
  message: string;
  data: {
    summary: DashboardSummary;
    prediction: DashboardPrediction;
    tip: DailyTip;
  };
}

// Stock analysis metrics data structure
export interface StockAnalysisMetrics {
  [key: string]: number; // All metrics are numbers with string keys
}

// Stock analysis result data structure
export interface StockAnalysisResult {
  avg_metrics: StockAnalysisMetrics;
  "rekomendasi (%)": number;
}

// Gemini chatbot interfaces
export interface GeminiMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface GeminiResponse {
  message: string | null;
  error: string | null;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: GeminiMessage[];
  createdAt: Date;
  updatedAt: Date;
}

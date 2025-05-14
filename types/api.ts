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

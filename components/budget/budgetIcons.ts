interface BudgetIcon {
  id: string;
  name: string;
  iconPath: string;
  iconColor: string;
}

export const budgetIcons: Record<string, BudgetIcon> = {
  food: {
    id: "food",
    name: "Food",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    iconColor: "orange",
  },
  transportation: {
    id: "transportation",
    name: "Transportation",
    iconPath: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
    iconColor: "blue",
  },
  education: {
    id: "education",
    name: "Education",
    iconPath:
      "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
    iconColor: "indigo",
  },
  entertainment: {
    id: "entertainment",
    name: "Entertainment",
    iconPath:
      "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z",
    iconColor: "purple",
  },
  housing: {
    id: "housing",
    name: "Housing",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    iconColor: "pink",
  },
  utilities: {
    id: "utilities",
    name: "Utilities",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    iconColor: "yellow",
  },
  healthcare: {
    id: "healthcare",
    name: "Healthcare",
    iconPath: "M4.5 12.5l8-8a4.94 4.94 0 017 7l-8 8a4.94 4.94 0 01-7-7z",
    iconColor: "red",
  },
  shopping: {
    id: "shopping",
    name: "Shopping",
    iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    iconColor: "green",
  },
  personal: {
    id: "personal",
    name: "Personal",
    iconPath:
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    iconColor: "teal",
  },
  other: {
    id: "other",
    name: "Other",
    iconPath:
      "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z",
    iconColor: "gray",
  },
};

export default budgetIcons;

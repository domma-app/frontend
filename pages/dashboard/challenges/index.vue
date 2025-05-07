<template>
  <div>
    <ChallengeHeader @open-join-modal="showJoinChallengeModal = true" />

    <ActiveChallenges
      :challenges="activeChallenges"
      @check-in="handleChallengeCheckIn"
    />

    <ChallengeCatalog
      :challenges="catalogChallenges"
      @join="joinChallenge"
      @browse-more="handleBrowseMore"
    />

    <JoinChallengeModal
      :show="showJoinChallengeModal"
      :initial-challenge-name="selectedChallenge"
      :challenge-options="challengeOptions"
      @close="showJoinChallengeModal = false"
      @submit="submitJoinChallenge"
    />
  </div>
</template>

<script setup lang="ts">
import ActiveChallenges from "~/components/challenges/ActiveChallenges.vue";
import ChallengeCatalog from "~/components/challenges/ChallengeCatalog.vue";
import ChallengeHeader from "~/components/challenges/ChallengeHeader.vue";
import JoinChallengeModal from "~/components/challenges/JoinChallengeModal.vue";

definePageMeta({
  layout: "dashboard",
});

interface ActiveChallenge {
  id: number;
  title: string;
  description: string;
  progress: string;
  percentComplete: number;
  color: string;
  savingsLabel: string;
  savingsAmount: number;
  actionText: string;
}

interface CatalogChallenge {
  id: number;
  title: string;
  description: string;
  features: string[];
  targetText: string;
  color: string;
}

interface JoinChallengeForm {
  name: string;
  startDate: string;
  notifications: {
    daily: boolean;
    progress: boolean;
  };
  goal: string;
}

const showJoinChallengeModal = ref(false);
const selectedChallenge = ref("");

// Mock data for active challenges
const activeChallenges = ref<ActiveChallenge[]>([
  {
    id: 1,
    title: "30-Day No Eating Out",
    description: "Cook all your meals at home for 30 days",
    progress: "Day 15/30",
    percentComplete: 50,
    color: "green",
    savingsLabel: "Potential Savings",
    savingsAmount: 150000,
    actionText: "Check In",
  },
  {
    id: 2,
    title: "52-Week Savings",
    description: "Save an increasing amount each week for a year",
    progress: "Week 20/52",
    percentComplete: 38,
    color: "blue",
    savingsLabel: "Current Saved",
    savingsAmount: 210000,
    actionText: "Deposit",
  },
]);

// Mock data for catalog challenges
const catalogChallenges = ref<CatalogChallenge[]>([
  {
    id: 1,
    title: "30-Day Rp5.000 Challenge",
    description: "Save Rp5.000 every day for a month",
    features: [
      "Put away Rp5.000 each day",
      "Save Rp150.000 in just one month",
      "Perfect for beginners",
    ],
    targetText: "Target: Rp150.000",
    color: "purple",
  },
  {
    id: 2,
    title: "No Spend Weekend",
    description: "Commit to spending Rp0 for an entire weekend",
    features: [
      "No discretionary spending for 48 hours",
      "Break the impulse spending habit",
      "Do this challenge once a month",
    ],
    targetText: "Est. Savings: Rp50.000+",
    color: "amber",
  },
  {
    id: 3,
    title: "1% More Savings",
    description: "Increase your monthly savings rate by 1%",
    features: [
      "Start with just 1% of your income",
      "Add another 1% each month",
      "Build sustainable saving habits",
    ],
    targetText: "3-month challenge",
    color: "emerald",
  },
]);

// List of available challenges for the modal dropdown
const challengeOptions = [
  "30-Day No Eating Out",
  "52-Week Savings",
  "30-Day Rp5.000 Challenge",
  "No Spend Weekend",
  "1% More Savings",
];

// Event handlers - defined as separate functions to avoid serialization issues
function joinChallenge(challengeName: string): void {
  selectedChallenge.value = challengeName;
  showJoinChallengeModal.value = true;
}

function submitJoinChallenge(newChallenge: JoinChallengeForm): void {
  // In a real app, you would save the challenge to the database
  console.log("Joining challenge:", newChallenge);

  // Show success notification
  alert(`Successfully joined ${newChallenge.name}!`);

  // Close modal
  showJoinChallengeModal.value = false;
}

function handleChallengeCheckIn(id: number): void {
  console.log("Checking in for challenge:", id);
  // Implementation would update the challenge progress
}

function handleBrowseMore(): void {
  console.log("Browsing more challenges");
  // In a real app, this would navigate to a full challenge catalog page
}
</script>

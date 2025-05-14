<template>
  <div>
    <!-- Loading state while checking authentication -->
    <div
      v-if="isLoading"
      class="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div class="text-center">
        <div
          class="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
        ></div>
        <h2 class="text-xl text-gray-700">Loading...</h2>
      </div>
    </div>

    <!-- Landing page content shown when user is not authenticated -->
    <div v-else-if="!isAuthenticated">
      <!-- Hero Section -->
      <section class="relative bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto">
          <div
            class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
          >
            <svg
              class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div class="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
              <div class="sm:ml-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="sm:text-center lg:text-left">
                  <h1
                    class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                  >
                    <span class="block">Manage Student Finances</span>
                    <span class="block text-green-500">Smartly</span>
                  </h1>
                  <p
                    class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  >
                    A financial app specifically for students that helps you
                    manage money more wisely, save expenses, and reach financial
                    goals.
                  </p>
                  <div
                    class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  >
                    <div class="rounded-lg shadow">
                      <NuxtLink
                        to="/register"
                        class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10"
                      >
                        Register for Free
                      </NuxtLink>
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                      <NuxtLink
                        to="/login"
                        class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10"
                      >
                        Login
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
            alt="Student finance management"
          />
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2
              class="text-base text-green-500 font-semibold tracking-wide uppercase"
            >
              Key Features
            </h2>
            <p
              class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Complete Financial Solution for Students
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              DOMMA provides all the tools you need to manage your finances well
              during college.
            </p>
          </div>

          <div class="mt-10">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                v-for="(feature, index) in features"
                :key="index"
                class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white"
                    >
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                        v-html="feature.icon"
                      ></svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">
                      {{ feature.title }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ feature.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center mb-10">
            <h2
              class="text-base text-green-500 font-semibold tracking-wide uppercase"
            >
              Testimonials
            </h2>
            <p
              class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              What They Say
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Testimonial 1 -->
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="flex items-center mb-4">
                <div
                  class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-xl font-bold text-green-500"
                >
                  A
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium text-gray-900">Ahmad</h4>
                  <p class="text-sm text-gray-500">Engineering Student, UI</p>
                </div>
              </div>
              <p class="text-gray-600">
                "This app helps me manage my monthly budget better. The
                categorization and budget alert features are really useful!"
              </p>
            </div>

            <!-- Testimonial 2 -->
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="flex items-center mb-4">
                <div
                  class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-xl font-bold text-green-500"
                >
                  S
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium text-gray-900">Sarah</h4>
                  <p class="text-sm text-gray-500">Medical Student, UGM</p>
                </div>
              </div>
              <p class="text-gray-600">
                "Thanks to DOMMA, I managed to save for an international medical
                conference. The saving challenge feature is very motivating!"
              </p>
            </div>

            <!-- Testimonial 3 -->
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="flex items-center mb-4">
                <div
                  class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-xl font-bold text-green-500"
                >
                  R
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium text-gray-900">Reza</h4>
                  <p class="text-sm text-gray-500">Business Student, IPB</p>
                </div>
              </div>
              <p class="text-gray-600">
                "I discovered a lot of new scholarships from the DOMMA forum.
                The community and scholarship tracking features are really
                helpful!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- About Us Section -->
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2
              class="text-base text-green-500 font-semibold tracking-wide uppercase"
            >
              About Us
            </h2>
            <p
              class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Our Mission
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Empowering students to take control of their financial future.
            </p>
          </div>

          <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div class="prose prose-green">
              <p class="text-gray-600">
                DOMMA was founded with a simple vision: to help students
                navigate the complex world of personal finance during their
                academic journey.
              </p>
              <p class="text-gray-600 mt-4">
                Our team of financial experts and former students understands
                the unique challenges that come with managing money while in
                school. From juggling tuition payments to budgeting for
                essentials, we've designed an all-in-one platform specifically
                tailored to student needs.
              </p>
              <p class="text-gray-600 mt-4">
                We believe that financial literacy is a crucial skill that every
                student should develop early. Our platform not only helps you
                track expenses but also educates you on making smarter financial
                decisions.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0 h-6 w-6 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p class="ml-3 text-gray-600">
                    <span class="font-medium text-gray-900"
                      >Accessibility:</span
                    >
                    Financial tools that every student can understand and use
                  </p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 h-6 w-6 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p class="ml-3 text-gray-600">
                    <span class="font-medium text-gray-900">Education:</span>
                    Helping students develop lifelong financial skills
                  </p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 h-6 w-6 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p class="ml-3 text-gray-600">
                    <span class="font-medium text-gray-900">Community:</span>
                    Building a supportive network of financially-savvy students
                  </p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 h-6 w-6 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p class="ml-3 text-gray-600">
                    <span class="font-medium text-gray-900">Innovation:</span>
                    Continuously improving our tools to meet student needs
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-green-500">
        <div
          class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
        >
          <h2
            class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            <span class="block">Ready to manage your finances?</span>
            <span class="block text-green-100"
              >Start your financial journey today.</span
            >
          </h2>
          <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div class="inline-flex rounded-md shadow">
              <NuxtLink
                to="/register"
                class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-green-600 bg-white hover:bg-green-50"
              >
                Register Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "landing",
});

const router = useRouter();
const { isAuthenticated } = useAuth();
const isLoading = ref(true);

// Check authentication status and redirect if needed
onMounted(() => {
  // Short timeout to ensure auth state is loaded
  setTimeout(() => {
    isLoading.value = false;
    if (isAuthenticated.value) {
      router.push("/dashboard");
    }
  }, 500);
});

// Watch for changes in authentication status
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    router.push("/dashboard");
  }
});
// Features section data (translated)
const features = [
  {
    title: "Financial Summary",
    description:
      "View all your financial transactions in one intuitive and easy-to-understand display",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
  },
  {
    title: "Smart Budgeting",
    description:
      "Easily create and manage monthly budgets, get alerts when you're nearing your spending limits",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: "Saving Challenges",
    description:
      "Join various money-saving challenges to boost your saving skills",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>',
  },
  {
    title: "Discussion Forum",
    description:
      "Get financial tips and share money management experiences with fellow students",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>',
  },
  {
    title: "Spending Prediction",
    description:
      "AI technology that helps predict your spending next month based on transaction patterns",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>',
  },
  {
    title: "Scholarship Tracker",
    description:
      "Track your scholarship applications, deadlines, and discover new opportunities",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>',
  },
];
</script>

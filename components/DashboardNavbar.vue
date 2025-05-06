<template>
  <nav class="bg-white shadow-sm fixed w-full top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Logo and brand -->
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/dashboard" class="text-green-500 font-bold text-xl">
              DOMMA
            </NuxtLink>
          </div>
        </div>

        <!-- Navigation items - Desktop -->
        <div class="hidden md:flex items-center justify-center">
          <div class="flex space-x-2">
            <NuxtLink
              to="/dashboard"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              :class="[
                $route.path === '/dashboard'
                  ? 'text-green-500 bg-green-50'
                  : 'text-gray-700 hover:text-green-500 hover:bg-gray-50',
              ]"
            >
              <svg
                class="w-5 h-5 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span>Dashboard</span>
            </NuxtLink>

            <NuxtLink
              to="/transaction"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              :class="[
                $route.path.startsWith('/transaction')
                  ? 'text-green-500 bg-green-50'
                  : 'text-gray-700 hover:text-green-500 hover:bg-gray-50',
              ]"
            >
              <svg
                class="w-5 h-5 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 9l-7 7-3-3m0 0l.94-2.06L4.03 13.8l1.9-1.9 2.07-.93m10 6.87l-2.53-4.2-1.47.79 2.53 4.2M5 3l4 2m0 0L5 9m4-4l8 8"
                ></path>
              </svg>
              <span>Transaksi</span>
            </NuxtLink>

            <NuxtLink
              to="/budget"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              :class="[
                $route.path.startsWith('/budget')
                  ? 'text-green-500 bg-green-50'
                  : 'text-gray-700 hover:text-green-500 hover:bg-gray-50',
              ]"
            >
              <svg
                class="w-5 h-5 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Anggaran</span>
            </NuxtLink>

            <NuxtLink
              to="/challenges"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              :class="[
                $route.path.startsWith('/challenges')
                  ? 'text-green-500 bg-green-50'
                  : 'text-gray-700 hover:text-green-500 hover:bg-gray-50',
              ]"
            >
              <svg
                class="w-5 h-5 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              <span>Tantangan</span>
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-center">
          <!-- Notification bell -->
          <button
            class="p-2 rounded-full text-gray-600 hover:text-green-500 hover:bg-gray-100 relative"
          >
            <span
              class="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"
            ></span>
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </button>

          <!-- Student dropdown menu -->
          <div class="ml-3 relative">
            <div>
              <button
                @click="toggleDropdown"
                type="button"
                class="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 p-1.5"
                id="user-menu-button"
              >
                <span class="sr-only">Open user menu</span>
                <span
                  class="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold"
                >
                  {{ userInitials }}
                </span>
              </button>
            </div>

            <div
              v-if="isDropdownOpen"
              class="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              @click.away="isDropdownOpen = false"
            >
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm text-gray-500">Signed in as</p>
                <p class="text-sm font-medium text-gray-800 truncate">
                  {{ userName }}
                </p>
              </div>
              <div class="pt-2">
                <div class="border-b border-gray-100 pb-2">
                  <p
                    class="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mahasiswa+
                  </p>
                  <NuxtLink
                    to="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Wishlist & Target
                  </NuxtLink>
                  <NuxtLink
                    to="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Utang & Piutang
                  </NuxtLink>
                  <NuxtLink
                    to="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Beasiswa Tracker
                  </NuxtLink>
                  <NuxtLink
                    to="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Kalender Finansial
                  </NuxtLink>
                </div>
              </div>
              <div class="py-1">
                <NuxtLink
                  to="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </NuxtLink>
                <NuxtLink
                  to="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </NuxtLink>
                <button
                  @click="logout"
                  class="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="flex md:hidden ml-2">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-controls="mobile-menu"
              :aria-expanded="isMobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                v-if="!isMobileMenuOpen"
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-if="isMobileMenuOpen"
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden border-t border-gray-100"
      id="mobile-menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          to="/dashboard"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="[
            $route.path === '/dashboard'
              ? 'text-green-500 bg-green-50'
              : 'text-gray-700 hover:text-green-500 hover:bg-gray-50',
          ]"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/transaction"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="[
            $route.path.startsWith('/transaction')
              ? 'text-green-500 bg-green-50'
              : 'text-gray-700 hover:text-green-500 hover:bg-gray-50',
          ]"
        >
          Transaksi
        </NuxtLink>
        <NuxtLink
          to="/budget"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="[
            $route.path.startsWith('/budget')
              ? 'text-green-500 bg-green-50'
              : 'text-gray-700 hover:text-green-500 hover:bg-gray-50',
          ]"
        >
          Anggaran
        </NuxtLink>
        <NuxtLink
          to="/challenges"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="[
            $route.path.startsWith('/challenges')
              ? 'text-green-500 bg-green-50'
              : 'text-gray-700 hover:text-green-500 hover:bg-gray-50',
          ]"
        >
          Tantangan
        </NuxtLink>

        <div class="border-t border-gray-200 mt-4 pt-4">
          <p
            class="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Mahasiswa+
          </p>
          <NuxtLink
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50"
          >
            Wishlist & Target
          </NuxtLink>
          <NuxtLink
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50"
          >
            Utang & Piutang
          </NuxtLink>
          <NuxtLink
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50"
          >
            Beasiswa Tracker
          </NuxtLink>
          <NuxtLink
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50"
          >
            Kalender Finansial
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const $route = useRoute();
const router = useRouter();
const { user, logout: authLogout } = useAuth();

// Profile dropdown state
const isDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Get user's name and initials for display
const userName = computed(() => {
  return user.value?.full_name || "Student";
});

const userInitials = computed(() => {
  const name = userName.value;
  if (!name || name === "Student") return "S";

  const parts = name.split(" ");
  if (parts.length === 1) return name.charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
});

// Handle logout
const logout = async () => {
  await authLogout();
  router.push("/");
};
</script>

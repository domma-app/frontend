<template>
  <div class="bg-white py-12 sm:py-16 lg:py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          Last updated:
          {{
            new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }}
        </p>
      </div>

      <div class="prose prose-green max-w-none">
        <p>
          At DOMMA, we take your privacy very seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you use our financial management application.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect information that you provide directly to us when you:</p>
        <ul>
          <li>Create an account</li>
          <li>Use our services</li>
          <li>Link your financial accounts</li>
          <li>Contact customer support</li>
          <li>Participate in surveys or promotions</li>
        </ul>

        <p>This information may include:</p>
        <ul>
          <li>Personal identifiers (name, email address)</li>
          <li>Authentication information (password)</li>
          <li>Financial information (transaction data, account balances)</li>
          <li>Device and usage information (IP address, browser type)</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Verify your identity and prevent fraud</li>
          <li>Personalize your experience</li>
          <li>Communicate with you about products, services, and events</li>
          <li>Monitor and analyze usage patterns</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect the security of your personal information. However, please be
          aware that no method of transmission over the internet or electronic
          storage is 100% secure.
        </p>

        <h2>Sharing Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share your information with:
        </p>
        <ul>
          <li>Service providers who perform services on our behalf</li>
          <li>Financial institutions to fulfill services you request</li>
          <li>Legal authorities when required by law</li>
        </ul>

        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may have certain rights regarding your
          personal information, including:
        </p>
        <ul>
          <li>Right to access and receive a copy of your data</li>
          <li>Right to rectification of inaccurate information</li>
          <li>Right to erasure (right to be forgotten)</li>
          <li>Right to restrict or object to processing</li>
          <li>Right to data portability</li>
        </ul>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the "Last updated" date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <ul>
          <li>Email: privacy@domma.app</li>
          <li>Address: Jakarta, Indonesia</li>
        </ul>
      </div>

      <div class="mt-10 flex justify-center">
        <NuxtLink
          to="/contact"
          class="inline-block px-5 py-3 text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600"
        >
          Contact Us
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
</script>

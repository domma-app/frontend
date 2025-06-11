<template>
  <div class="bg-white py-12 sm:py-16 lg:py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Terms of Service
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
          These Terms of Service ("Terms") govern your access to and use of
          DOMMA's website, mobile applications, and other online products and
          services (collectively, the "Services").
        </p>

        <p>
          By accessing or using our Services, you agree to be bound by these
          Terms. If you do not agree to these Terms, you may not access or use
          the Services.
        </p>

        <h2>Using DOMMA</h2>
        <p>
          You may use our Services only if you are 18 years or older and are not
          barred from using the Services under applicable law.
        </p>

        <p>
          To access certain features of the Services, you must register for an
          account. When you register, you agree to provide accurate, current,
          and complete information and to update this information to maintain
          its accuracy. You are responsible for safeguarding your password and
          for all activities that occur under your account.
        </p>

        <h2>Financial Information</h2>
        <p>
          DOMMA is a financial management tool that allows you to track your
          expenses, manage budgets, and analyze your spending patterns. While we
          strive to provide accurate information, we do not guarantee the
          accuracy, completeness, or timeliness of any information provided
          through the Services.
        </p>

        <p>
          The Services may display information about your financial accounts and
          transactions. This information is obtained from third-party financial
          institutions with your authorization. We are not responsible for any
          inaccuracies in the information obtained from these third parties.
        </p>

        <h2>User Content</h2>
        <p>
          Our Services may allow you to create, upload, post, send, receive, and
          store content. You retain ownership rights in such content. By making
          your content available on or through the Services, you grant us a
          worldwide, non-exclusive, royalty-free license to use, copy, modify,
          and display your content in connection with operating and providing
          the Services.
        </p>

        <h2>Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the Services in any manner that could interfere with, disrupt,
            negatively affect, or inhibit other users from fully enjoying the
            Services
          </li>
          <li>Use the Services for any illegal or unauthorized purpose</li>
          <li>
            Attempt to circumvent any content-filtering techniques or security
            measures we employ
          </li>
          <li>
            Use any robot, spider, crawler, scraper, or other automated means to
            access the Services
          </li>
          <li>
            Attempt to decipher, decompile, disassemble, or reverse engineer any
            of the software used to provide the Services
          </li>
          <li>Copy, modify, or distribute any portion of the Services</li>
        </ul>

        <h2>Termination</h2>
        <p>
          We may suspend or terminate your access to and use of the Services at
          our sole discretion, at any time and without notice to you. You may
          cancel your account at any time by contacting us.
        </p>

        <h2>Disclaimer of Warranties</h2>
        <p>
          THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
          WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT
          LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          IN NO EVENT WILL DOMMA, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE
          PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR
          DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
          CONNECTION WITH YOUR USE OF THE SERVICES.
        </p>

        <h2>Changes to the Terms</h2>
        <p>
          We may modify these Terms at any time. If we make material changes, we
          will provide you with notice. Your continued use of the Services after
          such notice constitutes your acceptance of the modified Terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms and your access to and use of the Services will be
          governed by and construed in accordance with the laws of Indonesia,
          without regard to conflict of law principles.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <ul>
          <li>Email: legal@domma.app</li>
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

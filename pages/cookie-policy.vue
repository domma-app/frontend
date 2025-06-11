<template>
  <div class="bg-white py-12 sm:py-16 lg:py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Cookie Policy
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
          This Cookie Policy explains how DOMMA ("we", "us", and "our") uses
          cookies and similar technologies to recognize you when you visit our
          website and use our application. It explains what these technologies
          are and why we use them, as well as your rights to control our use of
          them.
        </p>

        <h2>What are Cookies?</h2>
        <p>
          Cookies are small data files placed on your computer or mobile device
          when you visit a website. Cookies are widely used by website owners to
          make their websites work more efficiently, as well as to provide
          reporting information.
        </p>

        <p>
          Cookies set by the website owner (in this case, DOMMA) are called
          "first-party cookies". Cookies set by parties other than the website
          owner are called "third-party cookies". Third-party cookies enable
          third-party features or functionality to be provided on or through the
          website (e.g., advertising, interactive content, and analytics).
        </p>

        <h2>Why Do We Use Cookies?</h2>
        <p>
          We use first and third-party cookies for several reasons. Some cookies
          are required for technical reasons in order for our website and
          application to operate, and we refer to these as "essential" or
          "strictly necessary" cookies. Other cookies also enable us to track
          and target the interests of our users to enhance the experience on our
          online properties. Third parties serve cookies through our websites
          for advertising, analytics and other purposes.
        </p>

        <h2>Types of Cookies We Use</h2>
        <p>
          The specific types of first and third-party cookies served through our
          website and application and the purposes they perform are described
          below:
        </p>

        <h3>Essential Website Cookies</h3>
        <p>
          These cookies are strictly necessary to provide you with services
          available through our website and to use some of its features, such as
          access to secure areas.
        </p>

        <h3>Performance and Functionality Cookies</h3>
        <p>
          These cookies are used to enhance the performance and functionality of
          our website and application but are non-essential to their use.
          However, without these cookies, certain functionality may become
          unavailable.
        </p>

        <h3>Analytics and Customization Cookies</h3>
        <p>
          These cookies collect information that is used to help us understand
          how our website and application is being used or how effective our
          marketing campaigns are, or to help us customize our website for you.
        </p>

        <h3>Advertising Cookies</h3>
        <p>
          These cookies are used to make advertising messages more relevant to
          you. They perform functions like preventing the same ad from
          continuously reappearing, ensuring that ads are properly displayed for
          advertisers, and in some cases selecting advertisements that are based
          on your interests.
        </p>

        <h2>How Can You Control Cookies?</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You
          can exercise your cookie rights by setting your preferences in the
          Cookie Consent Manager. The Cookie Consent Manager allows you to
          select which categories of cookies you accept or reject. Essential
          cookies cannot be rejected as they are strictly necessary to provide
          you with services.
        </p>

        <p>
          You can also set or amend your web browser controls to accept or
          refuse cookies. If you choose to reject cookies, you may still use our
          website though your access to some functionality and areas of our
          website may be restricted. As the means by which you can refuse
          cookies through your web browser controls vary from browser to
          browser, you should visit your browser's help menu for more
          information.
        </p>

        <h2>Changes to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time in order to
          reflect, for example, changes to the cookies we use or for other
          operational, legal or regulatory reasons. Please therefore re-visit
          this Cookie Policy regularly to stay informed about our use of cookies
          and related technologies.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our use of cookies or other
          technologies, please contact us at:
        </p>
        <ul>
          <li>Email: privacy@domma.app</li>
          <li>Address: Jakarta, Indonesia</li>
        </ul>
      </div>

      <div class="mt-10 flex justify-center">
        <NuxtLink
          to="/privacy-policy"
          class="inline-block px-5 py-3 mr-3 text-base font-medium rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
        >
          Privacy Policy
        </NuxtLink>
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

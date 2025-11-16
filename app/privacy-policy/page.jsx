"use client";
import { motion } from "framer-motion";


export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <motion.div
        className="max-w-4xl mx-auto px-6 py-16 gpu"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-10 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 leading-relaxed">
          <p>
            At <strong className="text-cyan-300">Relentron</strong>, accessible from{" "}
            <a
              href="https://relentron.com"
              className="text-blue-400 underline hover:text-cyan-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://relentron.com
            </a>
            , we respect and protect the privacy of our users. This Privacy
            Policy explains how we collect, use, and safeguard your information
            when you visit our website or interact with our services.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            Information We Collect
          </h2>
          <p>
            We collect personal details such as your name, email address, and
            phone number through our enquiry form. This information is used
            solely to respond to your queries and provide relevant services. We
            do not sell, share, or disclose your personal information to any
            third party without your consent, except when required by law.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            Cookies & Analytics
          </h2>
          <p>
            Our website uses cookies and analytics tools to enhance user
            experience, monitor traffic, and improve performance. These tools
            may collect non-personal information such as browser type, IP
            address, and pages visited. By using our website, you consent to the
            use of cookies in accordance with this policy. You may disable
            cookies through your browser settings, but some features may not
            function properly.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            Third-Party Services
          </h2>
          <p>
  We may use third-party services such as Google Analytics, Twilio, and Lottie animations to provide better interaction and communication. These third parties have their own privacy policies, and we encourage users to review them to understand how your data may be processed. 
  The Lottie animation used on this website was created by Danny Godoy and is used under the <em>Lottie Simple License</em> from LottieFiles.
</p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your
            information from unauthorized access, alteration, disclosure, or
            destruction. While we strive to protect your personal data, no
            method of transmission over the Internet is completely secure, and
            we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            Policy Updates
          </h2>
          <p>
            Relentron reserves the right to update or modify this Privacy Policy
            at any time without prior notice. Updates will be reflected on this
            page with a revised date. We encourage users to review this page
            periodically to stay informed about how we protect their
            information.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at{" "}
            <a
              href="mailto:relentronofficial@gmail.com"
              className="text-blue-400 underline hover:text-cyan-300 transition-colors"
            >
              relentronofficial@gmail.com
            </a>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
}

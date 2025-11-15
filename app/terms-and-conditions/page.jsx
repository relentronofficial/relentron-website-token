"use client";
import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <motion.div
        className="max-w-4xl mx-auto px-6 py-16 gpu"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-400 mb-10 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 leading-relaxed">
          <p>
            Welcome to <strong className="text-cyan-300">Relentron</strong>. By
            accessing or using our website at{" "}
            <a
              href="https://relentron.com"
              className="text-blue-400 underline hover:text-cyan-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://relentron.com
            </a>
            , you agree to comply with and be bound by the following Terms and
            Conditions. If you do not agree with these terms, please do not use
            our website or services.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            1. Use of Our Website
          </h2>
          <p>
            The content on this website is for general information and
            promotional purposes related to IT services, web development, mobile
            app development, digital marketing, software development, and
            e-commerce solutions. Unauthorized use of this website may give rise
            to a claim for damages and/or be a criminal offense.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            2. User Responsibilities
          </h2>
          <p>
            When submitting enquiries or personal details via forms, you agree
            to provide accurate and truthful information. You are responsible
            for ensuring that the information you provide does not infringe on
            the rights of others or violate any applicable laws.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            3. Payment Policy
          </h2>
          <p>
            Clients engaging Relentron for any project agree to follow the below
            payment structure unless otherwise stated in a signed agreement:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>20% of the total payment is due at the time of project confirmation.</li>
            <li>50% of the total payment is due once 50% of the project is completed.</li>
            <li>75% of the total payment is due when 75% of the project work is completed.</li>
            <li>
              100% of the total payment must be made before the final deployment or
              handover of the project.
            </li>
          </ul>
          <p>
            All payments are to be made through approved payment methods only.
            Delay in payment may result in suspension or delay of ongoing work
            until outstanding balances are cleared.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            4. Refund Policy
          </h2>
          <p>
            Relentron values customer satisfaction and offers a fair refund
            policy based on the project’s progress:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              If cancellation occurs within <strong>2 days of payment</strong> or when
              less than <strong>10% of the work</strong> has been completed —{" "}
              <strong>95% refund</strong> will be provided.
            </li>
            <li>
              If cancellation occurs within <strong>1 week of payment</strong> or when
              up to <strong>20% of the work</strong> has been completed —{" "}
              <strong>80% refund</strong> will be provided.
            </li>
            <li>
              When <strong>50% of the work</strong> has been completed —{" "}
              <strong>50% refund</strong> will be provided.
            </li>
            <li>
              Once <strong>80% or more</strong> of the work is completed, no refund
              will be applicable as significant development effort and resources
              will have been invested.
            </li>
          </ul>
          <p>
            Refunds (if applicable) will be processed within 7–10 working days
            after approval.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            5. Third-Party Links
          </h2>
          <p>
            Our website may contain links to third-party websites or services
            that are not controlled or operated by Relentron. We are not
            responsible for the content, privacy policies, or practices of any
            third-party sites.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            6. Service Modifications
          </h2>
          <p>
            Relentron reserves the right to modify, suspend, or discontinue any
            part of its website or services at any time without prior notice. We
            are not liable for any loss resulting from such actions.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            7. Privacy
          </h2>
          <p>
            Your use of this website is also governed by our{" "}
            <a
              href="/privacy-policy"
              className="text-blue-400 underline hover:text-cyan-300 transition-colors"
            >
              Privacy Policy
            </a>
            . Please review it to understand how we handle your personal
            information.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            8. Governing Law
          </h2>
          <p>
            These Terms and Conditions are governed by and construed in
            accordance with the laws of India. Any disputes arising in
            connection with these terms shall be subject to the exclusive
            jurisdiction of the courts in Tamil Nadu, India.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            9. Changes to These Terms
          </h2>
          <p>
            Relentron may revise these Terms and Conditions at any time without
            prior notice. Changes will be effective immediately upon posting on
            this page. We encourage users to check this page regularly to stay
            informed about any updates.
          </p>

          <h2 className="text-2xl font-semibold text-cyan-400">
            10. Contact Us
          </h2>
          <p>
            For questions or concerns regarding these Terms and Conditions,
            please contact us at{" "}
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

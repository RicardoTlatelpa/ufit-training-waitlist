import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, Container } from '@/components/ui';
import { typography } from '@/theme/typography';

export const metadata: Metadata = {
  title: 'Privacy Policy | UFIT Training',
  description:
    'How UFIT Training collects, uses, stores, and protects your information.',
};

const sectionHeadingClass =
  'mt-8 font-heading text-heading-03 font-semibold leading-heading-03 text-gray-900 first:mt-0';

const contactEmail = 'ricardotlatelpadev@gmail.com';

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="font-body text-paragraph-02 text-primary-600 hover:text-primary-700"
          >
            &larr; Back to home
          </Link>

          <Card className="mt-6" padding="lg">
            <p className={typography.overline}>UFIT Training</p>
            <h1 className="mt-2 font-heading text-heading-01 font-bold leading-heading-01 text-primary-800">
              Privacy Policy
            </h1>
            <p className={`mt-2 ${typography.caption}`}>Last updated: May 18, 2026</p>

            <div className={`mt-8 space-y-4 ${typography.body}`}>
              <p>
                This Privacy Policy explains how UFIT Training collects, uses, stores, and
                protects information when you use the UFIT Training mobile application,
                including TestFlight beta versions of the app.
              </p>
              <p>
                UFIT Training is a fitness programming and workout tracking application
                designed to help users create workout programs, schedule training sessions,
                track workouts, and manage strength and hypertrophy progressions.
              </p>
            </div>

            <h2 className={sectionHeadingClass}>1. Information We Collect</h2>
            <p className={`mt-3 ${typography.body}`}>
              Depending on how you use the app, UFIT Training may collect the following types
              of information:
            </p>
            <ul className={`mt-3 list-disc space-y-2 pl-5 ${typography.body}`}>
              <li>
                Account information, such as your email address or user identifier if
                authentication is enabled.
              </li>
              <li>
                Workout and training data, such as exercises, sets, reps, weights, schedules,
                progression rules, workout history, and program configuration.
              </li>
              <li>
                App usage data, such as screens visited, actions taken, error states, and
                feature usage, if analytics or logging tools are enabled.
              </li>
              <li>
                Device and technical data, such as device type, operating system version, app
                version, crash logs, and diagnostic information.
              </li>
              <li>
                Location-related data only if you grant permission and only for features that
                help identify supported gyms or gym equipment availability.
              </li>
            </ul>

            <h2 className={sectionHeadingClass}>2. How We Use Information</h2>
            <p className={`mt-3 ${typography.body}`}>We use collected information to:</p>
            <ul className={`mt-3 list-disc space-y-2 pl-5 ${typography.body}`}>
              <li>Provide and operate the UFIT Training app.</li>
              <li>Save and sync workout programs, workout sessions, and training history.</li>
              <li>
                Generate or update progression recommendations based on your training inputs.
              </li>
              <li>Improve app performance, usability, reliability, and user experience.</li>
              <li>Debug crashes, errors, syncing problems, and other technical issues.</li>
              <li>Support beta testing, feedback collection, and product improvement.</li>
            </ul>

            <h2 className={sectionHeadingClass}>3. Health and Fitness Data</h2>
            <div className={`mt-3 space-y-4 ${typography.body}`}>
              <p>
                UFIT Training may store workout-related data that you manually enter into the
                app, including exercise names, weights, sets, reps, workout dates, and
                training progress. This information is used to power the app&apos;s workout
                tracking and progression features.
              </p>
              <p>
                UFIT Training does not provide medical advice. Any workout, progression, or
                training-related information shown in the app is for fitness tracking and
                informational purposes only.
              </p>
            </div>

            <h2 className={sectionHeadingClass}>4. Location Data</h2>
            <div className={`mt-3 space-y-4 ${typography.body}`}>
              <p>
                UFIT Training may request access to location information for features related
                to supported gyms, nearby facilities, or gym equipment availability. Location
                data is only used when permission is granted by you and only for app
                functionality related to those features.
              </p>
              <p>You can disable location permissions at any time in your device settings.</p>
            </div>

            <h2 className={sectionHeadingClass}>5. Third-Party Services</h2>
            <div className={`mt-3 space-y-4 ${typography.body}`}>
              <p>
                UFIT Training may use third-party services for hosting, authentication,
                analytics, crash reporting, database storage, or app distribution. These
                services may process limited data necessary to provide their functionality.
              </p>
              <p>Examples may include services such as:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Apple TestFlight and App Store Connect for beta testing and app
                  distribution.
                </li>
                <li>Backend hosting providers for application server infrastructure.</li>
                <li>Database providers for storing user and workout data.</li>
                <li>
                  Analytics or crash reporting tools, if enabled, to improve reliability and
                  user experience.
                </li>
              </ul>
            </div>

            <h2 className={sectionHeadingClass}>6. Data Sharing</h2>
            <p className={`mt-3 ${typography.body}`}>
              We do not sell your personal information. We may share limited information only
              when necessary to operate the app, comply with legal obligations, protect the
              security of the service, or work with service providers that support app
              functionality.
            </p>

            <h2 className={sectionHeadingClass}>7. Data Storage and Security</h2>
            <p className={`mt-3 ${typography.body}`}>
              We take reasonable measures to protect your information from unauthorized
              access, loss, misuse, or alteration. However, no method of transmission or
              storage is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className={sectionHeadingClass}>8. Data Retention</h2>
            <p className={`mt-3 ${typography.body}`}>
              We retain information for as long as necessary to provide the app, maintain
              your account, improve the service, resolve technical issues, and comply with
              legal obligations. Beta testing data may be retained during development to help
              diagnose issues and improve the product.
            </p>

            <h2 className={sectionHeadingClass}>9. Your Choices</h2>
            <p className={`mt-3 ${typography.body}`}>You may be able to:</p>
            <ul className={`mt-3 list-disc space-y-2 pl-5 ${typography.body}`}>
              <li>Update or delete workout data inside the app.</li>
              <li>Disable permissions such as location access through your device settings.</li>
              <li>Request deletion of your account or associated data by contacting us.</li>
            </ul>

            <h2 className={sectionHeadingClass}>10. Children&apos;s Privacy</h2>
            <p className={`mt-3 ${typography.body}`}>
              UFIT Training is not intended for children under 13. We do not knowingly collect
              personal information from children under 13. If you believe a child has provided
              personal information, please contact us so we can take appropriate action.
            </p>

            <h2 className={sectionHeadingClass}>11. Changes to This Privacy Policy</h2>
            <p className={`mt-3 ${typography.body}`}>
              We may update this Privacy Policy from time to time. When we make changes, we
              will update the &ldquo;Last updated&rdquo; date above. Continued use of the app
              after changes means you accept the updated Privacy Policy.
            </p>

            <h2 className={sectionHeadingClass}>12. Contact</h2>
            <div className={`mt-3 space-y-2 ${typography.body}`}>
              <p>
                If you have questions about this Privacy Policy or want to request data
                deletion, contact us at:
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {contactEmail}
                </a>
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

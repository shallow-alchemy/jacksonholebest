import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: "About Us | Jackson Hole Dining - Where Adventure Meets Great Food",
  description: "Learn about Jackson Hole Best, the definitive dining guide for outdoor enthusiasts who refuse to compromise on great food. 30-50 carefully curated restaurants across every price point.",
}

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <Image
              src="/images/jacksonholebest_logo.png"
              alt="Jackson Hole Best Logo"
              width={400}
              height={200}
              priority
              className={styles.heroLogo}
            />
          </div>
          <h1 className={styles.heroTitle}>
            Where Adventure Meets Great Food
          </h1>
          <p className={styles.heroSubtitle}>
            The definitive dining guide for outdoor enthusiasts who refuse to compromise on great food.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContainer}>
          <div className={styles.storyHeader}>
            <h2 className={styles.storyTitle}>Our Story</h2>
          </div>
          <div className={styles.storyContent}>
            <p className={styles.storyText}>
              After multiple trips exploring Grand Teton National Park and Jackson Hole&apos;s incredible outdoor offerings, 
              we found ourselves frustrated by dining guides that either focused on budget tourist traps or intimidating 
              fine dining with no middle ground. We wanted thoughtful recommendations that understood that after a 12-mile 
              hike, you need more than a protein bar—but you also don&apos;t want to spend hours researching restaurants.
            </p>
            <p className={styles.storyText}>
              That&apos;s why we created Jackson Hole Best: <strong>30-50 carefully curated restaurants</strong> that deliver 
              exceptional experiences across every price point, from post-hike fuel to celebration dinners.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className={styles.differenceSection}>
        <div className={styles.differenceContainer}>
          <h2 className={styles.differenceTitle}>What Makes Us Different</h2>
          
          <div className={styles.differenceGrid}>
            <div className={styles.differenceCard}>
              <div className={styles.differenceIcon}>🥾</div>
              <h3 className={styles.differenceCardTitle}>Adventure-Focused Curation</h3>
              <p className={styles.differenceCardText}>
                Unlike generic travel sites with hundreds of listings, we organize dining around your outdoor experiences. 
                Whether you need quick energy before hitting the trails, hearty refueling after a powder day, or a 
                memorable dinner to cap off your adventure, we&apos;ve got you covered.
              </p>
            </div>

            <div className={styles.differenceCard}>
              <div className={styles.differenceIcon}>💰</div>
              <h3 className={styles.differenceCardTitle}>Complete Price Transparency</h3>
              <p className={styles.differenceCardText}>
                We provide clear pricing levels and honest value assessments because your adventure budget matters. 
                From $10 trail lunches to $100 celebration dinners, every recommendation includes practical cost guidance.
              </p>
            </div>

            <div className={styles.differenceCard}>
              <div className={styles.differenceIcon}>🔍</div>
              <h3 className={styles.differenceCardTitle}>Thorough Research, Professional Quality</h3>
              <p className={styles.differenceCardText}>
                We combine comprehensive research with detailed, well-crafted descriptions. Our research process includes 
                calling restaurants directly, reading hundreds of recent reviews, and gathering the insider details that 
                make each place special.
              </p>
            </div>

            <div className={styles.differenceCard}>
              <div className={styles.differenceIcon}>🏔️</div>
              <h3 className={styles.differenceCardTitle}>Park Integration</h3>
              <p className={styles.differenceCardText}>
                We&apos;re the only guide that seamlessly connects Jackson town dining with Grand Teton National Park experiences, 
                including distance from park entrances and what meals work best for different outdoor itineraries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className={styles.promiseSection}>
        <div className={styles.promiseContainer}>
          <h2 className={styles.promiseTitle}>Our Promise</h2>
          <p className={styles.promiseIntro}>
            Every restaurant in our guide has been thoroughly researched using our comprehensive 30-minute process 
            that captures not just the basics, but the insider details that make each experience memorable. We focus 
            on places where both locals and discerning visitors create lasting memories.
          </p>
          
          <div className={styles.promiseGrid}>
            <div className={styles.promiseCard}>
              <h3 className={styles.promiseCardTitle}>What you&apos;ll always find:</h3>
              <ul className={styles.promiseList}>
                <li>Honest pricing and value assessments</li>
                <li>Practical details (reservations, dietary options, parking)</li>
                <li>Activity-based recommendations</li>
                <li>Well-researched insider tips</li>
                <li>Professional food photography</li>
              </ul>
            </div>
            
            <div className={styles.promiseCard}>
              <h3 className={styles.promiseCardTitle}>What you won&apos;t find:</h3>
              <ul className={styles.promiseList}>
                <li>Tourist traps with mediocre food</li>
                <li>Overwhelming lists of 100+ restaurants</li>
                <li>Generic descriptions copied from other sites</li>
                <li>Outdated information</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>For Adventurers Who Appreciate Great Food</h2>
          <p className={styles.ctaText}>
            Whether you&apos;re planning your first visit to Jackson Hole or you&apos;re a seasoned visitor looking for your next 
            favorite spot, Jackson Hole Best delivers the thoroughly researched recommendations you need to eat exceptionally 
            well during your time in one of America&apos;s most spectacular destinations.
          </p>
          <p className={styles.ctaQuestion}>
            Ready to discover where adventure meets great food?
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/restaurants" className={styles.ctaPrimary}>
              Start Exploring Our Restaurants
            </Link>
            <Link href="/" className={styles.ctaSecondary}>
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>

      {/* Footer tagline */}
      <section className={styles.footerSection}>
        <div className={styles.footerContainer}>
          <p className={styles.footerTagline}>
            <em>Jackson Hole Best - Your trusted guide to exceptional dining in America&apos;s premier mountain destination.</em>
          </p>
        </div>
      </section>
    </div>
  )
}
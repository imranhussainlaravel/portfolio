import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Imran",
  lastName: "Hussain",
  name: `Imran Hussain`,
  role: "Laravel / PHP Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "dgeimran@gmail.com",
  location: "Asia/Karachi", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Occasional notes on Laravel, backend architecture, and SaaS engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in src/resources/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/imranhussainlaravel",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/dgeimran",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} — Laravel / PHP Software Engineer`,
  description: `Portfolio of ${person.name}, a backend engineer building SaaS platforms, REST APIs, and payment systems with Laravel and PHP`,
  headline: <>Backend systems for SaaS that hold up in production</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">TrackPilot AI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/trackpilot-ai-remote-work-time-tracking",
  },
  subline: (
    <>
      I'm {person.firstName}, a Laravel and PHP engineer at{" "}
      <Text as="span" size="xl" weight="strong">
        Applicon Soft
      </Text>
      , where I design backend architecture, REST APIs, <br /> and subscription billing for
      multi-company SaaS platforms.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, a Laravel / PHP software engineer based in Lahore, Pakistan`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  resume: {
    display: true,
    link: "/imran_hussain_resume.pdf",
    label: "Download CV",
    filename: "imran_hussain_resume.pdf",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        {person.firstName} is a Lahore-based software engineer specializing in PHP, Laravel, and
        backend application development. He has shipped production SaaS platforms, business
        management systems, REST APIs, subscription and payment workflows, and third-party
        integrations — taking backend features from requirements and database design through
        implementation, testing, integration, and production support.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Applicon Soft",
        timeframe: "Nov 2023 - Present",
        role: "Software Engineer",
        achievements: [
          <>
            Developed and maintained backend systems using PHP, Laravel, CodeIgniter, and MySQL
            across multiple production SaaS platforms and client projects.
          </>,
          <>
            Architected backend systems for multi-company SaaS platforms, remote-work tracking
            software, a US business-formation partner platform, and a POS/financial management
            system.
          </>,
          <>
            Built subscription and payment workflows, REST APIs, authentication and authorization,
            and third-party integrations including Stripe, Firebase, Twilio, and AWS S3.
          </>,
          <>
            Collaborated with frontend developers and QA teams across feature development, testing,
            debugging, code reviews, and production support.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/roi/cover-01.jpg",
            alt: "ROI — SaaS Business Management Platform",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Applicon Soft",
        timeframe: "Aug 2023 - Nov 2023",
        role: "Software Engineering Intern",
        achievements: [
          <>
            Started professional development with PHP and CodeIgniter, working with MVC, OOP,
            databases, APIs, and backend application development.
          </>,
          <>
            Progressed into a Software Engineer role through hands-on development across company
            products and client projects.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Superior University",
        description: <>Master's in Computer Science, 2021 – 2023. Lahore, Pakistan.</>,
      },
      {
        name: "Superior University",
        description: <>Associate Degree in Computer Science, 2019 – 2021. Lahore, Pakistan.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Backend",
        description: (
          <>
            PHP and Laravel as the core stack, with CodeIgniter on legacy systems. REST API design,
            OOP, MVC, authentication and authorization, role-based permissions, and webhook
            handling.
          </>
        ),
        tags: [
          { name: "PHP", icon: "php" },
          { name: "Laravel", icon: "laravel" },
          { name: "CodeIgniter", icon: "codeigniter" },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/bizee/cover-01.jpg",
            alt: "Bizee — US Business Formation Partner Platform",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Database",
        description: (
          <>
            MySQL schema and relationship design, indexing, transactions, and query optimization for
            multi-tenant and financial data models.
          </>
        ),
        tags: [{ name: "MySQL", icon: "mysql" }],
        images: [
          {
            src: "/images/projects/zaaddocs/cover-01.jpg",
            alt: "ZaadDOCS — POS & Financial Management System",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Payments & Integrations",
        description: (
          <>
            Stripe subscription lifecycle — trials, failed payments, cancellations, plan changes,
            proration, and webhooks — plus Firebase, Twilio, AWS S3, Backblaze, Mux, Zoom, and Dolby
            integrations.
          </>
        ),
        tags: [
          { name: "Stripe", icon: "stripe" },
          { name: "Firebase", icon: "firebase" },
          { name: "Twilio", icon: "twilio" },
          { name: "AWS S3", icon: "aws" },
        ],
        images: [
          {
            src: "/images/projects/trackpilot/cover-01.jpg",
            alt: "TrackPilot AI — Remote Work & Time Tracking SaaS",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Frontend",
        description: (
          <>
            Enough frontend to ship end to end: Blade for server-rendered interfaces, Next.js and
            JavaScript for API-driven dashboards, Bootstrap and plain HTML/CSS for layout.
          </>
        ),
        tags: [
          { name: "JavaScript", icon: "javascript" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Bootstrap", icon: "bootstrap" },
        ],
        images: [],
      },
      {
        title: "Testing & Tools",
        description: (
          <>
            PHPUnit for test coverage, Postman for API workflows, PHPStan for static analysis, and
            Laravel Pint for consistent code style.
          </>
        ),
        tags: [
          { name: "Postman", icon: "postman" },
          { name: "Git", icon: "git" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Notes on Laravel, APIs, and backend architecture",
  description: `Read what ${person.name} has been working on recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Backend and SaaS projects built by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

// The gallery route is disabled in site.config.ts. This object is kept because
// Header.tsx imports it for the (hidden) nav item — add images and flip the route
// back on if you ever want a photo gallery.
const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };

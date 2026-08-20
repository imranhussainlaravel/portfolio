import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Imran",
  lastName: "Hussain",
  name: `Imran Hussain`,
  // Positioning: full-stack first so recruiter keyword filters match, backend
  // second so the qualifier is never more than a few words away. Rendered on
  // the about page and burned into the OG image, so it has to stay short.
  role: "Full-Stack Engineer · Laravel & PHP Backend Specialist",
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
  {
    name: "WhatsApp",
    icon: "whatsapp",
    // wa.me wants the number in full international form with no "+", spaces or dashes.
    link: "https://wa.me/923184120015",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} - Full-Stack Engineer | Laravel & PHP`,
  description: `Portfolio of ${person.name}, a full-stack engineer with backend depth - SaaS platforms, REST APIs, and Stripe payment systems built on Laravel and PHP`,
  headline: <>Full-stack delivery, backend depth - SaaS that holds up in production</>,
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
      I'm {person.firstName}, a full-stack engineer with{" "}
      <Text as="span" size="xl" weight="strong">
        backend depth
      </Text>
      {" "}- architecture, REST APIs and Stripe billing <br /> for multi-company SaaS platforms,
      and the React and Next.js frontends on top.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About - ${person.name}`,
  description: `Meet ${person.name}, a full-stack engineer with backend depth, based in Lahore, Pakistan`,
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
        {person.firstName} is a Lahore-based full-stack engineer with 3+ years of professional
        experience, whose hands-on depth is backend: PHP, Laravel, and MySQL. He has shipped
        production SaaS platforms end to end - REST APIs, Stripe and Stripe Connect billing, queues
        and background processing, and third-party integrations - plus the React, Next.js, and Blade
        interfaces on top of them, taking features from requirements and database design through
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
        timeframe: "Apr 2024 - Present",
        role: "Software Engineer",
        achievements: [
          <>
            Build and maintain production web applications and backend systems with PHP, Laravel,
            MySQL, and React across multi-company SaaS platforms, remote-work tracking software, a
            US business-formation partner platform, and a POS/financial management system.
          </>,
          <>
            Design REST APIs and Laravel services covering authentication, authorization,
            middleware, validation, Eloquent relationships, queues, jobs, events, transactions, and
            background processing.
          </>,
          <>
            Implement Stripe and Stripe Connect payment flows - subscriptions, commissions, coupons
            and webhooks - and integrate third-party APIs including Firebase, Twilio, and AWS S3.
          </>,
          <>
            Contribute full-stack with React, Vite, Next.js, and JavaScript, and work with Redis,
            Docker, Git/GitHub, CI/CD, logging, monitoring, and production deployments.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/roi/cover-01.jpg",
            alt: "ROI - SaaS Business Management Platform",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Applicon Soft",
        timeframe: "Nov 2023 - Apr 2024",
        role: "Associate Software Engineer",
        achievements: [
          <>
            Developed and maintained Laravel backend features and REST APIs, working with MySQL,
            Eloquent relationships, queries, validation, and application logic.
          </>,
          <>
            Implemented authentication, authorization, CRUD functionality, and business workflows,
            and integrated third-party APIs and webhooks with external services.
          </>,
          <>
            Contributed React-based frontend features and API integration, and collaborated with
            the team on production applications using Git/GitHub.
          </>,
        ],
        images: [],
      },
      {
        company: "Applicon Soft",
        timeframe: "Aug 2023 - Nov 2023",
        role: "Software Engineer Intern",
        achievements: [
          <>
            Started professional development with PHP, Laravel, MySQL, and REST APIs, assisting on
            web application features and supporting existing functionality.
          </>,
          <>
            Fixed bugs and worked across database queries, API integration, testing and debugging,
            while learning Git-based development workflows.
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
        // The awarded title is Master's in Computer Science (the Pakistani MCS),
        // but it is a 16-year qualification that maps to a Bachelor's abroad -
        // which is why LinkedIn lists it as "Bachelor's degree, Computer Science".
        // Both facts are stated so neither an overseas recruiter nor an ATS reads
        // it as a postgraduate Master's, and so the site never looks like it
        // contradicts the LinkedIn profile. Do not trim the equivalence note.
        name: "Superior University",
        description: (
          <>
            Master's in Computer Science (MCS), 2021 - 2023. Lahore, Pakistan. A 16-year programme,
            equivalent to a Bachelor's degree.
          </>
        ),
      },
      {
        name: "Superior University",
        description: <>Associate Degree in Computer Science, 2019 - 2021. Lahore, Pakistan.</>,
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
            OOP, MVC, authentication and authorization, role-based permissions, queues, jobs,
            events, transactions, background processing, and webhook handling.
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
            alt: "Bizee - US Business Formation Partner Platform",
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
            alt: "ZaadDOCS - POS & Financial Management System",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Payments & Integrations",
        description: (
          <>
            Stripe and Stripe Connect subscription lifecycle - trials, failed payments,
            cancellations, plan changes, proration, commissions, coupons, and webhooks - plus
            Firebase, Twilio, AWS S3, Backblaze, Mux, Zoom, and Dolby integrations.
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
            alt: "TrackPilot AI - Remote Work & Time Tracking SaaS",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Frontend",
        description: (
          <>
            React, Next.js, Vite, and JavaScript for API-driven dashboards, Blade for
            server-rendered pages, Bootstrap and plain HTML/CSS for layout - the interface layer for
            the systems I build.
          </>
        ),
        tags: [
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Bootstrap", icon: "bootstrap" },
        ],
        images: [],
      },
      {
        title: "Infrastructure, Testing & Tools",
        description: (
          <>
            Redis for caching and background queues, Docker for local and deployed environments, and
            Git/GitHub with CI/CD, logging and monitoring for production releases. PHPUnit for test
            coverage, Postman for API workflows, PHPStan for static analysis, and Laravel Pint for
            consistent code style.
          </>
        ),
        tags: [
          { name: "Redis", icon: "redis" },
          { name: "Docker", icon: "docker" },
          { name: "Git", icon: "git" },
          { name: "Postman", icon: "postman" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  // Doubles as the visible H1 on /blog. SEO title composed in app/blog/page.tsx.
  title: "Notes on Laravel, APIs, and backend architecture",
  description: `Practical Laravel and PHP engineering notes from ${person.name} - Stripe billing and webhooks, multi-tenant SaaS scoping, queues and background jobs, MySQL indexing, and REST API design.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  // Doubles as the visible H1 on /work, so it reads as a heading rather than a
  // meta title. The SEO title is composed separately in app/work/page.tsx.
  title: "Laravel & SaaS Projects",
  description: `Full-stack SaaS projects built by ${person.name} - multi-tenant platforms, Stripe and Stripe Connect billing, REST APIs, and CRM systems on Laravel, PHP and React.`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

// The gallery route is disabled in site.config.ts. This object is kept because
// Header.tsx imports it for the (hidden) nav item - add images and flip the route
// back on if you ever want a photo gallery.
const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery - ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };

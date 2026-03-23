import './Resume.css';

type ExperienceItem = {
  period: string;
  company: string;
  role: string;
  bullets: string[];
  stack?: string;
};

const certifications = [
  'JavaScript Algorithms and Data Structures FreeCodeCamp February 22, 2024',
  'Responsive Web Design FreeCodeCamp January, 28, 2024',
  'Amazon Web Services Certified Developer VN 8VWRYFQKPJ11QMS4 January 13, 2020',
  'Microsoft Certified Solutions Associate: Web Applications H510-9521 September 08, 2020',
  'Sam Houston State University, Bachelors in International Business (Huntsville, TX)',
  'Avionics Technician Associate Degree (Fort Gordon, GA)',
];

const experiences: ExperienceItem[] = [
  {
    period: 'February 2024 to January 2026',
    company: 'Momentum - Harrisburg, PA, Remote',
    role: 'Lead Developer, Full Stack, C# Net 8, AWS, TypeScript, React, SQL',
    bullets: [
      'Contractor the for the Pennsylvania Health and Human Services admin. to modernize current IT systems.',
      'Utilized ReactJS, Vite, Nswag w/ Swagger and PrimeReact to build a robust AWS Mapping and search application for Pennsylvania HHSC. Currently working on integrating Machine Learning to understand provider dead zone and accessibility.',
      'Lead developer that built from ground up a Provider Search application utilizing AWS Fargate and GitLab to host C# 8 APIs with a TypeScript Prime React front end and NSwag code generator to facilitate connecting to end points. This application was then used as a template, and a Geography API was added to facilitate the AWS Location Service.',
      'Managed SQL deployments using liquidbase within gitlab.',
      'Using Entity framework on the API but maintained MVC applications that used Dapper and am very good at SQL.',
      'Responsible for GitLab feature branch principle with merge requests for my team.',
      'Managed two junior developers.',
      'Used GitHub Copilot extensively in debugging and development.',
    ],
  },
  {
    period: 'March 2022 to November 2023',
    company: 'WorkCare - Anaheim, CA, Remote',
    role: 'Software Developer, Net C# 6 Core and Net C# 7 AOT',
    bullets: [
      'Employer Healthcare and Monitoring Software as a Service company. Built appointment and tracking management for workplace healthcare.',
      'Designed, built and maintained AWS Lambda (API, pub/sub) micro-services using SAM builds.',
      'Angular React front end, utilizing PrimeReact for controls.',
      'Built C# Net 7 micro-services with MySQL or DynamoDb.',
      'Identified and implemented software templates for faster development.',
      'Mentored developers and conducted code reviews.',
      'Collaborated in a diverse multinational Scrum team.',
      'Helped design and architect AWS methodology.',
    ],
    stack:
      'C#.Net7, Jira, Confluence, Docker, Stoplight, MySQL, AWS SAM, AWS Lambda, Cognito, API Gateway, Kinesis',
  },
  {
    period: 'Sep 2020 to March 2022',
    company: 'Wellsky - Overland Park, KS, Remote',
    role: 'webMethods Developer',
    bullets: [
      'Hospice and Home Healthcare Software as a Service (SaaS) company.',
      'Designed, built and maintained middleware ETL software.',
      '~400 different micro-services (FTP, API, RPC, Messaging, Shared Database).',
      'Analyzed, documented, designed, built, and tested integration software.',
      'Participated in production on-call rotation using PagerDuty.',
      'Designed and built ETL services for Pharmacy Benefits Manager medication payments.',
      'Designed and built ETL EDI claims (835, 837, 277 and 999) for hospice payments to Ability Claims.',
      'Designed and built ETL long running API for Medispan drug interactions into a Postgres DB (650k lines).',
      'Implemented Surescript Pharmacy Certificate for prescription routing.',
    ],
  },
  {
    period: 'Feb 2020 - Aug 2020',
    company: 'Pyramid Consulting for First Energy Ohio - Ohio, Consultant',
    role: 'webMethods Developer for AWS Cloudification',
    bullets: [
      'Two Nuclear Power Plants.',
      'Cloudification project moving integration software to AWS EC2 Cloud.',
      'Migrated Java Integration Server, Universal Messenger and databases to AWS.',
      'Documented, configured and tested ~200 micro-services.',
      'Performed analysis, documentation, database mapping, release testing and coding updates.',
      'Migrated production packages and rebuilt databases while replacing hardcoded values.',
      'Helped set up CONNX to move data from data center to AWS cloud.',
    ],
    stack: 'Java, IS, Designer, Universal Messenger, TOAD, Oracle',
  },
  {
    period: 'May 2013 to Oct 2019',
    company: 'Tanknology - Austin, TX, Onsite, Full Time Employee',
    role: 'Software Developer, Net C# Core',
    bullets: [
      'Oil and Gas Environmental Compliance company with ~350 trucks throughout the USA.',
      'Built and maintained internal software systems, including ASP.Net MVC pages for gas and oil tests.',
      'Built ETL in C# Core extracting test results into XML with scheduler triggers and complex dynamic SQL.',
      'Built and enhanced MVVC scheduling application for trucks and tests by regulation and geography.',
      'Coded 200+ interfaces for oil and gas testing data using HTML, CSS, and JavaScript.',
    ],
    stack: 'C# .Net 3.x, MVC, ASP.Net, Blazor, SQL Server, HTML, CSS, JavaScript, JQuery, IIS, FoxPro',
  },
  {
    period: 'Feb 2010 to April 2012',
    company: 'At DXC for Alcatel Lucent - Naperville, IL, Remote, Contractor',
    role: 'Manager Integration Enhancements for North America',
    bullets: [
      'Managed webMethods integration server and administered user support services.',
      'Managed a team of offshore workers for integration work.',
      'Led daily scrum meetings, estimates and scope reporting to VP of IT operations.',
      'Worked in Bangore, India.',
    ],
    stack: 'webMethods v8.1, IS, Developer, Broker, Trading Networks, IDOCS, SAP',
  },
  {
    period: 'Feb 2005 to Oct 2009',
    company: 'FuelQuest - Houston, TX, Remote, Full Time Employee',
    role: 'webMethods Software Developer',
    bullets: [
      'Oil and Gas SaaS for purchasing, delivery, monitoring and management of fuel.',
      'Built microservices for customers (Walmart, 711, Hertz, QMart, etc.) that mapped orders, payments and taxes to back-end data structures to the penny.',
    ],
    stack: 'Java, webMethods 6.5, Developer, IS, Trading Networks, Oracle',
  },
];

export default function Resume() {
  return (
    <main className="resume-page">
      <div className="resume-shell">
        <div className="resume-card">
          <header className="resume-header">
            <p className="resume-eyebrow">Employment Resume</p>
            <h1 className="resume-name">Thomas Minnella</h1>
            <p className="resume-summary">
              I&apos;ve been working with C# (for 15 years), AWS (for 5 years) and TypeScript (for
              the last 3 years) doing modernization work for healthcare companies. I also have
              extensive webMethods experience. With twenty years of programming experience, I
              understand how to work within a team to build great applications and mentor junior
              developers.
            </p>
          </header>

          <div className="resume-body">
            <aside className="resume-sidebar">
              <section>
                <h2 className="resume-section-title">Contact</h2>
                <ul className="resume-contact-list">
                  <li>Austin, TX</li>
                  <li>
                    <a className="resume-link" href="mailto:tjminnella@gmail.com">
                      tjminnella@gmail.com
                    </a>
                  </li>
                  <li>214-578-0410</li>
                  <li>
                    <a
                      className="resume-link break-all"
                      href="https://www.linkedin.com/in/thomas-m-56503a2/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      linkedin.com/in/thomas-m-56503a2
                    </a>
                  </li>
                </ul>
              </section>

              <section className="resume-cert-section">
                <h2 className="resume-section-title">Certifications and Degrees</h2>
                <ul className="resume-cert-list">
                  {certifications.map((item) => (
                    <li key={item} className="resume-cert-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </aside>

            <section className="resume-main">
              <h2 className="resume-section-title">Professional Experience</h2>
              <div className="resume-job-list">
                {experiences.map((job) => (
                  <article key={`${job.company}-${job.period}`} className="resume-job-card">
                    <div className="resume-job-head">
                      <div>
                        <h3 className="resume-job-role">{job.role}</h3>
                        <p className="resume-job-company">{job.company}</p>
                      </div>
                      <span className="resume-job-period">
                        {job.period}
                      </span>
                    </div>

                    <ul className="resume-bullet-list">
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>

                    {job.stack ? (
                      <p className="resume-tech-stack">
                        <span className="resume-tech-stack-label">Tech Stack:</span> {job.stack}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

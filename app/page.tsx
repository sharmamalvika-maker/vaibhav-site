export default function Home() {
  const milestones = [
    {
      role: "Software Engineer III, Site Reliability Engineering",
      company: "Google",
      period: "2022 - Present",
      details:
        "Driving high-scale reliability initiatives across corporate infrastructure with deep focus on provenance, isolation, and rollout intent.",
    },
    {
      role: "Software Engineer II/III, Site Reliability Engineering",
      company: "Google",
      period: "2020 - 2022",
      details:
        "Extended production rollout systems and launched modern VM provisioning platforms using Kubernetes, Anthos Bare Metal, and KubeVirt.",
    },
    {
      role: "Software Engineer",
      company: "Facebook (Meta)",
      period: "2019",
      details:
        "Built a universal language and code-generation framework adopted by multiple teams across Facebook and Instagram.",
    },
    {
      role: "Research Intern / Undergraduate Researcher",
      company: "IIT Madras and IIIT Hyderabad",
      period: "2017 - 2020",
      details:
        "Published deep reinforcement learning research in venues such as AAMAS and AAAI while advancing transfer learning in advising frameworks.",
    },
  ];

  const highlights = [
    "Led a novel corporate container pipeline at Google with strong verification guarantees.",
    "Extended rollout frameworks impacting thousands of virtual machines.",
    "Co-founded AlgoUniversity to accelerate technical growth for undergraduates.",
    "Mentored engineers and students through SRE best practices and open-source initiatives.",
  ];

  return (
    <main className="relative overflow-hidden">
      <div className="hero-noise pointer-events-none" />
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28">
        <div className="mb-10 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
          Site Reliability Engineer | Google
        </div>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Vaibhav Gupta
          <span className="block bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
            Enterprise resilience with an edge.
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
          Passionate software engineer with a proven track record of building
          and scaling distributed systems, leading high-impact projects, and
          mentoring talent. I blend rigorous engineering discipline with
          startup-level execution speed.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://www.linkedin.com/in/oblivious"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-200/40 bg-cyan-300/20 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/30"
          >
            Connect on LinkedIn
          </a>
          <a
            href="mailto:guptavaibhav18197@gmail.com"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            Contact Me
          </a>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-6 md:px-10 md:py-10">
        <div className="glass-panel p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            About Me
          </h2>
          <p className="mt-4 max-w-4xl text-white/75">
            I specialize in large-scale distributed systems, cloud
            infrastructure, and reliability engineering. Over the years, I have
            worked across production platforms, research labs, and open-source
            ecosystems to build systems that are robust, observable, and ready
            to scale. My technical stack spans C++, C, Python, Go, JavaScript,
            Kubernetes, Linux, and modern ML frameworks.
          </p>
        </div>
      </section>

      <section
        id="journey"
        className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14"
      >
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Career Journey
          </h2>
          <span className="text-sm text-white/60">
            2016 - Present
          </span>
        </div>
        <div className="grid gap-5">
          {milestones.map((milestone) => (
            <article key={milestone.role} className="glass-panel p-6 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-white md:text-xl">
                  {milestone.role}
                </h3>
                <p className="text-sm text-cyan-200">{milestone.period}</p>
              </div>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-white/60">
                {milestone.company}
              </p>
              <p className="mt-4 text-white/75">{milestone.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-6 md:px-10 md:py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-semibold text-white">
              Signature Highlights
            </h2>
            <ul className="mt-5 space-y-4 text-white/75">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div id="portfolio" className="glass-panel p-8">
            <h2 className="text-2xl font-semibold text-white">
              Portfolio (Coming Soon)
            </h2>
            <p className="mt-4 text-white/75">
              A curated set of reliability engineering case studies, systems
              design notes, open-source contributions, and publication deep
              dives will be added here.
            </p>
            <div className="mt-6 rounded-2xl border border-dashed border-white/25 bg-white/5 p-5 text-sm text-white/70">
              Future links:
              <ul className="mt-3 space-y-2">
                <li>- Distributed Systems Case Studies</li>
                <li>- SRE Playbooks & Postmortems</li>
                <li>- Research Papers & Talks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

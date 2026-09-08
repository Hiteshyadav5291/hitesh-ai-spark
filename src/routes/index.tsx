import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { useReveal } from "@/hooks/use-reveal";
import { portfolioQueryOptions, groupSkills } from "@/lib/content";
import { Loader } from "@/components/site/Loader";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
import { Projects } from "@/components/site/Projects";
import { Journey } from "@/components/site/Journey";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";

const title = "Hitesh Yadav | AI/ML Student & Software Engineer";
const description =
  "Portfolio of Hitesh Yadav, a B.Tech AI/ML student at JECRC University, software engineer and technology enthusiast passionate about Artificial Intelligence, Machine Learning and modern software development.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(portfolioQueryOptions),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <p className="text-sm text-muted-foreground">
        Something went wrong loading the portfolio. Please refresh the page.
      </p>
    </div>
  ),
  component: Index,
});

function Index() {
  useReveal();
  const { data } = useSuspenseQuery(portfolioQueryOptions);

  return (
    <>
      <Loader />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Skills skillGroups={groupSkills(data.skills)} />
        <Projects projects={data.projects} />
        <Journey timeline={data.timeline} />
        <Contact />
      </main>
      <SiteFooter />
      <Toaster />
    </>
  );
}


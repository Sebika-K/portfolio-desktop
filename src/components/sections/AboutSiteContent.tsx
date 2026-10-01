import { aboutSite } from "../../data/aboutSite";

// The about-this-site.txt app: a simple "text file" page.
// The words live in data/aboutSite.ts; this file only decides how they look.
export default function AboutSiteContent() {
  return (
    <article className="space-y-6 text-sm leading-6 text-text">
      {aboutSite.map((block) => (
        <section key={block.heading}>
          <h2 className="mb-1 text-lg font-bold text-text-strong">
            {block.heading}
          </h2>

          {block.lines?.map((line) => (
            <p key={line}>{line}</p>
          ))}

          {block.bullets && (
            <ul className="list-disc space-y-1 pl-5">
              {block.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}

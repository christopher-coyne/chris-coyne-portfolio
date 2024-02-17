import Image from "next/image";
import { BodyContainer } from "./components/layout/Container";
import { Poppins } from "next/font/google";

// const poppins = Poppins()
const poppinsH2 = Poppins({ weight: "600", subsets: ["latin"] });

function Section({ heading, children }: { heading: string; children: any }) {
  return (
    <div>
      <h2 className={poppinsH2.className}>{heading}</h2>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <BodyContainer>
        <Section heading={"About Me"}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            bibendum venenatis sem, non placerat risus. Praesent viverra mauris
            sed lectus ullamcorper tristique. Etiam varius convallis ex, nec
            molestie tellus. Fusce eu velit egestas, pulvinar lectus quis,
            convallis risus.{" "}
          </p>
          <p>
            Praesent elementum metus eu felis lacinia pharetra. Vivamus eget
            arcu vel velit fringilla ornare. In tempus turpis ac metus volutpat,
            id venenatis elit volutpat. Cras placerat placerat risus, vel
            elementum massa tincidunt et. Fusce nec aliquam neque. Quisque
            tincidunt ut turpis eu pulvinar.
          </p>
          <p>You can check out my resume Here.</p>
          <h3>Some tech I’ve been using recently:</h3>
          <ul>
            <li> {`> Languages: Java, HTML/CSS, Javascript, Typescript`}</li>
            <li>
              {`> Frameworks and Libraries: React, Spring Boot, Express, Tailwind
              CSS`}
            </li>
            <li>{`> Platforms and Tools: AWS, Docker, Github Actions, Shopify`}</li>
          </ul>
        </Section>
      </BodyContainer>
    </main>
  );
}

import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxSection from "@/components/ui/ParallaxSection";

export const metadata = {
  title: "About Us | Agency",
  description: "Learn more about our outsourcing agency and team.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="px-6 max-w-5xl mx-auto py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-8">WHO WE ARE</h1>
        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mx-auto">
          We are a collective of designers, engineers, and strategists. Our mission is to transform complex problems into elegant, scalable digital solutions for startups and enterprises worldwide.
        </p>
      </section>

      <ParallaxSection className="bg-[#0a0a0a] border-y border-white/5 py-32 px-6" offset={40}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Our Philosophy</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We believe in writing clean code, designing intuitive interfaces, and shipping products that matter. We don't just act as contractors; we act as your technical co-founders, guiding you from ideation to deployment.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse flex items-center justify-center border border-white/10">
                <span className="text-white/20 font-mono text-sm">Image {i}</span>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}

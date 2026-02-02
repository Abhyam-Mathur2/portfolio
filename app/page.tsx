import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden selection:bg-red-900 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-900">
        <p>&copy; {new Date().getFullYear()} Abhyam Mathur. The Code Ronin.</p>
      </footer>
    </main>
  );
}
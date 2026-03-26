import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
            AGENCY<span className="text-gray-500">.</span>
          </Link>
          <p className="text-sm text-gray-500 max-w-xs">
            A modern outsourcing agency delivering state-of-the-art web and mobile solutions.
          </p>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
        </div>
      </div>
      
      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Agency. All rights reserved.
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-1.5 focus:outline-none">
              <span className="text-xl font-semibold tracking-tight text-white font-[family-name:var(--font-geist-sans)]">
                Gigtech<span className="text-white/40 font-normal">Orbit</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              AI Automation & Software Development for Indian MSMEs and Startups.
            </p>
          </div>
          <div className="flex flex-col gap-1">
             <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Connect</p>
             <a href="tel:9693975542" className="text-sm text-gray-400 hover:text-white transition-colors">9693975542</a>
             <a href="tel:7352055910" className="text-sm text-gray-400 hover:text-white transition-colors">7352055910</a>
          </div>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="#booking" className="hover:text-white transition-colors">Schedule a Call</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
        </div>
      </div>
      
      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} GigtechOrbit. All rights reserved.
      </div>
    </footer>
  );
}

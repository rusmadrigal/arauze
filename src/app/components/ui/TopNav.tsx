"use client";

export default function TopNav() {
  return (
    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
      <span className="font-semibold text-gray-800">Arauze.com</span>
      <nav className="space-x-6">
        <a className="hover:text-gray-700" href="#">Privacy</a>
        <a className="hover:text-gray-700" href="#">Termini</a>
        <a className="hover:text-gray-700" href="#">Contatti</a>
      </nav>
    </div>
  );
}

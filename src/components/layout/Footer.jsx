import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-brand-border)] bg-[var(--color-brand-bg)] mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
        <p className="mb-4 text-gray-500 font-medium">Not financial advice. Educational purposes only.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/fvg" className="hover:text-[var(--color-ict-fvg)] transition-colors">FVG</Link>
          <Link to="/cisd" className="hover:text-[var(--color-ict-cisd)] transition-colors">CISD</Link>
          <Link to="/fibonacci" className="hover:text-[var(--color-ict-fib)] transition-colors">Fibonacci</Link>
          <Link to="/orderblock" className="hover:text-[var(--color-ict-ob)] transition-colors">Order Block</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} ICT Smart Money Trade Journal</p>
      </div>
    </footer>
  );
}

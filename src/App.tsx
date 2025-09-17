import { NavLink, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Story from './pages/Story';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-heritage-jade text-white shadow'
      : 'border border-transparent text-heritage-ink/70 hover:border-heritage-jade/40 hover:text-heritage-jade'
  }`;

export function App() {
  return (
    <div className="min-h-screen bg-[#f7f5f0] pb-16">
      <header className="sticky top-0 z-20 border-b border-heritage-ink/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="font-song text-2xl text-heritage-ink">
            宋韵·杭州城
          </NavLink>
          <nav className="flex items-center gap-3">
            <NavLink to="/" className={navLinkClass} end>
              首页
            </NavLink>
            <NavLink to="/story" className={navLinkClass}>
              故事地图
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              关于
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

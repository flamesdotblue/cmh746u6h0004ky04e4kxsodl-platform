import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[360px] sm:h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white/80"></div>
      <div className="relative h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">Focus better. Get more done.</h1>
          <p className="text-slate-600 text-sm sm:text-base">A minimalist productivity workspace with tasks, calendar, notes, and insights — designed to keep you calm and in control.</p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <a href="#dashboard" className="inline-flex items-center rounded-lg bg-rose-600 text-white px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 transition-colors">Get Started</a>
            <a href="#" className="inline-flex items-center rounded-lg bg-white/80 backdrop-blur px-5 py-2.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-white transition-colors">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
}

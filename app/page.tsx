import { HeroComponent } from '@/components/HeroComponent';

const HomePage = () => {
  return (
    <section className="h-full">
      <HeroComponent />
      <div className="w-full h-[1000px] bg-slate-950"></div>
    </section>
  );
};

export default HomePage;

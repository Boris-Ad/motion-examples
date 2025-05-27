import { Slider1 } from './_components/Slider1';
import { Slider2 } from './_components/Slider2';
import { Slider3 } from './_components/Slider3';

const SlidersPage = () => {
  return (
    <section className="grid auto-rows-[minmax(500px,1fr)] gap-y-42 pt-10 pb-24">
      <Slider1 />
      <Slider2 />
      <Slider3 />
    </section>
  );
};

export default SlidersPage;

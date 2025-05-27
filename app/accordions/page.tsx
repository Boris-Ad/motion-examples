import { Accordion1 } from './_components/Accordion1';
import { Accordion2 } from './_components/Accordion2';
import { Accordion3 } from './_components/Accordion3';

const AccordionsPage = () => {
  return (
    <section className="grid auto-rows-[minmax(300px,1fr)] gap-y-42 pt-10 pb-24">
      <Accordion1 />
      <Accordion2 />
      <Accordion3 />
    </section>
  );
};

export default AccordionsPage;

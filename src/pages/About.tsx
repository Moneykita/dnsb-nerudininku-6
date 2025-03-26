
import Layout from "@/components/layout/Layout";
import { FileText, Info } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Apie mus</h1>
        
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-semibold text-white">Apie mūsų bendriją</h2>
            </div>
            <div className="text-white space-y-4">
              <p>
                DNSB „Nerūdininkų 6" – daugiabučio namo savininkų bendrija, įsteigta 2015 metais. 
                Mūsų tikslas – užtikrinti efektyvų namo administravimą ir priežiūrą, 
                gerinti gyventojų gyvenimo sąlygas ir spręsti bendrus namo eksploatavimo klausimus.
              </p>
              <p>
                Bendrija vienija visus daugiabučio namo gyventojus ir savininkus, 
                skatina bendruomeniškumą ir bendrų sprendimų priėmimą.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-semibold text-white">ATMINTINĖ GYVENTOJAMS</h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-white/20">
                <AccordionTrigger className="text-white hover:text-white/90">
                  Mokėjimo rekvizitai
                </AccordionTrigger>
                <AccordionContent className="text-white">
                  <div className="overflow-x-auto">
                    <Table className="text-white">
                      <TableHeader>
                        <TableRow className="border-white/20">
                          <TableHead className="text-white">Informacija</TableHead>
                          <TableHead className="text-white">Rekvizitai</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-white/20">
                          <TableCell>Gavėjas</TableCell>
                          <TableCell>DNSB „Nerūdininkų 6"</TableCell>
                        </TableRow>
                        <TableRow className="border-white/20">
                          <TableCell>Įmonės kodas</TableCell>
                          <TableCell>304157378</TableCell>
                        </TableRow>
                        <TableRow className="border-white/20">
                          <TableCell>Banko sąskaita</TableCell>
                          <TableCell>LT127300010142232455</TableCell>
                        </TableRow>
                        <TableRow className="border-white/20">
                          <TableCell>Bankas</TableCell>
                          <TableCell>„Swedbank", AB</TableCell>
                        </TableRow>
                        <TableRow className="border-white/20">
                          <TableCell>Mokėjimo paskirtis</TableCell>
                          <TableCell>Kaupiamosios lėšos, buto nr._</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-white/20">
                <AccordionTrigger className="text-white hover:text-white/90">
                  Kontaktinė informacija
                </AccordionTrigger>
                <AccordionContent className="text-white space-y-2">
                  <p>Bendrijos pirmininkas: Petras Petraitis</p>
                  <p>El. paštas: info@nerudininku6.lt</p>
                  <p>Tel. nr.: +370 600 00000</p>
                  <p className="mt-2">Dėl išsamesnės informacijos apie bendriją, prašome apsilankyti skiltyje "Kontaktai".</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;

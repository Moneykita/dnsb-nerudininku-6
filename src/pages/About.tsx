
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { FileText, Info } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Apie mus</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <p className="text-gray-300">Informacija apie mus bus pateikta netrukus.</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold text-white">ATMINTINĖ GYVENTOJAMS</h2>
          </div>
          
          <Separator className="my-4 bg-gray-600" />
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2 text-blue-300">
              Nerūdininkų g. 6 namo kaupiamųjų lėšų mėnesinės įmokos nuo 2021 09 01
            </h3>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-medium">Mokėjimo duomenys</h4>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-600">
                  <TableHead className="font-medium text-white">Informacija</TableHead>
                  <TableHead className="font-medium text-white">Reikšmė</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-gray-600">
                  <TableCell className="font-medium text-gray-300">Gavėjas (pavadinimas)</TableCell>
                  <TableCell className="text-white">Daugiabutis Namas Nerūdininkų G. 6</TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-600">
                  <TableCell className="font-medium text-gray-300">Gavėjo sąskaita</TableCell>
                  <TableCell className="text-white font-mono">LT74 7180 3005 2172 4496</TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-600">
                  <TableCell className="font-medium text-gray-300">Mokėjimo paskirtis</TableCell>
                  <TableCell className="text-white">
                    Buto Nr. <span className="px-2 mx-1 border-b border-dashed border-gray-400">___</span>, 
                    už <span className="px-2 mx-1 border-b border-dashed border-gray-400">___</span> mėn.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-300">Įmokos suma</TableCell>
                  <TableCell className="text-white font-bold">10 Eur.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

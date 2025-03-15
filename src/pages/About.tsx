
import Layout from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { FileText, Info } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Apie mus</h1>
        
        <div className="bg-gray-200 rounded-lg p-6 mb-8 text-gray-700">
          <p>Informacija apie mus bus pateikta netrukus.</p>
        </div>

        <div className="bg-gray-300 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">ATMINTINĖ GYVENTOJAMS</h2>
          </div>
          
          <Separator className="my-4 bg-gray-400" />
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2 text-blue-600">
              Nerūdininkų g. 6 namo kaupiamųjų lėšų mėnesinės įmokos nuo 2021 09 01
            </h3>
          </div>
          
          <div className="bg-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-medium text-gray-800">Mokėjimo duomenys</h4>
            </div>
            
            <Table>
              <TableBody>
                <TableRow className="border-b border-gray-400">
                  <TableCell className="font-medium text-gray-700">Gavėjas (pavadinimas)</TableCell>
                  <TableCell className="text-gray-900">Daugiabutis Namas Nerūdininkų G. 6</TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-400">
                  <TableCell className="font-medium text-gray-700">Gavėjo sąskaita</TableCell>
                  <TableCell className="text-gray-900 font-mono">LT74 7180 3005 2172 4496</TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-400">
                  <TableCell className="font-medium text-gray-700">Mokėjimo paskirtis</TableCell>
                  <TableCell className="text-gray-900">
                    Buto Nr. <span className="px-2 mx-1 border-b border-dashed border-gray-500">___</span>, 
                    už <span className="px-2 mx-1 border-b border-dashed border-gray-500">___</span> mėn.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700">Įmokos suma</TableCell>
                  <TableCell className="text-gray-900 font-bold">10 Eur.</TableCell>
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

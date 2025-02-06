import { useState } from "react";
import { ChevronDown, ChevronUp, Layers } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

const NewsTable = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Sample data - replace with actual data from your backend
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Svarbūs atnaujinimai",
      date: "2024-03-20",
      content: "Detalus pranešimo turinys bus čia..."
    },
    // Add more news items as needed
  ];

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Data</TableHead>
            <TableHead>Pavadinimas</TableHead>
            <TableHead className="w-[100px]">Veiksmai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsItems.map((item) => (
            <>
              <TableRow 
                key={item.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => toggleRow(item.id)}
              >
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {expandedRow === item.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </TableCell>
              </TableRow>
              {expandedRow === item.id && (
                <TableRow>
                  <TableCell colSpan={3} className="bg-gray-50">
                    <div className="p-4">
                      <p>{item.content}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NewsTable;
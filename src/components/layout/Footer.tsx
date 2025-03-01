import { Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  const googleMapsUrl = "https://maps.google.com/?q=Nerūdininkų+g.+6,+Senieji+Trakai,+21145+Trakų+r.+sav.";
  return <footer className="bg-accent text-white py-4">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center text-center text-sm">
          <div>
            <h3 className="text-base font-semibold mb-2">Susisiekite su mumis</h3>
            <div className="space-y-1">
              <p className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2" />
                +370 123 45678
              </p>
              <p className="flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                nerudininku6@gmail.com
              </p>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:text-gray-200 transition-colors">
                <MapPin className="w-4 h-4 mr-2" />
                Nerūdininkų g. 6, Senieji Trakai
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2">Avarinė tarnyba</h3>
            <p className="mb-1">Skambinkite visą parą:</p>
            
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2">Darbo laikas</h3>
            <p className="text-sm">Pirmadienis - Penktadienis: 8:00 - 17:00</p>
            <p className="text-sm">Šeštadienis: 9:00 - 13:00</p>
            <p className="text-sm">Sekmadienis: Nedirbame</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} BuildingManager. Visos teisės saugomos.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
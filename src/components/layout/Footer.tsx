import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Susisiekite su mumis</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                +370 123 45678
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                info@buildingmanager.lt
              </p>
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Vilnius, Lietuva
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Avarinė tarnyba</h3>
            <p className="mb-2">Skambinkite visą parą:</p>
            <p className="text-xl font-bold">112</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Darbo laikas</h3>
            <p>Pirmadienis - Penktadienis: 8:00 - 17:00</p>
            <p>Šeštadienis: 9:00 - 13:00</p>
            <p>Sekmadienis: Nedirbame</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p>&copy; {new Date().getFullYear()} BuildingManager. Visos teisės saugomos.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
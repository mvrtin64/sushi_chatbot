import { useState, useEffect } from 'react';
import { fetchMenuItems } from './api/menu';
import { fetchBusinessHours } from './api/businessHours';
import Footer from './components/Footer';

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
};

type BusinessHours = {
  isOpen: boolean;
  currentTime: string;
  openingTime: string;
  closingTime: string;
};

const App = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuData, hoursData] = await Promise.all([
          fetchMenuItems(),
          fetchBusinessHours()
        ]);
        setMenuItems(menuData);
        setBusinessHours(hoursData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const getCategoryTitle = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      entradas: "🍜 Entradas",
      maki: "🍱 Maki Roll",
      nigiri: "🍣 Nigiri",
      uramaki: "🐟 Uramaki",
      otros: "Otros"
    };
    return categoryMap[category.toLowerCase()] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/sushi-hero.jpg")',
            opacity: 0.7
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold mb-4">Sabores del Oriente</h1>
          <p className="text-xl mb-8">La auténtica experiencia japonesa</p>
          {businessHours && (
            <div className={`px-6 py-3 rounded-full ${businessHours.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
              {businessHours.isOpen ? 'Abierto Ahora' : 'Cerrado'} • {businessHours.openingTime} - {businessHours.closingTime}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {categories.map(category => (
          <section key={category} className="mb-16" id={category}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{getCategoryTitle(category)}</h2>
              <div className="w-full h-1 bg-red-600 mx-auto" style={{ width: `${getCategoryTitle(category).length * 2}ch` }}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {item.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={`/images/${item.category.toLowerCase()}/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                          alt={item.name}
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-red-600">{item.name}</h3>
                      <div className="mb-4">
                        <img 
                          src={`/images/${item.category.toLowerCase()}/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                          alt={`${item.name} extra`}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                      <div className="text-xl font-bold text-red-600">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;

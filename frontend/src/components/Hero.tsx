const Hero = () => {
  return (
    <div className="relative h-[500px] bg-black text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/sushi-hero.jpg")',
          opacity: 0.6
        }}
      />
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Experience Authentic Japanese Cuisine
        </h1>
        <p className="text-xl mb-8">
          Fresh ingredients, masterful preparation, unforgettable taste
        </p>
        <a 
          href="#menu"
          className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
        >
          View Menu
        </a>
      </div>
    </div>
  );
};

export default Hero; 
'use client';

const TailwindTest = () => {
  return (
    <div className="p-4 bg-red-500 text-white rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Tailwind CSS Test</h2>
      <p className="text-sm">
        Əgər bu qırmızı rəngdə görünürsə və yuvarlaq küncləri varsa, Tailwind CSS işləyir!
      </p>
      <div className="mt-2 flex space-x-2">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
          Mavi Düymə
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
          Yaşıl Düymə
        </button>
      </div>
    </div>
  );
};

export default TailwindTest;

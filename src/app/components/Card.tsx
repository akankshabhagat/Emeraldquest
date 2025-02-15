const universities = [
    {
      name: "ETH Zurich",
      description: "A world-class university in Switzerland.",
      course: "AI Engineer",
      link: "https://ethz.ch/en.html",
    },
    {
      name: "Berlin University",
      description: "Leading research in technology and science.",
      course: "MSC CS",
      link: "https://www.hu-berlin.de/en",
    },
    {
      name: "Harvard",
      description: "One of the most prestigious universities worldwide.",
      course: "ML/AI specialization",
      link: "https://www.harvard.edu/",
    },
  ];
  
  export default function CardGrid() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 justify-items-center">
        {universities.map((uni, i) => (
          <div key={i} className="card relative w-[250px] h-[320px]">
            <div className="bg"></div>
            <div className="blob"></div>
            <h2 className="text-white text-lg font-semibold z-10 mt-2">{uni.name}</h2>
            <p className="text-gray-300 text-sm text-center z-10 px-4">{uni.description}</p>
            <p className="text-gray-300 text-xs text-center z-10 px-4 italic">{uni.course}</p>
            <a
              href={uni.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md z-10 hover:bg-blue-700 transition"
            >
              Submit Application
            </a>
          </div>
        ))}
      </div>
    );
  }
  
  
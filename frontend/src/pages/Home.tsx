import { Link } from 'react-router-dom';

function Home(): JSX.Element {
  return (
    <div>
      <section className="bg-[#5B45F8] text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-6">
            Community Safety Through Technology
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Empowering citizens and law enforcement with advanced identification
            tools and emergency assistance features.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#5B45F8]">Identify</h2>
            <p className="text-gray-600 mb-4">
              Use our advanced facial recognition technology to help identify missing persons and keep your community safe.
            </p>
            <Link 
              to="/identify"
              className="inline-block bg-[#5B45F8] text-white px-4 py-2 rounded-md hover:bg-[#4935E8]"
            >
              Learn More
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#5B45F8]">Emergency</h2>
            <p className="text-gray-600 mb-4">
              Quick access to emergency services and your trusted contacts. Get help when you need it most.
            </p>
            <Link
              to="/emergency" 
              className="inline-block bg-[#5B45F8] text-white px-4 py-2 rounded-md hover:bg-[#4935E8]"
            >
              View Emergency
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#5B45F8]">Contacts</h2>
            <p className="text-gray-600 mb-4">
              Manage your emergency contacts and keep your loved ones informed about your safety status.
            </p>
            <Link
              to="/contacts"
              className="inline-block bg-[#5B45F8] text-white px-4 py-2 rounded-md hover:bg-[#4935E8]"
            >
              Manage Contacts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
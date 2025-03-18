import { useQuery } from '@apollo/client';
import ThoughtList from '../components/ThoughtList/index.tsx';
import ThoughtForm from '../components/ThoughtForm/index.tsx';
import { QUERY_THOUGHTS } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Container for centering */}
      <div className="container mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Welcome to CareerLink</h2>

        {/* Thought Form */}
        <div className="mb-6">
          <ThoughtForm />
        </div>

        {/* Thought List */}
        <div>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

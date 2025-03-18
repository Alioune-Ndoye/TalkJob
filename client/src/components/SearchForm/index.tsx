import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Types for Adzuna API responses
interface AdzunaJob {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  description: string;
  created: string;
  redirect_url: string;
}

interface AdzunaSearchProps {
  onResultsFound?: (jobs: AdzunaJob[]) => void;
}

const AdzunaJobSearch: React.FC<AdzunaSearchProps> = ({ onResultsFound }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state - only job title/keywords
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Using API credentials
      const APP_ID = '56112127';
      const APP_KEY = 'bbf7e0333fc224241d011f5dc83a4616';
      
      // Building the API URL with search parameters
      let apiUrl = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=10`;
      
      if (searchTerm) {
        apiUrl += `&what=${encodeURIComponent(searchTerm)}`;
      }
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // If callback provided, send results to parent component
      if (onResultsFound) {
        onResultsFound(data.results);
      } else {
        // Otherwise navigate to results page with data
        navigate('/job-results', { state: { jobs: data.results } });
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Job search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="job-search-container card p-4 bg-white shadow-sm mb-4">
      <h2 className="text-center mb-4">Find Tech Jobs</h2>
      
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="mb-3">
          <label htmlFor="searchTerm" className="form-label">Job Title or Keywords</label>
          <input
            type="text"
            className="form-control"
            id="searchTerm"
            placeholder="e.g. React Developer, Software Engineer, Data Scientist"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary btn-lg mt-2 align-self-center"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search Jobs'}
        </button>
      </form>
      
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      
      <div className="text-center mt-3">
        <small className="text-muted">
          Powered by Adzuna API
        </small>
      </div>
    </div>
  );
};

export default AdzunaJobSearch;
import { useLocation } from 'react-router-dom';
import AdzunaJobSearch from "../components/SearchForm";
import ThoughtForm from '../components/ThoughtForm';

// Define the job type (you might want to move this to a types file)
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

const JobResultsPage = () => {
  const location = useLocation();
  const jobs = (location.state as { jobs: AdzunaJob[] })?.jobs || [];

  return (
    <div className="container py-4">
        <div className="mb-6">
          <ThoughtForm />
        </div>
      <h1 className="mb-4">Job Results</h1>
      
      {/* Keep the search form if you want users to search again */}
      <AdzunaJobSearch />
      
      {/* Display results */}
      {jobs.length > 0 ? (
        <div className="mt-4">
          <h3>Found {jobs.length} jobs</h3>
          <div className="row">
            {jobs.map((job) => (
              <div key={job.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text">
                      <strong>Company:</strong> {job.company.display_name}<br />
                      <strong>Location:</strong> {job.location.display_name}<br />
                      <small>Posted: {new Date(job.created).toLocaleDateString()}</small>
                    </p>
                    <p className="card-text">{job.description.substring(0, 150)}...</p>
                    <a 
                      href={job.redirect_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View Job
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="alert alert-info mt-4">
          No jobs found. Try a new search above.
        </div>
      )}
    </div>
  );
};

export default JobResultsPage;
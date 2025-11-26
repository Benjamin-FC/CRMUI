import { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [swagger, setSwagger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedEndpoints, setExpandedEndpoints] = useState({});
  const [parameters, setParameters] = useState({});
  const [responses, setResponses] = useState({});
  const [loadingRequests, setLoadingRequests] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/swagger.json')
      .then(res => res.json())
      .then(data => {
        setSwagger(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading swagger:', err);
        setLoading(false);
      });
  }, []);

  const toggleEndpoint = (key) => {
    setExpandedEndpoints(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const updateParameter = (endpointKey, paramName, value) => {
    setParameters(prev => ({
      ...prev,
      [endpointKey]: {
        ...prev[endpointKey],
        [paramName]: value
      }
    }));
  };

  const tryEndpoint = async (path, method, endpointKey, pathParams, queryParams) => {
    setLoadingRequests(prev => ({ ...prev, [endpointKey]: true }));

    try {
      // Replace path parameters
      let finalPath = path;
      const params = parameters[endpointKey] || {};

      if (pathParams && pathParams.length > 0) {
        pathParams.forEach(param => {
          const value = params[param.name] || '1';
          finalPath = finalPath.replace(`{${param.name}}`, value);
        });
      }

      // Add query parameters
      const queryString = queryParams && queryParams.length > 0
        ? '?' + queryParams
          .filter(param => params[param.name])
          .map(param => `${param.name}=${encodeURIComponent(params[param.name])}`)
          .join('&')
        : '';

      const url = `${API_BASE_URL}${finalPath}${queryString}`;

      const response = await fetch(url, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      setResponses(prev => ({
        ...prev,
        [endpointKey]: {
          status: response.status,
          data: JSON.stringify(data, null, 2)
        }
      }));
    } catch (error) {
      setResponses(prev => ({
        ...prev,
        [endpointKey]: {
          status: 'Error',
          data: error.message
        }
      }));
    } finally {
      setLoadingRequests(prev => ({ ...prev, [endpointKey]: false }));
    }
  };

  if (loading) {
    return <div className="loading">Loading API Documentation...</div>;
  }

  if (!swagger) {
    return <div className="error">Failed to load API documentation</div>;
  }

  const endpoints = [];
  Object.entries(swagger.paths || {}).forEach(([path, pathItem]) => {
    Object.entries(pathItem).forEach(([method, operation]) => {
      if (['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
        const key = `${method}-${path}`;

        // Get parameters
        const pathParams = operation.parameters?.filter(p => p.in === 'path') || [];
        const queryParams = operation.parameters?.filter(p => p.in === 'query') || [];

        endpoints.push({
          key,
          method: method.toUpperCase(),
          path,
          operation,
          pathParams,
          queryParams
        });
      }
    });
  });

  // Filter endpoints based on search
  const filteredEndpoints = endpoints.filter(endpoint =>
    endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    endpoint.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (endpoint.operation.tags && endpoint.operation.tags.some(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  const methodCounts = endpoints.reduce((acc, endpoint) => {
    acc[endpoint.method] = (acc[endpoint.method] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="app">
      <div className="header">
        <h1>🚀 {swagger.info.title}</h1>
        <p>{swagger.info.version}</p>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Total Endpoints</span>
            <span className="stat-value">{endpoints.length}</span>
          </div>
          {Object.entries(methodCounts).map(([method, count]) => (
            <div className="stat-item" key={method}>
              <span className="stat-label">{method}</span>
              <span className="stat-value">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search endpoints..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="endpoints-container">
        {filteredEndpoints.map(({ key, method, path, operation, pathParams, queryParams }) => (
          <div key={key} className="endpoint-card">
            <div className="endpoint-header" onClick={() => toggleEndpoint(key)}>
              <span className={`method-badge method-${method.toLowerCase()}`}>
                {method}
              </span>
              <span className="endpoint-path">{path}</span>
              <span className={`expand-icon ${expandedEndpoints[key] ? 'expanded' : ''}`}>
                ▼
              </span>
            </div>

            {expandedEndpoints[key] && (
              <div className="endpoint-details">
                {operation.summary && (
                  <p className="endpoint-description">{operation.summary}</p>
                )}

                {(pathParams.length > 0 || queryParams.length > 0) && (
                  <div className="parameters-section">
                    <h4>Parameters</h4>

                    {pathParams.map(param => (
                      <div key={param.name} className="parameter-input">
                        <label>
                          {param.name} {param.required && <span style={{ color: 'red' }}>*</span>}
                          {param.schema?.type && ` (${param.schema.type})`}
                        </label>
                        <input
                          type={param.schema?.type === 'integer' ? 'number' : 'text'}
                          placeholder={param.description || `Enter ${param.name}`}
                          value={parameters[key]?.[param.name] || ''}
                          onChange={(e) => updateParameter(key, param.name, e.target.value)}
                        />
                      </div>
                    ))}

                    {queryParams.map(param => (
                      <div key={param.name} className="parameter-input">
                        <label>
                          {param.name} {param.required && <span style={{ color: 'red' }}>*</span>}
                          {param.schema?.type && ` (${param.schema.type})`}
                        </label>
                        <input
                          type={param.schema?.type === 'integer' ? 'number' : 'text'}
                          placeholder={param.description || `Enter ${param.name}`}
                          value={parameters[key]?.[param.name] || ''}
                          onChange={(e) => updateParameter(key, param.name, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  className="try-button"
                  onClick={() => tryEndpoint(path, method, key, pathParams, queryParams)}
                  disabled={loadingRequests[key]}
                >
                  {loadingRequests[key] ? 'Loading...' : '▶ Try it out'}
                </button>

                {responses[key] && (
                  <div className="response-section">
                    <h4>Response (Status: {responses[key].status})</h4>
                    <pre className="response-code">{responses[key].data}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredEndpoints.length === 0 && (
        <div className="api-info">
          <h2>No endpoints found</h2>
          <p>Try searching for something else</p>
        </div>
      )}
    </div>
  );
}

export default App;

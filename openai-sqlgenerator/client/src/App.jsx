import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState('');
  const [sqlResult, setSqlResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateSQL = async () => {
    if (!prompt.trim()) {
      toast.warn("⚠️ Please enter a query description.");
      return;
    }

    setLoading(true);
    setSqlResult('');

    try {
      const response = await fetch('http://localhost:5000/generate-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();

      if (data.sql) {
        setSqlResult(data.sql);
        toast.success("✅ SQL generated successfully!");
      } else {
        setSqlResult('❌ No SQL returned. Try again.');
        toast.error("No SQL generated. Try again.");
      }
    } catch (error) {
      console.error(error);
      setSqlResult('⚠️ Error contacting server.');
      toast.error("Server error. Please try again.");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlResult);
    toast.info("📋 Copied to clipboard!");
  };

  const handleClear = () => {
    setPrompt('');
    setSqlResult('');
    toast("Cleared input and output.");
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Natural Language → SQL Converter</h1>

  <div className="flex-row">
  <input
    type="text"
    placeholder="e.g., List all users who joined after 2020"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
  />
  <button onClick={handleGenerateSQL} disabled={loading}>
    {loading ? 'Generating...' : 'Generate SQL'}
  </button>
  <button onClick={handleClear} style={{ background: '#374151', color: '#e2e8f0' }}>
    Clear
  </button>
</div>

      {sqlResult && (
        <div style={styles.outputBlock}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={styles.label}>Output:</h3>
            <button onClick={handleCopy} style={styles.copyButton}>Copy</button>
          </div>
          <pre style={styles.code}>{sqlResult}</pre>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '3rem 2.5rem',
    maxWidth: '700px',
    margin: '0 auto',
    borderRadius: '18px',
    background: 'linear-gradient(135deg, #161a20, #1e2128)',
    border: '1px solid rgba(100, 255, 255, 0.07)',
    boxShadow: '0 0 40px rgba(0, 255, 255, 0.05)',
    animation: 'fadeIn 0.7s ease-in-out',
    fontFamily: 'Segoe UI, Inter, sans-serif',
    color: '#e2e8f0',
  },

  title: {
    fontSize: '2.3rem',
    fontWeight: 600,
    marginBottom: '1.8rem',
    textAlign: 'center',
    background: 'linear-gradient(to right, #00f5c9, #03a9f4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  inputGroup: {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '1.5rem',
  alignItems: 'stretch',
  justifyContent: 'space-between',
},

  input: {
  flex: 1,
  minWidth: '220px',
  padding: '15px 18px',
  fontSize: '1rem',
  color: '#e0f2f1',
  background: '#1f2937',
  border: '1px solid #3b3f4a',
  borderRadius: '12px',
  outline: 'none',
}
,

  button: {
    minWidth: '130px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #00f5c9, #03a9f4)',
    color: '#0f1117',
    fontWeight: 600,
    padding: '13px 26px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  clearButton: {
    background: '#374151',
    color: '#e2e8f0',
    fontWeight: 600,
    padding: '13px 26px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  outputBlock: {
    background: '#111827',
    padding: '1.2rem 1.5rem',
    marginTop: '2rem',
    borderLeft: '4px solid #03a9f4',
    borderRadius: '10px',
    fontFamily: 'Fira Code, monospace',
    color: '#7dd3fc',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    lineHeight: '1.6',
    fontSize: '0.95rem',
    animation: 'slideUp 0.6s ease-out',
  },

  label: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },

  code: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'Fira Code, monospace',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#7dd3fc',
  },

  copyButton: {
    padding: '8px 14px',
    fontSize: '0.9rem',
    background: '#03a9f4',
    color: '#0f1117',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
  },
};



export default App;

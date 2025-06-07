import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from '@/components/ui/button';
import { apiFetch, getToken } from '../lib/api';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'sync' | 'async'>('sync');
  const [result, setResult] = useState<any>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setResult(null);
    setJobId(null);
    setStatus(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setJobId(null);
    setStatus(null);
    try {
      const form = new FormData();
      form.append('file', file);
      if (mode === 'sync') {
        const res = await apiFetch('/transcribe', { body: form, token: getToken(), isForm: true });
        setResult(res);
      } else {
        const res = await apiFetch<{ job_id: string }>('/transcribe/async', { body: form, token: getToken(), isForm: true });
        setJobId(res.job_id);
      }
    } catch (e: any) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  };

  const pollStatus = async () => {
    if (!jobId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(`/transcribe/status/${jobId}`, { token: getToken() });
      setStatus(res);
    } catch (e: any) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow border border-stone-200">
          <h1 className="text-2xl font-semibold mb-4">Audio Upload & Transcription</h1>
          <div className="mb-4">
            <input type="file" accept="audio/*" onChange={handleFileChange} />
          </div>
          <div className="mb-4 flex gap-4">
            <label>
              <input type="radio" checked={mode === 'sync'} onChange={()=>setMode('sync')} /> Sync
            </label>
            <label>
              <input type="radio" checked={mode === 'async'} onChange={()=>setMode('async')} /> Async
            </label>
          </div>
          <Button onClick={handleUpload} disabled={!file || loading} className="w-full mb-4">
            {loading ? 'Uploading...' : 'Upload & Transcribe'}
          </Button>
          {mode === 'async' && jobId && (
            <div className="mb-4">
              <div>Job ID: {jobId}</div>
              <Button onClick={pollStatus} className="mt-2">Check Status</Button>
            </div>
          )}
          {result && (
            <div className="bg-stone-50 rounded p-4 mt-4">
              <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
          {status && (
            <div className="bg-stone-50 rounded p-4 mt-4">
              <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(status, null, 2)}</pre>
            </div>
          )}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </main>
    </div>
  );
};

export default Upload;

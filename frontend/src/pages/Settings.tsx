
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { Switch } from '@/components/ui/switch';
import { apiFetch, setToken, getToken, removeToken } from '../lib/api';

const Settings = () => {
  const { showSuccess, showError } = useNotifications();
  const [settings, setSettings] = useState({
    notifications: {
      trendAlerts: true,
      weeklyDigest: true,
      marketingUpdates: false,
    },
    display: {
      darkMode: false,
      compactView: false,
      showSparklines: true,
    },
    preferences: {
      defaultTimeframe: 'week',
      defaultRegion: 'all',
      autoRefresh: true,
    }
  });
  // --- Auth State ---
  const [authMode, setAuthMode] = useState<'login'|'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<{username:string}|null>(null);
  const [authError, setAuthError] = useState<string|null>(null);

  // --- Admin State ---
  const [users, setUsers] = useState<Array<{username:string}>>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminError, setAdminError] = useState<string|null>(null);

  // --- Auth Logic ---
  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) return;
      try {
        const res = await apiFetch<{user:{username:string, is_admin?:boolean}}>(
          '/me', { token }
        );
        setUser(res.user);
        setIsAdmin(!!res.user.is_admin);
      } catch (e:any) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async (e:any) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await apiFetch<{token:string; user:{username:string, is_admin?:boolean}}>(
        '/login', { body: { username, password } }
      );
      setToken(res.token);
      setUser(res.user);
      setIsAdmin(!!res.user.is_admin);
      showSuccess('Logged in!');
    } catch (err:any) {
      setAuthError(err.toString());
    }
  };

  const handleRegister = async (e:any) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await apiFetch('/register', { body: { username, password } });
      showSuccess('Registered! Please log in.');
      setAuthMode('login');
    } catch (err:any) {
      setAuthError(err.toString());
    }
  };

  const handleLogout = () => {
    removeToken();
    setUser(null);
    setIsAdmin(false);
    showSuccess('Logged out');
  };

  // --- Admin Logic ---
  useEffect(() => {
    if (!isAdmin) return;
    const fetchUsers = async () => {
      setAdminError(null);
      try {
        const res = await apiFetch<{users:Array<{username:string}>}>(
          '/admin/users', { token: getToken() }
        );
        setUsers(res.users);
      } catch (err:any) {
        setAdminError(err.toString());
      }
    };
    fetchUsers();
  }, [isAdmin]);

  const handleDeleteUser = async (username:string) => {
    setAdminError(null);
    try {
      await apiFetch(`/admin/users/${username}`, {
        method: 'DELETE',
        token: getToken()
      });
      setUsers(users => users.filter(u => u.username !== username));
      showSuccess('User deleted');
    } catch (err:any) {
      setAdminError(err.toString());
    }
  };

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    localStorage.setItem('urbn-settings', JSON.stringify(settings));
    showSuccess('Settings saved successfully');
  };

  const exportData = () => {
    const data = {
      export_date: new Date().toISOString(),
      user_preferences: settings,
      // In real app, would include user's trend history, favorites, etc.
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urbn-data-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    showSuccess('Data exported successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* --- Auth UI --- */}
        {!user ? (
          <div className="max-w-md mx-auto mb-8 bg-white rounded-2xl p-6 shadow border border-stone-200">
            <h2 className="text-2xl mb-2 font-semibold">{authMode === 'login' ? 'Login' : 'Register'}</h2>
            <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              {authError && <div className="text-red-500 text-sm">{authError}</div>}
              <Button type="submit" className="w-full">{authMode === 'login' ? 'Login' : 'Register'}</Button>
            </form>
            <div className="mt-2 text-sm">
              {authMode === 'login' ? (
                <>No account? <button className="text-amber-700 underline" onClick={()=>setAuthMode('register')}>Register</button></>
              ) : (
                <>Have an account? <button className="text-amber-700 underline" onClick={()=>setAuthMode('login')}>Login</button></>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto mb-8 bg-white rounded-2xl p-6 shadow border border-stone-200">
            <div className="flex items-center justify-between">
              <div>Logged in as <span className="font-semibold">{user.username}</span></div>
              <Button onClick={handleLogout} size="sm">Logout</Button>
            </div>
          </div>
        )}

        {/* --- Admin UI --- */}
        {isAdmin && (
          <div className="max-w-2xl mx-auto mb-8 bg-white rounded-2xl p-6 shadow border border-stone-200">
            <h2 className="text-xl mb-4 font-semibold">Admin: User Management</h2>
            {adminError && <div className="text-red-500 text-sm mb-2">{adminError}</div>}
            <ul>
              {users.map(u => (
                <li key={u.username} className="flex items-center justify-between border-b py-2">
                  <span>{u.username}</span>
                  <Button size="sm" variant="destructive" onClick={()=>handleDeleteUser(u.username)}>Delete</Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* --- Settings UI (unchanged) --- */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-stone-800 mb-3 tracking-wide">
            Settings
          </h1>
          <p className="text-lg text-stone-600 font-light">
            Customize your URBN Intelligence experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-800">Trend Alerts</div>
                    <div className="text-sm text-stone-600">Get notified when trends reach thresholds</div>
                  </div>
                  <Switch
                    checked={settings.notifications.trendAlerts}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'trendAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-800">Weekly Digest</div>
                    <div className="text-sm text-stone-600">Weekly summary of top trends</div>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyDigest}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'weeklyDigest', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-800">Marketing Updates</div>
                    <div className="text-sm text-stone-600">Product announcements and tips</div>
                  </div>
                  <Switch
                    checked={settings.notifications.marketingUpdates}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'marketingUpdates', checked)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Display</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-800">Dark Mode</div>
                    <div className="text-sm text-stone-600">Switch to dark theme</div>
                  </div>
                  <Switch
                    checked={settings.display.darkMode}
                    onCheckedChange={(checked) => handleSettingChange('display', 'darkMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-800">Compact View</div>
                    <div className="text-sm text-stone-600">Show more trends per row</div>
                  </div>
                  <Switch
                    checked={settings.display.compactView}
                    onCheckedChange={(checked) => handleSettingChange('display', 'compactView', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-800">Show Sparklines</div>
                    <div className="text-sm text-stone-600">Display trend charts on cards</div>
                  </div>
                  <Switch
                    checked={settings.display.showSparklines}
                    onCheckedChange={(checked) => handleSettingChange('display', 'showSparklines', checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Default Timeframe</label>
                  <select
                    value={settings.preferences.defaultTimeframe}
                    onChange={(e) => handleSettingChange('preferences', 'defaultTimeframe', e.target.value)}
                    className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Default Region</label>
                  <select
                    value={settings.preferences.defaultRegion}
                    onChange={(e) => handleSettingChange('preferences', 'defaultRegion', e.target.value)}
                    className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  >
                    <option value="all">All Regions</option>
                    <option value="us">United States</option>
                    <option value="eu">Europe</option>
                    <option value="asia">Asia Pacific</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-800">Auto Refresh</div>
                    <div className="text-sm text-stone-600">Automatically refresh trend data</div>
                  </div>
                  <Switch
                    checked={settings.preferences.autoRefresh}
                    onCheckedChange={(checked) => handleSettingChange('preferences', 'autoRefresh', checked)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Data Export</h3>
              <p className="text-stone-600 mb-4">Export your preferences and trend data</p>
              <Button onClick={exportData} className="w-full">
                Export Data
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={saveSettings} className="px-8">
            Save Settings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;

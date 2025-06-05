
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const { showSuccess } = useNotifications();
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

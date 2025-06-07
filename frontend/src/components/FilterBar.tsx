
interface FilterBarProps {
  selectedCategory: string;
  selectedTimeframe: string;
  selectedRegion: string;
  onCategoryChange: (value: string) => void;
  onTimeframeChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

export const FilterBar = ({
  selectedCategory,
  selectedTimeframe,
  selectedRegion,
  onCategoryChange,
  onTimeframeChange,
  onRegionChange,
}: FilterBarProps) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'footwear', label: 'Footwear' },
    { value: 'beauty', label: 'Beauty' },
  ];

  const timeframes = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'us', label: 'United States' },
    { value: 'eu', label: 'Europe' },
    { value: 'asia', label: 'Asia Pacific' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Timeframe</label>
          <select
            value={selectedTimeframe}
            onChange={(e) => onTimeframeChange(e.target.value)}
            className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all"
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe.value} value={timeframe.value}>
                {timeframe.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Region</label>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all"
          >
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

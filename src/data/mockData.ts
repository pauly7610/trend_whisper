
export const mockTrends = [
  {
    id: '1',
    title: 'Cottagecore Florals',
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
    popularity: 87,
    change: 23,
    sourceCount: 1247,
    forecast: 'Expected to peak in 3 weeks, strong momentum across Gen Z demographics',
    sparklineData: [45, 52, 48, 67, 71, 78, 87],
    region: 'us'
  },
  {
    id: '2',
    title: 'Minimalist Jewelry',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    popularity: 92,
    change: 31,
    sourceCount: 892,
    forecast: 'Sustained growth expected, aligns with mindful consumption trends',
    sparklineData: [62, 68, 71, 75, 82, 88, 92],
    region: 'us'
  },
  {
    id: '3',
    title: 'Oversized Blazers',
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
    popularity: 76,
    change: -8,
    sourceCount: 654,
    forecast: 'Moderate decline as market moves toward fitted silhouettes',
    sparklineData: [84, 82, 79, 77, 76, 75, 76],
    region: 'eu'
  },
  {
    id: '4',
    title: 'Platform Sandals',
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    popularity: 83,
    change: 18,
    sourceCount: 1089,
    forecast: 'Summer peak approaching, strong retail performance expected',
    sparklineData: [58, 62, 67, 72, 78, 81, 83],
    region: 'us'
  },
  {
    id: '5',
    title: 'Clean Girl Makeup',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
    popularity: 95,
    change: 42,
    sourceCount: 2156,
    forecast: 'Dominant trend with 6+ month lifespan, crosses all age groups',
    sparklineData: [53, 61, 68, 75, 84, 91, 95],
    region: 'us'
  },
  {
    id: '6',
    title: 'Vintage Band Tees',
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
    popularity: 79,
    change: 15,
    sourceCount: 743,
    forecast: 'Nostalgic appeal driving steady growth, perfect for UO demographic',
    sparklineData: [64, 67, 70, 73, 76, 78, 79],
    region: 'us'
  }
];

export const mockRelatedProducts = [
  {
    id: 'p1',
    name: 'Floral Midi Dress',
    brand: 'Anthropologie',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop',
    confidence: 94,
    price: '$148',
    trendId: '1'
  },
  {
    id: 'p2',
    name: 'Cotton Prairie Blouse',
    brand: 'Anthropologie',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop',
    confidence: 87,
    price: '$98',
    trendId: '1'
  },
  {
    id: 'p3',
    name: 'Delicate Chain Necklace',
    brand: 'Urban Outfitters',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop',
    confidence: 91,
    price: '$29',
    trendId: '2'
  },
  {
    id: 'p4',
    name: 'Stacking Ring Set',
    brand: 'Urban Outfitters',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop',
    confidence: 88,
    price: '$24',
    trendId: '2'
  }
];

// src/data/locations.ts

export interface Location {
  id: number;
  value: string;
  country: string;
  state?: string;
  lat: number;
  lng: number;
}

export const locations: Location[] = [
  // Israel (25 locations)
  { id: 1, value: "Jerusalem", country: "Israel", lat: 31.7683, lng: 35.2137 },
  { id: 2, value: "Tel Aviv", country: "Israel", lat: 32.0853, lng: 34.7818 },
  { id: 3, value: "Bnei Brak", country: "Israel", lat: 32.0819, lng: 34.8341 },
  { id: 4, value: "Haifa", country: "Israel", lat: 32.7940, lng: 34.9896 },
  { id: 5, value: "Beitar Illit", country: "Israel", lat: 31.6958, lng: 35.1242 },
  { id: 6, value: "Modi'in Illit", country: "Israel", lat: 31.9320, lng: 35.0378 },
  { id: 7, value: "Netanya", country: "Israel", lat: 32.3215, lng: 34.8532 },
  { id: 8, value: "Ashdod", country: "Israel", lat: 31.7940, lng: 34.6446 },
  { id: 9, value: "Petah Tikva", country: "Israel", lat: 32.0879, lng: 34.8878 },
  { id: 10, value: "Beit Shemesh", country: "Israel", lat: 31.7454, lng: 34.9897 },
  { id: 11, value: "Rechovot", country: "Israel", lat: 31.8947, lng: 34.8096 },
  { id: 12, value: "Ramat Gan", country: "Israel", lat: 32.0719, lng: 34.8244 },
  { id: 13, value: "Herzliya", country: "Israel", lat: 32.1624, lng: 34.8447 },
  { id: 14, value: "Tiberias", country: "Israel", lat: 32.7955, lng: 35.5302 },
  { id: 15, value: "Safed", country: "Israel", lat: 32.9651, lng: 35.4951 },
  { id: 16, value: "Ashkelon", country: "Israel", lat: 31.6688, lng: 34.5743 },
  { id: 17, value: "Holon", country: "Israel", lat: 32.0178, lng: 34.7804 },
  { id: 18, value: "Rehovot", country: "Israel", lat: 31.8947, lng: 34.8096 },
  { id: 19, value: "Raanana", country: "Israel", lat: 32.1847, lng: 34.8707 },
  { id: 20, value: "Kfar Saba", country: "Israel", lat: 32.1749, lng: 34.9120 },
  { id: 21, value: "Eilat", country: "Israel", lat: 29.5581, lng: 34.9482 },
  { id: 22, value: "Kiryat Gat", country: "Israel", lat: 31.6100, lng: 34.7642 },
  { id: 23, value: "Nazareth", country: "Israel", lat: 32.7009, lng: 35.2973 },
  { id: 24, value: "Givat Shmuel", country: "Israel", lat: 32.0667, lng: 34.8583 },
  { id: 25, value: "Elad", country: "Israel", lat: 32.0514, lng: 34.9514 },

  // United States (35 locations)
  { id: 26, value: "Brooklyn", country: "USA", state: "NY", lat: 40.6782, lng: -73.9442 },
  { id: 27, value: "Manhattan", country: "USA", state: "NY", lat: 40.7831, lng: -73.9712 },
  { id: 28, value: "Lakewood", country: "USA", state: "NJ", lat: 40.0978, lng: -74.2176 },
  { id: 29, value: "Los Angeles", country: "USA", state: "CA", lat: 34.0522, lng: -118.2437 },
  { id: 30, value: "Chicago", country: "USA", state: "IL", lat: 41.8781, lng: -87.6298 },
  { id: 31, value: "Miami Beach", country: "USA", state: "FL", lat: 25.7907, lng: -80.1300 },
  { id: 32, value: "Boston", country: "USA", state: "MA", lat: 42.3601, lng: -71.0589 },
  { id: 33, value: "Philadelphia", country: "USA", state: "PA", lat: 39.9526, lng: -75.1652 },
  { id: 34, value: "Baltimore", country: "USA", state: "MD", lat: 39.2904, lng: -76.6122 },
  { id: 35, value: "Atlanta", country: "USA", state: "GA", lat: 33.7490, lng: -84.3880 },
  { id: 36, value: "Cleveland", country: "USA", state: "OH", lat: 41.4993, lng: -81.6944 },
  { id: 37, value: "Detroit", country: "USA", state: "MI", lat: 42.3314, lng: -83.0458 },
  { id: 38, value: "Las Vegas", country: "USA", state: "NV", lat: 36.1699, lng: -115.1398 },
  { id: 39, value: "Seattle", country: "USA", state: "WA", lat: 47.6062, lng: -122.3321 },
  { id: 40, value: "Denver", country: "USA", state: "CO", lat: 39.7392, lng: -104.9903 },
  { id: 41, value: "Phoenix", country: "USA", state: "AZ", lat: 33.4484, lng: -112.0740 },
  { id: 42, value: "San Francisco", country: "USA", state: "CA", lat: 37.7749, lng: -122.4194 },
  { id: 43, value: "Washington DC", country: "USA", state: "DC", lat: 38.9072, lng: -77.0369 },
  { id: 44, value: "Monsey", country: "USA", state: "NY", lat: 41.1092, lng: -74.0687 },
  { id: 45, value: "Five Towns", country: "USA", state: "NY", lat: 40.6259, lng: -73.7148 },
  { id: 46, value: "Teaneck", country: "USA", state: "NJ", lat: 40.8876, lng: -74.0162 },
  { id: 47, value: "West Orange", country: "USA", state: "NJ", lat: 40.7987, lng: -74.2390 },
  { id: 48, value: "Passaic", country: "USA", state: "NJ", lat: 40.8568, lng: -74.1282 },
  { id: 49, value: "Highland Park", country: "USA", state: "NJ", lat: 40.4968, lng: -74.4218 },
  { id: 50, value: "Deal", country: "USA", state: "NJ", lat: 40.2513, lng: -74.0287 },
  { id: 51, value: "Cedarhurst", country: "USA", state: "NY", lat: 40.6259, lng: -73.7287 },
  { id: 52, value: "Great Neck", country: "USA", state: "NY", lat: 40.7865, lng: -73.7268 },
  { id: 53, value: "Riverdale", country: "USA", state: "NY", lat: 40.8968, lng: -73.9068 },
  { id: 54, value: "Pico-Robertson", country: "USA", state: "CA", lat: 34.0522, lng: -118.3644 },
  { id: 55, value: "Hancock Park", country: "USA", state: "CA", lat: 34.0736, lng: -118.3445 },
  { id: 56, value: "Beverly Hills", country: "USA", state: "CA", lat: 34.0736, lng: -118.4004 },
  { id: 57, value: "West Rogers Park", country: "USA", state: "IL", lat: 41.9986, lng: -87.7073 },
  { id: 58, value: "Skokie", country: "USA", state: "IL", lat: 42.0334, lng: -87.7334 },
  { id: 59, value: "Aventura", country: "USA", state: "FL", lat: 25.9565, lng: -80.1373 },
  { id: 60, value: "Boca Raton", country: "USA", state: "FL", lat: 26.3683, lng: -80.1289 },

  // Canada (8 locations)
  { id: 61, value: "Toronto", country: "Canada", state: "ON", lat: 43.6532, lng: -79.3832 },
  { id: 62, value: "Montreal", country: "Canada", state: "QC", lat: 45.5017, lng: -73.5673 },
  { id: 63, value: "Vaughan", country: "Canada", state: "ON", lat: 43.8361, lng: -79.5083 },
  { id: 64, value: "Vancouver", country: "Canada", state: "BC", lat: 49.2827, lng: -123.1207 },
  { id: 65, value: "Winnipeg", country: "Canada", state: "MB", lat: 49.8951, lng: -97.1384 },
  { id: 66, value: "Calgary", country: "Canada", state: "AB", lat: 51.0447, lng: -114.0719 },
  { id: 67, value: "Ottawa", country: "Canada", state: "ON", lat: 45.4215, lng: -75.6972 },
  { id: 68, value: "Hamilton", country: "Canada", state: "ON", lat: 43.2557, lng: -79.8711 },

  // United Kingdom (8 locations)
  { id: 69, value: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  { id: 70, value: "Manchester", country: "UK", lat: 53.4808, lng: -2.2426 },
  { id: 71, value: "Gateshead", country: "UK", lat: 54.9526, lng: -1.6038 },
  { id: 72, value: "Birmingham", country: "UK", lat: 52.4862, lng: -1.8904 },
  { id: 73, value: "Leeds", country: "UK", lat: 53.8008, lng: -1.5491 },
  { id: 74, value: "Glasgow", country: "UK", lat: 55.8642, lng: -4.2518 },
  { id: 75, value: "Liverpool", country: "UK", lat: 53.4084, lng: -2.9916 },
  { id: 76, value: "Brighton", country: "UK", lat: 50.8225, lng: -0.1372 },

  // France (5 locations)
  { id: 77, value: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { id: 78, value: "Marseille", country: "France", lat: 43.2965, lng: 5.3698 },
  { id: 79, value: "Lyon", country: "France", lat: 45.7640, lng: 4.8357 },
  { id: 80, value: "Strasbourg", country: "France", lat: 48.5734, lng: 7.7521 },
  { id: 81, value: "Nice", country: "France", lat: 43.7102, lng: 7.2620 },

  // Australia (4 locations)
  { id: 82, value: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
  { id: 83, value: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { id: 84, value: "Perth", country: "Australia", lat: -31.9505, lng: 115.8605 },
  { id: 85, value: "Adelaide", country: "Australia", lat: -34.9285, lng: 138.6007 },

  // South Africa (3 locations)
  { id: 86, value: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473 },
  { id: 87, value: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  { id: 88, value: "Durban", country: "South Africa", lat: -29.8587, lng: 31.0218 },

  // Argentina (2 locations)
  { id: 89, value: "Buenos Aires", country: "Argentina", lat: -34.6118, lng: -58.3960 },
  { id: 90, value: "Rosario", country: "Argentina", lat: -32.9442, lng: -60.6505 },

  // Brazil (2 locations)
  { id: 91, value: "São Paulo", country: "Brazil", lat: -23.5558, lng: -46.6396 },
  { id: 92, value: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },

  // Other European cities (8 locations)
  { id: 93, value: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050 },
  { id: 94, value: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738 },
  { id: 95, value: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417 },
  { id: 96, value: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { id: 97, value: "Antwerp", country: "Belgium", lat: 51.2194, lng: 4.4025 },
  { id: 98, value: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { id: 99, value: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402 },
  { id: 100, value: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378 }
];

export default locations;
// Defines the structure for an admin user, including their role for access control.
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'staff';
}

// Defines the structure for a logged-in customer.
export interface CustomerUser {
  id: string;
  name: string;
  email: string;
}

// Defines the structure for a product in the catalog.
export interface Product {
  id: string;
  name:string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  imageUrl: string;
  description?: string;
  fssai?: string;
}

// Defines a product when it's in the shopping cart, including quantity.
export interface CartItem extends Product {
  quantity: number;
}

// Defines the structure for a customer order.
export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
}

// Defines the structure for a customer profile.
export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  lastOrder: string;
}

// Defines the structure for a shipping address.
export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  location?: {
    lat: number;
    lng: number;
  } | null;
}

// Defines the structure for a city in the location selector.
export interface CityInfo {
  name: string;
  icon: React.FC<any>;
}

// Fix for Google Maps API types. By wrapping the namespace in `declare global`,
// we make these types available throughout the project, even though this file is a module.
declare global {
  namespace google.maps {
    interface LatLng {
      lat(): number;
      lng(): number;
    }

    interface MapMouseEvent {
      latLng: LatLng;
    }

    class Map {
      constructor(mapDiv: Element, opts?: any);
      addListener(eventName: string, handler: (event: MapMouseEvent) => void): any;
      setCenter(position: any): void;
      setZoom(zoom: number): void;
    }

    class Marker {
      constructor(opts?: any);
      setPosition(position: any): void;
      addListener(eventName: string, handler: (event: MapMouseEvent) => void): any;
    }

    // Geocoder interfaces for address lookup
    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }
    interface GeocoderResult {
      address_components: GeocoderAddressComponent[];
      formatted_address: string;
    }
    type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';
    
    class Geocoder {
      constructor();
      geocode(
        request: { location: { lat: number; lng: number } },
        callback: (results: GeocoderResult[] | null, status: GeocoderStatus) => void
      ): void;
    }
  }
}
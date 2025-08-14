import React from 'react';

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

// Defines an item within an order.
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

// NEW: Expanded order statuses for the tracker
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

// NEW: Defines a single event in the order's history timeline
export interface StatusEvent {
    status: OrderStatus;
    timestamp: string;
    notes?: string;
}

// UPDATED: Defines the structure for a customer order with tracking details.
export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  orderTimestamp: string; // Changed from 'date'
  total: number;
  status: OrderStatus; // The current status
  items: OrderItem[];
  paymentMethod: 'Card' | 'COD';
  transactionId: string;
  address?: Address;
  statusHistory: StatusEvent[]; // The full timeline of the order
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
  name:string;
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
    
    // Add a constructor signature for LatLng
    const LatLng: {
        new (lat: number, lng: number): LatLng;
    };

    interface MapMouseEvent {
      latLng: LatLng;
    }

    class Map {
      constructor(mapDiv: Element, opts?: any);
      addListener(eventName: string, handler: (event: MapMouseEvent) => void): any;
      setCenter(position: any): void;
      setZoom(zoom: number): void;
      panTo(position: any): void;
      bindTo(key: string, target: any): void;
    }
    
    enum Animation {
        DROP
    }

    class Marker {
      constructor(opts?: any);
      setPosition(position: any): void;
      addListener(eventName: string, handler: (event: MapMouseEvent) => void): any;
    }

    // --- Geocoder interfaces for address lookup ---
    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }
    
    // An interface that covers results from both Geocoder and Autocomplete
    interface PlaceResult {
      address_components?: GeocoderAddressComponent[];
      formatted_address?: string;
      geometry?: { location: LatLng };
      name?: string;
    }

    interface GeocoderResult extends PlaceResult {
       // GeocoderResult specifically has these as non-optional
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
    
    // --- Places Autocomplete Service ---
    namespace places {
        class Autocomplete {
            constructor(inputField: HTMLInputElement, opts?: any);
            bindTo(key: string, map: Map): void;
            setFields(fields: string[]): void;
            addListener(eventName: string, handler: () => void): any;
            getPlace(): PlaceResult;
        }
    }
  }
}
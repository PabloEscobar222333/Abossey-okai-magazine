// ─── Google Maps Integration ─────────────────────────────
// Loads the Google Maps JavaScript API once and exposes small helpers
// for creating a map with a single shop pin and moving that pin.
//
// This is a browser key and will be visible in the page source. Protect it in
// Google Cloud Console → Credentials by restricting it to your site's HTTP
// referrers and to the "Maps JavaScript API" only.
const GOOGLE_MAPS_API_KEY = "AIzaSyCDuyNNyE9vJ-eXdv37P-kJB8zt0q85bgw";

// Advanced markers require a Map ID. DEMO_MAP_ID works out of the box; create
// your own in Cloud Console → Map Management to apply custom map styling.
const GOOGLE_MAPS_MAP_ID = "DEMO_MAP_ID";

let loadPromise = null;

// Called by the Maps API when the key is rejected (invalid, API not enabled, or referrer not allowed)
window.gm_authFailure = () => {
  console.error("Google Maps authentication failed. Check that the Maps JavaScript API is enabled for this key and that this domain is an allowed referrer.");
};

export function loadGoogleMaps() {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const callbackName = "__aoGoogleMapsReady";
    window[callbackName] = async () => {
      delete window[callbackName];
      try {
        const [{ Map, MapTypeControlStyle }, { AdvancedMarkerElement }, { ControlPosition }] = await Promise.all([
          google.maps.importLibrary("maps"),
          google.maps.importLibrary("marker"),
          google.maps.importLibrary("core"),
        ]);
        resolve({ Map, AdvancedMarkerElement, ControlPosition, MapTypeControlStyle });
      } catch (err) {
        reject(err);
      }
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=weekly&loading=async&callback=${callbackName}`;
    script.async = true;
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("Failed to load Google Maps"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

// Creates a Google Map centred on [lat, lng] with one pin.
// options: { zoom, color, draggable, onMove(lat, lng), gestureHandling,
//            mapTypeToggle (Map / Satellite bar, top-left), recenterButton (bottom-right, pans back to the pin) }
export async function createPinMap(el, lat, lng, options = {}) {
  const { Map, AdvancedMarkerElement, ControlPosition, MapTypeControlStyle } = await loadGoogleMaps();
  const {
    zoom = 16, color = "#002d62", draggable = false, onMove = null, gestureHandling = "auto",
    mapTypeToggle = false, recenterButton = false,
  } = options;

  const map = new Map(el, {
    center: { lat, lng },
    zoom,
    mapId: GOOGLE_MAPS_MAP_ID,
    streetViewControl: false,
    clickableIcons: false,
    gestureHandling,
    fullscreenControl: true,
    mapTypeControl: mapTypeToggle,
    mapTypeControlOptions: {
      style: MapTypeControlStyle.HORIZONTAL_BAR,
      position: ControlPosition.TOP_LEFT,
      mapTypeIds: ["roadmap", "satellite"],
    },
  });

  const pin = document.createElement("div");
  pin.innerHTML = `<i class="fa-solid fa-location-dot" style="color:${color}; font-size:2.4rem; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35));${draggable ? " cursor:grab;" : ""}"></i>`;

  const marker = new AdvancedMarkerElement({
    map,
    position: { lat, lng },
    content: pin,
    gmpDraggable: draggable,
  });

  if (recenterButton) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "map-recenter-btn";
    btn.title = "Centre the map on the pin";
    btn.setAttribute("aria-label", "Centre the map on the pin");
    btn.innerHTML = '<i class="fa-solid fa-crosshairs"></i>';
    btn.addEventListener("click", () => map.panTo(getMarkerLatLng(marker)));
    map.controls[ControlPosition.RIGHT_BOTTOM].push(btn);
  }

  if (onMove) {
    marker.addEventListener("gmp-dragend", () => {
      const pos = getMarkerLatLng(marker);
      onMove(pos.lat, pos.lng);
    });

    map.addListener("click", (e) => {
      const clickedLat = e.latLng.lat();
      const clickedLng = e.latLng.lng();
      marker.position = { lat: clickedLat, lng: clickedLng };
      onMove(clickedLat, clickedLng);
    });
  }

  return { map, marker };
}

// Moves the pin and pans the map to it
export function movePin(map, marker, lat, lng, zoom = 17) {
  if (!map || !marker) return;
  marker.position = { lat, lng };
  map.panTo({ lat, lng });
  map.setZoom(zoom);
}

// AdvancedMarkerElement.position may be a LatLng or a LatLngLiteral
function getMarkerLatLng(marker) {
  const p = marker.position;
  return typeof p.lat === "function" ? { lat: p.lat(), lng: p.lng() } : { lat: p.lat, lng: p.lng };
}

from pathlib import Path
from typing import TypedDict

try:
    import geoip2.database
    import geoip2.errors
    _GEOIP2_AVAILABLE = True
except ImportError:
    _GEOIP2_AVAILABLE = False

_reader = None
_DB_PATH = Path(__file__).parent.parent.parent / "GeoLite2-City.mmdb"


def init_geoip() -> None:
    global _reader
    if not _GEOIP2_AVAILABLE:
        return
    if _DB_PATH.exists():
        _reader = geoip2.database.Reader(str(_DB_PATH))
    else:
        print(
            f"[geolocation] GeoLite2-City.mmdb not found at {_DB_PATH}. "
            "Download from https://www.maxmind.com/en/geolite2/signup and place it there."
        )


class GeoResult(TypedDict):
    lat: float | None
    lon: float | None
    city: str
    country: str


def mask_ip(ip: str) -> str:
    """Zero the last octet of an IPv4 address for privacy."""
    parts = ip.rsplit(".", 1)
    return parts[0] + ".0" if len(parts) == 2 else ip


def geolocate(ip: str) -> GeoResult:
    if not _reader:
        return {"lat": None, "lon": None, "city": "Unknown", "country": "??"}
    # Don't attempt to look up loopback/private IPs
    if ip in ("127.0.0.1", "::1") or ip.startswith("192.168.") or ip.startswith("10."):
        return {"lat": None, "lon": None, "city": "Local", "country": "??"}
    try:
        r = _reader.city(ip)
        return {
            "lat": r.location.latitude,
            "lon": r.location.longitude,
            "city": r.city.name or "Unknown",
            "country": r.country.iso_code or "??",
        }
    except Exception:
        return {"lat": None, "lon": None, "city": "Unknown", "country": "??"}

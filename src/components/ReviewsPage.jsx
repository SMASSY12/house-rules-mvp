import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MOCK_VENUES } from '../data/venues'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './ReviewsPage.module.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode]     = useState('list')
  const [roleFilter, setRoleFilter] = useState(null)
  const mapRef         = useRef(null)
  const mapInstanceRef = useRef(null)

  const allRoles = [...new Set(MOCK_VENUES.flatMap(v => v.roles))].sort()

  const filteredVenues = MOCK_VENUES.filter(v => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.neighbourhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = !roleFilter || v.roles.includes(roleFilter)
    return matchesSearch && matchesRole
  })

  useEffect(() => {
    if (viewMode !== 'map' || !mapRef.current) return

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    const map = L.map(mapRef.current, {
      center: [47.6062, -122.3321],
      zoom: 11,
      scrollWheelZoom: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    filteredVenues.forEach(venue => {
      L.marker([venue.latitude, venue.longitude])
        .addTo(map)
        .bindPopup(`
          <strong>${venue.name}</strong><br/>
          ${venue.neighbourhood} · ${venue.type}<br/>
          ★ ${venue.overallScore.toFixed(1)} · ${venue.reviewCount} reviews<br/>
          <a href="/venue/${venue.id}">View reviews →</a>
        `)
    })

    mapInstanceRef.current = map
    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [viewMode, filteredVenues])

  return (
    <div className={styles.page}>

      <div className={styles.pageHeader}>
        <div className={styles.inner}>
          <h1 className={styles.pageTitle}>Reviews</h1>
          <p className={styles.pageSubtitle}>
            Real talk from hospitality professionals in Seattle.
          </p>
        </div>
      </div>

      <div className={styles.controlsBar}>
        <div className={styles.inner}>
          <div className={styles.searchRow}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by name or neighbourhood..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className={styles.viewToggle}>
              <button
                type="button"
                className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleActive : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${viewMode === 'map' ? styles.toggleActive : ''}`}
                onClick={() => setViewMode('map')}
              >
                Map
              </button>
            </div>
          </div>

          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Filter by role:</span>
            {allRoles.map(role => (
              <button
                key={role}
                type="button"
                className={`${styles.filterChip} ${roleFilter === role ? styles.filterChipActive : ''}`}
                onClick={() => setRoleFilter(prev => prev === role ? null : role)}
              >
                {role}
              </button>
            ))}
            {roleFilter && (
              <button
                type="button"
                className={styles.clearFilter}
                onClick={() => setRoleFilter(null)}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <p className={styles.resultsCount}>
          {filteredVenues.length}{filteredVenues.length === 1 ? ' business' : ' businesses'}
          {searchTerm && ` matching "${searchTerm}"`}
          {roleFilter && ` with ${roleFilter} reviews`}
        </p>
      </div>

      {viewMode === 'list' && (
        <div className={styles.inner}>
          <div className={styles.venueList}>
            {filteredVenues.length === 0 ? (
              <p className={styles.emptyState}>
                No results. Try a different search or clear the filter.
              </p>
            ) : (
              filteredVenues.map(venue => (
                <Link
                  key={venue.id}
                  to={`/venue/${venue.id}`}
                  className={styles.venueCard}
                >
                  <div className={styles.cardMain}>
                    <div className={styles.cardLeft}>
                      <h2 className={styles.venueName}>{venue.name}</h2>
                      <p className={styles.venueMeta}>{venue.neighbourhood} · {venue.type}</p>
                      <div className={styles.roleTags}>
                        {venue.roles.map(r => (
                          <span key={r} className={styles.roleTag}>{r}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.cardRight}>
                      <span className={styles.score}>{venue.overallScore.toFixed(1)}</span>
                      <span className={styles.reviewCount}>{venue.reviewCount} reviews</span>
                      <span className={styles.recommend}>{venue.wouldRecommend}% recommend</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {viewMode === 'map' && (
        <div className={styles.mapContainer} ref={mapRef} />
      )}

    </div>
  )
}

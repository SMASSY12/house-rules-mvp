import { useParams } from 'react-router-dom'

export default function VenueDetail() {
  const { id } = useParams()
  return <div style={{ padding: '2rem' }}>Venue: {id}</div>
}

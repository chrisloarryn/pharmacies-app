import axios from 'axios'

const API_KEY = 'AIzaSyDdemVqJ1aRbCcbpPyc-tBxagqU0Rj1dSQ'

export const getCoordsForAddress = async (address) => {
  // return {
  //     lat: 40.7484474,
  //     lng: -73.9871516
  // }
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  )

  const data = response.data

  if (!data || data.status === 'ZERO_RESULTS') {
    /* const error = new AppError(
      'Could not find location for the specified address.',
      422
    )
    throw error */
  }

  const coordinates = data.results[0].geometry.location
  return coordinates
}

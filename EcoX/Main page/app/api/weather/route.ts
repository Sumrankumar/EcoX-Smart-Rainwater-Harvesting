import { NextResponse } from 'next/server'

export const revalidate = 1800 // 30 minutes

type OpenMeteoResponse = {
  latitude: number
  longitude: number
  current_weather?: {
    temperature: number
    windspeed: number
    weathercode: number
  }
  daily?: {
    time: string[]
    precipitation_probability_max?: number[]
    precipitation_sum?: number[]
  }
}

function isPrecipitating(weathercode?: number): boolean {
  if (weathercode === undefined || weathercode === null) return false
  // Open-Meteo WMO codes: 51-67 drizzle/rain/snow, 80-99 showers/thunder
  return (
    (weathercode >= 51 && weathercode <= 67) ||
    (weathercode >= 80 && weathercode <= 99)
  )
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '')
    const lon = parseFloat(searchParams.get('lon') || '')

    const latitude = Number.isFinite(lat) ? lat : 12.9716 // default: Bengaluru
    const longitude = Number.isFinite(lon) ? lon : 77.5946

    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.set('latitude', String(latitude))
    url.searchParams.set('longitude', String(longitude))
    url.searchParams.set('current_weather', 'true')
    url.searchParams.set('hourly', 'precipitation_probability,precipitation')
    url.searchParams.set('daily', 'precipitation_probability_max,precipitation_sum')
    url.searchParams.set('timezone', 'auto')

    const res = await fetch(url.toString(), { next: { revalidate } })
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 502 })
    }

    const data = (await res.json()) as OpenMeteoResponse

    const todayIndex = 0
    const tomorrowIndex = 1
    const daily = data.daily

    const responseBody = {
      location: { latitude, longitude },
      current: {
        temperature: data.current_weather?.temperature ?? null,
        windspeed: data.current_weather?.windspeed ?? null,
        weathercode: data.current_weather?.weathercode ?? null,
        isRaining: isPrecipitating(data.current_weather?.weathercode),
      },
      today: {
        precipitationProbabilityMax: daily?.precipitation_probability_max?.[todayIndex] ?? null,
        precipitationSum: daily?.precipitation_sum?.[todayIndex] ?? null,
        date: daily?.time?.[todayIndex] ?? null,
      },
      tomorrow: {
        precipitationProbabilityMax: daily?.precipitation_probability_max?.[tomorrowIndex] ?? null,
        precipitationSum: daily?.precipitation_sum?.[tomorrowIndex] ?? null,
        date: daily?.time?.[tomorrowIndex] ?? null,
      },
    }

    return NextResponse.json(responseBody)
  } catch (error) {
    return NextResponse.json({ error: 'Unexpected error', details: (error as Error).message }, { status: 500 })
  }
}



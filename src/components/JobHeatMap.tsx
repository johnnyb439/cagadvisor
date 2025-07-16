'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { MapPin, Shield, Users, DollarSign } from 'lucide-react'

// GeoJSON data URL for world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Job locations with real coordinates
const jobLocations = [
  // USA Locations
  {
    id: 1,
    city: 'Washington, DC',
    country: 'USA',
    coordinates: [-77.0369, 38.9072], // [longitude, latitude]
    jobCount: 45,
    clearanceRequired: 'TS/SCI',
    avgSalary: '$165,000',
    companies: ['Booz Allen', 'Lockheed Martin', 'Raytheon']
  },
  {
    id: 2,
    city: 'San Diego, CA',
    country: 'USA',
    coordinates: [-117.1611, 32.7157],
    jobCount: 28,
    clearanceRequired: 'Secret',
    avgSalary: '$145,000',
    companies: ['General Atomics', 'SPAWAR', 'BAE Systems']
  },
  {
    id: 3,
    city: 'Colorado Springs, CO',
    country: 'USA',
    coordinates: [-104.8214, 38.8339],
    jobCount: 22,
    clearanceRequired: 'TS/SCI',
    avgSalary: '$155,000',
    companies: ['Space Force Contractors', 'Lockheed', 'Boeing']
  },
  // Europe
  {
    id: 4,
    city: 'London',
    country: 'UK',
    coordinates: [-0.1278, 51.5074],
    jobCount: 15,
    clearanceRequired: 'Secret',
    avgSalary: '$125,000',
    companies: ['BAE Systems', 'Lockheed Martin', 'Raytheon']
  },
  {
    id: 5,
    city: 'Warsaw',
    country: 'Poland',
    coordinates: [21.0122, 52.2297],
    jobCount: 12,
    clearanceRequired: 'Secret',
    avgSalary: '$95,000',
    companies: ['NATO Contractors', 'Raytheon', 'Boeing']
  },
  {
    id: 6,
    city: 'Stuttgart',
    country: 'Germany',
    coordinates: [9.1829, 48.7758],
    jobCount: 25,
    clearanceRequired: 'Secret',
    avgSalary: '$155,000',
    companies: ['EUCOM Contractors', 'SAIC', 'CACI']
  },
  // Middle East
  {
    id: 7,
    city: 'Dubai',
    country: 'UAE',
    coordinates: [55.2708, 25.2048],
    jobCount: 24,
    clearanceRequired: 'Secret',
    avgSalary: '$180,000',
    companies: ['Lockheed Martin', 'Raytheon', 'SAIC']
  },
  {
    id: 8,
    city: 'Doha',
    country: 'Qatar',
    coordinates: [51.5251, 25.2866],
    jobCount: 30,
    clearanceRequired: 'TS/SCI',
    avgSalary: '$190,000',
    companies: ['CENTCOM Contractors', 'Boeing', 'L3Harris']
  },
  {
    id: 9,
    city: 'Tel Aviv',
    country: 'Israel',
    coordinates: [34.7818, 32.0853],
    jobCount: 20,
    clearanceRequired: 'Top Secret',
    avgSalary: '$170,000',
    companies: ['Lockheed Martin', 'Boeing', 'Raytheon']
  },
  {
    id: 10,
    city: 'Baghdad',
    country: 'Iraq',
    coordinates: [44.3661, 33.3152],
    jobCount: 35,
    clearanceRequired: 'Secret',
    avgSalary: '$185,000',
    companies: ['KBR', 'Fluor', 'DynCorp']
  },
  // Asia Pacific
  {
    id: 11,
    city: 'Tokyo',
    country: 'Japan',
    coordinates: [139.6503, 35.6762],
    jobCount: 18,
    clearanceRequired: 'Secret',
    avgSalary: '$160,000',
    companies: ['Navy Contractors', 'Lockheed', 'BAE']
  },
  {
    id: 12,
    city: 'Singapore',
    country: 'Singapore',
    coordinates: [103.8198, 1.3521],
    jobCount: 16,
    clearanceRequired: 'Secret',
    avgSalary: '$155,000',
    companies: ['Navy Contractors', 'Raytheon', 'Boeing']
  },
  {
    id: 13,
    city: 'Sydney',
    country: 'Australia',
    coordinates: [151.2093, -33.8688],
    jobCount: 14,
    clearanceRequired: 'Secret',
    avgSalary: '$150,000',
    companies: ['BAE Systems', 'Lockheed Martin', 'Thales']
  },
  // Africa
  {
    id: 14,
    city: 'Djibouti City',
    country: 'Djibouti',
    coordinates: [43.1451, 11.5720],
    jobCount: 22,
    clearanceRequired: 'Secret',
    avgSalary: '$180,000',
    companies: ['KBR', 'PAE', 'Fluor']
  }
]

interface JobHeatMapProps {
  userClearance?: string
}

export default function JobHeatMap({ userClearance = 'Secret' }: JobHeatMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<typeof jobLocations[0] | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null)

  // Determine qualification status based on clearance levels
  const getQualificationStatus = (requiredClearance: string) => {
    const clearanceLevels = ['Public', 'Secret', 'Top Secret', 'TS/SCI']
    const userLevel = clearanceLevels.indexOf(userClearance)
    const requiredLevel = clearanceLevels.indexOf(requiredClearance)
    
    if (userLevel >= requiredLevel) {
      return 'qualified' // Green
    } else if (requiredLevel - userLevel === 1) {
      return 'close' // Yellow
    } else {
      return 'needHigher' // Red
    }
  }

  // Get marker color based on qualification status
  const getMarkerColor = (status: string) => {
    switch(status) {
      case 'qualified': return '#10b981' // green-500
      case 'close': return '#eab308' // yellow-500
      case 'needHigher': return '#ef4444' // red-500
      default: return '#6b7280' // gray-500
    }
  }

  // Calculate marker size based on job count
  const getMarkerSize = (jobCount: number) => {
    return Math.max(8, Math.min(20, jobCount / 3))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Global Cleared Job Opportunities</h2>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">Your clearance: </span>
            <span className="font-semibold text-blue-600">{userClearance}</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Qualified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span>Almost there (1 level away)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Need higher clearance</span>
          </div>
          <div className="text-sm text-gray-600 ml-4">
            Circle size = Number of jobs
          </div>
        </div>

        {/* World Map */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden border-2 border-blue-200">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 147,
              center: [0, 20]
            }}
            style={{
              width: "100%",
              height: "auto"
            }}
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#e0f2fe"
                      stroke="#93c5fd"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#dbeafe', outline: 'none' },
                        pressed: { outline: 'none' }
                      }}
                    />
                  ))
                }
              </Geographies>
              
              {/* Job Location Markers */}
              {jobLocations.map((location) => {
                const status = getQualificationStatus(location.clearanceRequired)
                const size = getMarkerSize(location.jobCount)
                const isHovered = hoveredLocation === location.id
                const isSelected = selectedLocation?.id === location.id
                
                return (
                  <Marker
                    key={location.id}
                    coordinates={location.coordinates}
                    onMouseEnter={() => setHoveredLocation(location.id)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    onClick={() => setSelectedLocation(location)}
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    {/* Pulsing effect for selected/hovered */}
                    {(isHovered || isSelected) && (
                      <circle
                        r={size + 5}
                        fill={getMarkerColor(status)}
                        fillOpacity={0.3}
                        className="animate-ping"
                      />
                    )}
                    
                    {/* Main marker circle */}
                    <circle
                      r={size}
                      fill={getMarkerColor(status)}
                      stroke="#fff"
                      strokeWidth={2}
                      transform={isHovered ? "scale(1.2)" : "scale(1)"}
                      style={{
                        transition: "transform 0.2s ease-in-out"
                      }}
                    />
                    
                    {/* Job count text */}
                    <text
                      textAnchor="middle"
                      y={1}
                      style={{
                        fontFamily: "system-ui",
                        fill: "#fff",
                        fontSize: size > 10 ? "10px" : "8px",
                        fontWeight: "bold"
                      }}
                    >
                      {location.jobCount}
                    </text>
                    
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <g>
                        <rect
                          x={-60}
                          y={-size - 35}
                          width={120}
                          height={25}
                          fill="rgba(0, 0, 0, 0.8)"
                          rx={4}
                        />
                        <text
                          y={-size - 18}
                          textAnchor="middle"
                          style={{
                            fontFamily: "system-ui",
                            fill: "#fff",
                            fontSize: "12px"
                          }}
                        >
                          {location.city}, {location.country}
                        </text>
                      </g>
                    )}
                  </Marker>
                )
              })}
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="w-full">
                <h3 className="font-semibold text-lg mb-2">{selectedLocation.city}, {selectedLocation.country}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Available Jobs
                    </p>
                    <p className="font-bold text-xl">{selectedLocation.jobCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      Required
                    </p>
                    <p className="font-bold text-lg" style={{ 
                      color: getMarkerColor(getQualificationStatus(selectedLocation.clearanceRequired))
                    }}>
                      {selectedLocation.clearanceRequired}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Avg. Salary
                    </p>
                    <p className="font-bold">{selectedLocation.avgSalary}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Top Employers
                    </p>
                    <p className="text-xs">{selectedLocation.companies.join(', ')}</p>
                  </div>
                </div>
                
                {/* Qualification status message */}
                {getQualificationStatus(selectedLocation.clearanceRequired) === 'close' && (
                  <div className="mt-3 p-2 bg-yellow-50 rounded text-sm text-yellow-800 border border-yellow-200">
                    🟡 You're almost there! Just one clearance level away
                  </div>
                )}
                {getQualificationStatus(selectedLocation.clearanceRequired) === 'needHigher' && (
                  <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-800 border border-red-200">
                    🔴 Higher clearance required - Consider upgrading your clearance
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
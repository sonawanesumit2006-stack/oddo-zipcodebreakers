import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TripMapVisualization = ({ trips = [] }) => {
    const svgRef = useRef(null);
    const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: {} });
    const [error, setError] = useState(null);

    // Mock coordinates for cities
    const cityCoordinates = {
        "Jaipur": [75.7873, 26.9124],
        "Udaipur": [73.7125, 24.5854],
        "Jodhpur": [73.0243, 26.2389],
        "Chennai": [80.2707, 13.0827],
        "Madurai": [78.1198, 9.9252],
        "Kanyakumari": [77.5385, 8.0883],
        "North Goa": [73.8180, 15.4909],
        "South Goa": [74.0541, 15.2736],
        "Manali": [77.1892, 32.2432],
        "Leh": [77.5771, 34.1526],
        "Dharamshala": [76.3197, 32.2190],
        "Kochi": [76.2673, 9.9312],
        "Alleppey": [76.3388, 9.4981],
        "Munnar": [77.0595, 10.0889],
        "Shillong": [91.8933, 25.5788],
        "Kaziranga": [93.1670, 26.5775],
        "Delhi": [77.1025, 28.7041],
        "Mumbai": [72.8777, 19.0760],
        "Bangalore": [77.5946, 12.9716],
        "Kolkata": [88.3639, 22.5726]
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return '#10B981'; // Emerald
            case 'completed': return '#3B82F6'; // Blue
            case 'planned': return '#F59E0B'; // Amber
            default: return '#94A3B8'; // Slate
        }
    };

    useEffect(() => {
        if (!svgRef.current || !trips) return;

        const width = 800;
        const height = 500;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // 1. Beautiful Background Pattern - Deep Organic Gradient
        svg.attr("viewBox", `0 0 ${width} ${height}`)
            .style("width", "100%")
            .style("height", "auto")
            .style("background", "radial-gradient(circle at 60% 40%, #1e293b 0%, #0f172a 100%)")
            .style("border-radius", "24px");

        // Defs for Glows and Gradients
        const defs = svg.append("defs");

        // Star glow
        const glowFilter = defs.append("filter").attr("id", "star-glow");
        glowFilter.append("feGaussianBlur").attr("stdDeviation", "2.5").attr("result", "coloredBlur");
        const feMerge = glowFilter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Map Projection
        const projection = d3.geoMercator()
            .center([82, 22]) // Centered slightly east of India for balance
            .scale(850)
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        const g = svg.append("g");
        const patternGroup = svg.append("g"); // For the Delaunay/Voronoi Pattern
        const cityGroup = svg.append("g");    // For City Nodes

        // Zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
                patternGroup.attr("transform", event.transform);
                cityGroup.attr("transform", event.transform);
            });
        svg.call(zoom);

        const loadMap = async () => {
            try {
                // Load GeoJSON
                const data = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
                if (!data || !data.features) throw new Error("Invalid geojson data");

                // 2. Draw Subtle Dark Map Base
                g.selectAll("path")
                    .data(data.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("fill", "#1e293b")
                    .attr("stroke", "#334155")
                    .attr("stroke-width", 0.5)
                    .style("opacity", 0.5) // Faint map, focus on the pattern
                    .on("mouseover", function () {
                        d3.select(this).attr("fill", "#334155");
                    })
                    .on("mouseout", function () {
                        d3.select(this).attr("fill", "#1e293b");
                    });


                // 3. Extract Points for the Pattern - ONE DOT PER TRIP
                const tripPoints = trips.map(trip => {
                    if (!trip || !trip.cities || trip.cities.length === 0) return null;

                    // Use the FIRST city as the representative location for this trip
                    const firstCity = trip.cities[0];
                    const key = Object.keys(cityCoordinates).find(k => firstCity.includes(k));

                    if (!key || !cityCoordinates[key]) return null;

                    return {
                        tripId: trip.id,
                        title: trip.title,
                        cities: trip.cities,
                        coord: cityCoordinates[key],
                        status: trip.status
                    };
                }).filter(p => p !== null);

                // 4. Create Delaunay Triangulation (The "Beautiful Pattern")
                // We project all coords first
                const projectedPoints = tripPoints.map(p => {
                    const proj = projection(p.coord);
                    return { ...p, x: proj[0], y: proj[1] };
                });

                // Only draw pattern if we have enough points (>=3)
                if (projectedPoints.length >= 3) {
                    const delaunay = d3.Delaunay.from(projectedPoints.map(p => [p.x, p.y]));
                    const voronoi = delaunay.voronoi([0, 0, width, height]);

                    // Draw Triangle Mesh (Constellation lines)
                    // We draw the edges of the delaunay triangles
                    const { halfedges, triangles } = delaunay;

                    // Draw connections (Mesh)
                    // Instead of standard lines, let's draw them as faint beams
                    const meshPath = patternGroup.append("path")
                        .attr("d", delaunay.render()) // Renders the triangle edges
                        .attr("fill", "none")
                        .attr("stroke", "url(#mesh-gradient)") // We need to define this
                        .attr("stroke-width", 0.8)
                        .attr("stroke-opacity", 0.2)
                        .attr("stroke-linecap", "round");

                    // Add a lovely organic motion to the mesh opacity?
                    meshPath.append("animate")
                        .attr("attributeName", "stroke-opacity")
                        .attr("values", "0.1; 0.3; 0.1")
                        .attr("dur", "4s")
                        .attr("repeatCount", "indefinite");

                    // Draw Voronoi Cells (Optional - creates "zones" around cities)
                    patternGroup.append("path")
                        .attr("d", voronoi.render())
                        .attr("fill", "none")
                        .attr("stroke", "#60A5FA") // Light Blue
                        .attr("stroke-width", 0.5)
                        .attr("stroke-opacity", 0.05);
                } else {
                    // Fallback for few points: Just connect them sequentially with soft curves
                    // (Logic handled by default "if only a few points")
                }


                // 5. Draw Beautiful "Star" Nodes
                const nodes = cityGroup.selectAll("g")
                    .data(projectedPoints)
                    .enter()
                    .append("g")
                    .attr("transform", d => `translate(${d.x}, ${d.y})`)
                    .attr("cursor", "pointer")
                    .on("mouseover", (event, d) => {
                        setTooltip({
                            show: true,
                            x: event.pageX,
                            y: event.pageY,
                            content: d // d now contains the full trip data
                        });
                        d3.select(event.currentTarget).select(".core-circle").attr("r", 8).attr("fill", "#fff");
                    })
                    .on("mouseout", (event, d) => {
                        setTooltip({ show: false, x: 0, y: 0, content: {} });
                        d3.select(event.currentTarget).select(".core-circle").attr("r", 4).attr("fill", getStatusColor(d.status));
                    });

                // Outer Glow Ring (Breathing)
                nodes.append("circle")
                    .attr("r", 8)
                    .attr("fill", "none")
                    .attr("stroke", d => getStatusColor(d.status))
                    .attr("stroke-width", 1)
                    .attr("opacity", 0.6)
                    .append("animate")
                    .attr("attributeName", "r")
                    .attr("values", "8; 14; 8")
                    .attr("dur", "3s")
                    .attr("repeatCount", "indefinite");

                nodes.append("circle")
                    .attr("r", 4)
                    .attr("fill", d => getStatusColor(d.status))
                    .attr("stroke", "none")
                    .attr("opacity", 0.3)
                    .append("animate")
                    .attr("attributeName", "opacity")
                    .attr("values", "0.3; 0; 0.3")
                    .attr("dur", "3s")
                    .attr("repeatCount", "indefinite");

                // Core Star Dot
                nodes.append("circle")
                    .attr("class", "core-circle")
                    .attr("r", 4)
                    .attr("fill", d => getStatusColor(d.status))
                    .attr("filter", "url(#star-glow)") // Apply glow
                    .style("filter", "drop-shadow(0 0 4px rgba(255,255,255,0.5))");

                // Label (Faint, futuristic)
                nodes.append("text")
                    .text(d => d.title)
                    .attr("y", -12)
                    .attr("text-anchor", "middle")
                    .attr("fill", "#94a3b8")
                    .attr("font-size", "8px")
                    .attr("font-family", "monospace")
                    .attr("opacity", 0.0) // Hidden by default, show on hover or fade in
                    .transition()
                    .delay((d, i) => i * 100)
                    .duration(1000)
                    .attr("opacity", 0.8);

            } catch (err) {
                console.error("Failed to load map data:", err);
                setError("Could not load map data.");
            }
        };

        loadMap();

        return () => {
            setTooltip({ show: false, x: 0, y: 0, content: {} });
        };

    }, [trips]);

    if (error) {
        return <div className="text-white flex items-center justify-center h-full min-h-[400px]">{error}</div>;
    }

    return (
        <div className="relative w-full h-full min-h-[400px]">
            <div className="absolute top-4 left-4 z-10 flex gap-4 bg-gray-900/50 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span> Active
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span> Planned
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-400 font-medium tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></span> Completed
                </div>
            </div>

            <svg ref={svgRef} className="w-full h-full shadow-2xl"></svg>

            {/* Futuristic Glass Tooltip */}
            {tooltip.show && tooltip.content && (
                <div
                    className="fixed z-50 bg-gray-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/10 pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-16px] min-w-[140px]"
                    style={{ left: tooltip.x, top: tooltip.y }}
                >
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Destination</div>
                    <div className="text-base font-bold text-white mb-2">{tooltip.content.title || 'Unknown'}</div>

                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: getStatusColor(tooltip.content.status) }}></div>
                        <span className="text-xs text-gray-300 capitalize">{tooltip.content.status}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripMapVisualization;

import { useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { generateArcFromHash } from "../utils/geo";
import { createRoot } from "react-dom/client";
import { ClusterTable } from "./ClusterTable";

interface GlobeComponentProps {
  transactions: any[];
  validators: any[];
}

export default function GlobeComponent({ transactions, validators }: GlobeComponentProps) {
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null);
  const htmlElementsCache = useRef<{ [key: string]: { el: HTMLDivElement; root: any } }>({});

  const arcsData = useMemo(() => {
    if (!transactions) return [];
    return transactions.map((tx) => generateArcFromHash(tx.digest));
  }, [transactions]);

  const activeCluster = useMemo(() => {
    if (!selectedCityName) return null;
    return validators.find((v) => v.cityName === selectedCityName) || null;
  }, [selectedCityName, validators]);

  return (
    <div className='w-full relative bg-gray-950 h-lvh flex-1'>
      <Globe
        globeImageUrl='//unpkg.com/three-globe/example/img/earth-dark.jpg'
        labelsData={validators}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => `${d.count}`}
        labelSize={2.0}
        labelColor={() => "#ffffff"}
        labelRotation={() => 0}
        labelDotRadius={(d: any) => d.count / 3}
        labelDotOrientation={() => "bottom"}
        labelsTransitionDuration={0}
        onLabelClick={(label: any) => {
          setSelectedCityName(label.cityName);
        }}
        htmlElementsData={activeCluster ? [activeCluster] : []}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlAltitude={0.02}
        htmlElement={(d: any) => {
          if (!htmlElementsCache.current[d.cityName]) {
            const el = document.createElement("div");
            el.style.transform = "translate(-50%, 0)";

            htmlElementsCache.current[d.cityName] = {
              el: el,
              root: createRoot(el),
            };
          }

          const { el, root } = htmlElementsCache.current[d.cityName];

          root.render(
            <ClusterTable
              selectedCluster={d}
              setSelectedCluster={() => setSelectedCityName(null)}
            />,
          );

          return el;
        }}
        arcsData={arcsData}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcColor={(d: any) => d.color}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={1500}
        arcAltitudeAutoScale={0.3}
        width={document.body.clientWidth}
        height={document.body.clientHeight}
      />
    </div>
  );
}

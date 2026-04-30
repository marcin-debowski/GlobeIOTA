import { useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { generateArcFromHash } from "../utils/geo";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { ClusterTable } from "./ClusterTable";
import type { IotaTransaction, ValidatorCluster, TransactionArc } from "../types";

interface GlobeComponentProps {
  transactions: IotaTransaction[];
  validators: ValidatorCluster[];
}

export default function GlobeComponent({ transactions, validators }: GlobeComponentProps) {
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null);
  const htmlElementsCache = useRef<{ [key: string]: { el: HTMLDivElement; root: Root } }>({});

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
        labelLat={(d: object) => (d as ValidatorCluster).lat}
        labelLng={(d: object) => (d as ValidatorCluster).lng}
        labelText={(d: object) => `${(d as ValidatorCluster).count}`}
        labelSize={2.0}
        labelColor={() => "#ffffff"}
        labelRotation={() => 0}
        labelDotRadius={(d: object) => (d as ValidatorCluster).count / 3}
        labelDotOrientation={() => "bottom"}
        labelsTransitionDuration={0}
        onLabelClick={(label: object) => {
          setSelectedCityName((label as ValidatorCluster).cityName);
        }}
        htmlElementsData={activeCluster ? [activeCluster] : []}
        htmlLat={(d: object) => (d as ValidatorCluster).lat}
        htmlLng={(d: object) => (d as ValidatorCluster).lng}
        htmlAltitude={0.02}
        htmlElement={(d: object) => {
          const cluster = d as ValidatorCluster;
          if (!htmlElementsCache.current[cluster.cityName]) {
            const el = document.createElement("div");
            el.style.transform = "translate(-50%, 0)";

            htmlElementsCache.current[cluster.cityName] = {
              el: el,
              root: createRoot(el),
            };
          }

          const { el, root } = htmlElementsCache.current[cluster.cityName];

          root.render(
            <ClusterTable
              selectedCluster={cluster}
              setSelectedCluster={() => setSelectedCityName(null)}
            />,
          );

          return el;
        }}
        arcsData={arcsData}
        arcStartLat={(d: object) => (d as TransactionArc).startLat}
        arcStartLng={(d: object) => (d as TransactionArc).startLng}
        arcEndLat={(d: object) => (d as TransactionArc).endLat}
        arcEndLng={(d: object) => (d as TransactionArc).endLng}
        arcColor={(d: object) => (d as TransactionArc).color}
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

// import Globe from "react-globe.gl";

// function GlobeComponent() {
//   return (
//     <div className='flex flex-1 items-center justify-center bg-black text-white flex-col'>
//       <h2>TUTAJ BĘDZIE GLOBUS 3D 🌍</h2>
//       <div>
//         <Globe arcsData={[]} width={600} height={600} />
//       </div>
//     </div>
//   );
// }
// export default GlobeComponent;
import { useMemo } from "react";
import Globe from "react-globe.gl";
import { generateArcFromHash } from "../utils/geo";

interface GlobeComponentProps {
  transactions: any[];
  validators: any[]; // Nowy props dla walidatorów
}

export default function GlobeComponent({ transactions, validators }: GlobeComponentProps) {
  const arcsData = useMemo(() => {
    if (!transactions) return [];
    return transactions.map((tx) => generateArcFromHash(tx.digest));
  }, [transactions]);

  return (
    <div className='w-2/3'>
      <Globe
        globeImageUrl='//unpkg.com/three-globe/example/img/earth-dark.jpg'
        backgroundColor='rgba(0,0,0,0)'
        // --- WARSTWA 1: WALIDATORZY (PUNKTY) ---
        pointsData={validators}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={(d: any) => d.color}
        // Wielkość punktu zależy od Stake'a (im silniejszy walidator, tym większy punkt)
        pointAltitude={(d: any) => Math.max(0.01, (d.stake / 100000) * 0.05)}
        pointRadius={(d: any) => Math.max(0.2, (d.stake / 100000) * 0.8)}
        pointsMerge={false}
        // --- WARSTWA 2: TRANSAKCJE (ŁUKI) ---
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
        width={document.body.clientWidth * 0.66}
        height={document.body.clientHeight}
      />
    </div>
  );
}

export const ClusterTable = ({ selectedCluster, setSelectedCluster }: any) => {
  return (
    // Zmieniamy szerokość na 80, żeby było więcej miejsca na nazwy serwerów
    <div className='bg-gray-950 border border-gray-700 text-white p-5 rounded-xl shadow-2xl w-80 pointer-events-auto'>
      <div className='flex justify-between items-start mb-4 border-b border-gray-700 pb-2'>
        <div>
          <h3 className='font-bold text-lg text-emerald-400'>{selectedCluster.cityName}</h3>
          <p className='text-sm text-gray-400'>Aktywne węzły: {selectedCluster.count}</p>
        </div>
        <button
          onClick={() => setSelectedCluster(null)}
          className='text-gray-500 hover:text-white font-bold text-xl leading-none'
        >
          &times;
        </button>
      </div>
      <div className='max-h-30 overflow-y-auto pr-2 custom-scrollbar'>
        <table className='w-full text-left text-sm'>
          <tbody>
            {selectedCluster.serverNames?.map((name: string, index: number) => (
              <tr
                key={index}
                className='border-b border-gray-800 last:border-0 hover:bg-gray-800 transition-colors'
              >
                <td className='py-2 text-gray-300 font-mono text-xs'>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import usePokemonsContext from "../../Utils/usePokemonContext";

interface SidebarProps {
  uniqueTypeNames: string[];
  filters: any;
}

const Sidebar: React.FC<SidebarProps> = ({ uniqueTypeNames, filters }) => {
  const {
    handleHeightChange,
    handleWeightChange,
    handleSearchChange,
    handleTypeToggle,
    handleSortChange
  } = usePokemonsContext();

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, direction] = e.target.value.split("-");
    handleSortChange(sortBy, direction);
  };

  return (
    <div className="bg-gray-800 h-full w-78 py-4 px-6 fixed top-0 left-0 overflow-y-auto">
      <div className="text-white bg-hero-pattern bg-cover bg-no-repeat text-2xl h-[70px] w-[220px] font-bold mt-12 mb-8"></div>
      <div className="mb-8">
        <label htmlFor="labels-range-input" className="sr-only">
          Labels range
        </label>
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          className="w-full px-4 py-2 rounded border border-gray-600 focus:outline-none"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="relative mb-6">
        <h3 className="text-white block mb-2">Filtrar por peso:</h3>
        <label htmlFor="labels-range-input" className="sr-only">
          Labels range
        </label>
        <input
          id="labels-range-input"
          type="range"
          min="1"
          max="5000"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          name="weight"
          onChange={handleWeightChange}
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
          {filters.weight / 10} kgs
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
          Max (500)
        </span>
      </div>
      <div className="relative mb-6">
        <h3 className="text-white block mb-2">Filtrar altura:</h3>
        <label htmlFor="labels-range-input" className="sr-only">
          Labels range
        </label>
        <input
          id="labels-range-input"
          type="range"
          min="1"
          max="600"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          name="height"
          onChange={handleHeightChange}
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
          {filters.height / 100} mts
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
          Max (600)
        </span>
      </div>
      <div className="mb-8">
        <h3 className="text-white block mb-2">Filtrar por tipo:</h3>
        <div className="grid grid-cols-3 gap-2 ">
          {uniqueTypeNames.map((type, index) => (
            <div key={index} className="w-full">
              <div className="flex items-center">
                <input
                  id={`type-checkbox-${index}`}
                  type="checkbox"
                  checked={filters.types.has(type)}
                  onChange={() => handleTypeToggle(type)}
                  value={type}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={`type-checkbox-${index}`}
                  className="ml-2 text-sm  text-white dark:text-gray-300"
                >
                  {type.toUpperCase()}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mb-6">
        <h3 className="text-white block mb-2">Ordenar por:</h3>
        <select
          className="w-full px-4 py-2 rounded border border-gray-600 focus:outline-none"
          onChange={handleSortByChange}
          value={`${filters.sort.by}-${filters.sort.direction}`}
        >
          <option value="">Seleccionar</option>
          <option value="weight-asc">Peso (ascendente)</option>
          <option value="weight-desc">Peso (descendente)</option>
          <option value="height-asc">Altura (ascendente)</option>
          <option value="height-desc">Altura (descendente)</option>
        </select>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;

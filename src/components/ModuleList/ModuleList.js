import React, { useEffect, useState } from 'react';

const ModuleList = () => {

    const [modules, setModules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
    /** 
   * @load modules from API
   * @load modules from API
   * @load modules from API
   * 
   */
  useEffect(() => {
    const limit = 5;
    fetch(
      `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${currentPage}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        setModules(data);
        setTotalPages(Math.ceil(99 / limit));
      })
      .catch((err) => console.error(err));
  }, [currentPage]);



    /** 
   * @pagination functions
   * @pagination functions
   * @pagination functions
   * 
   */
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleThirdPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 2);
    }
  }


    /** 
   * @draggable element moving forward
   * @draggable element moving forward
   * @draggable element moving forward
   * 
   */
  const handleDragStart = (event, node) => {
    event.dataTransfer.setData('application/reactflow', node);
    event.dataTransfer.effectAllowed = 'move';
  };


    return (
        <div className="border border-blue-700">
            <h1 className="border border-blue-700 py-3 px-6 text-start text-lg font-bold text-gray-500">
              Module
            </h1>
            <div className="flex flex-col items-center w-full">
              {modules?.map((module) => (
                <div
                  key={module?.id}
                  className="w-4/5 border border-blue-500 rounded-2xl  my-3 grid grid-cols-[1fr,4fr,1fr]"
                  draggable
                  onDragStart={(event) => handleDragStart(event, JSON.stringify(module))}

                >
                  <h1 className=" p-2 capitalize text-black font-bold text-lg text-center">
                    {module?.input_type}
                  </h1>
                  <h1 className="border-x-2 border-blue-500  bg-blue-100 p-2 text-start text-base font-semibold text-gray-600">
                    {module?.name}
                  </h1>
                  <h1 className=" p-2 capitalize text-black font-bold text-lg text-center">
                    {module?.output_type}
                  </h1>
                </div>
              ))}
              <div className="flex justify-between w-2/5 mt-24 mb-12">
                <button
                  className="text-black text-lg font-bold"
                  onClick={handlePrevPage}
                >
                  &lt;
                </button>
                <button
                  className="text-gray-600 text-lg font-bold"

                >
                  {currentPage}
                </button>
                <button
                  className="text-black text-lg font-bold"
                  onClick={handleNextPage}
                >
                  {currentPage + 1}
                </button>
                <button
                  className="text-black text-lg font-bold"
                  onClick={handleThirdPage}
                >
                  {currentPage + 2}
                </button>

                <button
                  className="text-black text-lg font-bold"
                  onClick={handleNextPage}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
    );
};

export default ModuleList;
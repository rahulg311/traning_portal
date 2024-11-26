import React from 'react';
import { CheckCircle, Clock, BookOpen, Upload } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SideBaar = ({ isOpen,languageLabels }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-white shadow-sm fixed h-full transition-all duration-300 z-index_2 mt-3 mt-md-0`}
      >
      <div className={`d-flex justify-center mt-4 ${ isOpen ? 'd-block' : 'd-none'} transition-all duration-300`}>
     <h2 className='text-2xl font-bold  '>{languageLabels?.DASHBOARD}</h2> 
      </div>
        <div className="p-4">
          {/* Completion */}
          <div
            onClick={() => navigate('/Completion')}
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
              isActive('/Completion') ? 'bg-gray-200 text-blue-500' : ''
            } ${!isOpen && 'justify-center'}`}
          >
            <CheckCircle size={24} />
            {isOpen && <span>{languageLabels?.Completion}</span>}
          </div>

          {/* Ongoing Trainings */}
          <div
            onClick={() => navigate('/Dashboard')}
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
              isActive('/Dashboard') ? 'bg-gray-200 text-blue-500' : ''
            } ${!isOpen && 'justify-center'}`}
          >
            <Clock size={24} />
            {isOpen && <span>{languageLabels?.OngoingTrainings}</span>}
          </div>

          {/* Completed Trainings */}
          <div
            onClick={() => navigate('/CompletedTrainings')}
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
              isActive('/CompletedTrainings') ? 'bg-gray-200 text-blue-500' : ''
            } ${!isOpen && 'justify-center'}`}
          >
            <BookOpen size={24} />
            {isOpen && <span>{languageLabels.CompletedTrainings}</span>}
          </div>

          {/* New Uploads */}
          {/* <div
            onClick={() => navigate('/NewUploads')}
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
              isActive('/NewUploads') ? 'bg-gray-200 text-blue-500' : ''
            } ${!isOpen && 'justify-center'}`}
          >
            <Upload size={24} />
            {isOpen && <span>New Uploads</span>}
          </div> */}
        </div>
      </aside>
    </div>
  );
};

export default SideBaar;

import PropTypes from 'prop-types';

function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      className={`px-3 py-1 ${isPressed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
      onClick={() => setFilter(name)}
      aria-pressed={isPressed}
    >
      <span className="sr-only">Show</span>
      <span>{name}</span>
      <span className="sr-only">Tasks</span>
    </button>
  );
}

FilterButton.propTypes = {
  name: PropTypes.string.isRequired,
  isPressed: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterButton;
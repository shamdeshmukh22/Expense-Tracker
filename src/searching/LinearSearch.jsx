import { useEffect, useState } from "react";

export default function LinearSearch() {
  const [size, setSize] = useState(5);
  const [numbers, setNumbers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);

  useEffect(() => {
    setNumbers(Array(size).fill(""));
  }, [size]);

  const handleNumberChange = (value, index) => {
    const updated = [...numbers];
    updated[index] = value;
    setNumbers(updated);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setFoundIndex(null);
    let i = 0;

    const interval = setInterval(() => {
      if (i >= numbers.length) {
        clearInterval(interval);
        setCurrentIndex(null);
        return;
      }

      setCurrentIndex(i);

      if (Number(numbers[i]) === Number(searchValue)) {
        setFoundIndex(i);
        clearInterval(interval);
      }

      i++;
    }, 800); // speed of animation
  };

  return (
    <div className="container-fluid p-4 alert alert-primary">
      <h3>Linear Search Animation</h3>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label>Change Array Size</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="col-md-6"></div>

        {numbers.map((num, index) => (
          <div className="col-md-2" key={index}>
            <input
              type="number"
              value={num}
              onChange={(e) =>
                handleNumberChange(e.target.value, index)
              }
              className="form-control mb-2"
              placeholder={`Element ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <form onSubmit={handleSearch} className="mt-3">
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-25"
          placeholder="Search value"
        />
        <button className="btn btn-primary ms-2">
          Search
        </button>
      </form>

      <div className="row mt-4">
        {numbers.map((num, index) => (
          <div className="col-md-1" key={index}>
            <button
              className={`btn w-100 ${
                index === foundIndex
                  ? "btn-success"
                  : index === currentIndex
                  ? "btn-warning"
                  : "btn-secondary"
              }`}
            >
              {num}
            </button>
          </div>
        ))}
      </div>

      {foundIndex !== null && (
        <p className="mt-3 fw-bold text-success">
          Element found at index: {foundIndex}
        </p>
      )}
    </div>
  );
}
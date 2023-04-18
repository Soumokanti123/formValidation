import React, { useState } from "react";
import "./home.css";

export const Home = () => {
  // State
  const state = ["Haryana", "Delhi", "Uttar Pradesh", "Karnataka"];

  // City
  const city = {
    Haryana: ["Gurgaon", "Faridabad", "Rohtak"],
    Delhi: ["Dwarka", "Ghitorni"],
    "Uttar Pradesh": ["Noida", "Agra"],
    Karnataka: ["Bangalore", "Mandya"],
  };

  // Regex for validation

  const nameRegex = /^[a-zA-Z ]{3,30}$/;
  const emailRegex =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  // Selected State
  const [selectedState, setSelectedState] = useState("");

  // Input Array for storing data
  const [inputArr, setInputArr] = useState([]);

  // Data
  const [data, setData] = useState({
    name: "",
    email: "",
    state: "",
    city: "",
  });

  // Error Status
  const [error, setError] = useState(false);

  // On Input Change
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    console.log(data);
  };

  // Submit Form With Button Click

  const SubmitForm = (e) => {
    e.preventDefault();
    if (!nameRegex.test(data.name)) {
      setError(true);

      return;
    }
    if (!emailRegex.test(data.email)) {
      setError(true);

      return;
    }
    if (data.state === "") {
      setError(true);

      return;
    }
    if (data.city === "") {
      setError(true);

      return;
    }

    setError(false);

    setInputArr([...inputArr, data]);
    setSelectedState("");
    setData({
      name: "",
      email: "",
      state: "",
      city: "",
    });
  };

  return (
    <div className="mainBox">
      <div className="leftBox">
        <h1>User Info: </h1>
        <form method="post" onSubmit={(e) => SubmitForm(e)}>
          <label>Name: </label>
          <br />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={(e) => onInputChange(e)}
            required
          />
          <br />
          {error && !nameRegex.test(data.name) ? (
            <span style={{ color: "red" }}>*Please Enter Valid Name</span>
          ) : null}
          <br />
          <label>Email: </label>
          <br />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={(e) => onInputChange(e)}
            required
          />
          <br />
          {error && !emailRegex.test(data.email) ? (
            <span style={{ color: "red" }}>*Please Enter Valid Email</span>
          ) : null}
          <br />
          State:{" "}
          <select
            name="state"
            value={(data.state = selectedState)}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="" hidden>
              Select
            </option>
            {state.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <br />
          {error && data.state === "" ? (
            <span style={{ color: "red" }}>*Please Select State</span>
          ) : null}
          <br />
          City:{" "}
          <select
            name="city"
            value={data.city}
            onChange={(e) => onInputChange(e)}
          >
            {" "}
            {selectedState ? (
              <>
                <option value="" hidden>
                  Select
                </option>
                {city[selectedState].map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </>
            ) : (
              <option value="" hidden>
                Select
              </option>
            )}
          </select>
          <br />
          {error && data.city === "" ? (
            <span style={{ color: "red" }}>*Please Select City</span>
          ) : null}
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>

      <div className="rightBox">
        
        {inputArr.map((item, index) => {
          return (
            <div key={index}  className="dataField">
              <label>Name: {item.name}</label>
              <br />
              <label>Email: {item.email}</label>
              <br />
              <label>State: {item.state}</label>
              <br />
              <label>City: {item.city}</label>
              <br />
              
            </div>
           );
        })} 
      </div>
    </div>
  );
};

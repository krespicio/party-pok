import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

export default function PartyForm(props) {

      return (
          <div>
            <button onClick={() => props.closePartyModal()}>Close Modal</button>
            <legend for='title'>Name the Party</legend>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Party Party"
            />
            <legend for='time'>When is the Party?</legend>
            <input
              type="text"
              className="form-control"
              name="time"
              placeholder="It's always party time, baby"
            />
            <legend for='location'>Where is the Party?</legend>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Party City, of course"
            />
            <legend for='time'>Enter a Short Description</legend>
            <input
              type="password"
              className="form-control"
              name='description'
              placeholder="Password"
            />
            <br />
            <button className="register-submit-btn">
              Submit
            </button>
          </div>
      )
}
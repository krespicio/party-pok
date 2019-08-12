import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";

import Banner from '../components/Banner';
import Notifications from "../components/Notifications";
import Suggestions from "../components/Suggestions";
import Parties from "../components/Parties";

export default function HomePage() {
    const getUser = async () => {
        const user = await fetch("http://localhost:5000/user", {
                method: "GET",
                credentials: "include",
                redirect: "follow",
                headers: {
                    "Content-Type": "application/json",
                },
        });
        console.log(await user.json());
      }


      return (
          <div>
              <Banner/>
              <div>
                  <div>
                      <Suggestions/>
                  </div>
                  <Notifications/>
                  <Parties/>
              </div>
              <button onClick={() => getUser()}>Show user</button>
          </div>
      )
}
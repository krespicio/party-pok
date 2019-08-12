import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";

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
              <button onClick={() => getUser()}>Show user</button>
          </div>
      )
}
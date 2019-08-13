import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";

export default function Banner(props) {
    // const [modalIsOpen, setModalIsOpen] = useState(false);

    const createParty = () => {

        props.createPartyModal();
        console.log(props, props.modalIsOpen);

        // fetch("http://localhost:5000/user", {
        //     method: 'POST',
        //     credentials: "include",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     // body: {
        //     //     title: ,
        //     //     description: ,
        //     //     time: ,
        //     //     location: ,
        //     //     budget: ,
        //     // }
        // });
    }

      return (
          <div>
              <div>

              </div>
              Party Pok
              <div>
                  <button onClick={() => createParty()}>Create Party</button>
            </div>
          </div>
      )
}
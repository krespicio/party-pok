import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
// import { Redirect } from "react-router-dom";

export default function Banner(props) {
	// const [modalIsOpen, setModalIsOpen] = useState(false);

	const createParty = () => {
		props.openPartyModal();
	};

	return (
		<div style={styles.banner}>
			<div>
				<button>Home</button>
				<button>Parties</button>
				<button>Search</button>
			</div>
			Party Pok
			<div>
				<button onClick={() => createParty()}>Create Party</button>
				<button>Info</button>
				<button>Profile</button>
			</div>
		</div>
	);
}

const styles = {
	banner: {
		display: "flex",
		justifyContent: "space-between",
	},
};

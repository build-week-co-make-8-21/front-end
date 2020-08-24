import axios from "axios";

export const axiosWithAuth = () => {
	return axios.create({
		headers: {
			authorization: window.localStorage.getItem("token"),
		},
		baseURL: "https://bw-co-make-8-21.herokuapp.com/",
	});
};

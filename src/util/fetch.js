const loginURL = "http://localhost:8080/auth/login";
const logoutURL = "http://localhost:8080/auth/logout";

/**
 * Performs a login fetch request.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves to the response data if the login is successful.
 * @throws {Error} - Throws an error if there is an error during the login request.
 */
export const loginFetch = async (email, password) => {
  const encodedEmailAndPassword = window.btoa(`${email}:${password}`);
  const response = await fetch(loginURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${encodedEmailAndPassword}`,
    },
  }).catch((error) => {
    console.log(error);
    throw new Error("Error while login");
  });

  if (response.status === 200) {
    return response.json();
  }
  if (response.status === 401) {
    return "error";
  }
};

/**
 * Performs a logout request to the server.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server.
 * @throws {Error} If there is an error while performing the logout request.
 */
export const logoutFetch = async () => {
  const token = sessionStorage.getItem("access-token");
  const response = await fetch(logoutURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.log(error);
    throw new Error("Error while logout");
  });

  if (response.status === 200) {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("emailId");
    sessionStorage.removeItem("doctorId");
    sessionStorage.removeItem("appointmentId");
  }
};

export const RegisterFetch = async (
  firstName,
  lastName,
  mobile,
  password,
  emailId
) => {
  const response = await fetch("http://localhost:8080/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      mobile,
      password,
      emailId,
    }),
  }).catch((error) => {
    console.log(error);
    throw new Error("Error while registration");
  });
  if (response.status === 200) {
    return response.status;
  } else if (response.status === 409) {
    return "error";
  }
};

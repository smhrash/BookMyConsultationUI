const loginURL = "http://localhost:8080/auth/login";
const logoutURL = "http://localhost:8080/auth/logout";
const registerURL = "http://localhost:8080/users/register";
const doctorAllSpecialityURL = "http://localhost:8080/doctors/speciality";
const getAllDoctorsURL = "http://localhost:8080/doctors?speciality";
const getDoctorTimeSlotsBaseURL = "http://localhost:8080/doctors/";
const getUserDetailsURL = "http://localhost:8080/users/";
const bookAppointmentURL = "http://localhost:8080/appointments";
const getUserAppointmentsURL = "http://localhost:8080/users/";
const postDoctorRatingsURL = "http://localhost:8080/ratings";

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

/**
 * Registers a user by making a POST request to the registerURL.
 *
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} mobile - The mobile number of the user.
 * @param {string} password - The password of the user.
 * @param {string} emailId - The email ID of the user.
 * @returns {Promise<number|string>} - A promise that resolves to the response status code (200) if successful, or "error" (409) if there is a conflict.
 * @throws {Error} - Throws an error if there is an error during registration.
 */
export const registerFetch = async (
  firstName,
  lastName,
  mobile,
  password,
  emailId
) => {
  const response = await fetch(registerURL, {
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

/**
 * Fetches all doctor specialities.
 * @returns {Promise<any>} A promise that resolves to the fetched data or an error message.
 * @throws {Error} If there is an error while fetching the doctor specialities.
 */
export const getAllDoctorSpecialityFetch = async () => {
  const response = await fetch(doctorAllSpecialityURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).catch(function (error) {
    console.log(error);
    throw new Error("Error while fetching doctor speciality");
  });
  if (response.status === 200) {
    return response.json();
  } else {
    return "error";
  }
};

/**
 * Fetches all doctors from the server.
 * @returns {Promise<any>} A promise that resolves to the response data if successful, or "error" if there was an error.
 * @throws {Error} If there was an error while fetching all doctors.
 */
export const getAllDoctorsFetch = async () => {
  const response = await fetch(getAllDoctorsURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).catch(function (error) {
    console.log(error);
    throw new Error("Error while fetching all doctors");
  });
  if (response.status === 200) {
    return response.json();
  } else {
    return "error";
  }
};

/**
 * Fetches all doctors by speciality.
 * @param {string} speciality - The speciality of the doctors to fetch.
 * @returns {Promise<any>} - A promise that resolves to the fetched data or an error message.
 * @throws {Error} - If there is an error while fetching the data.
 */
export const getAllDoctorsBySpecialityFetch = async (speciality) => {
  const getAllDoctorsBySpecialityURL = getAllDoctorsURL + "=" + speciality;
  const response = await fetch(getAllDoctorsBySpecialityURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).catch(function (error) {
    console.log(error);
    throw new Error("Error while fetching all doctors by speciality");
  });
  if (response.status === 200) {
    return response.json();
  } else {
    return "error";
  }
};

/**
 * Fetches the time slots for a specific doctor on a given date.
 * @param {string} doctorId - The ID of the doctor.
 * @param {string} date - The date for which to fetch the time slots.
 * @returns {Promise<any>} - A promise that resolves to the fetched time slots or an error message.
 * @throws {Error} - If there is an error while fetching the doctor time slots.
 */
export const getDoctorTimeSlotsFetch = async (doctorId, date) => {
  const getDoctorTimeSlotsURL =
    getDoctorTimeSlotsBaseURL + doctorId + "/timeSlots?date=" + date;
  const response = await fetch(getDoctorTimeSlotsURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).catch(function (error) {
    console.log(error);
    throw new Error("Error while fetching doctor time slots");
  });
  if (response.status === 200) {
    return response.json();
  } else {
    return "error";
  }
};

/**
 * Fetches user details from the server.
 * @param {string} emailId - The email ID of the user.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object|string>} - A promise that resolves to the user details object if successful, or an error message string if unsuccessful.
 * @throws {Error} - Throws an error if there is an issue while fetching user details.
 */
export const getUserDetailsFetch = async (emailId, token) => {
  const getUserDetailsFullURL = getUserDetailsURL + emailId;
  const response = await fetch(getUserDetailsFullURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch(function (error) {
    console.log(error);
    throw new Error("Error while fetching user details");
  });
  if (response.status === 200) {
    return response.json();
  } else {
    return "error";
  }
};

/**
 * Function to book an appointment using fetch API.
 * @param {string} token - The authentication token.
 * @param {object} data - The data to be sent in the request body.
 * @returns {Promise<string>} - A promise that resolves to the response data as a string if the status is 201, otherwise resolves to "error".
 * @throws {Error} - Throws an error if there is an error while booking the appointment.
 */
export const bookAppointmentFetch = async (token, data) => {
  const response = await fetch(bookAppointmentURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).catch(function (error) {
    console.log(error);
    throw new Error("Error while booking appointment");
  });
  if (response.status === 201) {
    const responseData = await response.text(); // Get the response as a string
    return responseData;
  } else {
    return "error";
  }
};

/**
 * Fetches user appointments using the provided token and email.
 * @param {string} token - The user's authentication token.
 * @param {string} email - The user's email address.
 * @returns {Promise<any>} - A promise that resolves to the user's appointments or an error message.
 * @throws {Error} - If there is an error while fetching the user's appointments.
 */
export const getUserAppointmentFetch = async (token, email) => {
  const getUserAppointmentsFullURL =
    getUserAppointmentsURL + email + "/appointments";
  const response = await fetch(getUserAppointmentsFullURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch(function (error) {
    console.log(error);
    throw new Error("Error while fetching user appointment");
  });
  if (response.status === 200) {
    return response.json();
  } else {
    return "error";
  }
};

/**
 * Posts doctor rating using the provided token and posting data.
 * @param {string} token - The authentication token.
 * @param {object} postingData - The data to be posted.
 * @returns {Promise<string>} - A promise that resolves to the response data as a string, or "error" if there was an error.
 * @throws {Error} - If there was an error while posting the doctor rating.
 */
export const postDoctorRatingFetch = async (token, postingData) => {
  const response = await fetch(postDoctorRatingsURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postingData),
  }).catch(function (error) {
    console.log(error);
    throw new Error("Error while posting doctor rating");
  });
  if (response.status === 200) {
    const responseData = await response.text(); // Get the response as a string
    return responseData;
  } else {
    return "error";
  }
};

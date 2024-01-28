const loginURL = "http://localhost:8080/auth/login";
const logoutURL = "http://localhost:8080/auth/logout";
const registerURL = "http://localhost:8080/users/register";
const doctorAllSpecialityURL = "http://localhost:8080/doctors/speciality";
const getAllDoctorsURL = "http://localhost:8080/doctors?speciality";
const getDoctorTimeSlotsBaseURL = "http://localhost:8080/doctors/";
const getUserDetailsURL = "http://localhost:8080/users/";
const bookAppointmentURL = "http://localhost:8080/appointments";

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

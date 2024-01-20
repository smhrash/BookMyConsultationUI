export const useLogout = () => {
  const logoutURL = "http://localhost:8081/auth/logout";
  const token = sessionStorage.getItem("access-token");

  const logout = () => {
    fetch(logoutURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((result) => {
        console.log("Logout Handler Working", result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { logout };
};

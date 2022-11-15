import jwt from "jsonwebtoken";

const checkUserLogin = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${process.env.NEXT_PUBLIC_COOKIE_NAME}=`))
    ?.split("=")[1];

  if (token) {
    const user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    if (user) return user;
    else false;
  } else {
    return false;
  }

  //console.log(user);
};

export default checkUserLogin;

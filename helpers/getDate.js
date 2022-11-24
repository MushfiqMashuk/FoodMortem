import moment from "moment";

const getDate = (date) => {
   return  moment(date).format("DD-MMMM-YYYY").split("-").join(" ");
}

export default getDate;
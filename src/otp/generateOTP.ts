/* eslint-disable */
const generateOTP = async () => {
    try {
        return (`${Math.floor(1000 + Math.random() * 9000)}`)
    } catch (error) {
        // throw error
        console.log(error);
    }
}

export default generateOTP
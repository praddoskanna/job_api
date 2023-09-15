const generateOTP = () => {
    const otpLength = 4;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    console.log("OTP ",Math.floor(Math.random() * (max - min + 1)) + min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = generateOTP;
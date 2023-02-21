export const alphaNumericPattern = /^[a-zA-Z0-9_ .-]*$/
export const passwordrgx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const emailrgx = (email) => {
    return email.match(
        /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
    );
};
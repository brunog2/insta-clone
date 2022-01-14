import libphonenumber from 'google-libphonenumber';

class UserValidator {

    public nameValidator(full_name: string) {
        if (full_name.replace(/\s/g, "").length > 1 && full_name.replace(/\s/g, "").length <= 30) {
            return true;
        } else return false;
    }

    public emailValidator(email: string) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    public phoneValidator(phone_number: string) {
        const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

        try {
            if (phoneUtil.isValidNumber(phoneUtil.parse(phone_number))) {
                return true;
            } else return false;
        } catch (err) {
        }
    }

    public usernameValidator(username: string) {
        if (username) return true;
        else return false;
    }

    public passwordValidator(password: string) {
        if (password.length > 5) return true;
        else return false;
    }
}

export default new UserValidator();
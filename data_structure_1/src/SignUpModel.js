function SignUp(name, phone) {
    this.name = name;
    this.phone = phone;
}

SignUp.render_sign_ups = function (activity_name) {
    var event = JSON.parse(localStorage.getItem("activities")) || [];
    var sign = _.find(event, function (list) {
        return list.name == activity_name;
    })
    return sign.sign_ups;
}

SignUp.sign_ups_is_or_repeat = function (phone) {
    var current_activity = localStorage.getItem("current_activity") || [];
    var event = JSON.parse(localStorage.getItem("activities")) || [];
    var sign = _.find(event, function (list) {
        return list.name == current_activity
    })

    return _.some(sign.sign_ups, function (list) {
        return list.phone == phone
    })
}

SignUp.add_sign_up = function (json_message) {
    var bm_name = sms.get_message(json_message);
    var phone = sms.get_phone(json_message);
    var current_activity = localStorage.getItem("current_activity") || [];
    var event = JSON.parse(localStorage.getItem("activities")) || [];
    var sign = _.map(event, function (list) {
        if (list.name == current_activity) {
            var sign_up = {name: bm_name, phone: phone}
            list.sign_ups.push(sign_up);
        }

        return list;
    })
    localStorage.setItem("activities", JSON.stringify(sign));
}
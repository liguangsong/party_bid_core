function SignUp(name, phone) {
    this.name = name;
    this.phone = phone;
}

SignUp.render_sign_ups = function (activity_name) {
    var event = JSON.parse(localStorage.getItem("activity_ids")) || [];
    var activities = JSON.parse(localStorage.getItem("activities")) || {};
    var a = _.find(event, function (list) {
        return activities[list].name == activity_name;
    })
    return activities[a].sign_ups;
}

SignUp.sign_ups_is_or_repeat = function (phone) {
    var id = localStorage.getItem("current_activity") || [];
    var activities = JSON.parse(localStorage.getItem("activities")) || {};
    return  _.some(activities[id].sign_ups, function (list) {
        return list.phone == phone
    })
}

SignUp.add_sign_up = function (json_message) {
    var bm_name = sms.get_message(json_message)
    var phone = sms.get_phone(json_message)
    var id = localStorage.getItem("current_activity") || [];
    var activities = JSON.parse(localStorage.getItem("activities")) || {};
    var sign_up = {name: bm_name, phone: phone};
    activities[id].sign_ups.push(sign_up);
    localStorage.setItem("activities", JSON.stringify(activities));
}

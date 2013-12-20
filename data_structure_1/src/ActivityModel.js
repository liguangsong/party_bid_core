function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
}

Activity.prototype.create = function () {
    var event_list = JSON.parse(localStorage.getItem("activities")) || [];
    event_list.push(this);

    localStorage.setItem("activities", JSON.stringify(event_list));
}

Activity.prototype.active = function () {
    var event_list = this.name;
    localStorage.setItem("current_activity", event_list);
}

Activity.get_activity = function (activities) {
    var current_activity = localStorage.getItem("current_activity") || [];
    return _.filter(activities, function (list) {
        return list.name == current_activity
    })
}

Activity.get_all_activity = function () {
    return JSON.parse(localStorage.getItem("activities")) || [];
}
function Activity(name) {
    this.name = name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}

Activity.activities = function () {
    var activities = JSON.parse(localStorage.getItem("activities")) || {};
    return activities;
}

Activity.current_activity = function (activities) {
    var id = localStorage.getItem("current_activity") || [];
    return activities[id]
}

Activity.prototype.create = function () {
    var event = JSON.parse(localStorage.getItem("activities")) || {};
    var id = JSON.parse(localStorage.getItem("activity_id_generator"));
    event[id] = this;
    localStorage.setItem("activities", JSON.stringify(event));
    Activity.store_current_activity(id);
    Activity.store_activity_ids(id);
    Activity.store_activity_id_generator(id);
}

Activity.store_activity_ids = function (id) {
    var ids = JSON.parse(localStorage.getItem("activity_ids")) || [];
    ids.push(id.toString());
    localStorage.setItem("activity_ids", JSON.stringify(ids));
}

Activity.store_current_activity = function (id) {
    localStorage.setItem("current_activity", JSON.stringify(id));
}

Activity.store_activity_id_generator = function (id) {
    var id = id + 1;
    localStorage.setItem("activity_id_generator", JSON.stringify(id));
}
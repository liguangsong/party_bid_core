function Activity(activity_name) {
    this.id = Activity.activity_id_generator();
    this.name = activity_name;
}

Activity.get_all_activity = function () {
    return JSON.parse(localStorage.getItem("activities")) || [];
}

Activity.prototype.create = function () {
    var activities = Activity.get_all_activity();
    activities.push(this);
    localStorage.setItem("activities", JSON.stringify(activities));
    localStorage.setItem("current_activity", this.id);
}

Activity.activity_id_generator = function () {
    var id = Activity.get_all_activity().length
    var next_id = (id + 1).toString();
    var id = id.toString()
    localStorage.setItem("activity_id_generator", next_id);
    return id;
}

Activity.current_activity = function () {
    return localStorage.getItem("current_activity")
}


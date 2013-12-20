function Bid(name, activity_id) {
    this.name = name;
    this.activity_id = activity_id;
    this.biddings = [];
}

Bid.create_new_bid = function (activity_id) {
    var all_bid = Bid.get_all_bid();
    var name = Bid.create_new_bid_name(activity_id);
    all_bid.push({name: name, activity_id: activity_id, biddings: []})
    localStorage.setItem("bids", JSON.stringify(all_bid));
}

Bid.get_all_bid = function () {
    var all_bid = JSON.parse(localStorage.getItem("bids")) || [];
    return all_bid;
}

Bid.create_new_bid_name = function (activity_id) {
    var all_bid = Bid.get_all_bid();
    var bid_for_activity = _.filter(all_bid, function (list) {
        return list.activity_id == activity_id
    })
    var count = bid_for_activity.length + 1;
    return "竞价" + count;
}

Bid.create_new_bid_activity_name = function (activity_id) {
    var all_activity = Activity.get_all_activity();
    var activity = _.find(all_activity, function (list) {
        return list.activity_id == activity_id
    })
    return activity[0].name;
}

Bid.render_bids = function (activity_id) {
    var activity_id = Activity.current_activity();
    var all_bid = Bid.get_all_bid();
    var bid_for_activity = Bid.bid_for_activity(activity_id, all_bid)
    var b = _.groupBy(bid_for_activity, function (list) {
        return list.name
    })
    var list_bid_name = [];
    _.map(b, function (value, key) {
        list_bid_name.push({"name": key, "number": value.length})
    })
    return list_bid_name;
}

Bid.bid_for_activity = function (activity_id, all_bid) {
    var a = _.filter(all_bid, function (list) {
        return list.activity_id == activity_id;
    })
    return a;
}

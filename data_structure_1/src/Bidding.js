function Bidding() {
}

Bidding.bidding_status = function () {
    return  localStorage.getItem("is_bidding")
}

Bidding.bid_is_or_not_sign_up = function (phone) {
    var activities = Activity.get_all_activity();
    var sign_up = Activity.get_activity(activities)[0].sign_ups;
    return _.some(sign_up, function (list) {
        return list.phone == phone
    })
}

Bidding.is_or_no_bid_repeat = function (json_message) {
    var activities = Activity.get_all_activity();
    var bid_list = bid.current_bid(Activity.get_activity(activities));
    var phone = sms.get_phone(json_message);
    return _.some(bid_list.biddings, function (list) {
        return list.phone == phone
    })
}

Bidding.bid_success = function (json_message) {
    var name = Bidding.get_name(json_message);
    var price = sms.get_message(json_message);
    var phone = sms.get_phone(json_message);
    var activities = Activity.get_all_activity();
    Activity.get_activity(activities);
    var bids = bid.current_bid(Activity.get_activity(activities));
    bids.biddings.push({name: name, phone: phone, price: price})
    localStorage.setItem("activities", JSON.stringify(activities));
}

Bidding.get_name = function (json_message) {
    var phone = sms.get_phone(json_message);
    var activity = Activity.get_activity(Activity.get_all_activity());
    return _.find(activity[0].sign_ups,function (list) {
        return list.phone == phone
    }).name;
}
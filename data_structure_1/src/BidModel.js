function bid(name) {
    this.name = name;
    this.bids = [];
}

bid.create_new_bid = function (activity_name) {
    var event = JSON.parse(localStorage.getItem("activities")) || [];
    var activity = _.map(event, function (list) {
        if (list.name == activity_name) {
            var count = list.bids.length + 1;
            var name = "竞价" + count;
            var biddings = [];
            var bid = {name: name, biddings: biddings};
            list.bids.push(bid);
        }
        return list;
    })
    localStorage.setItem("activities", JSON.stringify(activity));
}

bid.current_bid = function (activity) {
    var current_bid = localStorage.getItem("current_bid") || [];
    return  _.filter(activity[0].bids, function (list) {
        return list.name == current_bid
    })[0]
}

function transform_bids_to_view_model(activity_name) {
    var event = JSON.parse(localStorage.getItem("activities")) || [];
    var activity = _.find(event, function (list) {
        return list.name == activity_name;
    })
    return activity.bids;
}

function transform_biddings_to_view_model(activity_name, bid_name) {
    var bid_message = transform_bids_to_view_model(activity_name);
    var bidding = _.find(bid_message,function (list) {
        return list.name == bid_name
    }).biddings;
    return sort_bidding(bidding)
}

function sort_bidding(bidding) {
    var event = _.sortBy(bidding, function (list) {
        return list.price
    })
    return group_by_bidding(event);
}

function group_by_bidding(event) {
    var price_group = _.groupBy(event, function (list) {
        return list.price
    })
    var list_price_and_number = [];
    _.map(price_group, function (value, key) {
        list_price_and_number.push({"price": key, "number": value.length})
    })
    return get_winner_price(list_price_and_number, event);
}

function get_winner_price(list_price_and_number, event) {
    if (_.find(list_price_and_number, function (list) {
        return list.number == 1
    }) == undefined) {
        return undefined
    }
    var winner = _.find(list_price_and_number, function (list) {
        return list.number == 1
    })
    return get_winner_message(winner, event)
}

function get_winner_message(winner, event) {
    var d = _.filter(event, function (list) {
        return list.price == winner.price;
    })
    return d;
}


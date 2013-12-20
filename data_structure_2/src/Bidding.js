function Bidding(price,phone){
     this.price=price;
     this.phone=phone;
}
Bidding.get_new_bid_name=function(id){
    var activities=Activity.activities();
    var count= activities[id].bids.length+1;
    var bidding=("竞价"+count).toString();
    return bidding;
}
Bidding.create_new_bid=function(id){
    var activities=Activity.activities();
    var activity=Activity.current_activity(activities)
    var bidding_name=Bidding.get_new_bid_name(id);
    activity.biddings[bidding_name]=[];
    activity.bids.push(bidding_name);
    localStorage.setItem("activities",JSON.stringify(activities)) ;
}
Bidding.current_bidding=function(activity){
    var id=localStorage.getItem("current_bid")||[];
    return activity.biddings[id];
}
Bidding.create_new_bidding=function(json_message){
    var price=sms.get_message(json_message)
    var phone=sms.get_phone(json_message)
    var activities=Activity.activities()
    var activity= Activity.current_activity(activities);
    var bid=Bidding.current_bidding(activity);
    bid.push({price:price,phone:phone});
    localStorage.setItem("activities",JSON.stringify(activities));
}
Bidding.get_bid_message=function(activity_id,bid_id){
    var activities=Activity.activities();
    var bid_message=activities[activity_id].biddings[bid_id];
    return bid_message;
}
Bidding.get_sort=function(list_price_and_number,activity_id,bid_id){
    var activities=Activity.activities();
    var bid_message=Bidding.get_bid_message(activity_id,bid_id)
    var price= _.find(list_price_and_number,function(list){return list.number==1}).price;
    var winner= _.filter(bid_message,function(list){
        return list.price==price;
    })
    var sign_up=_.find(activities[activity_id].sign_ups,function(list){
        return  list.phone== winner[0].phone
    })
    return [{name: sign_up.name,phone: sign_up.phone,price: winner[0]["price"]}]
}

Bidding.bid_is_or_not_sign_up=function(phone){
    var activities=Activity.activities() ;
    var activity=Activity.current_activity(activities);
    return _.some(activity["sign_ups"],function(list){return list.phone==phone});
}
Bidding.is_or_no_bid_repeat=function(json_message){
    var JJ_phone=sms.get_phone(json_message)
    var activities=Activity.activities();
    var activity= Activity.current_activity(activities);
    var bidder=Bidding.current_bidding(activity);
    return _.some(bidder,function(list){return list["phone"]==JJ_phone})
}
Bidding.bid_success=function(json_message){
    var price=sms.get_message(json_message)
    var phone=sms.get_phone(json_message)
    var activities=Activity.activities()
    var activity= Activity.current_activity(activities);
    var bid=Bidding.current_bidding(activity);
    bid.push({price:price,phone:phone});
    localStorage.setItem("activities",JSON.stringify(activities));
}
Bidding.bidding_status=function(){
    return localStorage.getItem("is_bidding");
}

transform_bids_to_view_model=function(id){
    var activities=Activity.activities();
    return activities[id].bids
}
transform_biddings_to_view_model=function(activity_id,bid_id){
    var bid_message=Bidding.get_bid_message(activity_id,bid_id)
    var list_price_and_number = [];
    _.chain(bid_message)
     .sortBy(function(list){return list.price})
     .groupBy(function(list){return list.price})
     .map(function(value,key){list_price_and_number.push({"price": key, "number": value.length})})
    if(_.find(list_price_and_number,function(list){return list.number==1})==undefined){
        return false ;
    }
   return Bidding.get_sort(list_price_and_number,activity_id,bid_id)
}

function Bidding(){

}
Bidding.render_biddings=function(activity_id,bid_name){
    var all_bid=Bid.get_all_bid();
    var bid_for_activity= Bid.bid_for_activity(activity_id,all_bid);
    var bidding_list= _.filter(bid_for_activity,function(list){return list.name==bid_name})

    return Bidding.get_sort(activity_id,bidding_list[0].biddings);
}
Bidding.winner_price=function(bidding_list){
    var a=_.sortBy(bidding_list,function(list){return list.price});
    a=_.groupBy(a,function(list){return list.price});
    var price_and_number=[];
    _.map(a,function(value,key){price_and_number.push({"price":key,"number":value.length})})
    a=_.find(price_and_number,function(list){return list.number==1})
    return a.price;
}
Bidding.winner_phone=function(bidding_list){
   var price=Bidding.winner_price(bidding_list);
   return _.find(bidding_list,function(list){return list.price==price})["phone"]
}
Bidding.winner_name=function(activity_id,bidding_list){
    var sign_up=SignUp.render_sign_ups(activity_id);
    var phone=Bidding.winner_phone(bidding_list);
    return _.find(sign_up,function(list){return list.phone==phone}).name;
}
Bidding.get_sort=function(activity_id,bidding_list){
    var price=Bidding.winner_price(bidding_list);
    var name=Bidding.winner_name(activity_id,bidding_list);
    var phone=Bidding.winner_phone(bidding_list);
    return [{name:name,price:price,phone:phone}]
}
Bidding.bid_is_or_not_sign_up=function(phone){
    var activity_id=Activity.current_activity();
    return _.some(SignUp.render_sign_ups(activity_id),function(list){return list.phone==phone})
}
Bidding.bid_success=function(json_message){
    var all_bid=Bid.get_all_bid();
    var activity_id= Activity.current_activity();
    var bid_for_activity= _.filter(all_bid,function(list){return list.activity_id==activity_id});
    var phone=sms.get_phone(json_message);
    var price=sms.get_message(json_message);
    bid_for_activity[0].biddings.push({phone:phone,price:price})
    localStorage.setItem("bids",JSON.stringify(bid_for_activity));

}
Bidding.is_or_no_bid_repeat=function(json_message){
    var phone=sms.get_phone(json_message);
    var all_bid=Bid.get_all_bid();
    var activity_id=Activity.current_activity();
    var bid_for_activity= _.filter(all_bid,function(list){return list.activity_id==activity_id})
    return _.some(bid_for_activity[0].biddings,function(list){return list.phone==phone;})
}
Bidding.bidding_status=function(){
    return localStorage.getItem("is_bidding");
}



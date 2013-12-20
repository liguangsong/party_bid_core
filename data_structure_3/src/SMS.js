function notify_sms_received(json_message){
    native_accessor.receive_message(json_message);
}

var native_accessor = {
    process_received_message: function (json_message) {
        judge_and_process_received_apply_message(json_message);
    },

    receive_message: function (json_message) {

        if (typeof this.process_received_message === 'function') {

            this.process_received_message(json_message);
        }
    }
};
function judge_and_process_received_apply_message(json_message){
    var temp_message=json_message.messages[0].message;

    if (temp_message.substr(0, 2).toUpperCase() == 'BM') {
        sms.is_or_no_signing_up(json_message);
    }
    if (temp_message.substr(0, 2).toUpperCase() == 'JJ') {
        sms.is_or_no_bidding(json_message);
    }
}

function sms(){

}
sms.get_message=function(json_message){
    var temp_message=json_message.messages[0].message.replace(/\s/g, "");
    var message=temp_message.substr(2);
    return message;
}
sms.get_phone=function(json_message){
    var  phone=json_message.messages[0].phone;
    return phone;
}
sms.sign_up_status=function(){
    return localStorage.getItem("is_signing_up");
}
sms.is_or_no_signing_up=function(json_message){
    var is_signing_up=sms.sign_up_status();
    if(!(is_signing_up =="false"||is_signing_up==""||is_signing_up==null)){
        return  sms.sign_up_is_or_no_repeat(json_message);
    }
//    return  send
}
sms.sign_up_is_or_no_repeat=function(json_message){
    var phone=sms.get_phone(json_message);
    if(!SignUp.sign_ups_is_or_repeat(phone)){
        return sms.sign_up_success(json_message);
    }
//    return send;
}
sms.sign_up_success=function(json_message){
    SignUp.add_sign_up(json_message);
}

sms.is_or_no_bidding=function(json_message){
    var is_bidding=Bidding.bidding_status();
    if(!(is_bidding =="false"||is_bidding==""||is_bidding==null)){
        return sms.is_or_no_sign_up(json_message);
    }
    //    return send;
}
sms.is_or_no_sign_up=function(json_message){
    var phone=sms.get_phone(json_message);
     if(Bidding.bid_is_or_not_sign_up(phone)){
         return sms.is_or_no_bid_repeat(json_message)
     }
//    return:send;
}
sms.is_or_no_bid_repeat=function(json_message){
    if(!Bidding.is_or_no_bid_repeat(json_message)){
        return Bidding.bid_success(json_message);
    }
//    return ;
}


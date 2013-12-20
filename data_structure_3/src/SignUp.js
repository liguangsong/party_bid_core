function SignUp(name,phone,activity_id){
    this.name=name;
    this.phone=phone;
    this.activity_id=activity_id;
}
SignUp.find_all_sign_ups=function(){
    var sign_ups=JSON.parse(localStorage.getItem("sign_ups"))||[];
    return sign_ups;
}
SignUp.render_sign_ups=function(activity_id){
    var sign_ups=SignUp.find_all_sign_ups();
    var a=_.filter(sign_ups,function(list){return list.activity_id==activity_id})
    return a;
}
SignUp.prototype.create=function(){
    var sign_ups=SignUp.find_all_sign_ups();
    sign_ups.push(this);
    localStorage.setItem("sign_ups",JSON.stringify(sign_ups));
}
SignUp.add_sign_up=function(json_message){
    var name=sms.get_message(json_message);
    var phone=sms.get_phone(json_message);
    var activity_id=Activity.current_activity();
    var sign_up=new SignUp(name,phone,activity_id);
    sign_up.create();
}
SignUp.sign_ups_is_or_repeat=function(phone){

    var current_activity=Activity.current_activity();
    var sign_ups=SignUp.render_sign_ups(current_activity);
    return _.some(sign_ups,function(list){return list.phone==phone})
}
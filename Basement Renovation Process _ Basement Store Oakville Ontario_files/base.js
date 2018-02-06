/**
 * Created by Larry on 8/17/16.
 */
var instanceID;
var proxy_user;
var user_id;
var uid;
var token;
var account_id;
var API_JS = 'https://api3.kudobuzz.com/';
var total_connected_accounts = 0;
var image_url = 'http://install.kudobuzz.com/';
var GOOGLE_API_KEY = "AIzaSyBR6F4I9gisiLayFhC7IsJsaaFTCs-VhVE";
var GOOGLE_CLIENT_ID = "77244147418-d2gn75fod76fk3b7tgjeopqmbm4leneq.apps.googleusercontent.com";
var type_of_review = 'facebook';
var type_of_feeds = 'facebook';
var facebook_token = '';
var total_published;
var timeoutId;
var google_plus_url = '';

// this method creates a user
var create_user = function(){
    proxy_user  = localStorage.getItem('proxy_user');
    if(proxy_user){
        Wix.Settings.getSiteInfo(function (siteInfo) {

            instanceID = Wix.Utils.getInstanceId();

            siteDetails = {
                "instance_id": instanceID,
                "platform": "wix",
                "url": (siteInfo.baseUrl == "") ? (instanceID + ".wix.com") : siteInfo.baseUrl,
                "account_name": siteInfo.siteTitle

            };
            $.ajax({
                url: $("#base_url").val() + '/accounts/signup',
                type: "POST",
                data: {"siteDetails": siteDetails},
                success: function (data) {
                    var user = JSON.parse(data);
                    // console.log(user);
                    token = user.token;
                    uid = user.uid;
                    user_id = user.user.id;
                    account_id = user.user.accounts[0];
                    localStorage.removeItem('proxy_user');
                    localStorage.setItem('fist_time_user', true);
                    localStorage.setItem('token', token);
                    localStorage.setItem('account_id', account_id);
                    localStorage.setItem('user_id', user_id);
                    var args = {
                        'fixed_position' : localStorage.getItem('fixed_position'),
                        'modal_title' : localStorage.getItem('modal_title'),
                        'title_font_color' : localStorage.getItem('title_font_color'),
                        'collapsed_color' : localStorage.getItem('collapsed_color'),
                        'star_rating_color' :  localStorage.getItem('star_rating_color'),
                        'widget_title' : localStorage.getItem('widget_title'),
                    }

                    $.fn.updateWidgetSettings(args);
                },
                error: function () {
                    alert('Sorry, something went wrong, account not created please contact: "hello@kudobuzz.com"')
                }
            });
        });
    }

}

$(function () {


    $.fn.extend({
        // this method updates widget information
        updateWidgetSettings: function (args) {
            $.ajax({
                url: API_JS + "settings/site_review_form/update/" + account_id + "?token=" + token,
                type: 'POST',
                data:{
                    "star_rating_colour": args.star_rating_color,
                    "button_state_text": args.widget_title,
                    "title_text": args.modal_title,
                    "button_state_text_colour": args.title_font_color,
                    "button_state_colour": args.collapsed_color,
                    "alignment": args.fixed_position,
                    "alignment_tmp": args.fixed_position,
                },
                headers:'Content-Type: application/json;charset=UTF-8',
                success: function (data) {
                    // console.log(data);
                },
                error: function (data) {
                    // console.log(data);
                }
            });

        },

        // check if proxy user exists, if proxy user exists create kudobuzz user
        is_proxy_or_create: function () {
            var proxy_user = localStorage.getItem('proxy_user');
            if(proxy_user){
                create_user();
            }
        },
        // check users plan
        check_plan: function (is_paying) {

            is_paying = typeof is_paying !== 'undefined' ? is_paying : false;
            if($("#plan").val() == "free" && total_connected_accounts >= 1 || $("#plan").val() == "free" && is_paying){
                var modal = Wix.UI.create({ctrl: 'Popup',
                    options: {title: 'Limit is reached', content: 'Please upgrade to add more accounts.', modal: true, buttonSet: 'okCancel', fixed: true, onclose: function () {
                        Wix.Settings.openBillingPage();
                    }}});
                modal.getCtrl().open();
            }
        },
        /*
         * Check if object value is empty or not
         */
        isEmpty: function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        },
        
    });
});

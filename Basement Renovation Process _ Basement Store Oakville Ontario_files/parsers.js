/**
 * Created by Larry on 9/8/16.
 */


function parse_data(type_of_feeds, data, load_more) {

    var content;
    switch (type_of_feeds) {
        case "facebook":
            content = format_fb_data(data, load_more);
            break;

        case "twitter":
            content = format_twitter_data(data, load_more);
            break;

        case "google_plus":
            content = format_google_data(data, load_more);
            break;

        case "yelp":
            content = format_yelp_data(data, load_more);
            break;

        case "instagram":
            content = format_inst_data(data, load_more);
            break;

        case "site":
            content = format_site_data(data, load_more);
            break;

        case "custom":
            content = format_custom_data(data, load_more);
            break;

        case "qa":
            content = format_qa_data(data, load_more);
            break;

        case "published":
            content = format_published_data(data, load_more);
            break;
    }

    return content;
}



function format_inst_data(data, load_more) {

    var obj = data;
    var insts = obj.feed;
    var reviews_content = "";

    if (!$.fn.isEmpty(insts)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(insts, function (r, inst) {

            reviews_content += '<div class="single-feed">';
            reviews_content += '<div class="avatar"><img src="' + inst.commenter.profile_picture + '"></div>';
            reviews_content += '<div class="feed-content">';
            reviews_content += '<p id="name">';
            reviews_content += '<span id="from_user">' + inst.commenter.full_name + '</span> <span id="date"></span>';

            if (inst.published === true) {
                reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="instagram_comment" data-id="' + inst.id + '" data-is-remove=" ' + true + ' ">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';
            } else {
                reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary" data-channel="instagram_comment" data-id="' + inst.id + '">Publish</button>';
            }
            reviews_content += '</p>';

            reviews_content += '<p id="rating" style="color: rgb(199, 188, 0); margin : 0 !important;"></p>';
            reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;"></p>';

            if (typeof inst.text !== 'undefined' && (inst.text).length >= 110) {
                reviews_content += '<p id="message">' + inst.text.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                reviews_content += '<p id="long_message" class="hide">' + inst.text + ' <a href="javascript:;" class="read_less">Less</a></p>';
            } else if (typeof inst.text !== 'undefined') {
                reviews_content += '<p id="message">' + inst.text + '</p>';
            }

            reviews_content += '</div>';
            reviews_content += '</div>';
        });

    } else if (typeof load_more === 'undefined') {
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No review found.</h3>";
        $(".load_more_fb_btn").addClass("hide");
    } else if (typeof load_more !== 'undefined') {
        $(".load_more_fb_btn").addClass("hide");
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No more review found.</h3>";
    }

    return reviews_content;
}


// Q&A has not implemented yet
function format_qa_data(data, load_more) {

    var obj = data;
    var questions = obj.questions;
    var reviews_content = "";

    if (!$.fn.isEmpty(questions)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(questions, function (q, question) {

            reviews_content += '<div class="single-feed" data-channel="facebook_review" data-rating="" data-title="" >';

            if (typeof question.question.reviewer !== 'undefined' && question.question.reviewer.pic !== "undefined") {
                reviews_content += '<div class="avatar"><img src="' + question.question.reviewer.pic + '"></div>';
            }
            reviews_content += '<div class="feed-content">';
            reviews_content += '<p id="name">';
            reviews_content += '<span id="from_user">' + question.question.reviewer.display_name + '</span> <span id="date"></span>';

            if (question.published === true) {
                reviews_content += '<span style="float: right">Published</span> <img src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';
            } else {
                reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary">Publish</button>';
            }
            reviews_content += '</p>';


            if (typeof question.question.text !== 'undefined' && (question.question.text).length >= 110) {
                reviews_content += '<p id="message">' + question.question.text.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                reviews_content += '<p id="long_message" class="hide">' + question.question.text + ' <a href="javascript:;" class="read_less">Less</a></p>';
            } else if (typeof question.question.text !== 'undefined') {
                reviews_content += '<p id="message">' + question.question.text + '</p>';
            }

            if (question.answer_count > 0) {

                reviews_content += '<div class="answers_div">';

                var answers = question.answers;
                var answers_content = "";

                $.each(answers, function (a, answer) {
                    answers_content += '<div class="single_answer"><p>' + answer.text + '</p></div>';
                });
                reviews_content += answers_content;
                reviews_content += '</div>';

                reviews_content += '<p><a href="javascript:;" style="color: #09f; font-weight: bold;" class="show_answers_link">' + question.answer_count + ' answer' + (question.answer_count > 1 ? 's' : '') + '. View all</a></p>';
            } else {
                reviews_content += '<p><a style="color: red" href="javascript:;" class="answer_q_link">No answer available. Answer this question?</a></p>';
                reviews_content += '<div class="answers_form_div" style="display:none">';
                reviews_content += '<textarea style="height: 40px; width: 340px; resize: none" id="answer_input" placeholder="Type your answer here"></textarea>';
                reviews_content += '<div class="text-right" style="width: 340px;"><button type="button" class="uilib-btn btn-secondary btn-small">Submit Answer</button></div>';
                reviews_content += '</div>';
            }

            reviews_content += '</div>';
            reviews_content += '</div>';
        });

    } else if (typeof load_more === 'undefined') {
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No review found.</h3>";
        $(".load_more_fb_btn").addClass("hide");
    } else if (typeof load_more !== 'undefined') {
        $(".load_more_fb_btn").addClass("hide");
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No more review found.</h3>";
    }

    return reviews_content;
}


function format_custom_data(data, load_more) {

    var obj = data;
    var reviews = obj.reviews;
    var reviews_content = "";

    if (!$.fn.isEmpty(reviews)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(reviews, function (r, review) {

            reviews_content += '<div class="single-feed" data-channel="facebook_review" data-rating="' + review.rating + '" data-title="" >';

            if (typeof review.image !== 'undefined' && review.image.name !== "undefined") {
                reviews_content += '<div class="avatar"><img src="'  + review.image + '"></div>';
            } else {
                reviews_content += '<div class="avatar"><img src="' + image_url + 'images/wix/no-profile.png"></div>';
            }
            reviews_content += '<div class="feed-content">';
            reviews_content += '<p id="name">';
            reviews_content += '<span id="from_user">' + review.name + '</span> <span id="date"></span>';

            if (review.published === true) {
                reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="custom" data-id="' + review.id +  '" data-is-remove=" ' + true + '">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';
            } else {
                reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary" data-channel="custom" data-id="' + review.id + '">Publish</button>';
            }
            reviews_content += '</p>';

            if (typeof review.title !== "undefined" && review.title !== null) {
                reviews_content += '<p id="rating" style="margin : 0 !important; font-weight: bold; color: #09f">' + review.title + '</p>';
            }
            reviews_content += '<p id="rating" style="color: rgb(199, 188, 0); margin : 0 !important;"><span id="num_star">' + review.rating + '</span> <span>star rating</span></p>';
            reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;"></p>';

            if (typeof review.message !== 'undefined' && (review.message).length >= 110) {
                reviews_content += '<p id="message">' + review.message.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                reviews_content += '<p id="long_message" class="hide">' + review.message + ' <a href="javascript:;" class="read_less">Less</a></p>';
            } else if (typeof review.message !== 'undefined') {
                reviews_content += '<p id="message">' + review.message + '</p>';
            }

            reviews_content += '</div>';
            reviews_content += '</div>';
        });

    } else if (typeof load_more === 'undefined') {
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No review found.</h3>";
        $(".load_more_fb_btn").addClass("hide");
    } else if (typeof load_more !== 'undefined') {
        $(".load_more_fb_btn").addClass("hide");
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No more review found.</h3>";
    }

    return reviews_content;
}

function format_site_data(data, load_more) {
    var obj = data;
    var reviews = obj.reviews;
    var reviews_content = "";

    if (!$.fn.isEmpty(reviews)) {

        $(".load_more_fb_btn").removeClass("hide");
        $.each(reviews, function (r, review) {

            if (typeof review.reviewer !== 'undefined' && review.reviewer !== null) {
                reviews_content += '<div class="single-feed" data-channel="facebook_review" data-rating="' + review.rating + '" data-title="" >';

                if (typeof review.reviewer.pic !== 'undefined' && review.reviewer.pic !== null) {
                    reviews_content += '<div class="avatar"><img src="' + review.reviewer.pic + '"></div>';
                }
                reviews_content += '<div class="feed-content">';
                reviews_content += '<p id="name">';
                reviews_content += '<span id="from_user">' + review.reviewer.display_name + '</span> <span id="date"></span>';

                if (review.published === true) {
                    reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="site" data-id="' + review.id + '" data-is-remove=" ' + true + '">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';

                } else {
                    reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary" data-channel="site" data-id="' + review.id + '">Publish</button>';
                }
                reviews_content += '</p>';

                if (typeof review.title !== "undefined" && review.title !== null) {
                    reviews_content += '<p id="rating" style="margin : 0 !important; font-weight: bold; color: #09f">' + review.title + '</p>';
                }
                reviews_content += '<p id="rating" style="color: rgb(199, 188, 0); margin : 0 !important;"><span id="num_star">' + review.rating + '</span> <span>star rating</span></p>';
                reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;"></p>';

                if (typeof review.message !== 'undefined' && (review.message).length >= 110) {
                    reviews_content += '<p id="message">' + review.message.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                    reviews_content += '<p id="long_message" class="hide">' + review.message + ' <a href="javascript:;" class="read_less">Less</a></p>';
                } else if (typeof review.message !== 'undefined') {
                    reviews_content += '<p id="message">' + review.message + '</p>';
                }

                reviews_content += '</div>';
                reviews_content += '</div>';
            }
        });

    } else if (typeof load_more === 'undefined') {
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No review found.</h3>";
        $(".load_more_fb_btn").addClass("hide");
    } else if (typeof load_more !== 'undefined') {
        $(".load_more_fb_btn").addClass("hide");
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No more review found.</h3>";
    }

    return reviews_content;
}

function format_yelp_data(data, load_more) {

    var obj = data;
    var yelps = obj.feed;
    var reviews_content = "";

    if (!$.fn.isEmpty(yelps)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(yelps, function (r, yelp) {

            reviews_content += '<div class="single-feed" data-channel="facebook_review" data-rating="' + yelp.rating + '" data-title="" >';
            reviews_content += '<div class="avatar"><img src="' + yelp.user.picture + '"></div>';
            reviews_content += '<div class="feed-content">';
            reviews_content += '<p id="name">';
            reviews_content += '<span id="from_user">' + yelp.user.name + '</span> <span id="date"></span>';

            if (yelp.published === true) {
                reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="yelp" data-id="' + yelp.id + '" data-is-remove=" ' + true + '">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';
            } else {
                reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary" data-channel="yelp" data-id="' + yelp.id + '">Publish</button>';
            }
            reviews_content += '</p>';

            reviews_content += '<p id="rating" style="color: rgb(199, 188, 0); margin : 0 !important;"><span id="num_star">' + yelp.rating + '</span> <span>star rating</span></p>';
            reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;"></p>';

            if (typeof yelp.text !== 'undefined' && (yelp.text).length >= 110) {
                reviews_content += '<p id="message">' + yelp.text.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                reviews_content += '<p id="long_message" class="hide">' + yelp.text + ' <a href="javascript:;" class="read_less">Less</a></p>';
            } else if (typeof yelp.text !== 'undefined') {
                reviews_content += '<p id="message">' + yelp.text + '</p>';
            }

            reviews_content += '</div>';
            reviews_content += '</div>';
        });

    } else if (typeof load_more === 'undefined') {
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No review found.</h3>";
        $(".load_more_fb_btn").addClass("hide");
    } else if (typeof load_more !== 'undefined') {
        $(".load_more_fb_btn").addClass("hide");
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No more review found.</h3>";
    }

    return reviews_content;
}

/**
 * Format twitter data
 * @param {type} data
 * @returns {String}
 */
function format_twitter_data(data, load_more) {
    var obj = data;
    var tweets = obj.feed;
    var reviews_content = "";

    if (!$.fn.isEmpty(tweets)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(tweets, function (r, tweet) {

            reviews_content += '<div class="single-feed" data-channel="tweet" data-rating="" data-title="" >';
            reviews_content += '<div class="avatar"><img src="' + tweet.author.profile_image_url + '"></div>';
            reviews_content += '<div class="feed-content">';
            reviews_content += '<p id="name">';
            reviews_content += '<span id="from_user">' + tweet.author.name + '</span> <span id="date"></span>';

            if (tweet.published === true) {
                reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="twitter_mention" data-id="' + tweet.id + '" data-is-remove=" ' + true + '">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';
            } else {
                reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary" data-channel="twitter_mention" data-id="' + tweet.id + '">Publish</button>';
            }
            reviews_content += '</p>';
            reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;"></p>';

            if (typeof tweet.text !== 'undefined' && (tweet.text).length >= 110) {
                reviews_content += '<p id="message">' + tweet.text.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                reviews_content += '<p id="long_message" class="hide">' + tweet.text + ' <a href="javascript:;" class="read_less">Less</a></p>';
            } else if (typeof tweet.text !== 'undefined') {
                reviews_content += '<p id="message">' + tweet.text + '</p>';
            }

            reviews_content += '</div>';
            reviews_content += '</div>';
        });

    } else if (typeof load_more === 'undefined') {
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No review found.</h3>";
        $(".load_more_fb_btn").addClass("hide");
    } else if (typeof load_more !== 'undefined') {
        $(".load_more_fb_btn").addClass("hide");
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No more review found.</h3>";
    }

    return reviews_content;
}

function format_google_data(data, load_more) {

    var obj = data;
    var google_reviews = obj.feed;
    var reviews_content = "";

    if (!$.fn.isEmpty(google_reviews)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(google_reviews, function (r, google_review) {

            reviews_content += '<div class="single-feed" data-channel="instagram" data-rating="" data-title="" >';
            reviews_content += '<div class="avatar"><img src="' + google_review.user.picture + '"></div>';
            reviews_content += '<div class="feed-content">';
            reviews_content += '<p id="name">';
            reviews_content += '<span id="from_user">' + google_review.user.name + '</span> <span id="date"></span>';

            if (google_review.published === true) {
                reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="googleplus_review" data-id="' + google_review.id + '" data-is-remove=" ' + true + '">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';
            } else {
                reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary" data-channel="googleplus_review" data-id="' + google_review.id + '">Publish</button>';
            }
            reviews_content += '</p>';
            reviews_content += '<p id="rating" style="color: rgb(199, 188, 0); margin : 0 !important;"><span id="num_star">' + google_review.rating + '</span> <span>star rating</span></p>';
            reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;"></p>';

            if (typeof google_review.text !== 'undefined' && (google_review.text).length >= 110) {
                reviews_content += '<p id="message">' + google_review.text.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                reviews_content += '<p id="long_message" class="hide">' + google_review.text + ' <a href="javascript:;" class="read_less">Less</a></p>';
            } else if (typeof google_review.text !== 'undefined') {
                reviews_content += '<p id="message">' + google_review.text + '</p>';
            }

            reviews_content += '</div>';
            reviews_content += '</div>';
        });

    } else if (typeof load_more === 'undefined') {
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No review found.</h3>";
        $(".load_more_fb_btn").addClass("hide");
    } else if (typeof load_more !== 'undefined') {
        $(".load_more_fb_btn").addClass("hide");
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No more review found.</h3>";
    }

    return reviews_content;
}


/**
 * Format Facebook data
 * @param {type} data
 * @returns {String}
 */
function format_fb_data(data, load_more) {

    var obj = JSON.parse(data);

    var reviews = obj.reviews.feed;
    var comments = obj.comments.feed;
    var posts = obj.posts.feed;

    var reviews_content = "";

    if (!$.fn.isEmpty(reviews)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(reviews, function (r, review) {


            reviews_content += '<div class="single-feed" data-channel="facebook_review" data-rating="' + review.rating + '" data-title="" >';
            reviews_content += '<div class="avatar"><img src="https://graph.facebook.com/' + review.reviewer.id + '/picture?redirect=true&type=large&access_token=' + facebook_token + ' "></div>';
            reviews_content += '<div class="feed-content">';
            reviews_content += '<p id="name">';
            reviews_content += '<span id="from_user">' + review.reviewer.name + '</span> <span id="date">' + review.created_time + '</span>';

            if (review.published === true) {
                reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="facebook_review" data-id="' + review.id + '" data-is-remove=" ' + true + '">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';
            } else {
                reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary" data-channel="facebook_review" data-id="' + review.id + '">Publish</button>';
            }
            reviews_content += '</p>';

            reviews_content += '<p id="rating" style="color: rgb(199, 188, 0); margin : 0 !important;"><span id="num_star">' + review.rating + '</span> <span>star rating</span></p>';
            reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;"></p>';

            if (typeof review.review_text !== 'undefined' && (review.review_text).length >= 110) {
                reviews_content += '<p id="message">' + review.review_text.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                reviews_content += '<p id="long_message" class="hide">' + review.review_text + ' <a href="javascript:;" class="read_less">Less</a></p>';
            } else if (typeof review.review_text !== 'undefined') {
                reviews_content += '<p id="message">' + review.review_text + '</p>';
            }

            reviews_content += '</div>';
            reviews_content += '</div>';
        });

    }

    if (!$.fn.isEmpty(comments)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(comments, function (c, comment) {
            reviews_content += '<div class="single-feed" data-channel="facebook_review" data-rating="0" data-title="" >';
            reviews_content += '<div class="avatar"><img src="https://graph.facebook.com/' + comment.from_.id + '/picture?redirect=true&type=large"></div>';
            reviews_content += '<div class="feed-content">';
            reviews_content += '<p id="name">';
            reviews_content += '<span id="from_user">' + comment.from_.name + '</span> <span id="date"></span>';

            if (comment.published === true) {
                reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="facebook_comment" data-id="' + comment.id + '" data-is-remove=" ' + true + '">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';
            } else {
                reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary" data-channel="facebook_comment" data-id="' + comment.id + '">Publish</button>';
            }
            reviews_content += '</p>';
            reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;"></p>';

            if (typeof comment.message !== 'undefined' && (comment.message).length >= 110) {
                reviews_content += '<p id="message">' + comment.message.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                reviews_content += '<p id="long_message" class="hide">' + comment.message + ' <a href="javascript:;" class="read_less">Less</a></p>';
            } else if (typeof comment.message !== 'undefined') {
                reviews_content += '<p id="message">' + comment.message + '</p>';
            }

            reviews_content += '</div>';
            reviews_content += '</div>';
        });
    }

    if (!$.fn.isEmpty(posts)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(posts, function (c, post) {
            reviews_content += '<div class="single-feed" data-channel="facebook_review" data-rating="0" data-title="" >';
            reviews_content += '<div class="avatar"><img src="https://graph.facebook.com/' + post.from_.id + '/picture?redirect=true&type=large"></div>';
            reviews_content += '<div class="feed-content">';
            reviews_content += '<p id="name">';
            reviews_content += '<span id="from_user">' + post.from_.name + '</span> <span id="date"></span>';

            if (post.published === true) {
                reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="facebook_comment" data-id="' + post.id + '" data-is-remove=" ' + true + '">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';
            } else {
                reviews_content += '<button class="add-kudo add-kudo-btn adding-kudo-btn uilib-btn btn-small btn-secondary" data-channel="facebook_comment" data-id="' + post.id + '">Publish</button>';
            }
            reviews_content += '</p>';
            reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;"></p>';

            if (typeof post.message !== 'undefined' && (post.message).length >= 110) {
                reviews_content += '<p id="message">' + post.message.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                reviews_content += '<p id="long_message" class="hide">' + post.message + ' <a href="javascript:;" class="read_less">Less</a></p>';
            } else if (typeof post.message !== 'undefined') {
                reviews_content += '<p id="message">' + post.message + '</p>';
            }

            reviews_content += '</div>';
            reviews_content += '</div>';
        });
    }

    if ($.fn.isEmpty(comments) && $.fn.isEmpty(reviews) && $.fn.isEmpty(posts)) {
        reviews_content = "<h3 class='text-center' style='font-weight: 100'>No review found.</h3>";
        $(".load_more_fb_btn").addClass("hide");
    } else if (typeof load_more !== 'undefined' && $.fn.isEmpty(comments) && $.fn.isEmpty(reviews) && $.fn.isEmpty(posts)) {
        $(".load_more_fb_btn").addClass("hide");
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No more review found.</h3>";
    }

    return reviews_content;
}


function format_published_data(data, load_more) {

    var obj = data;
    var reviews = obj.reviews_and_comments;
    var reviews_content = "";



    if (!$.fn.isEmpty(reviews)) {

        $(".load_more_fb_btn").removeClass("hide");

        $.each(reviews, function (r, review) {

            var published = review.review;

            if (typeof published.reviewer.display_name !== "undefined") {
                reviews_content += '<div class="single-feed" data-channel="facebook_review" data-title="" >';

                if (typeof published.reviewer !== 'undefined' && published.reviewer.pic !== "undefined") {
                    reviews_content += '<div class="avatar"><img src="' + published.reviewer.pic + '"></div>';
                }
                reviews_content += '<div class="feed-content">';
                reviews_content += '<p id="name">';
                reviews_content += '<span id="from_user">' + published.reviewer.display_name + '</span> <span id="date"></span>';

                reviews_content += '<button class="delete-kudo uilib-btn btn-small btn-secondary" data-channel="' + published.channel + '" data-id="' + published.id + '" data-is-remove=" '+false+'">Unpublish</button><img style="margin-right:75px;" src="' + image_url + 'images/wix/green-dot.png"  class="is_kudos">';

                reviews_content += '</p>';

                if (typeof published.title !== "undefined" && published.title !== null && published.title !== "") {
                    reviews_content += '<p id="kudo-title" style="font-weight: bold; color: #A6A6A6; margin: 0;">' + published.title + '</p>';
                }

                if (typeof published.rating !== "undefined" && published.rating !== null && published.rating !== "" && published.rating !== 0) {
                    reviews_content += '<p id="rating" style="color: rgb(199, 188, 0); margin : 0 !important;"><span id="num_star">' + published.rating + '</span> <span>star rating</span></p>';
                }

                if (typeof published.message !== 'undefined' && (published.message).length >= 110) {
                    reviews_content += '<p id="message">' + published.message.substr(0, 110) + ' <a href="javascript:;" class="read_more">More</a></p>';
                    reviews_content += '<p id="long_message" class="hide">' + published.message + ' <a href="javascript:;" class="read_less">Less</a></p>';
                } else if (typeof published.message !== 'undefined') {
                    reviews_content += '<p id="message">' + published.message + '</p>';
                }

                reviews_content += '</div>';
                reviews_content += '</div>';
            }
        });

    } else if (typeof load_more === 'undefined') {
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No review found.</h3>";
        $(".load_more_fb_btn").addClass("hide");
    } else if (typeof load_more !== 'undefined') {
        $(".load_more_fb_btn").addClass("hide");
        reviews_content = "<h3 class='text-center' style='font-weight: 100 !important;'>No more review found.</h3>";
    }

    return reviews_content;
}


/**
 * Parse translation
 */
function parse_translation(translation_obj) {

    if (typeof translation_obj !== "undefined") {

        $("#write_a_review_txt").val(translation_obj.translation.write_a_review);
        $("#title_here_txt").val(translation_obj.translation.review_title_placeholder);
        $("#compose_your_review_txt").val(translation_obj.translation.enter_review_text);
        $("#login_txt").val(translation_obj.translation.signin_with_text);
        $("#submit_review_txt").val(translation_obj.translation.submit_review_button_text);
        $("#cancel_txt").val(translation_obj.translation.cancel_text);
        $("#no_review_txt").val(translation_obj.translation.be_the_first_to_review_this_website_text);
        $("#modal_title_txt").val(translation_obj.translation.review_title_text);
        $("#read_more_txt").val(translation_obj.translation.read_more_text);
        $("#load_more_txt").val(translation_obj.translation.load_more_text);
        $("#read_less_txt").val(translation_obj.translation.read_less_text);
        $("#thank_you_msg_txt").val(translation_obj.translation.thanks_for_review_text);
        $("#review_title_txt").val(translation_obj.translation.give_a_title_text);
        $("#review_too_short_error_txt").val(translation_obj.translation.review_length_text);
        $("#compose_review_txt").val(translation_obj.translation.review_content_placeholder);
        $("#site_review_title_txt").val(translation_obj.translation.site_reviews);
        $("#required_txt").val(translation_obj.translation.required);
        $("#verified_reviewer_txt").val(translation_obj.translation.verified_reviewer);
        $("#view_post_txt").val(translation_obj.translation.view_post);
        $("#review_txt").val(translation_obj.translation.review_text);
        $("#reviews_txt").val(translation_obj.translation.reviews_text);
        $("#site_review_txt").val(translation_obj.translation.site_reviews);
        $("#average_rating_txt").val(translation_obj.translation.average_rating);
    }
}


/**
 * Parse seo
 */
function parse_seo(seo_obj) {

    if (typeof seo_obj !== "undefined") {
        $("#cname_txt").val(seo_obj.rich_snippet.cname);
        $("#page_title_txt").val(seo_obj.rich_snippet.page_title);
        $("#google_verification_txt").val(seo_obj.rich_snippet.google_verification);
        $("#bing_verification_txt").val(seo_obj.rich_snippet.bing_verification);
        $("#page_description_txt").val(seo_obj.rich_snippet.page_description);
    }
}

$(document).on("click", ".read_more", function () {
    $(this).closest(".feed-content").find("#message").addClass("hide");
    $(this).closest(".feed-content").find("#long_message").removeClass("hide");
});

$(document).on("click", ".read_less", function () {
    $(this).closest(".feed-content").find("#message").removeClass("hide");
    $(this).closest(".feed-content").find("#long_message").addClass("hide");
});
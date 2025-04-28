$(document).ready(function() {
    $('button').click(function() {
        $(this).text(function(_, text) {
            return text === "Follow" ? "Unfollow" : "Follow";
        });
        if ($(this).text() == "Follow") {
            $(this).removeClass('unfollow');
        } else if ($(this).text() == "Unfollow") {
            $(this).addClass('unfollow');
        }
    });
});
function act(){
    document.querySelector(".follow-button").textContent="following";
    var btn=document.querySelector(".follow-button");
}
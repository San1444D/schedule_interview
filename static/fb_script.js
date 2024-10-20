function get_feedback_template() {
    let send_data = {
        "lng_Interview_Schedule_ID": parseInt($("#interview-schedule-id").val()),
        "lng_Interview_Panel_Member_ID": parseInt($("#panel-member-id").val()),
    }
    $.ajax({
        url: "/feedback/feedback-get", // Flask route
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(send_data),
        success: function (response) {
            // alert("Interview Template display successfully!");
            console.log(response); // You can handle response as needed
            // response["Data"].forEach(element => {
            //     let temp = `
            //         <option value="${element["lng_Interview_Template_ID"]}">${element["str_Interview_Template_Name"]}</option>
            //     `
            //     $("#template_list").append(temp);
            // });
        },
        error: function (response) {
            alert(response['responseJSON']["Message"]);
            console.error(response);
        }
    });
}

function get_feedback_values() {
    
}

function save_feedback() {
    let feedback_data = get_feedback_values();
    console.log(feedback_data);

    $.ajax({
        url: '/feedback/update-feedback',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(feedback_data), // Convert the interviewData to JSON
        success: function (response) {
            console.log(response);
            alert(response["Message"]);
        },
        error: function (response) {
            console.log(response);
            alert(response['responseJSON']["Message"]);
        }
    });

}
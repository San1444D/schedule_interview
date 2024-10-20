
function display_sections(place, data) {
    $(place).empty();
    let feedback_temp = `
            <p id="panel-member-name">Panel member Name : ${data.str_Full_Name}</p>
            <p id="panel-member-role">Panel member Role : ${data.str_Panel_Member_Role}</p>
            <p id="feedback-template-name">Feedback Template Name : ${data.str_Feedback_Template_Name}</p>
            <p id="feedback-template-description">Feedback Template Description : ${data.str_Feedback_Template_Description}</p>



            <div class="interview-schedule-feedback">
                
            </div>`

    $(place).append(feedback_temp);

    data.sections.forEach((section, index) => {
        let section_temp = `<div>
                <div class="Section-container">
                    <p>Section Name : ${section.str_Section_Name}</p>
                    <p>Section Description : ${section.str_Section_Description}</p>
                    
                </div>
            </div>`
        $(".interview-schedule-feedback").append(section_temp);

        section.sub_params.forEach(sub_param => {
            let sub_param_temp = `
                    <div  class="sub_param container-fluid" data-value="${sub_param.lng_Interview_Schedule_Panel_Member_Feedback_ID} ">
                        <div class="row">
                            <div class="col-8">
                                <p>Subparameter Name : ${sub_param.str_Sub_Parameter_Name}</p>
                                <p>Subparameter Description : ${sub_param.str_Sub_Parameter_Description}</p>
                            </div>
                            <div class="col-2"><select  class="rating form-select" aria-label="Default select example">
                                    <option disabled selected hidden>Rating</option>
                                    <option value="1">Excellent</option>
                                    <option value="2">Good</option>
                                    <option value="3">Average</option>
                                    <option value="4">Poor</option>
                                </select></div>
                        </div>
                        <div class="form-floating" style="padding: 10px;">
                            <textarea  class="comment form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                                style="height: 100px"></textarea>
                            <label for="floatingTextarea2">Comments</label>
                        </div>
                    </div>`
            $(".Section-container:last").append(sub_param_temp);
            // Set the rating and comment in the newly appended element
    const $last_sub_param = $(".Section-container:last .sub_param:last");

    // Check if a rating exists and set it
    if (sub_param.lng_Rating_Option_ID) {
        $last_sub_param.find(".rating").val(sub_param.lng_Rating_Option_ID);
    }

    // Check if a comment exists and set it
    if (sub_param.str_comments) {
        $last_sub_param.find(".comment").val(sub_param.str_comments); // Set the value, textarea is editable by default
    }
        });


    });
}



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
            display_sections("#feedback-template", response["Data"]);
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
    let feedback_values = {"Ratings":[]};

    // Iterate over each sub_param element
    $(".sub_param").each(function () {
        feedback_values.Ratings.push({
            // Use 'this' to refer to the current sub_param being processed
            "lng_Interview_Schedule_Panel_Member_Feedback_ID": parseInt($(this).attr("data-value")),
            "lng_Rating_Option_ID": parseInt($(this).find(".rating").val()),  // find the select inside the current sub_param
            "str_Comments": $(this).find(".comment").val()  // find the textarea inside the current sub_param
        });
    });

    return feedback_values;
}

function save_feedback() {
    let feedback_data = get_feedback_values();
    console.log(feedback_data);

    $.ajax({
        url: '/feedback/feedback-update',
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
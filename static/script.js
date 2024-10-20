// function display_level(place) {
//     // console.log(url, urltoimg, title, description);
//     let temp = `<div class="interview-schedule-levels">
//                     <p id="level-name">Level name</p>
//                     <p id="type-name">Type name</p>

//                     <div class="panel-members">
//                         <h4>Panel Members list</h4>
//                         <div id="level-1-panel" >
//                             <div id="level-1-panel-1" class="container" style="padding:10px;">
//                                 <!-- Stack the columns on mobile by making one full-width and the other half-width -->
//                                 <div class="row">
//                                     <div class="col-md-4">

//                                         <select class="form-select" aria-label="Default select example">
//                                             <option disabled selected hidden>Panel member</option>
//                                             <option value="1">One</option>
//                                             <option value="2">Two</option>
//                                             <option value="3">Three</option>
//                                         </select>

//                                     </div>
//                                     <div class="col-6 col-md-4">

//                                         <select class="form-select" aria-label="Default select example">
//                                             <option disabled selected hidden>feedback template</option>
//                                             <option value="1">One</option>
//                                             <option value="2">Two</option>
//                                             <option value="3">Three</option>
//                                         </select>

//                                     </div>
//                                 </div>
//                             </div>


//                         </div>
//                         <button type="button" class="btn btn-outline-primary" onclick="add_pannel_member('#level-1-panel')"
//                                 style="position: relative; left: 70%; top: -48px;">+</button>


//                         <div class="input-fields">
//                             <div class="input-group mb-3">
//                                 <span class="input-group-text" id="inputGroup-sizing-default">Interview Date</span>
//                                 <input type="text" class="form-control" aria-label="Sizing example input"
//                                     aria-describedby="inputGroup-sizing-default" placeholder="(YYYY-MM-DD)">
//                             </div>

//                             <div class="input-group mb-3">
//                                 <select class="form-select" aria-label="Default select example">
//                                     <option disabled selected hidden>Interview Mode</option>
//                                     <option value="Online">Online</option>
//                                     <option value="In-person">In-person</option>

//                                 </select>
//                             </div>

//                             <div class="interview-lvl-status">
//                                 <select class="form-select" aria-label="Default select example">
//                                     <option disabled selected hidden>Interview level status</option>
//                                     <option value="Scheduled">Scheduled</option>
//                                     <option value="In-Progress">In-Progress</option>
//                                     <option value="Completed">Completed</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>`;
//     $(place).append(temp);
// }

function display_level(place, data) {
    // Loop through the levels array and create the HTML dynamically
    $(place).empty();
    data.levels.forEach((level, index) => {
        let temp = `<div class="interview-schedule-level">
                        <p class="level_id" data-value="${level.lng_Interview_Level_ID}">Level: ${level.str_Interview_Level_Name}</p>
                        <p class="type_id" data-value="${level.lng_Interview_Type_ID}">Type: ${level.str_Interview_Type_Name} (${level.str_Interview_Type_Description})</p>

                        <div class="panel-members">
                            <h4>Panel Members list</h4>
                            <div id="level-${index + 1}-panel" >
                                <div id="level-${index + 1}-panel-${index + 1}" class="container" style="padding:10px;">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <select class="form-select" aria-label="Default select example">
                                                <option disabled selected hidden>Panel member</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div class="col-6 col-md-4">
                                            <select class="form-select" aria-label="Default select example">
                                                <option disabled selected hidden>Feedback template</option>
                                                <option value="1">Technical Interview</option>
                                                <option value="2">HR Interview</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-outline-primary" onclick="add_pannel_member('#level-${index + 1}-panel')"
                                    style="position: relative; left: 70%; top: -48px;">+</button>
                            <div class="mode_and_status">
                                <div class="input-fields">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="inputGroup-sizing-default">Interview Date</span>
                                        <input type="text" class="form-control" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" placeholder="(YYYY-MM-DD)">
                                    </div>

                                    <div class="input-group mb-3">
                                        <select id="interview-mode" class="form-select" aria-label="Default select example">
                                            <option disabled selected hidden>Interview Mode</option>
                                            <option value="Online">Online</option>
                                            <option value="In-person">In-person</option>
                                        </select>
                                    </div>

                                    <div class="interview-lvl-status" >
                                        <select id="interview-status" class="form-select" aria-label="Default select example">
                                            <option disabled selected hidden>Interview level status</option>
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="In-Progress">In-Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        $(place).append(temp);
    });
}


function dispaly_template() {
    $.ajax({
        url: "/interview/template-list", // Flask route
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "Search_Query": "",
            "Template_Status": "",
            "Sort_Column": "str_Interview_Template_Name",
            "Sort_Direction": "asc",
            "Page_No": 1,
            "Items_Per_Page": 10,
            "Date_Range": "",
            "Registration_Start_Date": "",
            "Registration_End_Date": "",
        }),
        success: function (response) {
            // alert("Interview Template display successfully!");
            console.log(response); // You can handle response as needed
            response["Data"].forEach(element => {
                let temp = `
                    <option value="${element["lng_Interview_Template_ID"]}">${element["str_Interview_Template_Name"]}</option>
                `
                $("#template_list").append(temp);
            });
        },
        error: function (response) {
            alert(response['responseJSON']["Message"]);
            console.error(response);
        }
    });

}

function get_template_detail() {
    let template_id = parseInt($("#template_list").val());
    console.log(template_id);
    $.ajax({
        url: "/interview/template-detail", // Flask route
        type: "POST",
        contentType: "application/json",
        // dataType :"json",
        data: JSON.stringify({ // Convert to JSON string
            "lng_Template_ID": template_id,
        }),
        success: function (response) {
            // alert("Interview Template display successfully!");
            console.log(response); // You can handle response as needed

            display_level("#levels", response["Data"])
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

function add_pannel_member(palce) {
    temp = `
                            <div id="${palce}" class="container" style="padding:10px;">
                                <!-- Stack the columns on mobile by making one full-width and the other half-width -->
                                <div class="row">
                                    <div class="col-md-4">

                                        <select class="form-select" aria-label="Default select example">
                                            <option disabled selected hidden>Panel member</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>

                                    </div>
                                    <div class="col-6 col-md-4">

                                        <select class="form-select" aria-label="Default select example">
                                            <option disabled selected hidden>feedback template</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>

                                    </div>
                                </div>
                            `
    $(palce).append(temp)
}

function get_schedule_values() {
    var interviewData = {
        lng_Short_Listed_ID: parseInt($("input[aria-label='Sizing example input']").val()), // Short listed ID
        lng_Interview_Template_ID: parseInt($("#template_list").val()), // Interview template ID
        str_Description: $("#intervier_description").val(), // Add a description field if needed
        levels: [] // Initialize empty array for levels
    };

    // Loop through each level and collect data dynamically
    $(".interview-schedule-level").each(function () {
        var level = {
            lng_Interview_Level_ID: parseInt($(this).find(".level_id").attr("data-value")), // Set this value dynamically if needed
            lng_Interview_Type_ID: parseInt($(this).find(".type_id").attr("data-value")),  // Set this value dynamically if needed
            panel_members: [],          // Collect panel members for this level
            

        };
        $(this).find(".mode_and_status").each(() => {
            dte_Interview_Date: $(this).find("input[placeholder='(YYYY-MM-DD)']").val();
            level.str_Interview_Mode = $(this).find("#interview-mode").val(); // Interview mode for this level
            level.str_Interview_Level_Status = $(this).find("#interview-status").val(); // Interview level status for this level

        });


        // Check if the Interview Date and other fields are valid before adding
        if (level.dte_Interview_Date && level.str_Interview_Mode && level.str_Interview_Level_Status) {
            // Collect panel members for this level
            $(this).find(".row").each(function () {
                var panel_member = {
                    panel_member_id: parseInt($(this).find("select").eq(0).val()), // Panel member from select
                    lng_Interview_Feedback_Template_ID: parseInt($(this).find("select").eq(1).val()) // Feedback template from select
                };

                // Ensure panel_member_id and feedback template ID are valid
                if (panel_member.panel_member_id && panel_member.lng_Interview_Feedback_Template_ID) {
                    level.panel_members.push(panel_member); // Add panel member to the current level
                }
            });

            // Only add the level if it has valid data
            if (level.panel_members.length > 0) {
                interviewData.levels.push(level); // Add level data to the main interview data
            }
        }
    });
    // interviewData.levels.shift();
    return interviewData;
}

function save_schedule() {
    let interview = get_schedule_values();
    console.log(interview);

    $.ajax({
        url: '/save-interview-schedule',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(interview), // Convert the interviewData to JSON
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


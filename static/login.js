function login() {

    const given_email = $('#email').val();
    const given_password = ($('#password').val());
    console.log(given_password)
    if (given_email == "" || given_password == "") {
        alert('Please enter the login credentials')
    } else {
        $.ajax({
            type: "POST",
            url: '/user/login',
            data: { 'email': given_email, 'pwd': given_password },
            dataType: "json",
            success: function (response) {
                console.log(response);
                alert(response['Message']);
                window.location.replace("/schedule-interview")
            },
            error: function (response) {
                console.log(response);
                alert(response['responseJSON']['Message']);
            }
        });

    }

    // console.log(given_email, given_password);

}
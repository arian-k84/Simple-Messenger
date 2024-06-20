$("input[type='submit']").on('click',function (){
    $(".error_text").each(function() {
        if(!$(this).hasClass("hidden_text")){
            $(this).addClass("hidden_text")
        }
    })
    let num_check = false
    let pass_check = false
    let num = $("input[name='number']").val().trim()
    let pass = $("input[name='password']").val()
    let cpass = $("input[name='confirm_password']").val()
    {// if(num){
    //     let err_msg = $("#pnumber_box .error_text")
    //     if(num.match(/^[a-zA-Z0-9_]+$/)){
    //         if(num.match(/^[a-zA-Z]+/)){
    //             user_check = true
    //         }else{
    //             // $("#pnumber_box .error_text").text("*Must not contain: " + name.replace(/[a-zA-Z0-9_]+$/, "").split('').join(',').replace(/\s+/, "whitespace").replace(/\s+/g, "") + ".")
    //             err_msg.text("*Must include a letter.")
    //             err_msg.removeClass("hidden_text")
    //         }

    //     }else{
    //         // $("#pnumber_box .error_text").text("*Must not contain: " + name.replace(/[a-zA-Z0-9_]+$/, "").split('').join(',').replace(/\s+/, "whitespace").replace(/\s+/g, "") + ".")
    //         $("#pnumber_box .error_text").text("*Special Characters/Whitespace not allowed.")
    //         $("#pnumber_box .error_text").removeClass("hidden_text")
    //     }
    // }
    }
    if(num){
        let err_msg = $("#pnumber-box .error_text")
        if(num[0] == "0"){
            num = num.slice(1, num.length)
            $("input[name='number']").val(num)
        }
        if(num.match(/^[6789][0-9]{9}$/)){
            num_check = true
        }else{
            $("#pnumber-box .error_text").text("*Please enter a valid phone number.")
            $("#pnumber-box .error_text").removeClass("hidden_text")
        }
    }
    if(pass){
        let err_msg = $("#password-box .error_text")
        if(pass.match(/^(?=.*\d)/)){
            if(pass.match(/[a-z]/)){
                if(pass.match(/.[A-Z]/)){
                    if(pass.match(/.{6,20}/)){
                        pass_check = true
                    }else{
                        err_msg.text("*Must have a minimum of 6 letters.")
                        err_msg.removeClass("hidden_text")
                    }
                }else{
                    err_msg.text("*Must have an uppercase letter.")
                    err_msg.removeClass("hidden_text")
                }
            }else{
                err_msg.text("*Must contain a lowercase letter.")
                err_msg.removeClass("hidden_text")
            }
        }else{
            err_msg.text("*Must contain a digit.")
            err_msg.removeClass("hidden_text")
        }
    }
    if(pass == cpass){
        if(num_check && pass_check){
            $.ajax({
                url: "register/insert_data",
                type: "POST",
                data: {
                    "pnumber": num,
                    "password": pass,
                },
                success: function (response){
                    response = JSON.parse(response);
                    for(let res in response){
                    // Object.values(response).forEach(v => {
                        if(res == "code"){
                            switch(response[res]){
                                case 0:
                                    location.reload()
                                    break
                                case 1:
                                    $("#pnumber-box .error_text").text("*Special Characters/Whitespace not allowed.")
                                    $("#pnumber-box .error_text").removeClass("hidden_text")
                                    break
                                case 2:
                                    $("#pnumber-box .error_text").text("*Phone number already registered.")
                                    $("#pnumber-box .error_text").removeClass("hidden_text")
                                    break
                            }
                        }
                    };
                },
                error: function (response) {
                    alert("Server-side error.");
                }
            });
        }
    }else{
        $("#cpassword-box .error_text").text("*Must be the same as your password.")
        $("#cpassword-box .error_text").removeClass("hidden_text")
    }
})
$("<div>",{text:"\u004D\u0061\u0064\u0065\u0020\u0062\u0079\u0020\u0041\u0072\u0069\u0061\u006E\u0020\u004B\u002E", css:{position:"absolute", bottom:"8px", left:"8px", fontSize:"0.8rem", color:"white"}}).appendTo("body");
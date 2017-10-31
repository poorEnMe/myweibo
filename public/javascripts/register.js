$("#username").blur(function () {
    let name = $("#username").val();
    if(name){
        if(!nameCheck(name)){
            //message.text = "用户名必须以字母开头，长度为6-20位（只能包含字母、数字、下划线";
            $("#message").html("用户名必须以字母开头，长度为6-20位（只能包含字母、数字、下划线")
                .attr("class","messageDanger");
            return false
        }
        //检测重复
        $.get("/register/isAlreadyUsed", {username: name}, function (data) {
            if (data){
                $("#message").html("该账号已被占用，请更换").attr("class","messageDanger");
                return false
            }
        });
    }

});


$("#password").blur(function () {
    $("#message").html("请输入账号和密码").attr("class","text-muted");
    let password = $("#password").val();
    if(password){
        //正则匹配
        if(!passwordCheck(password)){
            $("#message").html("密码长度为6-20位（只能包含字母、数字、下划线")
                .attr("class","messageDanger");
            return false
        }
    }
});

$("#passwordRepeat").blur(function () {
    $("#message").html("请输入账号和密码").attr("class","text-muted");
    let passwordRepeat = $("#passwordRepeat").val();
    let password = $("#password").val();
    if(passwordRepeat && password){
        if(password !== passwordRepeat){
            $("#message").html("两次密码输入不一致")
                .attr("class","messageDanger");
            return false
        }
    }
});

$("#registerSubmit").on('click', function() {
    let isPass = $("#message").attr('class');
    return isPass !== "messageDanger"
});


registerCheck = function () {
    let isPass = $("#message").attr('class');
    console.log(isPass);
    return isPass !== "messageDanger"
};


function len(s) {//若为汉字之类的字符则占两个
    let l = 0;
    let a = s.split("");
    for (let i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
            l++;
        } else {
            l += 2;
        }
    }
    return l;
}


function nameCheck(name) {
    let patrn = /^[a-zA-Z]{1}\w{5,19}$/;
    return patrn.exec(name);

}

function passwordCheck(password) {
    let patrn = /\w{6,20}$/;
    return patrn.exec(password);

}
function publishEntrys(ele) {
    let body = $("#publishBody").val();
    if (body === null) {
        return false
    }
    $.post('/publish',{body: body},function (result) {
            if (result) {
                window.location.reload();
                console.log(123);
            } else {
                alert('faild');
                return false
            }
        }
    );
}
//发表微博
function publishEntrys() {
    let Entrytext = $("#publishBody").val();
    $.get('/isLogin',function (result) {
        if(!result){
            $("#loginModal").modal('show');
        }
    });
    if (Entrytext === null) {
        return false
    }
    $.post('/publish',{body: Entrytext},function (result) {
            if (result) {
                $("#publishBody").val('');
                window.location.reload();
                const socket=io.connect('localhost:3000');
                socket.emit('newEntry','123');

            } else {
                alert('faild');
                return false
            }
        }
    );
}
//评论微博
function pulishComment(ele) {
    let entryId = $(ele).attr("entryId");
    let body = $(ele).prev().val();
    $(ele).prev().val('');
    $.post('/publishComment',{
        entryId:entryId,
        body:body
    },function (html) {
        let selector = 'div#' + entryId;
        let selectorChild = selector + ' .commentlist-form';
        $(selectorChild).remove();
        $(selector).append(html);
    });
}
//显示评论
function showComment(ele) {
    let entryId = $(ele).attr("entryId");
    let selector = 'div#' + entryId;
    $.get('/isLogin',{},function (result) {
        if(!result){
            $("#loginModal").modal('show');
        }else{
            $(selector).toggle();
            $.get('/getEntrylist',{entryId:entryId},function (html) {
                let selectorChild = selector+' .commentlist-form';
                $(selectorChild).remove();
                $(selector).append(html);
            });
        }
    });

}
$(function(){
  $('.loginForm').submit(function(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    $('.btn').blur()
    if($('#txtUsername').val() == ''){
      $check++; $('#txtUsername').addClass('is-invalid')
    }
    if($('#txtPassword').val() == ''){
      $check++; $('#txtPassword').addClass('is-invalid')
    }
    if($check != 0){
      return ;
    }
    var param = {
      username: $('#txtUsername').val(),
      password: $('#txtPassword').val()
    }
    var jxr = $.post(conf.api + 'authen?stage=login', param, function(){}, 'json')
               .always(function(snap){
                 console.log(snap);
                 if((snap != '') && (snap.length > 0)){
                   snap.forEach(i=>{
                     if(i.status = 'Success'){
                       window.localStorage.setItem(conf.prefix + 'uid', i.uid)
                       window.localStorage.setItem(conf.prefix + 'role', i.role_id)
                       window.localStorage.setItem(conf.prefix + 'province', i.primary_province)
                       window.location = './' + i.role_id + '/index.html'
                     }else{
                       preload.hide()
                       $('#notify1Modal').modal()
                     }
                   })
                 }else{
                   preload.hide()
                   $('#notify1Modal').modal()
                 }
               })
  })
})

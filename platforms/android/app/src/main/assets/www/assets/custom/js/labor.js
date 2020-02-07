var labor = {
  addNew(){
    $('.form-control').removeClass('is-invalid')
    if($('#txtSearchkey1').val() == ''){
      $('#txtSearchkey1').addClass('is-invalid')
      return ;
    }

    preload.show()

    var param = {
      cid: $('#txtSearchkey1').val(),
      uid: current_user,
      province: current_province
    }

    var jxr = $.post(conf.api + 'labor?stage=search_in_province', param, function(){})
               .always(function(resp){
                 if(resp == 'Y'){
                   window.localStorage.getItem(conf.prefix + 'cid', $('#txtSearchkey1').val())
                   window.location = 'labor-dashboard.html'
                 }else{
                   preload.hide()
                   $('#modalAddnewNotify').modal()
                   current_cid = $('#txtSearchkey1').val()
                   window.localStorage.getItem(conf.prefix + 'cid', $('#txtSearchkey1').val())
                 }
               })
  }
}

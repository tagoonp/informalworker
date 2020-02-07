var labor = {
  getInfo(cid){
    var param = {
      cid: cid,
      uid: current_user
    }

    var jxr = $.post(conf.api + 'labor?stage=get_info', param, function(){}, 'json')
               .always(function(snap){
                 if(fnc.json_exist(snap)){
                   snap.forEach(i=>{
                     $('#textLaborFullname').text(i.lb_fname + ' ' + i.lb_lname)
                   })
                 }else{

                 }
               })
  },
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
                   window.localStorage.setItem(conf.prefix + 'cid', $('#txtSearchkey1').val())
                   window.location = 'labor-dashboard.html'
                 }else{
                   preload.hide()
                   $('#modalAddnewNotify').modal()
                   current_cid = $('#txtSearchkey1').val()
                   window.localStorage.getItem(conf.prefix + 'cid', $('#txtSearchkey1').val())
                 }
               })
  },
  saveDemographic(){
    $check = 0
    $('.form-control').removeClass('is-invalid')
    $('.form-group').removeClass('text-danger')

    if($('#txtCid').val() == ''){
       $check++;
       $('#txtCid').addClass('is-invalid')
    }

    if($('#txtFname').val() == ''){
        $check++;
        $('#txtFname').addClass('is-invalid')
     }

     if($('#txtLname').val() == ''){
        $check++;
        $('#txtLname').addClass('is-invalid')
     }

     if($('#txtDD').val() == ''){
        $check++;
        $('#txtDD').addClass('is-invalid')
     }

     if($('#txtMM').val() == ''){
        $check++;
        $('#txtMM').addClass('is-invalid')
     }

     if($('#txtYY').val() == ''){
        $check++;
        $('#txtYY').addClass('is-invalid')
     }

     if($('#txtAge').val() == ''){
        $check++;
        $('#txtAge').addClass('is-invalid')
     }

     if($('#txtQ4').val() == ''){
        $check++;
        $('#txtQ4').addClass('is-invalid')
     }

     if($('#txtQ4_1').val() == ''){
        $check++;
        $('#txtQ4_1').addClass('is-invalid')
     }

     if($('#txtQ4_2').val() == ''){
        $check++;
        $('#txtQ4_2').addClass('is-invalid')
     }

     if($('#txtQ9').val() == ''){
        $check++;
        $('#txtQ9').addClass('is-invalid')
     }

     if($('#txtQ10').val() == ''){
        $check++;
        $('#txtQ10').addClass('is-invalid')
     }

     var sex = $("input[name='icon-input-sex']:checked").val();
     var preg = $("input[name='icon-input-preg']:checked").val();
     var feed = $("input[name='icon-input-feed']:checked").val();

     if(sex == null){
         $('#radiogroup-sex').addClass('text-danger'); $check++;
     }else if(sex == 'F'){
         console.log('a');

         if(preg == 1){
             console.log('aa');
             if($('#txtQ2').val() == ''){
                 $('#txtQ2').addClass('is-invalid')
                 $check++;
             }
         }else{
             console.log('ab');
         }
     }

     var edu = $("input[name='icon-input-status']:checked").val();
     var mariage = $("input[name='icon-input-status']:checked").val();
     if(mariage == null){ $('#radiogroup-status').addClass('text-danger'); $check++; }
     var q5 = $("input[name='icon-input-q5']:checked").val();
     if(q5 == null){
         $('#radiogroup-q5').addClass('text-danger'); $check++;
     }else if(q5 == 99){
         if($('#txtQ5').val() == ''){
            $('#txtQ5').addClass('is-invalid');
            $check++;
         }
     }

     var q6 = $("input[name='icon-input-q6']:checked").val();
     if(q6 == null){ $('#radiogroup-q6').addClass('text-danger'); $check++; }

     var q7 = $("input[name='icon-input-q7']:checked").val();
     if(q7 == null){ $('#radiogroup-q7').addClass('text-danger'); $check++; }

     var q8 = $("input[name='icon-input-q8']:checked").val();
     if(q8 == null){
         $('#radiogroup-q8').addClass('text-danger'); $check++;
     }else if(q8 == 99){
         if($('#txtQ8').val() == ''){
            $('#txtQ8').addClass('is-invalid');
            $check++;
         }
     }

     if($check != 0){
       return ;
     }

     preload.show()
     var param = {
         cid: $('#txtCid').val(),
         fname: $('#txtFname').val(),
         lname: $('#txtLname').val(),
         dd: $('#txtDD').val(),
         mm: $('#txtMM').val(),
         yy: $('#txtYY').val(),
         age: $('#txtAge').val(),
         sex: sex,
         preg: preg,
         preg_month: $('#txtQ2').val(),
         feeding: feed,
         status: mariage,
         family_num: $('#txtQ4').val(),
         family_num_m: $('#txtQ4_1').val(),
         family_num_f: $('#txtQ4_2').val(),
         rel: q5,
         rel_o: $('#txtQ5').val(),
         income: q6,
         edu: q7,
         privilege: q8,
         privilege_o: $('#txtQ8').val(),
         weight: $('#txtQ9').val(),
         height: $('#txtQ10').val(),
         province: current_province,
         uid: current_user
     }

     console.log(param);

     var jxr = $.post(conf.api + 'core/laborinfo.php?stage=add_part1', param, function(){})
                .always(function(resp){
                   if(resp == 'Y'){
                      window.location = './labor-dashboard.html'
                   }else{
                      preload.hide()
                      swal("ขออภัย", "ไม่สามารถบันทึกข้อมูลได้", "error")
                   }
                })


  }
}

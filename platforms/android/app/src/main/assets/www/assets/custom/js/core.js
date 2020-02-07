var iw = {
  get_province(){
      var jxr = $.post(conf.api + 'core/province?stage=get', function(){}, 'json')
                 .always(function(snap){
                   console.log(snap);
                   if(fnc.json_exist(snap)){
                       snap.forEach(i=>{
                         $('.txtProvince').append('<option value="' + i.Changwat + '">' + i.Name + '</option>')
                       })
                   }
                 })
  },
  get_district(){
    var param = {
      prov: $('#txtProvince').val()
    }
    $('#txtSubdistrict').html('<option value="" class="text-center">-- เลือกตำบล --</option>')
    var jxr = $.post(conf.api + 'core/district?stage=get', param , function(){}, 'json')
              .always(function(snap){
                  if(fnc.json_exist(snap)){
                      $('#txtDistrict').html('<option value="" class="text-center">-- เลือกอำเภอ --</option>')
                      snap.forEach(i=>{
                          $('#txtDistrict').append('<option value="' + i.Ampur + '">' + i.Name + '</option>')
                      })
                  }
              })
  },
  get_subdistrict(){
    var param = {
      prov: $('#txtProvince').val(),
      dist: $('#txtDistrict').val()
    }
    var jxr = $.post(conf.api + 'core/sub_district?stage=get', param , function(){}, 'json')
              .always(function(snap){
                console.log(snap);
                $('#txtSubdistrict').html('<option value="" class="text-center">-- เลือกตำบล --</option>')
                if(fnc.json_exist(snap)){
                    snap.forEach(i=>{
                        $('#txtSubdistrict').append('<option value="' + i.Tumbon + '">' + i.Name + '</option>')
                    })
                }
              })
  }
}

var fnc = {
    json_exist(snap){
        if((snap != '') && (snap.length > 0)){
            return true;
        }else{
            return false;
        }
    }
}

let app = {
    takephoto: function(){

      let opts = {
          quality: 60,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          mediaType: Camera.MediaType.PICTURE,
          encodingType: Camera.EncodingType.JPEG,
          cameraDirection: Camera.Direction.BACK,
          targetWidth: 400,
          targetHeight: 400,
          allowEdit: true
      };

      navigator.camera.getPicture(app.ftw, app.wtf, opts);
    },
    ftw: function(imgURI){
      var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imgURI.substr(imgURI.lastIndexOf('/')+1);
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;

            options.params = {
                uid: current_user
            }

      var ft = new FileTransfer();
      ft.upload(imgURI, encodeURI(conf.api + "upload_profile"), win, fail, options);
    },
    wtf: function(msg){
        swal("ขออภัย!", "ไม่สามารถใช้งานฟังก์ชันนี้ได้", "error")
    }
};

$(function(){
  $('#btnDocument').click(function(){
    // window.open('https://iw.in.th/documentation/iw_p2_documentation.pdf', target="_blank")
    if(conf.os == 'android'){
      navigator.app.loadUrl("https://iw.in.th/documentation/iw_p2_documentation.pdf", {openExternal : true});
    }

  })
})

function win(r) {
    // iw.get_form_status(2, current_cid)
    // iw.getPhoto(current_cid)
    // alert(JSON.stringify(r))
    authen.user()
    // swal("สำเร็จ", "ภาพถ่ายได้ถูกบันทึกแล้ว", "success")
}

function fail(error) {
    // alert("An error has occurred: Code = " + error.code);
    // alert(JSON.stringify(error))
    // alert("upload error source " + error.source);
    // alert("upload error target " + error.target);
    swal("ขออภัย!", "ไม่สามารถบันทึกภาพได้", "error")
}

function active_footer(ft){
  console.log(ft);
  $('.btnFootermenu').removeClass('text-primary')
  $('.btnFootermenu').addClass('text-dark')
  $('#btnFooter-' + ft).removeClass('text-dark')
  $('#btnFooter-' + ft).addClass('text-primary')
}

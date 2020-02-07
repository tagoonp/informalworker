// var conf = {
//     domain: 'http://localhost/dsrrcweb/',
//     api: 'http://localhost/dsrrcweb/controller/',
//     prefix: 'dsrx2_',
//    current_version: '2.0.1',
//     // mail_user: 'rmismedpsu@gmail.com',
//     // mail_key: 'cm1pc21lZHBzdUBnbWFpbC5jb20yMDE5LTEwLTIyIDIxOjU4OjU3MTI0LjEyMi40Mi4yNDU=',
// }

var conf = {
    // domain: 'http://localhost/iw_web/',
    // api : 'http://localhost/iw_web/controller/',
    domain: 'https://fxplor.com/iw_web/',
    api : 'https://fxplor.com/iw_web/controller/',
    prefix: 'if2w_',
    current_version: '1.0.8',
    os: 'android'
}

var current_user = window.localStorage.getItem(conf.prefix + 'uid')
var current_role = window.localStorage.getItem(conf.prefix + 'role')
var current_province = window.localStorage.getItem(conf.prefix + 'province')
var current_cid = window.localStorage.getItem(conf.prefix + 'cid')

// checkVersion
// var versionJxr = $.post(conf.api + 'checkversion', function(){})
//                   .always(function(resp){
//                     if(resp != conf.current_version){
//                       $('#modalVersion').modal()
//                     }
//                   })

function gotoUpdate(){
  window.location.replace('market://details?id=io.wisnior.dsrrconnect');
}

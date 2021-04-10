
import $$ from 'dom7';
import $ from 'jquery';

import Framework7 from 'framework7/framework7.esm.bundle.js';

import 'framework7/css/framework7.bundle.css';

import '../css/icons.css';
import '../css/app.css';
import '../css/codestyle.css';

import '../fontawesome/css/all.css';

import routes from './routes.js';

import cordovaApp from './cordova-app.js';

import App from '../app.f7.html';

var myApp = new Framework7({
  root: '#app', // App root element
  component: App, // App main component
  name: 'Сэйв.info', // App name
  theme: 'auto', // Automatic theme detection
  routes: routes,
  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  touch: {
    // Enable fast clicks
    fastClicks: true,
    tapHold: false
},
dialog: {

    buttonOk: 'Да',
    buttonCancel: 'Отмена',
    usernamePlaceholder: 'Пин-код',
    passwordPlaceholder: 'Пин-код'

},
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },  
});

var db = null;
var pushid = '';
var lockTime = null;
var enterCode = '0';
var objnumber = 'al';
var datedOne = false;
var datedTwo = false;
var datedThree = false;
var msgs = 0;
var lengthCode = 0;
var sold = 0;
var clicked = 0;

var enternet, messageBox, avatar, login, pinCode, userData, dblogin, logged, notesBox, noteText, myMessagebar, mySearchbar, opts, numberHolder;
var datetwo, dateone, smartSelect, dateonee, datetwoo, clickedNumber, mainView, view, frd, srd, dblogin, pin, isChecked, toggler, currentPos, dynamicPopover;

var notificationOpenedCallback = function() {
    switch(lockTime){
        case undefined:
            userCheck();
        break;
        case true:
            userCheck();
        break;
        case false: 
            checkMessagesOne();
        break;
        default:
            userCheck();
        break;
    }
};

var notificationReceivedCallback = function() {
    checkMessagesOne();
};

$$(document).on('page:beforein', function () {

    mainView = myApp.views.main;

        if(sold == 0){

            sold = 1;

            db = window.sqlitePlugin.openDatabase({name: 'savedb2.db', location: 'default'});
            
            window.plugins.OneSignal
            .startInit("be981bb2-5fe4-448d-abfb-75e3499cc06b", "90230104830")
            .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
            .handleNotificationOpened(notificationOpenedCallback, notificationReceivedCallback)
            .endInit();

            window.plugins.OneSignal.getIds(function(ids){
                pushid = ids.userId; 
                return pushid;
            });

            db.executeSql('SELECT count(*) AS tablecount FROM sqlite_master WHERE type = ? AND name = ?', ['table', 'setTable'], function(result) {
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                }

                if(row.tablecount != 0){

                    db.executeSql('SELECT * FROM setTable', [], function(result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var rowe = result.rows.item(i);
                        }

                        if(rowe.value == 1){
                            document.addEventListener("pause", onPause, false);
                            document.addEventListener("resume", onResume, false);
                        }else{
                            document.addEventListener("resume", onResumeOne, false);                    
                        }

                    });

                }else{
                    document.addEventListener("resume", onResumeOne, false);  
                }
            });

            document.addEventListener("backbutton", onBackKeyDown, false);
    
        login = '';

        smartSelect = myApp.smartSelect.get('.smart-select');

        messageBox = myApp.messages.create({
            el: '.messages',
            newMessagesFirst: true
        });

        var myCalendarOne = myApp.calendar.create({
            inputEl: '#dateone',
            openIn: 'popover',
            dateFormat: 'yyyy-mm-dd',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август' , 'Сентябрь' , 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

            on: {
                dayClick: function(p, dayContainer, year, month, day){
                    frd = 1;
                    if(parseInt(day) < 10){
                        day = '0'+day;
                    }
                    month = parseInt(month)+1;
                    if(parseInt(month) < 10){
                        month = '0'+month;
                    }
                    $$('input#dateone').val(year+'-'+month+'-'+day);

                    dateonee = year+''+month+''+day;

                    myApp.calendar.close();
                    if(srd ==  1){
                        showDated();
                    }                    
                }
            }

        });   

        var myCalendarTwo = myApp.calendar.create({
            inputEl: '#datetwo',
            openIn: 'popover',
            dateFormat: 'yyyy-mm-dd',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август' , 'Сентябрь' , 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            on: {
                dayClick: function(p, dayContainer, year, month, day){
                    srd = 1;
                    if(parseInt(day) < 10){
                        day = '0'+day;
                    }
                    month = parseInt(month)+1;
                    if(parseInt(month) < 10){
                        month = '0'+month;
                    }
                    $$('input#datetwo').val(year+'-'+month+'-'+day);
                    datetwoo = year+''+month+''+day;
                    myApp.calendar.close();
                    if(frd == 1){
                        showDated();
                    }                    
                }
            }

        }); 


            gpsEnternetCheck();
            userCheck();

        }


});




$$(document).on('page:init', '.page[data-name="home"]', function(page){

    $$('.tab-link').click(function(){

        if($$('html').hasClass('md') == true){
            currentPos = $$(this).attr('href');
            switch(currentPos){
                case '/':
                    $$('.tab-link-highlight').css('left', '0');
                break;
                case '/balance/':
                    $$('.tab-link-highlight').css('left', '33.3333%');
                break;
                case '/settings/':
                    $$('.tab-link-highlight').css('left', '66.6666%');
                break;
            }        
        }else{
            // ok
        }

    });

    $$('#btnmore').click(function(){

        objnumber = $$('select[name="objectselect"]').val();

        switch(true){
            case datedOne: 
                
                db.executeSql('SELECT date, message FROM saveMessagesTable WHERE substr(date,1,4)||substr(date,6,2)||substr(date,9,2) BETWEEN ? AND ? ORDER BY id DESC LIMIT ?, ?', [dateonee, datetwoo, msgs, 50], function(result) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                    messageBox.addMessage({
                            text: row.message,
                            type: 'received',
                            cssClass: 'superblue',
                            textHeader: row.date
                    }, 'append');
                    }
                    if(parseInt(result.rows.length) < 50){
                        $$('#btnmore').hide();
                    }
                });

                break;

            case datedTwo:

                db.executeSql('SELECT date, message FROM saveMessagesTable WHERE objnum = ? AND substr(date,1,4)||substr(date,6,2)||substr(date,9,2) BETWEEN ? AND ? ORDER BY id DESC LIMIT ?, ?', [objnumber, dateonee, datetwoo, msgs, 10], function(result) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                    messageBox.addMessage({
                            text: row.message,
                            type: 'received',
                            cssClass: 'superblue',
                            textHeader: row.date
                    }, 'append');
                    }
                    if(parseInt(result.rows.length) < 50){
                        $$('#btnmore').hide();
                    }
                });


                break;

            case datedThree:

                db.executeSql('SELECT date, message FROM saveMessagesTable WHERE substr(date,1,4)||substr(date,6,2)||substr(date,9,2) = ? ORDER BY id DESC LIMIT ?, ?', [dateonee, msgs, 50], function(result) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        messageBox.addMessage({
                                text: row.message,
                                type: 'received',
                                cssClass: 'superblue',
                                textHeader: row.date
                        }, 'append');
                    }
                    if(parseInt(result.rows.length) < 50){
                        $$('#btnmore').hide();
                    }
                });

                break;

            default:

                if(objnumber == 'all'){

                    db.executeSql('SELECT * FROM saveMessagesTable ORDER BY id DESC LIMIT ?, ?', [msgs, 50], function(result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                        messageBox.addMessage({
                                text: row.message,
                                type: 'received',
                                cssClass: 'superblue',
                                textHeader: row.date
                        }, 'append');
                        }
                    if(parseInt(result.rows.length) < 50){
                        $$('#btnmore').hide();
                    }
                    }); 


                }else{

                    db.executeSql('SELECT * FROM saveMessagesTable WHERE objnum = ? ORDER BY id DESC LIMIT ?, ?', [objnumber, msgs, 50], function(result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                        messageBox.addMessage({
                                text: row.message,
                                type: 'received',
                                cssClass: 'superblue',
                                textHeader: row.date
                        }, 'append');
                        }
                    if(parseInt(result.rows.length) < 50){
                        $$('#btnmore').hide();
                    }
                    });  


                }

                break;
        }

            msgs += 50;

    });

    $$('.sendik').click(function(){
        dateone = $$('#dateone').val();
        datetwo = $$('#datetwo').val();
        objnumber = $$('select#objectsel').val();
        if(dateone != "" && datetwo != ""){
           if(objnumber !== 'all'){
                myApp.dialog.prompt('Введите email на который отправить отчет', function(value){
                    myApp.request({
                        type: "GET",
                        url: "https://baykminer.ru/sos/senddoc1.php",
                        headers: {
                            'header1': 'textos'
                        },
                        data: { 
                            'objnumber': objnumber, 
                            'dateone': dateone+' 00:00:00', 
                            'datetwo': datetwo+' 23:59:59', 
                            'value': value
                        },
                        crossDomain: true,
                        cache: false,
                        error: function(response){
                            myApp.dialog.alert('Нет подключения к интернету.', 'Сэйв: кнопка SOS');
                            
                        },
                        success: function(response){
                            myApp.dialog.alert('Отчет будет отправлен на указанную почту в течение 5-ти минут!');
                        }
                    });
                }, function(value){

                });
           }else {
                myApp.dialog.alert('выберите объект');
                
           }
        }else{

            myApp.dialog.alert('Заполните поля даты от и даты до.');
        }

    });



    $$('select[name="objectselect"]').on('change', function () {

        messageBox.clear();

        objnumber = $$(this).val();

        $$('input#dateone').val('');
        $$('input#datetwo').val('');

        datedOne = false;
        datedTwo = false; 
        datedThree = false;
        msgs = 0;

        if(objnumber == 'all'){
            showMessages();
        }else{

            msgs = 50;
            $$('#btnmore').show();

            db.executeSql('SELECT * FROM saveMessagesTable WHERE objnum = ? ORDER BY id DESC LIMIT 50', [objnumber], function(result) {
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                messageBox.addMessage({
                        text: row.message,
                        type: 'received',
                        cssClass: 'superblue',
                        textHeader: row.date
                }, 'append');
                }
                if(parseInt(result.rows.length) < 50){
                    $$('#btnmore').hide();
                }
            });

        }            

    });

});

$$(document).on('page:init', '.page[data-name="settings"]', function(page){

        $$('a.rightblock').click( function(){
            myApp.dialog.confirm('Вы действительно хотите принудительно обновить все сообщения?', function () {
                db.executeSql('DROP TABLE saveMessagesTable');
                messageBox.clear();
                $$('select[name="objectselect"]').html('');
                checkMessagesOne();
            }); 
        });

        $$('#userremove').click( function () {
            myApp.dialog.confirm('Вы действительно хотите удалить регистрационные данные?', function () {
                db.executeSql('DROP TABLE saveMessagesTable');
                db.executeSql('DROP TABLE notessTable');
                db.executeSql('DROP TABLE sosTable');
                db.executeSql('DROP TABLE IF EXISTS setTable');
                myApp.request({
                    type: "GET",
                    url: "https://baykminer.ru/sos/userremove.php",
                    headers: {
                        'header1': 'textos'
                    },
                    data: { 
                        'remove': 1,
                        'uid': pushid
                        },
                    crossDomain: true,
                    cache: false,
                    error: function(response){
                        myApp.dialog.alert('Нет подключения к интернету.');
                    },
                    success: function(response){
                        if(response == 1){
                            myApp.dialog.confirm('Регистрация успешно удалена! Перезапустите приложение, чтобы изменения вступили в силу.', function(){

                                if(device.platform == 'iOS'){
                                    cordova.plugins.exit();
                                    navigator.app.exitApp();
                                }else{
                                    window.cordova.plugins.exit();
                                }

                            });
                        } else {
                            myApp.dialog.alert('Ошибка');
                        }
                    }
                });
            }); 
        });

    $$('#pincodechange').click(function(){

        myApp.dialog.password('Введите свой настоящий пин-код.', function (password) {

            db.executeSql('SELECT * FROM sosTable', [], function(res) {

                for (var i = 0; i < res.rows.length; i++) {
                    var rowa = res.rows.item(i);
                }

                pin = rowa.password;

                    if(pin == password){

                        myApp.dialog.changePin('Теперь введите новый пин-код и подтвердите его.', function (pin1, pin2) {

                            if(pin1 == pin2){

                                myApp.request({
                                    type: "POST",
                                    url: "https://baykminer.ru/sos/changePincode.php",
                                    headers: {
                                        'header1': 'textos'
                                    },
                                    data: { 
                                        'newPin': pin2,
                                        'oldPin': pin,
                                        'uid': pushid
                                        },
                                    crossDomain: true,
                                    cache: false,
                                    error: function(response){
                                        myApp.dialog.alert('Нет подключения к интернету.');
                                    },
                                    success: function(response){

                                        if(response == 'ok'){
                                            
                                            recdB(pin2);

                                        } else {

                                            myApp.dialog.alert('Ошибка. Попробуйте позже.');
                                        }
                                    }
                                });

                           }else{
                                myApp.dialog.alert('Ошибка. Введены разные значения.');
                           }
                            
                        });

                    }else{
                        myApp.dialog.alert('Ошибка. Введен неверный пин-код.');
                    }

            });

        });
    });

    dynamicPopover = myApp.popover.create({
      targetEl: 'img.dynamic-popover',
      content: '<div class="popover">'+
                  '<div class="popover-inner">'+
                    '<div class="block">'+
                      '<p>Разработано в Pushmobile -</p>'+
                      '<p>лаборатории лучших it-решений.</p>'+
                      '<p><a href="#" class="link popover-close">Закрыть</a></p>'+
                    '</div>'+
                  '</div>'+
                '</div>',
      // Events
      on: {
        open: function (popover) {
          console.log('Popover open');
        },
        opened: function (popover) {
          console.log('Popover opened');
        },
      }
    });

    $$('.dynamic-popover').click(function(){

        clicked += 1;

        if(clicked === 10){

            dynamicPopover.open();
            clicked=0;

        }else{
            console.log('ok');
        }

    });



    toggler = myApp.toggle.create({
      el: '.toggle',
      on: {
        change: function(){

            myApp.dialog.alert('1');
            
            if(toggler.checked == true){

                myApp.dialog.alert('2.2');

                isChecked = 1;
                document.removeEventListener("resume", onResumeOne, false); 
                document.addEventListener("pause", onPause, false);
                document.addEventListener("resume", onResume, false);

                myApp.dialog.alert('3.2');

            } else {

                myApp.dialog.alert('2.1');

                isChecked = 0;
                document.removeEventListener("pause", onPause, false);
                document.removeEventListener("resume", onResume, false);
                document.addEventListener("resume", onResumeOne, false); 

                myApp.dialog.alert('3.1');
            }

            recordSettings(isChecked);

        }
      }
    }); 

        db.executeSql('SELECT * FROM setTable', [], function(result) {
            for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
            }

            isChecked = row.value;

            showSettings(toggler);
        });

});
 
$$(document).on('page:init', '.page[data-name="balance"]', function(page){

  $$('#refillBalance').click(function(){
    // обновление баланса
  });

    myApp.request({
      type: "GET",
      url: "https://baykminer.ru/sos/balance2.php?uid="+pushid,
      crossDomain: true,
      cache: false,
      success: function(response){
        response = JSON.parse(response);
          $$('span#balance1').html(response.balance);

            db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS dogovorTable(dognum)');
                tx.executeSql('INSERT INTO dogovorTable(dognum) VALUES(?)', [response.dogovor]);
                }, function(error) {
                console.log('Transaction ERROR: ' + error.message);
                }, function() {
                console.log('пользователь в базе данных!');
            });

      },
      error: function(){
          myApp.dialog.alert('ошибка сети.');
      }
    });

});


$$(document).on('page:reinit', '.page[data-name="balance"]', function(page){

    myApp.request({
      type: "GET",
      url: "https://baykminer.ru/sos/balance2.php?uid="+pushid,
      crossDomain: true,
      cache: false,
      success: function(response){
        response = JSON.parse(response);
          $$('span#balance1').html(response.balance);

            db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS dogovorTable(dognum)');
                tx.executeSql('INSERT INTO dogovorTable(dognum) VALUES(?)', [response.dogovor]);
                }, function(error) {
                console.log('Transaction ERROR: ' + error.message);
                }, function() {
                console.log('пользователь в базе данных!');
            });

      },
      error: function(){
          myApp.dialog.alert('ошибка сети.');
      }
    });

});

$$(document).on('page:mounted', '.page[data-name="signup"]', function(page){
    
    $$('#fstep').click( function () {
        myApp.preloader.show();
        login = $$('input[name="code"]').val();
        if(login.length >= 10){   
            if(login !== ''){
                myApp.preloader.hide();
                pinCode = '';
                mainView.router.navigate('/code/');
            }else{
                myApp.preloader.hide();
                myApp.dialog.alert('Введите номер телефона');
            }
        }else{
            myApp.preloader.hide();
            myApp.dialog.alert('Введите корректный номер телефона');
        }    
    });
});

$$(document).on('page:afterin', '.page[data-name="signup"]', function(page){
    $$('input#phonen').focus();
});


$$(document).on('page:afterin', '.page[data-page="code"]', function(page){

    if(pinCode != ''){
        intro();
    }else{
        newpin(login);
    }

});


$$(document).on('page:mounted', '.page[data-page="code"]', function(page){

        $$('#usercoderemove').click( function () {
            myApp.dialog.confirm('Сброс пин-кода повлечет за собой полный сброс данных приложения. Вы уверены?', function () {
                db.executeSql('DROP TABLE saveMessagesTable');
                db.executeSql('DROP TABLE notessTable');
                db.executeSql('DROP TABLE sosTable');
                db.executeSql('DROP TABLE setTable');
                myApp.request({
                    type: "GET",
                    url: "https://baykminer.ru/sos/userremove.php",
                    headers: {
                        'header1': 'textos'
                    },
                    data: { 
                        'remove': 1,
                        'uid': pushid
                        },
                    crossDomain: true,
                    cache: false,
                    error: function(response){
                        myApp.dialog.alert('Нет подключения к интернету.');
                    },
                    success: function(response){
                        if(response == 1){
                            myApp.dialog.confirm('Перезапустите приложение, чтобы изменения вступили в силу.', function(){

                            if(device.platform == 'iOS'){
                                cordova.plugins.exit();
                                navigator.app.exitApp();
                            }else{
                                window.cordova.plugins.exit();
                            }

                            });
                        } else {
                            myApp.dialog.alert('Ошибка');
                        }
                    }
                });
            }); 
        });

});


function recdB(pin2){

    db.executeSql('SELECT * FROM sosTable', [], function(resp){

        for (var i = 0; i < resp.rows.length; i++) {
            var row = resp.rows.item(i);
        }  

        db.executeSql('UPDATE sosTable SET password = ? WHERE login = ?', [pin2, row.login], function(result) {    
            myApp.dialog.alert('Пин-код успешно изменен!');
        });

    });

}

// коллбеки
function onBackKeyDown(){

    myApp.dialog.confirm('Вы действительно хотите выйти из приложения?', function () {
        if(device.platform == 'iOS'){
            cordova.plugins.exit();
            navigator.app.exitApp();
        }else{
            window.cordova.plugins.exit();
        }
        
    }); 

}

function onPause(){
    setTimeout(function() {
        lockTime = true;
    }, 120000);
}

function onResume() {
    setTimeout(function() {
        if(lockTime == true){
            userCheck();
        }
        lockTime=false;
    }, 500);
}

function onResumeOne() {
    userCheck();
}

function recordSettings (isChecked) {

    myApp.dialog.alert('4');

    db.executeSql('CREATE TABLE IF NOT EXISTS setTable(setting, value)');
    db.executeSql('UPDATE setTable SET value = ? WHERE setting = ?', [isChecked, 'pin'], function(result) {    
        myApp.dialog.alert('4');
    // ok
    });
}


function showSettings(toggler) {

    db.executeSql('SELECT * FROM setTable', [], function(result) {

        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
        }

        if(toggler.checked == true){
            if(row.value != 1){
                toggler.toggle();
            }
        }else{
            if(row.value == 1){
                toggler.toggle();
            }
        }

    });

}

function recordUser(userData){
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS sosTable');
        tx.executeSql('CREATE TABLE IF NOT EXISTS sosTable(password, login)');
        console.log('таблица открыта!');
        tx.executeSql('INSERT INTO sosTable(password, login) VALUES(?, ?)', [userData[0], userData[1]]);
        }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
        }, function() {
        console.log('пользователь в базе данных!');

    });
}

// проверка пользователя
function userCheck() {



    db.executeSql('SELECT count(*) AS tablecount FROM sqlite_master WHERE type = ? AND name = ?', ['table', 'sosTable'], function(result) {
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
        }

        if(row.tablecount == 1){


            db.executeSql('SELECT count(*) AS tablecount FROM sqlite_master WHERE type = ? AND name = ?', ['table', 'setTable'], function(result) {
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                }

                if(row.tablecount == 0){
                    db.executeSql('CREATE TABLE IF NOT EXISTS setTable(setting, value)');
                    db.executeSql('INSERT INTO setTable(setting, value) VALUES(?, ?)', ['pin', 1], function(result){
                        console.log('ok');
                    });

                }
            });

            db.executeSql('SELECT * FROM sosTable', [], function(result) {
                if (result != null && result.rows != null) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                    }
                        if(row.login != null) {  

                            pinCode = row.password;
                            mainView.router.navigate('/code/');

                        } else { 
                            mainView.router.navigate('/signup/');
                        }
                }else{
                    mainView.router.navigate('/signup/');
                }
            });

        } else {
            mainView.router.navigate('/signup/');
        }

    });

}


function downloadingMessages(lastdate){

    myApp.preloader.show();

    myApp.request({
        type: "GET",
        url: "https://baykminer.ru/sos/pushes.php",
        data: { 
            uid: pushid, 
            lastdate: lastdate
        },
        crossDomain: true,
        cache: false,
        success: function(response){

            response = JSON.parse(response);

            if(response.status != 'empty'){

                 if(response[response.length-1].date == lastdate){ 


                    $$('select[name="objectselect"]').html('');
                    db.executeSql('SELECT DISTINCT objnum FROM saveMessagesTable', [], function(result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            $$('select[name="objectselect"]').prepend('<option value="'+row.objnum+'">'+row.objnum+'</option>');
                        }
                    });
                    $$('select[name="objectselect"]').prepend('<option value="all">Показать все</option>');
                    showMessages();  

                    }else{

                    db.executeSql('DELETE FROM saveMessagesTable WHERE date = ?', [lastdate], function() {
                        console.log('последнее сообщение удалено.');
                    });

                    $.each(response, function(i, field){
                        db.executeSql('INSERT INTO saveMessagesTable(title, message, date, readed, objnum) VALUES(?, ?, ?, ?, ?)', [1, field.message, field.date, 0, field.obj_num], function(result){
                            console.log('ok');
                        });
                    }); 
                    $$('select[name="objectselect"]').html('');
                    db.executeSql('SELECT DISTINCT objnum FROM saveMessagesTable', [], function(result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            $$('select[name="objectselect"]').prepend('<option value="'+row.objnum+'">'+row.objnum+'</option>');
                        }
                    });
                    $$('select[name="objectselect"]').prepend('<option value="all">Показать все</option>');

                    showMessages();  
                }                
            }else{
                myApp.preloader.hide();

                // $$('#btnmore').hide();
                $$('.second').on('click', function(){
                    myApp.dialog.alert('На данный момент у Вас нет сообщений, выбор сообщений не возможен. Попробуйте позже.');  
                });
                $$('.third').on('click', function(){
                    myApp.dialog.alert('На данный момент у Вас нет сообщений, выбор сообщений не возможен. Попробуйте позже.',);  
                });
            }

        }
    });  
}

function downloadingAllMessages(){

    myApp.preloader.show();
    myApp.request({
        type: "GET",
        url: "https://baykminer.ru/sos/pushes.php",
        data: { 
            uid: pushid
        },
        crossDomain: true,
        cache: false,
        success: function(response){
            response = JSON.parse(response);
            if(response.status != 'empty'){ 
                db.executeSql('CREATE TABLE IF NOT EXISTS saveMessagesTable(id INTEGER PRIMARY KEY, title, message, date, readed, objnum)');
                $.each(response, function(i, field){
                    db.executeSql('INSERT INTO saveMessagesTable(title, message, date, readed, objnum) VALUES(?, ?, ?, ?, ?)', [1, field.message, field.date, 0, field.obj_num], function(){
                        console.log('ok');
                    });
                }); 
                $$('select[name="objectselect"]').html('');
                db.executeSql('SELECT DISTINCT objnum FROM saveMessagesTable', [], function(result) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        $$('select[name="objectselect"]').prepend('<option value="'+row.objnum+'">'+row.objnum+'</option>');
                    }
                });
                $$('select[name="objectselect"]').prepend('<option value="all">Показать все</option>');
                showMessages(messageBox);  
            }else { 
                myApp.preloader.hide();
                $$('.second').on('click', function(){
                    myApp.dialog.alert('На данный момент у Вас нет сообщений, выбор сообщений не возможен. Попробуйте позже.');  
                });
                $$('.third').on('click', function(){
                    myApp.dialog.alert('На данный момент у Вас нет сообщений, выбор сообщений не возможен. Попробуйте позже.');  
                });
            }
        }
    });  
}

function checkMessagesOne(){
    $$('input#pinpass').blur();
    $$('input#phonen').blur();
    myApp.preloader.show();

    db.executeSql('SELECT count(*) AS tablecount FROM sqlite_master WHERE type = ? AND name = ?', ['table', 'saveMessagesTable'], function(result) {
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
        }

        if(row.tablecount > 0){

            if(enternet == 1){

                db.executeSql('SELECT count(*) AS tablecounta FROM saveMessagesTable', [], function(resulte) {
                    for (var i = 0; i < resulte.rows.length; i++) {
                        var rowe = resulte.rows.item(i);
                    }

                    if(rowe.tablecounta !== 0){

                        db.executeSql('SELECT * FROM saveMessagesTable ORDER BY id DESC LIMIT 1', [], function(resulta) {
                            for (var i = 0; i < resulta.rows.length; i++) {
                                var rowa = resulta.rows.item(i);
                            }

                            downloadingMessages(rowa.date);
                        });
                    }else{
                        downloadingAllMessages();
                    }

                });
            } else {
            	app.preloader.hide();
                myApp.dialog.alert('Обновление сообщений без подключения к интернету невозможно.'); 
            }
            myApp.preloader.hide();
        }else{
            db.executeSql('CREATE TABLE IF NOT EXISTS saveMessagesTable(id INTEGER PRIMARY KEY, title, message, date, readed, objnum)');
            if(enternet == 1){
                downloadingAllMessages();
            }else{
                myApp.dialog.alert('Обновление сообщений без подключения к интернету невозможно.'); 
            } 
        }
    });
}


function showMessages() {
    myApp.preloader.show();

    lockTime = false;

    messageBox.clear();

    $$('#btnmore').show();
    $$('p.ifmiss').hide();


    db.executeSql('SELECT * FROM saveMessagesTable ORDER BY id DESC LIMIT 50', [], function(result) {
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);

	        	messageBox.addMessage({
				        text: row.message,
				        type: 'received',
                        cssClass: 'superblue',
                        textHeader: row.date
				}, 'append');

        }
        db.executeSql('UPDATE saveMessagesTable SET readed = ? WHERE readed = ?', [1, 0], function(result) {    
           console.log('успешно!');
        });
        if(parseInt(result.rows.length) < 50){
            $$('#btnmore').hide();
        }else if(parseInt(result.rows.length) < 1){
            $$('p.ifmiss').show();
        }

    }); 

    msgs = 50;

    myApp.preloader.hide();

}


function showDated(){

    objnumber = $$('select[name="objectselect"]').val();
    messageBox.clear();
    $$('p.ifmiss').hide();
    myApp.preloader.hide();

    if(parseInt(datetwoo) > parseInt(dateonee)){

        if(objnumber == 'all'){

            db.executeSql('SELECT date, message FROM saveMessagesTable WHERE substr(date,1,4)||substr(date,6,2)||substr(date,9,2) BETWEEN ? AND ? ORDER BY id DESC LIMIT 50', [dateonee, datetwoo], function(result) {
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    messageBox.addMessage({
                            text: row.message,
                            type: 'received',
                            cssClass: 'superblue',
                            textHeader: row.date
                    }, 'append');
                }
                if(parseInt(result.rows.length) < 1){
                    $$('p.ifmiss').show();
                    $$('#btnmore').hide();
                }else if(parseInt(result.rows.length) < 50){
                    $$('#btnmore').hide();
                }
            });

           datedOne = true;

        }else{

            db.executeSql('SELECT date, message FROM saveMessagesTable WHERE objnum = ? AND substr(date,1,4)||substr(date,6,2)||substr(date,9,2) BETWEEN ? AND ? ORDER BY id DESC LIMIT 50', [objnumber, dateonee, datetwoo], function(result) {
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                messageBox.addMessage({
                        text: row.message,
                        type: 'received',
                        cssClass: 'superblue',
                        textHeader: row.date
                }, 'append');
                }
                if(parseInt(result.rows.length) < 1){
                    $$('p.ifmiss').show();
                    $$('#btnmore').hide();
                }else if(parseInt(result.rows.length) < 50){
                    $$('#btnmore').hide();
                }
            });

           datedTwo = true;
        }

    }else if(parseInt(datetwoo) == parseInt(dateonee)){

        db.executeSql('SELECT date, message FROM saveMessagesTable WHERE substr(date,1,4)||substr(date,6,2)||substr(date,9,2) = ? ORDER BY id DESC LIMIT 50', [dateonee], function(result) {
            for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
                messageBox.addMessage({
                        text: row.message,
                        type: 'received',
                        cssClass: 'superblue',
                        textHeader: row.date
                }, 'append');
            }
                if(parseInt(result.rows.length) < 1){
                    $$('p.ifmiss').show();
                    $$('#btnmore').hide();
                }else if(parseInt(result.rows.length) < 50){
                    $$('#btnmore').hide();
                }
        });

        datedThree = true;

    }else{
        myApp.dialog.alert('Выполнить действие не возможно - дата (от) выбрана неправильно');
        $$('p.ifmiss').show();
    }
    msgs = 50;
    myApp.preloader.hide();
    lockTime = false;
}


function gpsEnternetCheck() {
    var networkState = navigator.connection.type;
    if(networkState !== Connection.NONE) {
        enternet = 1;
    } else {
        myApp.dialog.alert('Пожалуйста, включите передачу данных.');
    }
}


function routings(response){
    response = JSON.parse(response);
    switch(response.result){
        case "ok":
            mainView.router.navigate('/');
            checkMessagesOne();
        break;
        case "error":
            myApp.dialog.alert('Ошибка входа');
            mainView.router.navigate('/signup/');
        break;
        case "edit":
            db.executeSql('SELECT * FROM sosTable', [], function(result) {
                if (result != null && result.rows != null) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                    }
                    db.executeSql('UPDATE sosTable SET login = ? WHERE login = ?', [response.newphone, row.login], function(result) {    
                        myApp.dialog.alert('Ваш номер телефона был изменен на правильный модератором, перезапустите приложение.'); 
                    });
                }else{
                    myApp.dialog.alert('Ошибка, перезапустите приложение.'); 
                }
            });

        break;
        default:
            myApp.dialog.alert('Ошибка, перезапустите приложение.'); 
            mainView.router.navigate('/signup/');
        break;
    }
}

function registration(){
    myApp.request({
        type: "GET",
        url: "https://baykminer.ru/sos/register.php",
        headers: {
            'header1': 'textos'
        },
        data: { 
            'login': login,
            'password': pin,
            'pushid': pushid
            },
        crossDomain: true,
        cache: false,
        error: function(response){
            myApp.dialog.alert('Нет подключения к интернету.');
        },
        success: function(response){
            myApp.preloader.show();
            userData = [pin, login];
            recordUser(userData);
            myApp.request({
                type: "GET",
                url: "https://baykminer.ru/sos/login2.php",
                headers: {
                    'header1': 'textos'
                },
                data: { 
                    'login': login,
                    'password': pin
                    },
                crossDomain: true,
                cache: false,
                error: function(response){
                    myApp.dialog.alert('Нет подключения к интернету.');
                },
                success: function(response){

                    routings(response);
                }
            });
            myApp.preloader.hide();
        }
    });
}

function newpin(login){
    $$('p.texter').html('Введите новый пин-код');

    $$('input#pinpass').focus();

    $$('input#pinpass').keyup(function() {

        lengthCode += 1;

        if (lengthCode == 4) {
            pin = $$('input#pinpass').val();
            $$('input#pinpass').val('');
            lengthCode = 0;
            proof(pin, login);
        }
    });
    
}

function proof(pin, login){
    $$('.texter').html('Подтвердите пин-код');
    $$('input#pinpass').off('keyup');
    $$('input#pinpass').keyup(function() {

        lengthCode += 1;

        if(lengthCode == 4){
            enterCode = $$('input#pinpass').val();
            if(enterCode == pin){
                $$('input#pinpass').val('');
                registration(login, pin);
                lengthCode = 0;
                enterCode = '';
            } else {
                lengthCode = 0;
                enterCode = '';
                $$('input#pinpass').val('');
                $$("#pinpass").addClass("miss");
                  setTimeout(function() {
                    $$("#pinpass").removeClass("miss");
                  }, 500);
                $$('.texter').html('попробуйте еще раз!');
            }

        }
    });
}

function intro(){
 
    lengthCode = 0;

    $$('p.texter').html('Введите Ваш пин-код');

        db.executeSql('SELECT * FROM sosTable', [], function(result) {
            for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
            }
            dblogin = row.login;
            pin = row.password;
        });

    $$('input#pinpass').focus();


    $$('input#pinpass').keyup(function() {

        lengthCode += 1;
        
      if (lengthCode == 4){

        enterCode = $$('input#pinpass').val();
        // ключ
        if (enterCode == pin) {
        lengthCode = 0;
          // верный пин-код
          $$(".numberfield").addClass("right");
          $$("#numbers").addClass("hide");
            myApp.request({
                type: "GET",
                url: "https://baykminer.ru/sos/login2.php",
                headers: {
                    'header1': 'textos'
                },
                data: { 
                    'login': dblogin,
                    'password': pin
                    },
                crossDomain: true,
                cache: false,
                error: function(response){
                    myApp.dialog.alert('Нет подключения к интернету.');
                    mainView.router.navigate('/signin/');
                },
                success: function(response){



                    routings(response);
                }
            });
        } else {
            lengthCode = 0;
          
          enterCode = "";
          $$('#pinpass').val('');
          $$("#pinpass").addClass("miss");
          setTimeout(function() {
            $$("#pinpass").removeClass("miss");
          }, 500);
        }
      } 
  });
 }

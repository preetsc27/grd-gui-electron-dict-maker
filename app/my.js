const ipc = require('electron').ipcRenderer
const async = require('async')
const map = require('async/map')
const fs = require('fs')

// progress bar
var progress_bar = document.getElementById('progress-bar')
var progress = document.getElementById('progress')

function progress_inc(pro){
    progress.innerHTML = pro
    progress_bar.style.width = (pro+"%")
}


const submit_btn = document.getElementById('grd_btn')
var final_list = []
var main_list = []

var birth_year_init = document.getElementById('birth_year');
var birth_year = null;

var special_chars = "!@#$%^&*()_+-=:/.,<>`~][;'";
var special_chars_array = special_chars.split("");

submit_btn.addEventListener('click', function (event) {

    var first_name = document.getElementById('first_name').value.trim();
    if (first_name !== null && first_name !== ''){
        main_list.push(first_name)
    }
    var last_name = document.getElementById('last_name').value.trim();
    if (last_name !== null && last_name !== ''){
        main_list.push(last_name)
        console.log("Main list length: " + main_list.length);
    }else{
        console.log("Last name is null.");
    }
    var birth_date = document.getElementById('birth_date').value.trim();
    if (birth_date !== null && birth_date !== ''){
        main_list.push(birth_date)
    }
    var birth_month = document.getElementById('birth_month').value.trim();
    if (birth_month !== null && birth_month !== ''){
        main_list.push(birth_month)
    }
    birth_year = birth_year_init.value.trim();
    if (birth_year !== null && birth_year !== ''){
        main_list.push(birth_year)
    }
    var pet_name = document.getElementById('pet_name').value.trim();
    if (pet_name !== null && pet_name !== ''){
        main_list.push(pet_name)
    }
    var fav_number = document.getElementById('fav_number').value.trim();
    if (fav_number !== null && fav_number !== ''){
        main_list.push(fav_number)
    }

    var hints_array = [];
    var hints = document.getElementById('hints').value.trim();
    if (hints !== null && hints !== ''){
        hints_array = hints.split(",");
    }

    if (hints_array.length === 0 && main_list.length === 0){
        ipc.send('open-dialog-for-info');
        return
    }

    // adding hints array to main Array
    main_list.concat(hints_array);

    // now populating the final_list
    // for (var i = 0; i < main_list.length; i++){
    //     str_combination(main_list[i]);
    // }


    ipc.send('save-dialog')
})

var count = 0;
ipc.on('saved-file', function (event, path) {
  if (!path) path = 'No path'
  run_code(count, path)
})

var final_list = []
function run_code(count, path){
    var names = main_list[count]
    console.log(count);
    if (names === null || names === '') {
     return;
    }

    //console.log(names);

    // why we are taking this list no idea ??? :p
    var name_list = names.split(" ")
    // converting name to special chars then adding them to list
    var special_chars_names_array = lttr_to_special_chr(names)
    for (var i = 0; i < special_chars_names_array.length; i++) {
     //main_list.push(special_chars_names_array[i])
     name_list.push(special_chars_names_array[i])
    }

    // adding names to name_form_change array like grd to GRD and Grd
    var name_form_change_list = [];
    for (var i = 0; i < name_list.length; i++) {
     var c = name_form_change(name_list[i]);
     name_form_change_list.push.apply(name_form_change_list, c)
    }

    var worker = new Worker('alog.js');
    worker.addEventListener('message', function(e) {
    // Log the workers message.
    if(isNaN(e.data)){
       var data = e.data
       var content = []
       for (var i = 0; i < data.length; i++){
           content.push(data[i]+"\n")
       }
       fs.appendFile(path, content, (err) => {
            if(err){
                console.log(err);
            }
            progress_inc(100)
        });
       if (count < (main_list.length - 1)){
           count++
           run_code(count, path)
       }
    }else{
       progress_inc(e.data)
    }
    }, false);
    worker.postMessage(name_form_change_list);
}

function lttr_to_special_chr(msg){
    const output = []
    var msg_ref = msg

    if (msg === null && msg ===""){
        return
    }
    // looping through the word
    for (var i = 0; i < msg.length; i++) {

        if (msg[i] == 'a'){
            msg_ref = msg_ref.replace('a', '@');
            output.push(msg_ref);
            output.push(msg.replace('a', '@'));
        }
        else if ( msg[i] === 'A'){
            msg_ref = msg_ref.replace('A', '@');
            output.push(msg_ref);
            output.push(msg.replace('A', '@'));
        }
        else if ( msg[i] === 's'){
            msg_ref = msg_ref.replace('s', '$');
            output.push(msg_ref);
            output.push(msg.replace('s', '$'));

            // if s is &
            msg_ref = msg_ref.replace('$', '&');
            output.push(msg_ref);
            output.push(msg.replace('$', '&'));
        }
        else if ( msg[i] === 'S'){
            msg_ref = msg_ref.replace('S', '$');
            output.push(msg_ref);
            output.push(msg.replace('S', '$'));

            // if s is &
            msg_ref = msg_ref.replace('$', '&');
            output.push(msg_ref);
            output.push(msg.replace('$', '&'));
        }
        else if ( msg[i] === 'i'){
            msg_ref = msg_ref.replace('i', '!')
            output.push(msg_ref)
            output.push(msg.replace('i', '!'))

            // if i is 1
            msg_ref = msg_ref.replace('!', '1')
            output.push(msg_ref)
            output.push(msg.replace('!', '1'))
        }
        else if ( msg[i] == 'I'){
            msg_ref = msg_ref.replace('I', '!')
            output.push(msg_ref)
            output.push(msg.replace('I', '!'))

            // if i is 1
            msg_ref = msg_ref.replace('!', '1')
            output.push(msg_ref)
            output.push(msg.replace('!', '1'))
        }
        else if ( msg[i] == 'e'){
            msg_ref = msg_ref.replace('e', '3')
            output.push(msg_ref)
            output.push(msg.replace('e', '3'))
        }
        else if ( msg[i] == 'E'){
            msg_ref = msg_ref.replace('E', '3')
            output.push(msg_ref)
            output.push(msg.replace('E', '3'))
        }
        else if ( msg[i] == 'o'){
            msg_ref = msg_ref.replace('o', '0')
            output.push(msg_ref)
            output.push(msg.replace('o', '0'))

            // if o is *
            msg_ref = msg_ref.replace('0', '*')
            output.push(msg_ref)
            output.push(msg.replace('0', '*'))
        }
        else if ( msg[i] == 'O'){
            msg_ref = msg_ref.replace('O', '0')
            output.push(msg_ref)
            output.push(msg.replace('O', '0'))

            // if o is *
            msg_ref = msg_ref.replace('0', '*')
            output.push(msg_ref)
            output.push(msg.replace('0', '*'))
        }
        else if ( msg[i] == 'p'){
            msg_ref = msg_ref.replace('p', '9')
            output.push(msg_ref)
            output.push(msg.replace('p', '9'))
        }
        else if (msg[i] == 'P'){
            msg_ref = msg_ref.replace('P', '9')
            output.push(msg_ref)
            output.push(msg.replace('P', '9'))
        }
    }
    return output
}

// # ######## STRING COMBINATION FUNCTION
function str_combination(names, callback) {
    if (names === null || names === '') {
        return;
    }

    //console.log(names);

    // why we are taking this list no idea ??? :p
    const name_list = names.split(" ")
    // converting name to special chars then adding them to list
    const special_chars_names_array = lttr_to_special_chr(names)
    for (var i = 0; i < special_chars_names_array.length; i++) {
        //main_list.push(special_chars_names_array[i])
        name_list.push(special_chars_names_array[i])
    }

    // adding names to name_form_change array like grd to GRD and Grd
    var name_form_change_list = [];
    for (var i = 0; i < name_list.length; i++) {
        var c = name_form_change(name_list[i]);
        name_form_change_list.push.apply(name_form_change_list, c)
    }
    // # special combination for name and year like grd97 if birth year is 1997
    if (birth_year !== null) {
        for (var i = 0; i < name_form_change_list.length; i++) {
            const comb = algo(name_form_change_list[i] , birth_year.substring(2))
            final_list.push.apply(final_list , comb)
        }
    }

    //# concating name with every other input
    for (var i = 0; i < main_list.length; i++){
        for (var j = 0; j < name_form_change_list.length; j++){
            var comb = algo(name_form_change_list[j] , main_list[i])
            final_list.push.apply(final_list , comb)
        }
    }

    //# for numbers like grd0123456789
    var new_str = ""
    for (var i = 0; i < 10; i++){
        new_str = new_str + i.toString()
        for (var j = 0; j < name_form_change_list.length; j++){
            var comb = algo(name_form_change_list[j] , i.toString())
            final_list.push.apply(final_list , comb)

            comb = algo(name_form_change_list[j] , new_str)
            final_list.push.apply(final_list , comb)
        }
    }

    // # for combinations like grd345, grd1234
    for (var i = 0; i < 11; i++){
        for (var j = 0; j < 11; j++){
            var y = ""
            for (var x = i; i < j; x++){
                y = x.toString()
                for (var k = 0; k < name_form_change_list.length; k++){
                    var comb = algo(name_form_change_list[k] , y.toString())
                    final_list.push.apply(final_list , comb)
                }
            }
        }
    }

    // # for combinations like grd9876, grd987654
    var new_str = ""
    for (var i = 9; i > 0; i--){
        new_str = i.toString()
        for (var j = 0; j < name_form_change_list.length; j++){
            var comb = algo(name_form_change_list[j] , i.toString())
            final_list.push.apply(final_list , comb)

            comb = algo(name_form_change_list[j] , new_str)
            final_list.push.apply(final_list , comb)
        }
    }

    // # for combinations like grd765, grd 876543
    for (var i = 9; i > -1; i--){
        for (var j = 9; j > 0; j--){
            var y = ""
            for (var x = i; i < j; x++){
                y = x.toString()
                for (var k = 0; k < name_form_change_list.length; k++){
                    var comb = algo(name_form_change_list[k] , y.toString())
                    final_list.push.apply(final_list , comb)
                }
            }
        }
    }

    // # combinations for name + number
    for (var i = 0; i < 50; i++){
        for (var j = 0; j < name_form_change_list.length; j++){
            var comb = algo(name_form_change_list[j] , i.toString())
            final_list.push.apply(final_list , comb)
        }
    }

    // combination of name + random numbers
    for(var x = 0; x < 25 ; x++){
        var i = Math.floor(Math.random() * 10000000000) + 1
        for (var j = 0; j < name_form_change_list.length; j++){
            var comb = algo(name_form_change_list[j] , i.toString())
            final_list.push.apply(final_list , comb)
        }
    }

    callback(null, final_list);
}


// algorithm for concating every single combination possible

function algo(name, addition) {
    var my_array = [];

    comb = name + addition
    my_array.push(comb)

    for (var i = 0; i < special_chars_array.length; i++){
        var comb = special_chars_array[i] + name + addition
        my_array.push(comb)

        comb = name + addition + special_chars_array[i]
        my_array.push(comb)

        comb = name + special_chars_array[i] + addition
        my_array.push(comb)

        comb = special_chars_array[i] + addition + name
        my_array.push(comb)

        comb = addition + name + special_chars_array[i]
        my_array.push(comb)

        comb = addition + special_chars_array[i] + name
        my_array.push(comb)
    }
    return my_array;
}

function name_form_change(text) {
    var modified = [];
    modified.push(text.toUpperCase());
    modified.push(text);
    modified.push(text.charAt(0).toUpperCase() + text.slice(1));
    return modified;
}

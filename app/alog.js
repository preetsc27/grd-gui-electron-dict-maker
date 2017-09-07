// Setup an event listener that will handle messages sent to the worker.
self.addEventListener('message', function(e) {
  // Send the message back.
  var name_form_change_list = e.data
  var final_list = []
  // # special combination for name and year like grd97 if birth year is 1997
  // if (birth_year !== null) {
  //     for (var i = 0; i < name_form_change_list.length; i++) {
  //         const comb = algo(name_form_change_list[i] , birth_year.substring(2))
  //         final_list.push.apply(final_list , comb)
  //     }
  // }

  //# concating name with every other input
  // for (var i = 0; i < main_list.length; i++){
  //     for (var j = 0; j < name_form_change_list.length; j++){
  //         var comb = algo(name_form_change_list[j] , main_list[i])
  //         final_list.push.apply(final_list , comb)
  //     }
  // }
  self.postMessage('5');

self.postMessage('40' );
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
self.postMessage('50');
  // # for combinations like grd345, grd1234
  for (var i = 0; i < 11; i++){
      for (var j = 0; j < 11; j++){
          var y = ""
          for (var x = j; x < i; x++){
              y = x.toString()
              for (var k = 0; k < name_form_change_list.length; k++){
                  var comb = algo(name_form_change_list[k] , y.toString())
                  final_list.push.apply(final_list , comb)
              }
          }
      }
  }
self.postMessage('60');
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
self.postMessage('70');
  // # for combinations like grd765, grd 876543
  for (var i = 9; i > -1; i--){
      for (var j = 9; j > 0; j--){
          var y = ""
          for (var x = j; x < i; x++){
              y = x.toString()
              for (var k = 0; k < name_form_change_list.length; k++){
                  var comb = algo(name_form_change_list[k] , y.toString())
                  final_list.push.apply(final_list , comb)
              }
          }
      }
  }
self.postMessage('80');
  // # combinations for name + number
  for (var i = 0; i < 50; i++){
      for (var j = 0; j < name_form_change_list.length; j++){
          var comb = algo(name_form_change_list[j] , i.toString())
          final_list.push.apply(final_list , comb)
      }
  }
self.postMessage('90');
  // combination of name + random numbers
  for(var x = 0; x < 25 ; x++){
      var i = Math.floor(Math.random() * 10000000000) + 1
      for (var j = 0; j < name_form_change_list.length; j++){
          var comb = algo(name_form_change_list[j] , i.toString())
          final_list.push.apply(final_list , comb)
      }
  }
  self.postMessage('95');
  self.postMessage(final_list);
}, false);
var special_chars = "!@#$%^&*()_+-=:/.,<>`~][;'";
var special_chars_array = special_chars.split("");

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


function lttr_to_special_chr(msg){
    const output = []
    var msg_ref = msg

    if (msg === null && msg === ""){
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

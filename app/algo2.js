self.addEventListener('message', function(e) {
//# for combinations like grd345, grd1234
var name_form_change_list = e.data
var final_list = []
for (var i = 0; i < 11; i++){
    self.postMessage(i);
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
for (var i = 9; i > -1; i--){
    self.postMessage(i);
    for (var j = 9; j > 0; j--){
        var y = ""
        for (var x = j; x < i; x++){
            y = y + x.toString()
            for (var k = 0; k < name_form_change_list.length; k++){
                var comb = algo(name_form_change_list[k] , y.toString())
                final_list.push.apply(final_list , comb)
            }
        }
    }
}
self.postMessage(final_list);
})
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

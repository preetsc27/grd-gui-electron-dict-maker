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

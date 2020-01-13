$(document).ready(function(){
    switchToCurrencyCalculator();
    currentDate();
    getCurrenciesList();
    
    $('#change-currencies').click(function(){
        let firstCurrency = $('#first-currency').children("option:selected").val();
        let secondCurrency = $('#second-currency').children("option:selected").val();
        $('#first-currency option').each(function(){
            if($(this).attr('value') == secondCurrency){
                $(this).prop('selected', true);
            }
        });
        $('#second-currency option').each(function(){
            if($(this).attr('value') == firstCurrency){
                $(this).prop('selected', true);
            }
        });
    });
    
    $("#convertButton").click(function(){
        let firstCurrency = $('#first-currency').children("option:selected").val();
        let secondCurrency = $('#second-currency').children("option:selected").val();
        let amount = $('#input-amount').val();
        if(firstCurrency==secondCurrency){
            $.alert({
                title: 'Hey, Dude!',
                content: 'Choose a different currencies',
            });
            return;
        }
        $.ajax({
            method: "GET",
            url: `https://frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`,
            success: function(data){
                $('#output-value').text(`${amount} ${firstCurrency} = ${data.rates[secondCurrency]} ${secondCurrency}`);
                $('#output-value-block').show();
            }    
        })
    });

    $('#currency-date-button').click(function(){
        let date = $('#date-picker').val();
        let currency = $('#select-currency-at-date').children("option:selected").val();
        if(date > currentDate()){
            $.alert({
                title: 'Hey, Dude!',
                content: 'Choose a correct date, pls',
            });
            return;
        }
        else{
            $.ajax({
                method: "GET",
                url: `https://frankfurter.app/${date}`,
                success: function(data){
                    let currencyRate = data.rates[currency];
                    $('#date-currency-value').text(`At ${date} in 1 EUR was ${currencyRate} ${currency}`);
                    $('#date-currency-value-block').show();
                }    
            })
        }
        
    })

    function currentDate(){
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        let today = year + "-" + month + "-" + day;       
        $("#date-picker").attr("value", today);
        return today;
    }

    $('.dates #date-picker').datepicker({
        'autoclose': true,
        'format':'yyyy-mm-dd'
    });
    
    function getCurrenciesList(){
        $.ajax({
            method: "GET",
            url: 'https://frankfurter.app/currencies',
            success: function(data){
                $.each(data, function(key, value){
                    $(`<option>${value}</option>`).attr('value', key).appendTo($('#first-currency'));
                    $(`<option>${value}</option>`).attr('value', key).appendTo($('#second-currency'));
                    $(`<option>${value}</option>`).attr('value', key).appendTo($('#select-currency-at-date'));
                });
                $('#first-currency option').each(function(){
                    if($(this).attr('value') == 'USD'){
                        $(this).prop('selected', true);
                    }
                });
                $('#second-currency option').each(function(){
                    if($(this).attr('value') == 'EUR'){
                        $(this).prop('selected', true);
                    }
                });
                $('#select-currency-at-date option').each(function(){
                    if($(this).attr('value') == 'USD'){
                        $(this).prop('selected', true);
                    }
                });
            }
        });
    }
});

function switchToCurrencyCalculator(){
    $('.currency-at-date').hide();
    $('.currency-calc').show();
    $('#title-currency-date').css('text-decoration', 'none');
    $('#title-calculator').css('text-decoration', 'underline');
}

function switchToCurrencyAtDate(){
    $('.currency-calc').hide();
    $('.currency-at-date').show();
    $('#title-currency-date').css('text-decoration', 'underline');
    $('#title-calculator').css('text-decoration', 'none');
}









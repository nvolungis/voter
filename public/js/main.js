(function($){
  $(document).ready(function(){
    $.post('/reset');

    var votes = {
      yes: 0,
      no:0
    }

    $('#voteyes').on('click', function(){
      $.post('vote', {type: 'yes'});
      votes['yes'] += 1;
      $(this).closest('li').find('.table-cell div').html(votes['yes']);
    });

    $('#voteno').on('click', function(){
      $.post('vote', {type: 'no'});
      votes['no'] += 1;
      $(this).closest('li').find('.table-cell div').html(votes['no']);
    });
  });
}(jQuery));

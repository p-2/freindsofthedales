(function($){
  $('#is_gift').on('click', function(){
    if ($(this).is(':checked')) {
      $('#giftname_field,#giftaddress_field').show().attr('required',true);
    } else {
      $('#giftname_field,#giftaddress_field').hide().removeAttr('required');
      $('#giftname,#giftaddress').val('');
    }
  });
  $('#payment_method').on('change',function(){
    $('.payment_method_text').hide();
    if ($('#payment_method').val() !== '') {
      $(this).removeClass('error');
      $('#payment_method_'+$('#payment_method').val()).show();
    }
  });
  $('#membership_category').on('change', function(){
    $('#jointname_field,#groupname_field').hide().removeAttr('required');
    var mcat = $('#membership_category').val();
    if (mcat !== '') {
      $('#'+mcat+'name_field').show().attr('required',true);
    }
  });
  var checkForm = function(){
    // Clear any previous errors
    $('span.errormsg').remove();
    $('input textarea select').removeClass('error');
    // Check name
    if ( $.trim($('#fullname').val()) === '' ){
      $('#fullname').addClass('error').after('<span class="errormsg">Please enter your full name.</span>');
    }
    // Check email
    var emailRE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!$.trim($('#emailaddress').val()).match(emailRE)){
      $('#emailaddress').val('');
    }
    if ( $.trim($('#emailaddress').val()) === '' ){
      $('#emailaddress').addClass('error').after('<span class="errormsg">Please enter your email address</span>');
    }
    // Check address
    if ( $.trim($('#address').val()) === '' ){
      $('#address').addClass('error').after('<span class="errormsg">Please enter your address and postcode.</span>');
    }
    // If this is a gift, check recipient details
    if ($('#is_gift').is(':checked')){
      // Check recipient name
      if ( $.trim($('#giftname').val()) === '' ){
        $('#giftname').addClass('error').after('<span class="errormsg">Please enter the full name of the recipient.</span>');
      }
      // Check recipient address
      if ( $.trim($('#giftaddress').val()) === '' ){
        $('#giftaddress').addClass('error').after('<span class="errormsg">Please enter the address and postcode of the recipient.</span>');
      }      
    }
    if ( $('#membership_category').val() === '' ){
      $('#membership_category').addClass('error').after('<span class="errormsg">Please select a Membership type.</span>');
    }
    if ( $('#payment_method').val() === '' ){
      $('#payment_method').addClass('error').after('<span class="errormsg">Please select a Payment method.</span>');
    }
    if (!$('.error').length) {
      return true;
    } else {
      return false;
    }
  };
  $('input,textarea,select').on('focus', function(){
    if ( $(this).hasClass('error') ) {
      $(this).removeClass('error');
      $(this).next().remove();
    }
  });
  $('#apply').on('click',function(e){
    if ( ! checkForm() ) {
      e.preventDefault();
    } else {
      var data = {
        'fullname': $('#fullname').val(),
        'emailaddress': $('#emailaddress').val(),
        'address': $('#address').val(),
        'telephone': $('#telephone').val(),
        'is_gift': ($('#is_gift').is(':checked')?'yes':'no'),
        'gift_recipient_name': $('#giftname').val(),
        'gift_recipient_address': $('#giftaddress').val(),
        'membership_type': $('input[name="membership_type"]:checked').val(),
        'membership_category': $('#membership_category').val(),
        'joint_member_name': $('#jointname').val(),
        'group_member_name': $('#groupname').val(),
        'payment_method': $('#payment_method').val()
      };
      var overlay_text = '<h2>Form checked and ready for submission</h2><table><thead><tr><th>Field name</th><th>Field value</th></tr></thead><tbody>';
      for(f in data){
        overlay_text += '<tr><td>'+f+'</td><td>'+data[f]+'</td></tr>';
      }
      overlay_text += '</tbody></table>';
      $('body').append('<div class="overlay"><div class="text">'+overlay_text+'</div></div>');
      $(document).on('click', '.overlay', function(){
        $(this).remove();
      });
    }
  });
})(jQuery);
(function($){
	$('#is_gift').on('click', function(){
		if ($(this).is(':checked')) {
			$('#gift_recipient_fields').removeClass('hidden');
			$('#giftname,#giftaddress').attr('required',true).removeClass('error').next('.error_text').remove();
			$('#gift_aid_disabled').removeClass('hidden');
			$('#gift_aid').attr('disabled',true);
		} else {
			$('#gift_recipient_fields').addClass('hidden');
			$('#giftname,#giftaddress').attr('required',null).val('');
			$('#gift_aid_disabled').addClass('hidden');
			$('#gift_aid').attr('disabled',null);
		}
	});
	$('#gift_aid').on('click', function(){
		if ($(this).is(':checked')) {
			$('#gift_aid_fields').removeClass('hidden');
			$('#gift_recipient_fields').addClass('hidden');
			$('#is_gift_disabled').removeClass('hidden');
			$('#is_gift').attr('disabled',true);
		} else {
			$('#gift_aid_fields').addClass('hidden');
			$('#is_gift_disabled').addClass('hidden');
			$('#is_gift').attr('disabled',null);
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
		$('#jointname_field,#groupname_field').hide().attr('required',null);
		var mcat = $('#membership_category').val();
		if (mcat !== '') {
			$('#'+mcat+'name_field').show().attr('required',true);
		}
	});
	var checkForm = function(){
		// Clear any previous errors
		$('span.error_text').remove();
		$('input textarea select').removeClass('error');
		// Check name
		if ( $.trim($('#first_name').val()) === '' ){
			$('#first_name').addClass('error').after('<span class="error_text">Please enter your first name.</span>');
		}
		if ( $.trim($('#last_name').val()) === '' ){
			$('#last_name').addClass('error').after('<span class="error_text">Please enter your last name.</span>');
		}
		// Check email
		var emailRE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
		if (!$.trim($('#emailaddress').val()).match(emailRE)){
			$('#emailaddress').val('');
		}
		if ( $.trim($('#emailaddress').val()) === '' ){
			$('#emailaddress').addClass('error').after('<span class="error_text">Please enter your email address</span>');
		}
		// Check address
		if ( $.trim($('#address').val()) === '' ){
			$('#address').addClass('error').after('<span class="error_text">Please enter your address.</span>');
		}
		if ( $.trim($('#postcode').val()) === '' ){
			$('#postcode').addClass('error').after('<span class="error_text">Please enter your postcode.</span>');
		}
		if ($('#is_gift').is(':checked') && $('#gift_aid').is(':checked')){
			// Can't do both - uncheck
			$('#is_gift').prop('checked', false);
			$('#gift_aid').prop('checked', false);
			$('#gift_aid_confirm').prop('checked', false);
			$('#is_gift_disabled').addClass('hidden');
			$('#gift_aid_disabled').addClass('hidden');
			$('#gift_aid_fields').addClass('hidden');
			$('#gift_recipient_fields').addClass('hidden');
			$('#giftname,#giftaddress').attr('required',null).val('');
		}
		// If this is a gift, check recipient details
		if ($('#is_gift').is(':checked')){
			// Check recipient name
			if ( $.trim($('#giftname').val()) === '' ){
				$('#giftname').addClass('error').after('<span class="error_text">Please enter the full name of the recipient.</span>');
			}
			// Check recipient address
			if ( $.trim($('#giftaddress').val()) === '' ){
				$('#giftaddress').addClass('error').after('<span class="error_text">Please enter the address and postcode of the recipient.</span>');
			}
		}
		// If Gift Aid is being used, check confirmation
		if ($('#gift_aid').is(':checked')){
			// make sure confirmation is checked
			if(!$('#gift_aid_confirm').is(':checked')){
				$('#gift_aid_confirm').addClass('error');
				$('#gift_aid_fields').append('<span class="error_text indent">Please confirm you agree to the Gift Aid declaration.</span>');
			}
		}
		if ( $('#membership_category').val() === '' ){
			$('#membership_category').addClass('error').after('<span class="error_text">Please select a Membership type.</span>');
		}
		if ( $('#payment_method').val() === '' ){
			$('#payment_method').addClass('error').after('<span class="error_text">Please select a Payment method.</span>');
		}
		if (!$('.error').length) {
			return true;
		} else {
			return false;
		}
	};
	$('input[type=text],input[type=email],textarea,select').on('focus', function(){
		if ( $(this).hasClass('error') ) {
			$(this).removeClass('error');
			$(this).next('.error_text').remove();
		}
	});
	$('#gift_aid_confirm').on('focus',function(){
		$('#gift_aid_confirm').removeClass('error');
		$('#gift_aid_fields').find('.error_text').remove();
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
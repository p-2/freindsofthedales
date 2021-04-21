(function($){
	$('#is_gift').on('click', function(){
		if ($(this).is(':checked')) {
			$('#is_gift').attr('aria-expanded',true);
			$('#gift_recipient_fields').removeClass('hidden').attr('aria-hidden',false);
			$('#giftname,#giftaddress').attr('required',true).removeClass('error').next('.error_text').remove();
			$('#gift_aid_disabled').removeClass('hidden');
			$('#gift_aid').attr('disabled',true);
		} else {
			$('#is_gift').attr('aria-expanded',false);
			$('#gift_recipient_fields').addClass('hidden').attr('aria-hidden',true);
			$('#giftname,#giftaddress').attr('required',null).val('');
			$('#gift_aid_disabled').addClass('hidden');
			$('#gift_aid').attr('disabled',null);
		}
	});
	$('#gift_aid').on('click', function(){
		if ($(this).is(':checked')) {
			$('#gift_aid').attr('aria-expanded',true);
			$('#gift_aid_fields').removeClass('hidden').attr('aria-hidden',false);
			$('#gift_recipient_fields').addClass('hidden').attr('aria-hidden',true);
			$('#is_gift_disabled').removeClass('hidden');
			$('#is_gift').attr('disabled',true);
			$('#gift_aid_confirm').attr('tabindex',0);
		} else {
			$('#gift_aid').attr('aria-expanded',false);
			$('#gift_aid_fields').addClass('hidden').attr('aria-hidden',true);
			$('#is_gift_disabled').addClass('hidden');
			$('#is_gift').attr('disabled',null);
			$('#gift_aid_confirm').attr('tabindex',-1);
		}
	});
	$('#payment_method').on('change',function(){
		$('.info_text').addClass('hidden');
		if ($('#payment_method').val() !== '') {
			$(this).removeClass('error');
			$('#payment_method_'+$('#payment_method').val()).removeClass('hidden');
		}
	});
	$('#membership_category').on('change', function(){
		$('#jointname_field,#groupname_field').addClass('hidden').attr('required',null);
		var mcat = $('#membership_category').val();
		if (mcat !== '') {
			$('#'+mcat+'name_field').removeClass('hidden').attr('required',true);
		}
	});
	var clearForm = function(){
		// reset form
		$('form.application_form').trigger('reset');
		// hide info text about payment methods
		$('.info_text').addClass('hidden').attr('aria-hidden',true);
		// reset gift aid expando
		$('#gift_aid').attr('aria-expanded',false);
		$('#gift_aid_fields').addClass('hidden').attr('aria-hidden',true);
		$('#is_gift_disabled').addClass('hidden');
		$('#is_gift').attr('disabled',null);
		$('#gift_aid_confirm').attr('tabindex',-1);
		// reset gift recipient details expando
		$('#is_gift').attr('aria-expanded',false);
		$('#gift_recipient_fields').addClass('hidden').attr('aria-hidden',true);
		$('#giftname,#giftaddress').attr('required',null).val('');
		$('#gift_aid_disabled').addClass('hidden');
		$('#gift_aid').attr('disabled',null);
	};
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
			e.preventDefault();
			emailjs.init("user_Fh4389PP4R71WbScJHBBL");
			var data = {
				'title': $('#title').val(),
				'first_name': $('#first_name').val(),
				'last_name': $('#last_name').val(),
				'emailaddress': $('#emailaddress').val(),
				'address': $('#address').val(),
				'postcode': $('#postcode').val(),
				'telephone': $('#telephone').val(),
				'is_gift': ($('#is_gift').is(':checked')?'yes':'no'),
				'giftname': $('#giftname').val(),
				'giftaddress': $('#giftaddress').val(),
				'gift_aid': ($('#gift_aid').is(':checked')&&$('#gift_aid_confirm').is(':checked')?'yes':'no'),
				'membership_type': $('input[name="membership_type"]:checked').val(),
				'membership_category': $('#membership_category').val(),
				'jointname': $('#jointname').val(),
				'groupname': $('#groupname').val(),
				'payment_method': $('#payment_method').val(),
				'contact_email': ($('#contact_email').is(':checked')?'yes':'no'),
				'contact_telephone': ($('#contact_telephone').is(':checked')?'yes':'no'),
				'contact_life_membership': ($('#contact_life_membership').is(':checked')?'yes':'no'),
				'contact_legacies': ($('#contact_legacies').is(':checked')?'yes':'no'),
			};
			var overlay_text = '<p>Sending your details</p><div class="loader_container"><div class="loader">Loading...</div></div>';
			$('body').append('<div class="overlay"><div id="overlay_text" class="text">'+overlay_text+'</div></div>');
			var memberships = {
				'individual': {'name':'Individual Annual membership','number':'Individual Annual membership','amount':25},
				'joint': {'name':'Joint Annual membership','number':'Joint Annual membership','amount':35},
				'group': {'name':'Group membership','number':'Group membership','amount':40},
			};
			var payment_methods = {
				'transfer':'Bank Transfer',
				'direct':'Direct Debit',
				'cheque':'Cheque',
			};
			var paypal_form = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post">';
			paypal_form += '<input type="hidden" name="business" value="ann.shadrake@yds.org.uk">';
			paypal_form += '<input type="hidden" name="cmd" value="_xclick">';
			paypal_form += '<input type="hidden" name="item_name" value="'+memberships[data.membership_type].name+'">';
			paypal_form += '<input type="hidden" name="item_number" value="'+memberships[data.membership_type].number+'">';
			paypal_form += '<input type="hidden" name="amount" value="'+memberships[data.membership_type].amount+'">';
			paypal_form += '<input type="hidden" name="tax" value="0">';
			paypal_form += '<input type="hidden" name="currency_code" value="GBP">';
			paypal_form += '<input type="hidden" name="shipping" value="">';
			paypal_form += '<input type="hidden" name="shipping2" value="">';
			paypal_form += '<input type="hidden" name="handling" value="">';
			paypal_form += '<input type="hidden" name="return" value="">';
			paypal_form += '<input type="hidden" name="cancel_return" value="">';
			paypal_form += '<input type="hidden" name="undefined_quantity" value="0">';
			paypal_form += '<input type="hidden" name="receiver_email" value="ann.shadrake@yds.org.uk">';
			paypal_form += '<input type="hidden" name="no_shipping" value="0">';
			paypal_form += '<input type="hidden" name="no_note" value="1">';
			paypal_form += '<button type="submit" title="Make payments with PayPal, it\'s fast, free, and secure!" class="paypal_button">Pay using PayPal</button>';
			paypal_form += '</form>';
			emailjs.send('default_service', 'template_xgra2h4', data )
				.then( function(response){
					overlay_text = '<h3>SUCCESS!</h3><p>We have recieved your application for membership</p>';
					if ( data.payment_method == 'paypal' ){
						overlay_text += paypal_form;
						$('#overlay_text').html(overlay_text);
					} else {
						// payment method is transfer, direct or cheque
						userdata = {
							'to_name': data.first_name+' '+data.last_name,
							'payment_method': payment_methods[data.payment_method],
							'membership_name': memberships[data.membership_type].name,
							'membership_amount': memberships[data.membership_type].amount,
						}
						emailjs.send('default_service', 'template_czq4ilo', userdata )
							.then( function(response){
								$('#overlay_text').html(overlay_text);
								$(document).on('click', '.overlay', function(){$(this).remove();clearForm();});
							}, function(error){
								overlay_text = '<h3>ERROR!</h3><p>Sorry, there was a problem sending you details on how to make your payment by '+payment_methods[data.payment_method]+'</p>';
								$(document).on('click', '.overlay', function(){$(this).remove();clearForm();});
							});
						$('#overlay_text').html(overlay_text);
						$(document).on('click', '.overlay', function(){$(this).remove();});
				}, function(error){
					overlay_text = '<h3>ERROR!</h3><p>Sorry, there was a problem sending your subscription information</p>';
					$('#overlay_text').html(overlay_text);
					$(document).on('click', '.overlay', function(){$(this).remove();});
				});
		}
	});
})(jQuery);
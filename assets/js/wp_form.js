(function($){

	var giftaid_switch = '<input type="checkbox" name="gift_aid_switch" id="gift_aid_switch" aria-controls="gift_aid_fields" aria-expanded="false" /><label for="gift_aid_switch">Check this box if you wish to Gift Aid your payment <span id="gift_aid_disabled" class="hidden">(sorry, you cannot claim gift aid if this is a gift)</span></label>';
	var isgift_switch = '<input type="checkbox" name="is_gift_switch" id="is_gift_switch" aria-controls="gift_recipient_fields" aria-expanded="false" /><label for="is_gift_switch">Check this box if this is a gift <span id="is_gift_disabled" class="hidden">(uncheck the Gift Aid box if this is a gift)</span></label>';
	$('#is_gift').html(isgift_switch);
	$('#gift_aid').html(giftaid_switch);
	$('#gift_recipient_fields,#gift_aid_fields').addClass('hidden');
	$(document).on('click', '#is_gift_switch', function(){
		if ($(this).is(':checked')) {
			$('#is_gift_switch').attr('aria-expanded',true);
			$('#gift_recipient_fields').removeClass('hidden').attr('aria-hidden',false);
			$('#giftname,#giftaddress').attr('required',true).removeClass('error').next('.error_text').remove();
			$('#gift_aid_disabled').removeClass('hidden');
			$('#gift_aid_switch').attr('disabled',true);
			$('#gift_aid').addClass('hidden');
		} else {
			$('#is_gift_switch').attr('aria-expanded',false);
			$('#gift_recipient_fields').addClass('hidden').attr('aria-hidden',true);
			$('#giftname,#giftaddress').attr('required',null).val('');
			$('#gift_aid_disabled').addClass('hidden');
			$('#gift_aid_switch').attr('disabled',null);
			$('#gift_aid').removeClass('hidden');
		}
	});
	
	$(document).on('click', '#gift_aid_switch', function(){
		if ($(this).is(':checked')) {
			$('#gift_aid_switch').attr('aria-expanded',true);
			$('#gift_aid_fields').removeClass('hidden').attr('aria-hidden',false);
			$('#gift_recipient_fields').addClass('hidden').attr('aria-hidden',true);
			$('#is_gift_disabled').removeClass('hidden');
			$('#is_gift_switch').attr('disabled',true);
			$('#gift_aid_confirm').attr('tabindex',0);
			$('#is_gift').addClass('hidden');
		} else {
			$('#gift_aid_switch').attr('aria-expanded',false);
			$('#gift_aid_fields').addClass('hidden').attr('aria-hidden',true);
			$('#is_gift_disabled').addClass('hidden');
			$('#is_gift_switch').attr('disabled',null);
			$('#gift_aid_confirm').attr('tabindex',-1);
			$('#is_gift').removeClass('hidden');
		}
	});
	$('#payment_method').on('change',function(){
		$('.info_text').addClass('hidden');
		var method = $('#payment_method').val();
		var method_key = method.substr(0, method.indexOf(" ")).toLowerCase();
		if (method_key !== 'select') {
			$(this).removeClass('error');
			$('#payment_method_'+method_key).removeClass('hidden');
		}
	});
	$('#membership_category').on('change', function(){
		$('#jointname_field,#groupname_field').addClass('hidden').attr('required',null);
		var mcat = $('#membership_category').val();
		var mcat_key = mcat.substr(0, mcat.indexOf(" ")).toLowerCase();
		if (mcat_key !== 'select') {
			$('#'+mcat_key+'name_field').removeClass('hidden').attr('required',true);
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
			window.scrollTo(0,($('.error').first().offset().top-100));
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
			var mcat = $('#membership_category').val();
		    var mcat_key = mcat.substr(0, mcat.indexOf(" ")).toLowerCase();
			var payment_method = $('#payment_method').val();
			var overlay_text = '<p>Sending your details</p><div class="application-form-loader_container"><div class="application-form-loader">Loading...</div></div>';
			$('body').append('<div class="application-form-overlay"><div id="application-form-overlay_text" class="text">'+overlay_text+'</div></div>');
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
			paypal_form += '<input type="hidden" name="item_name" value="'+memberships[mcat_key].name+'">';
			paypal_form += '<input type="hidden" name="item_number" value="'+memberships[mcat_key].number+'">';
			paypal_form += '<input type="hidden" name="amount" value="'+memberships[mcat_key].amount+'">';
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
			// mail sent OK
			$(document).on('wpcf7mailsent', function(e){
				overlay_text = '<h3>SUCCESS!</h3><p>We have recieved your application for membership</p>';
				if ( payment_method == 'paypal' ){
					overlay_text += paypal_form;
					$('#overlay_text').html(overlay_text);
				}
			});
			// invalid input found in form
			$(document).on('wpcf7invalid', function(e){
				$('#overlay_text').html('<h3>Sorry...</h3><p>There were some problems found with the form. Please correct these and try again.</p>');
				$(document).on('click', '.overlay', function(){$(this).remove();});
			});
			// message not sent
			$(document).on('wpcf7mailfailed', function(){
				$('#overlay_text').html('<h3>Sorry...</h3><p>There was a problem sending mail. Please check your email and try again.</p>');
				$(document).on('click', '.overlay', function(){$(this).remove();});
			});
		}
	});
})(jQuery);
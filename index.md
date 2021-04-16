<div class="application_form">
<p><label for="fullname" class="required">Title, first name and surname</label><input type="text" name="fullname" id="fullname" required></p>
<p><label for="emailaddress" class="required">Email address</label><input type="email" name="emailaddress" id="emailaddress" required></p>
<p><label for="address" class="required">Address including postcode</label><textarea name="address" id="address" required></textarea></p>
<p><label for="telephone">Telephone number</label><input type="tel" name="telephone" id="telephone" /></p>
  <p><label for="is_gift"><input type="checkbox" name="is_gift" id="is_gift" />Check this box if this is a gift</label></p>
<p class="hidden" id="giftname_field"><label for="giftname" class="required">Recipient title, first name and surname</label><input type="text" name="giftname" id="giftname"></p>
<p class="hidden" id="giftaddress_field"><label for="giftaddress" class="required">Recipient address including postcode</label><textarea name="giftaddress" id="giftaddress"></textarea></p>
  <p><span class="label" class="required">Membership type</span><label for="membership_type_new"><input type="radio" name="membership_type" id="membership_type_new" value="new" checked>New</label>
  <label for="membership_type_renewal"><input type="radio" name="membership_type" id="membership_type_renewal" value="renewal">Renewal</label>
</p>
<p><label for="membership_category" class="required">Membership Category</label><select name="membership_category" id="membership_category">
  <option value="">Select your membership category...</option>
  <option value="individual">Individual (£25)</option>
  <option value="joint">Joint (two Friends at the same address) £35</option>
  <option value="group">Group / Business (£40)</option>
  </select>
</p>
<p class="hidden" id="jointname_field"><label for="jointname" class="required">Title, first name and surname of joint member</label><input type="text" name="jointname" id="jointname" /></p>
<p class="hidden" id="groupname_field"><label for="groupname" class="required">Group / Business Name</label><input type="text" name="groupname" id="groupname" /></p>
<p><label for="payment_method" class="required">Payment method</label><select name="payment_method" id="payment_method" />
  <option value="">Select your preferred payment method...</option>
  <option value="paypal">PayPal</option>
  <option value="transfer">Bank Transfer</option>
  <option value="direct">Direct Debit</option>
  <option value="cheque">Cheque</option>
</select>
</p>
<p class="hidden payment_method_text" id="payment_method_paypal">When you click on the submit button, you will be redirected to PayPal to complete payment</p>
<p class="hidden payment_method_text" id="payment_method_transfer">Our banking details will be included in your acknowledgement email.</p>
<p class="hidden payment_method_text" id="payment_method_direct">We will send you details of how to set up a Direct Debit payment in your acknowledgement email.</p>
<p class="hidden payment_method_text" id="payment_method_cheque">We will send you the address to post cheques to  in your acknowledgement email.</p>
<p><button type="submit" name="apply" id="apply">Apply for membership</button></p>
</div>
this["templates"] = this["templates"] || {};

this["templates"]["admin/admin"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"grid grid--guttered grid--bottom\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.list_id : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"col\">\n<button class=\"js-logout\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.logout : stack1), depth0))
    + "</button>\n</div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"col\">\n<button class=\"js-show_new_post\">New</button>\n\n<form action=\"#\" class=\"hide js-new_post_form\">\n<label for=\"title\">Title</label>\n<input type=\"text\" id=\"title\" name=\"title\">\n<label for=\"route\">Url Route</label>\n<input type=\"text\" id=\"route\" name=\"route\">\n<button type=\"submit\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.submit : stack1), depth0))
    + "</button>\n</form>\n</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<form action=\"#\" class=\"js-submit_login\">\n<label for=\"email\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.email_label : stack1), depth0))
    + "</label>\n<input type=\"email\" id=\"email\" name=\"email\">\n<label for=\"password\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.password_label : stack1), depth0))
    + "</label>\n<input type=\"password\" id=\"password\" name=\"password\">\n<button type=\"submit\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.submit : stack1), depth0))
    + "</button>\n</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"admin__container\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.session : depth0)) != null ? stack1.user_id : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["templates"]["answers"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p class=\"p--big text_center highlight\">\n<strong>Thanks, we'll keep in touch!</strong>\n</p>\n";
},"useData":true});

this["templates"]["cms/author"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<p class=\"p--medium hide_on_small\">\n"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.blog : stack1)) != null ? stack1.by : stack1), depth0))
    + " <a href=\"/lists/blog/authors/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.handle : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a><br>\n<a href=\"https://twitter.com/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.handle : stack1), depth0))
    + "\">@"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.handle : stack1), depth0))
    + "</a>\n</p>\n";
},"useData":true});

this["templates"]["cms/author_input"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = (helpers.if_in_array || (depth0 && depth0.if_in_array) || alias2).call(alias1,((stack1 = (depths[1] != null ? depths[1].model : depths[1])) != null ? stack1.authors : stack1),(depth0 != null ? depth0._id : depth0),{"name":"if_in_array","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >"
    + alias4(((helper = (helper = helpers.handle || (depth0 != null ? depth0.handle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"handle","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "selected";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<label for=\"authors\">Authors</label>\n<select name=\"authors\" id=\"authors\" multiple>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.authors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select>\n";
},"useData":true,"useDepths":true});

this["templates"]["cms/edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<input type=\"checkbox\" id=\"is_online_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" name=\"is_online\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.is_online : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n<label for=\"is_online_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.online : stack1), depth0))
    + "</label>\n\n<br>\n\n<p><button class=\"js-save_edit\" disabled>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.save : stack1), depth0))
    + "</button></p>\n<p><button class=\"button--transparent js-destroy\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1["delete"] : stack1), depth0))
    + "</button></p>\n";
},"useData":true});

this["templates"]["cms/piece_edit"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<input type=\"file\" class=\"hide js-image_input\">\n\n<button class=\"button--tight js-save_piece\" disabled>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.save : stack1), depth0))
    + "</button>\n";
},"useData":true});

this["templates"]["cms/piece_link"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<small>[<span contenteditable data-key=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "</span>]</small>\n";
},"useData":true});

this["templates"]["cms/tag"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"/lists/blog/tags/"
    + alias4(((helper = (helper = helpers.tag || (depth0 != null ? depth0.tag : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tag","hash":{},"data":data}) : helper)))
    + "\" data-tag contenteditable=\"true\">"
    + alias4(((helper = (helper = helpers.tag || (depth0 != null ? depth0.tag : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tag","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"useData":true});

this["templates"]["cms/tag_input"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input class=\"em input--inline\" placeholder=\"Add a tag\" type=\"text\" name=\"tag_input\">\n";
},"useData":true});

this["templates"]["ecom/cart"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "\n<a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"cart__back\" data-hide-cart></a>\n\n<div class=\"cart__container\">\n<p class=\"text_right\"><a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"a--underline\" data-hide-cart>Close</a></p>\n\n<div class=\"grid grid--tight_guttered grid--middle\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.available_store_credit : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div class=\"col col--12of12\">\nSubtotal: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.sub_total : stack1), depth0))
    + "<br>\nTaxes: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.taxes_total : stack1), depth0))
    + "<br>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.with_store_credit : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<strong>Total: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.total : stack1), depth0))
    + "</strong>\n</div>\n</div>\n\n<div class=\"grid grid--tight_guttered input_group\">\n<div class=\"col col--12of12\">\n<label for=\"email\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.email_label : stack1), depth0))
    + "</label>\n<input type=\"email\" id=\"email\" name=\"email\" value=\""
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.email : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
    + "\" required autocomplete=\"email\">\n</div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.credit_cards : stack1),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col col--6of12\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.vendor_shop : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"col col--2of12\"><input type=\"number\" name=\"quantity\" data-item-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\" class=\"input--tight flat_bottom\"></div>\n<div class=\"col col--3of12\">"
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + " x "
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + " = "
    + alias4(((helper = (helper = helpers.sub_total || (depth0 != null ? depth0.sub_total : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sub_total","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"col col--1of12\"><button class=\"button--tight button--transparent\" data-remove-from-cart data-item-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">Remove</button></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<strong>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.vendor_shop : depth0)) != null ? stack1.name : stack1), depth0))
    + ":</strong> ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"col col--12of12\">\n<input type=\"checkbox\" id=\"with_store_credit\" name=\"with_store_credit\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.with_store_credit : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n<label for=\"with_store_credit\">With store credit ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.available_store_credit : stack1), depth0))
    + ")</label>\n</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "checked";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "Store credit: -"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.store_credit_total : stack1), depth0))
    + "<br>";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.email : stack1), depth0));
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), depth0));
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<form class=\"col col--12of12\" data-credit-card-form>\n<label for=\"email\">Credit Card</label>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.credit_cards : stack1),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<button type=\"submit\">Review Order</button>\n</form>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.is_default : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div data-credit-card-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n<input type=\"radio\" id=\"card_"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" name=\"credit_card_id\" value=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" checked>\n<label for=\"card_"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.provider_data : depth0)) != null ? stack1.brand : stack1), depth0))
    + " **** **** **** "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.provider_data : depth0)) != null ? stack1.last4 : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.provider_data : depth0)) != null ? stack1.exp_month : stack1), depth0))
    + " / "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.provider_data : depth0)) != null ? stack1.exp_year : stack1), depth0))
    + "<br>\n"
    + alias4(((helper = (helper = helpers.billing_street || (depth0 != null ? depth0.billing_street : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"billing_street","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.billing_zip || (depth0 != null ? depth0.billing_zip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"billing_zip","hash":{},"data":data}) : helper)))
    + "\n</label>\n\n<input type=\"hidden\" id=\"card_token\" name=\"card_token\" value=\""
    + alias4(((helper = (helper = helpers.card_token || (depth0 != null ? depth0.card_token : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"card_token","hash":{},"data":data}) : helper)))
    + "\">\n<input type=\"hidden\" id=\"billing_street\" name=\"billing_street\" value=\""
    + alias4(((helper = (helper = helpers.billing_street || (depth0 != null ? depth0.billing_street : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"billing_street","hash":{},"data":data}) : helper)))
    + "\">\n<input type=\"hidden\" id=\"billing_zip\" name=\"billing_zip\" value=\""
    + alias4(((helper = (helper = helpers.billing_zip || (depth0 != null ? depth0.billing_zip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"billing_zip","hash":{},"data":data}) : helper)))
    + "\">\n</div>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<form class=\"col col--12of12\" data-credit-card-form>\n<label for=\"number\">Credit Card</label>\n<div class=\"grid\">\n<div class=\"col col--12of12\"><input type=\"tel\" id=\"number\" name=\"number\" placeholder=\"Card number\" required autocomplete=\"cc-number\" value=\"4242 4242 4242 4242\"></div>\n<div class=\"col col--6of12\"><input type=\"tel\" id=\"expiry\" name=\"expiry\" placeholder=\"MM / YY\" required autocomplete=\"cc-exp\" value=\"04 / 19\"></div>\n<div class=\"col col--6of12\"><input type=\"tel\" id=\"cvc\" name=\"cvc\" placeholder=\"CVC\" required value=\"830\"></div>\n</div>\n\n<label for=\"billing_street\">Billing Address</label>\n<div class=\"grid\" data-billing-address-form>\n<div class=\"col col--8of12\"><input type=\"text\" id=\"billing_street\" name=\"billing_street\" placeholder=\"Street address\" required autocomplete=\"street-address\" value=\"5310 Rue de Mentana, 205\"></div>\n<div class=\"col col--4of12\"><input type=\"tel\" id=\"billing_zip\" name=\"billing_zip\" placeholder=\"Zip\" required autocomplete=\"postal-code\" value=\"H2J 3C5\"></div>\n</div>\n\n<button type=\"submit\">Review Order</button>\n<!-- <button>Pay "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.total : stack1), depth0))
    + "$</button> -->\n</form>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.cart : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["templates"]["ecom/product_edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = (helpers.if_equal || (depth0 && depth0.if_equal) || alias2).call(alias1,((stack1 = (depths[1] != null ? depths[1].model : depths[1])) != null ? stack1.vendor_shop_id : stack1),(depth0 != null ? depth0._id : depth0),{"name":"if_equal","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "selected";
},"4":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "<label for=\"sku\">SKU</label>\n<input class=\"input--underline\" type=\"text\" id=\"sku\" name=\"sku\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.sku : stack1), depth0))
    + "\">\n\n<label for=\"inventory\">Inventory</label>\n<input class=\"input--underline\" type=\"number\" id=\"inventory\" name=\"inventory\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.inventory : stack1), depth0))
    + "\">\n\n<label for=\"vendor_shop_id\">Vendor Shop</label>\n<select name=\"vendor_shop_id\" id=\"vendor_shop_id\">\n<option value=\"\">(none)</option>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.shops : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select>\n\n<input type=\"checkbox\" id=\"is_taxable\" name=\"is_taxable\" "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.is_taxable : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n<label for=\"is_taxable\">Is taxable?</label>\n<br>\n\n<input type=\"checkbox\" id=\"is_salable\" name=\"is_salable\" "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.is_salable : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n<label for=\"is_salable\">Is salable?</label>\n<br>\n";
},"useData":true,"useDepths":true});

this["templates"]["ecom/shop_edit"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<label for=\"email\">Email Address</label>\n<input class=\"input--underline\" type=\"text\" id=\"email\" name=\"email\" value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.email : stack1), depth0))
    + "\" disabled>\n";
},"useData":true});
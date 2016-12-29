this["templates"] = this["templates"] || {};

this["templates"]["answers"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p class=\"p--big text_center highlight\">\n<strong>Thanks, we'll keep in touch!</strong>\n</p>\n";
},"useData":true});

this["templates"]["cms/author"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<p class=\"p--medium hide_on_phone\">\n"
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
    + "</label>\n\n<br>\n\n<p><button class=\"\" data-save disabled>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.save : stack1), depth0))
    + "</button></p>\n<p><button class=\"button--transparent\" data-destroy>"
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
    var helper;

  return "<span class=\"tag\"><span contenteditable data-tag>"
    + container.escapeExpression(((helper = (helper = helpers.tag || (depth0 != null ? depth0.tag : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"tag","hash":{},"data":data}) : helper)))
    + "</span> <button class=\"button--transparent\" data-remove-tag><svg class=\"icon\"><use xlink:href=\"#icon-remove\"></use></svg></button></span>\n";
},"useData":true});

this["templates"]["cms/tags"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<span class=\"tag\"><span contenteditable data-tag>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span> <button class=\"button--transparent\" data-remove-tag><svg class=\"icon\"><use xlink:href=\"#icon-remove\"></use></svg></button></span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tags : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<button class=\"button--underline\" data-add-tag>+ Add new "
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</button>\n";
},"useData":true});

this["templates"]["ecom/cart"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"cart__back\" data-hide data-turbolinks=\"false\"></a>\n\n<div class=\"cart__container slider\">\n<a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"cart__close\" data-hide data-turbolinks=\"false\"><svg class=\"icon-close\"><use xlink:href=\"/build/images/icons.svg#icon-close\"></use></svg></a>\n\n<div class=\"slider__markers\">\n<button class=\"slider__marker "
    + ((stack1 = (helpers.if_equal || (depth0 && depth0.if_equal) || alias2).call(alias1,(depth0 != null ? depth0.current_slide : depth0),0,{"name":"if_equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-slide-marker=0 "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.order : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">0</button>\n<button class=\"slider__marker "
    + ((stack1 = (helpers.if_equal || (depth0 && depth0.if_equal) || alias2).call(alias1,(depth0 != null ? depth0.current_slide : depth0),1,{"name":"if_equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-slide-marker=1 "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.order : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">1</button>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.order : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>\n\n<div class=\"slider__container "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.order : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "\" data-slider-container>\n<div class=\"slide\" data-slide=0 style=\"transform: translateX(-"
    + alias4(((helper = (helper = helpers.current_slide || (depth0 != null ? depth0.current_slide : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_slide","hash":{},"data":data}) : helper)))
    + "00%);\">\n<div class=\"grid grid--tight_guttered grid--middle grid--center\" data-slide-content>\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.available_store_credit : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div class=\"col col--7of12 col--phone--10of12 small_bottom\">\nSubtotal: "
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.sub_total : stack1),{"name":"money","hash":{},"data":data}))
    + " <span class=\"spaced\"></span>\nTaxes: "
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.taxes_total : stack1),{"name":"money","hash":{},"data":data}))
    + "<br>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.with_store_credit : stack1),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<strong>Total: "
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.total : stack1),{"name":"money","hash":{},"data":data}))
    + "</strong>\n</div>\n</div>\n\n<button class=\"overlay__button\" data-next-slide-button>Next</button>\n</div>\n\n<div class=\"slide\" data-slide=1 style=\"transform: translateX(-"
    + alias4(((helper = (helper = helpers.current_slide || (depth0 != null ? depth0.current_slide : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_slide","hash":{},"data":data}) : helper)))
    + "00%);\">\n<div class=\"grid grid--tight_guttered grid--middle grid--center\" data-slide-content>\n<div class=\"col col--12of12 text_center\">\n\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<p>All fields are required</p>\n</div>\n\n\n<div class=\"col col--12of12\">\n<div class=\"padded padded--tight light_grey_back\">\n<form class=\"grid grid--tight_guttered grid--middle grid--center\" data-login-form>\n<div class=\"col col--2of12\">\n<label for=\"email\">"
    + alias4(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.email_label : stack1), depth0))
    + "</label>\n</div>\n<div class=\"col col--10of12\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1._id : stack1),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(27, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n\n"
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1._id : stack1),{"name":"unless","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</form>\n</div>\n</div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.total : stack1),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n<div class=\"col col--7of12 col--phone--10of12 small_bottom\">\nSubtotal: "
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.sub_total : stack1),{"name":"money","hash":{},"data":data}))
    + " <span class=\"spaced\"></span>\nTaxes: "
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.taxes_total : stack1),{"name":"money","hash":{},"data":data}))
    + "<br>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.with_store_credit : stack1),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<strong>Total: "
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.total : stack1),{"name":"money","hash":{},"data":data}))
    + "</strong>\n</div>\n</div>\n\n<button class=\"overlay__button\" data-create-order "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.requires_user : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">Pay "
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.total : stack1),{"name":"money","hash":{},"data":data}))
    + "</button>\n</div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.order : depth0),{"name":"if","hash":{},"fn":container.program(49, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n\n\n\n\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "slider__marker--active";
},"4":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<button class=\"slider__marker "
    + ((stack1 = (helpers.if_equal || (depth0 && depth0.if_equal) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.current_slide : depth0),2,{"name":"if_equal","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-slide-marker=2>2</button>";
},"8":function(container,depth0,helpers,partials,data) {
    return "slider__container--3";
},"10":function(container,depth0,helpers,partials,data) {
    return "slider__container--2";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_in_array || (depth0 && depth0.if_in_array) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.product : depth0)) != null ? stack1.tags : stack1),"workshop",{"name":"if_in_array","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "\n<h4 class=\"col col--12of12 text_center\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<br>With "
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.product : depth0)) != null ? stack1.metadata : stack1)) != null ? stack1.designer : stack1), depth0))
    + "</h4>\n<div class=\"col col--4of12 text_right\">Amount:</div>\n<div class=\"col col--8of12\">"
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"money","hash":{},"data":data}))
    + " per ticket</div>\n<div class=\"col col--4of12 text_right\">When:</div>\n<div class=\"col col--8of12\">"
    + alias4((helpers.datetime || (depth0 && depth0.datetime) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.product : depth0)) != null ? stack1.metadata : stack1)) != null ? stack1.date : stack1),{"name":"datetime","hash":{},"data":data}))
    + "</div>\n<div class=\"col col--4of12 text_right\">Where:</div>\n<div class=\"col col--8of12\"><a href=\""
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.product : depth0)) != null ? stack1.metadata : stack1)) != null ? stack1.location_link : stack1), depth0))
    + "\" target=\"_blank\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.product : depth0)) != null ? stack1.metadata : stack1)) != null ? stack1.location : stack1), depth0))
    + "</a></div>\n\n<div class=\"col col--12of12\">\n<div class=\"padded padded--tight light_grey_back medium_bottom\">\n<div class=\"grid grid--tight_guttered grid--middle grid--center\">\n<div class=\"col col--7of12 col--phone--8of12 text_right\">\nHow many tickets do you need?\n</div>\n<div class=\"col col--3of12\">\n<input type=\"tel\" name=\"quantity\" data-item-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\" class=\"input--tight flat_bottom\">\n</div>\n<div class=\"col col--1of12\">\n<button class=\"button--transparent\" data-remove-from-cart data-item-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\"><svg class=\"icon\"><use xlink:href=\"#icon-x\"></use></svg></button>\n</div>\n</div>\n</div>\n</div>\n\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<div class=\"col col--4of12\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.vendor_shop : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"col col--2of12\"><input type=\"tel\" name=\"quantity\" data-item-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\" class=\"input--tight flat_bottom\"></div>\n<div class=\"col col--4of12\">"
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + " x "
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"money","hash":{},"data":data}))
    + " = "
    + alias4((helpers.money || (depth0 && depth0.money) || alias2).call(alias1,(depth0 != null ? depth0.sub_total : depth0),{"name":"money","hash":{},"data":data}))
    + "</div>\n<div class=\"col col--1of12\"><button class=\"button--transparent\" data-remove-from-cart data-item-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\"><svg class=\"icon\"><use xlink:href=\"#icon-x\"></use></svg></button></div>\n\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<strong>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.vendor_shop : depth0)) != null ? stack1.name : stack1), depth0))
    + ":</strong> ";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"col col--12of12\">\n<input type=\"checkbox\" id=\"with_store_credit\" name=\"with_store_credit\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.with_store_credit : stack1),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n<label for=\"with_store_credit\">With store credit ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.available_store_credit : stack1), depth0))
    + ")</label>\n</div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "checked";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "Store credit: -"
    + container.escapeExpression((helpers.money || (depth0 && depth0.money) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.store_credit_total : stack1),{"name":"money","hash":{},"data":data}))
    + "<br>";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h4>\n"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "<br>With "
    + alias4(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.product : depth0)) != null ? stack1.metadata : stack1)) != null ? stack1.designer : stack1), depth0))
    + " <small>X "
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "</small><br>\n</h4>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"grid grid--middle grid--nowrap\">\n<input type=\"email\" id=\"email\" name=\"email\" value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), depth0))
    + "\" disabled>\n<a href=\"#\" class=\"button--transparent\" data-logout>Logout</a>\n</div>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<input type=\"email\" id=\"email\" name=\"email\" value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.email : stack1), depth0))
    + "\" required autocomplete=\"off\" placeholder=\"email.address@gmail.com\">\n";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"col col--2of12 "
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.requires_user : stack1),{"name":"unless","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-password-box>\n<label for=\"password\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.pieces : depth0)) != null ? stack1.admin : stack1)) != null ? stack1.password_label : stack1), depth0))
    + "</label>\n</div>\n<div class=\"col col--10of12 "
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.requires_user : stack1),{"name":"unless","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-password-box>\n<div class=\"grid grid--nowrap\">\n<input type=\"password\" id=\"password\" name=\"password\" value=\"\" required autocomplete=\"new-password\" placeholder=\"********\">\n<button type=\"submit\" class=\"button--transparent spaced\">Login</button>\n</div>\n</div>\n";
},"30":function(container,depth0,helpers,partials,data) {
    return "hide";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<form class=\"col col--12of12\" id=\"credit_card_form\" data-credit-card-form "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.requires_user : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n<div class=\"padded padded--tight\">\n<div class=\"grid grid--tight_guttered grid--middle\">\n<div class=\"col col--2of12\">\n<label for=\"number\">Credit Card No.</label>\n</div>\n<div class=\"col col--10of12\">\n<input type=\"tel\" id=\"number\" name=\"number\" placeholder=\"4242 4242 4242 4242\" required autocomplete=\"cc-number\" value=\""
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n</div>\n\n<div class=\"col col--2of12\">\n<label for=\"expiry\">Exp. Date</label>\n</div>\n<div class=\"col col--4of12\">\n<input type=\"tel\" id=\"expiry\" name=\"expiry\" placeholder=\"MM / YY\" required autocomplete=\"cc-exp\" value=\""
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n</div>\n\n<div class=\"col col--2of12 text_right\">\n<label for=\"cvc\">CCV</label>\n</div>\n<div class=\"col col--4of12\">\n<input type=\"tel\" id=\"cvc\" name=\"cvc\" placeholder=\"123\" required value=\""
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(37, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n</div>\n\n<div class=\"col col--12of12\"></div>\n\n<div class=\"col col--2of12\">\n<label for=\"billing_street\">Billing Street</label>\n</div>\n<div class=\"col col--10of12\">\n<input type=\"text\" id=\"billing_street\" name=\"billing_street\" placeholder=\"1234 Your billing address ave.\" required autocomplete=\"street-address\" value=\""
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n</div>\n\n<div class=\"col col--2of12\">\n<label for=\"billing_zip\">Billing Zip</label>\n</div>\n<div class=\"col col--4of12\">\n<input type=\"text\" id=\"billing_zip\" name=\"billing_zip\" placeholder=\"X0X 0X0\" required autocomplete=\"postal-code\" value=\""
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(44, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n</div>\n</div>\n</div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1),{"name":"if","hash":{},"fn":container.program(47, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</form>\n";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1)) != null ? stack1.brand : stack1), depth0))
    + " **** **** **** "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1)) != null ? stack1.last4 : stack1), depth0));
},"35":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1)) != null ? stack1.exp_month : stack1), depth0))
    + " / "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1)) != null ? stack1.exp_year : stack1), depth0));
},"37":function(container,depth0,helpers,partials,data) {
    return "***";
},"39":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1)) != null ? stack1.billing_street : stack1),{"name":"if","hash":{},"fn":container.program(40, data, 0),"inverse":container.program(42, data, 0),"data":data})) != null ? stack1 : "");
},"40":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1)) != null ? stack1.billing_street : stack1), depth0));
},"42":function(container,depth0,helpers,partials,data) {
    return "–";
},"44":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1)) != null ? stack1.billing_zip : stack1),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.program(42, data, 0),"data":data})) != null ? stack1 : "");
},"45":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.credit_card : stack1)) != null ? stack1.billing_zip : stack1), depth0));
},"47":function(container,depth0,helpers,partials,data) {
    return "<div class=\"small_bottom text_center\"><a data-reset-credit-card-form>Use different credit card?</a></div>";
},"49":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"slide\" data-slide=2 style=\"transform: translateX(-"
    + container.escapeExpression(((helper = (helper = helpers.current_slide || (depth0 != null ? depth0.current_slide : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"current_slide","hash":{},"data":data}) : helper)))
    + "00%);\">\n<div class=\"padded padded--thick\" data-slide-content>\n<div class=\"text_center\">\n<h4>Thank you!</h4>\n\n<p class=\"p--medium\">We've emailed your receipt and all the details of this order to:<br>\n<a href=\"mailto:"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.email : stack1),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.program(52, data, 0),"data":data})) != null ? stack1 : "")
    + "\" class=\"a--underline\">"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.email : stack1),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.program(52, data, 0),"data":data})) != null ? stack1 : "")
    + "</a></p>\n</div>\n</div>\n</div>\n";
},"50":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.cart : depth0)) != null ? stack1.email : stack1), depth0));
},"52":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), depth0));
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

this["templates"]["freelancers/admin"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input type=\"file\" class=\"hide\" data-image-input>\n\n<div class=\"col\">\n<button class=\"button--medium\" data-save disabled>Save Profile</button>\n</div>\n";
},"useData":true});

this["templates"]["freelancers/edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<span class=\"highlight\">Your password has been successfully updated.</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.session : depth0)) != null ? stack1.token_id : stack1),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<label for=\"password\" class=\"label--inside\">New Password</label>\n<input type=\"password\" id=\"password\" name=\"password\" value=\"\" required autocomplete=\"off\" placeholder=\"********\">\n\n<button class=\"button--full button--highlight button--medium normal_bottom\" type=\"submit\">Edit Password</button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "<label for=\"current_password\" class=\"label--inside\">Current Password</label>\n<input type=\"password\" id=\"current_password\" name=\"current_password\" value=\"\" required autocomplete=\"off\" placeholder=\"********\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"login__back\" data-hide data-turbolinks=\"false\"></a>\n\n<div class=\"slider login__container\">\n<a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"login__close\" data-hide data-turbolinks=\"false\">\n<svg class=\"icon icon--big\"><use xlink:href=\"#icon-close-outline\"></use></svg>\n</a>\n\n<div class=\"slider__container\" style=\"width: 100%;\" data-slider-container>\n<form class=\"slide\" data-slide=0 data-edit-form style=\"width: 100%;\">\n<div class=\"text_center\" data-slide-content>\n<h2 class=\"h2--huge\">Edit Password</h2>\n\n<p class=\"p--tight medium_bottom\">Modify your account's password for the email address "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), depth0))
    + ".</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.password : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n</form>\n</div>\n</div>\n";
},"useData":true});

this["templates"]["freelancers/edit_box"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"grid grid--right\">\n<div class=\"col col--3of12 col--tablet_landscape--5of12 col--phone--12of12 box\">\nNeed to change your password?<br><a href=\"?edit=true\" class=\"a--underline\" data-show-edit>You can do it here</a>\n</div>\n</div>\n";
},"useData":true});

this["templates"]["freelancers/is_available"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<input type=\"checkbox\" class=\"checkbox--pill checkbox--pill--with_red\" name=\"is_available\" id=\"is_available\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.is_available : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n<label for=\"is_available\"><span class=\"checkbox--pill__label\">available</span></label>\n";
},"useData":true});

this["templates"]["freelancers/link"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col\" data-link>\n<strong>Label:</strong> <small class=\"contenteditable--small\" contenteditable data-link-label>"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</small><br>\n<strong>Url:</strong> <span contenteditable data-link-url>"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "</span>\n<button class=\"button--transparent\" data-remove-link><svg class=\"icon\"><use xlink:href=\"#icon-remove\"></use></svg></button>\n</div>\n";
},"useData":true});

this["templates"]["freelancers/links"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col\" data-link>\n<strong>Label:</strong> <small class=\"contenteditable--small\" contenteditable data-link-label>"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</small><br>\n<strong>Url:</strong> <span contenteditable data-link-url>"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "</span>\n<button class=\"button--transparent\" data-remove-link><svg class=\"icon\"><use xlink:href=\"#icon-remove\"></use></svg></button>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div class=\"col col--12of12\"><button class=\"button--underline\" data-add-link>+ Add new link</button></div>\n";
},"useData":true});

this["templates"]["freelancers/project"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div data-project>\n<div class=\"grid grid--guttered\">\n<div class=\"col col--6of12 col--medium--7of12 col--small--12of12\">\n<h4 class=\"small_bottom\" data-project-contributions contenteditable=\"\">Graphic Design / Development / etc.</h4>\n<h2 class=\"max_width max_width--text\"><a href=\"#\" data-project-title contenteditable=\"\">Project Title</a></h2>\n<p class=\"p--medium max_width max_width--text\" data-project-description contenteditable=\"\">Description, keep it short</p>\n<p class=\"\"><a href=\"#\" class=\"a--underline\" data-project-url contenteditable=\"\">https://theprojectsurl.com/</a></p>\n</div>\n\n<div class=\"col col--4of12 col--small--10of12 text_right\">\n<button class=\"button--underline red normal_bottom\" data-remove-project>Delete this project</button>\n\n<a href=\"#\"><img src=\"https://res.cloudinary.com/deming/image/fetch/f_auto,w_600,q_auto/http://fillmurray.com/800/466\" data-project-image data-image-cdn=\"https://res.cloudinary.com/deming/image/fetch/f_auto,w_600,q_auto/\" class=\"img--clickable\" alt=\"#\"></a>\n</div>\n</div>\n\n<hr>\n</div>\n";
},"useData":true});

this["templates"]["freelancers/projects"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div data-project>\n<div class=\"grid grid--guttered grid--middle\">\n<div class=\"col col--6of12 col--medium--7of12 col--small--12of12\">\n<h4 class=\"small_bottom\" data-project-contributions contenteditable>"
    + alias4(((helper = (helper = helpers.contributions || (depth0 != null ? depth0.contributions : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"contributions","hash":{},"data":data}) : helper)))
    + "</h4>\n<h2 class=\"max_width max_width--text\"><a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" data-project-title contenteditable>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></h2>\n<p class=\"p--medium max_width max_width--text\" data-project-description contenteditable>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n<p class=\"\"><a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"a--underline\" data-project-url contenteditable>"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "</a></p>\n</div>\n\n<div class=\"col col--4of12 col--small--10of12 text_right\">\n<button class=\"button--underline red normal_bottom\" data-remove-project>Delete this project</button>\n<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><img src=\"https://res.cloudinary.com/deming/image/fetch/f_auto,w_600,q_auto/"
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" data-project-image data-image-cdn=\"https://res.cloudinary.com/deming/image/fetch/f_auto,w_600,q_auto/\" class=\"img--clickable\" alt=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"></a>\n</div>\n</div>\n\n<hr>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<button class=\"button--big button--underline\" data-add-project>+ Add new project</button>\n";
},"useData":true});

this["templates"]["freelancers/route_box"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"pill\"><svg class=\"icon icon--white\"><use xlink:href=\"#icon-link\"></use></svg> avail.es/<span data-route contenteditable>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.route : stack1), depth0))
    + "</span></span>\n";
},"useData":true});

this["templates"]["user/edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<span class=\"highlight\">Your password has been successfully updated.</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.session : depth0)) != null ? stack1.token_id : stack1),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<label for=\"password\" class=\"label--inside\">New Password</label>\n<input type=\"password\" id=\"password\" name=\"password\" value=\"\" required autocomplete=\"off\" placeholder=\"********\">\n\n<button class=\"button--full button--highlight button--medium normal_bottom\" type=\"submit\">Edit Password</button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "<label for=\"current_password\" class=\"label--inside\">Current Password</label>\n<input type=\"password\" id=\"current_password\" name=\"current_password\" value=\"\" required autocomplete=\"off\" placeholder=\"********\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"login__back\" data-hide data-turbolinks=\"false\"></a>\n\n<div class=\"slider login__container\">\n<a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"login__close\" data-hide data-turbolinks=\"false\">\n<svg class=\"icon icon--big\"><use xlink:href=\"#icon-close-outline\"></use></svg>\n</a>\n\n<div class=\"slider__container\" style=\"width: 100%;\" data-slider-container>\n<form class=\"slide\" data-slide=0 data-edit-form style=\"width: 100%;\">\n<div class=\"text_center\" data-slide-content>\n<h2 class=\"h2--huge\">Edit Password</h2>\n\n<p class=\"p--tight medium_bottom\">Modify your account's password for the email address "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), depth0))
    + ".</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.password : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n</form>\n</div>\n</div>\n";
},"useData":true});

this["templates"]["user/login"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<h2 class=\"h2--huge\">Hi!</h2>\n\n<p class=\"p--tight\">Welcome back "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.first_name : stack1), depth0))
    + "."
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.is_freelancer : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.is_freelancer : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<a href=\"?\" class=\"a--underline\" data-logout>Log out</button>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " You are currently marked as "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.freelancer : stack1)) != null ? stack1.is_available : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + " for freelance work.";
},"3":function(container,depth0,helpers,partials,data) {
    return "<span class=\"green\">available</span>";
},"5":function(container,depth0,helpers,partials,data) {
    return "<span class=\"red\">not available</span>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<a href=\"/freelancers/"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.freelancer : stack1)) != null ? stack1.route : stack1), depth0))
    + "\" class=\"button button--full button--highlight button--medium small_bottom\">Edit Profile</a>";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.is_freelancer : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h2 class=\"h2--huge\">Success!</h2>\n<p class=\"p--tight medium_bottom\">Thanks "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.first_name : stack1), depth0))
    + ", we'll get back to you within 48 hours.</p>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "<h2 class=\"h2--huge medium_bottom\">Log in <a href=\"#\" class=\"dark_grey\" data-slide-marker=1>or Join</a></h2>\n\n<label for=\"email\" class=\"label--inside\">E-mail</label>\n<input type=\"email\" id=\"email\" name=\"email\" value=\"\" required autocomplete=\"email\" placeholder=\"email.address@gmail.com\">\n\n<label for=\"password\" class=\"label--inside\">Password</label>\n<input type=\"password\" id=\"password\" name=\"password\" value=\"\" required autocomplete=\"off\" placeholder=\"********\">\n\n<button class=\"button--full button--highlight button--medium normal_bottom\" type=\"submit\">Log in</button>\n\n<a href=\"#\" class=\"a--underline\" data-slide-marker=2>Forgot password?</a>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"col col--6of12\">\n<strong class=\"small\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</strong><br>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tags : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<input type=\"checkbox\" class=\"checkbox--pill\" name=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\n<label for=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</label><br>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"login__back\" data-hide data-turbolinks=\"false\"></a>\n\n<div class=\"slider login__container\">\n<a href=\""
    + alias4(((helper = (helper = helpers.current_path || (depth0 != null ? depth0.current_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current_path","hash":{},"data":data}) : helper)))
    + "\" class=\"login__close\" data-hide data-turbolinks=\"false\">\n<svg class=\"icon icon--big\"><use xlink:href=\"#icon-close-outline\"></use></svg>\n</a>\n\n<div class=\"slider__container\" style=\"width: 300%;\" data-slider-container>\n<form class=\"slide\" data-slide=0 data-login-form style=\"width: 33.333%;\">\n<div class=\"text_center\" data-slide-content>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1._id : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n</form>\n\n<form class=\"text_center slide\" data-slide=1 data-signup-form style=\"width: 33.333%;\">\n<div class=\"text_center\" data-slide-content>\n<h2 class=\"h2--huge\"><a href=\"#\" class=\"dark_grey\" data-slide-marker=0>Log in</a> or Join</h2>\n\n<p class=\"p--tight normal_bottom\">Fill out this form to apply for a spot on Available Not Available and we'll get back to you within 48 hours.</p>\n\n<div class=\"text_left normal_bottom\" data-tags>\n<label for=\"tags\">Your are a?</label>\n\n<div class=\"grid\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div class=\"col col--6of12 col--small--12of12\">\n<br>\n<p class=\"p--tight small\">If yours missing from the list, <a href=\"mailto:makesaturdays@gmail.com\" class=\"a--underline\">let us know</a>.</p>\n</div>\n</div>\n</div>\n\n<label for=\"signup_email\" class=\"label--inside\">E-mail</label>\n<input type=\"email\" id=\"signup_email\" name=\"email\" required autocomplete=\"email\" placeholder=\"email.address@gmail.com\">\n\n<div class=\"grid grid--tight_guttered\">\n<div class=\"col col--6of12\">\n<label for=\"first_name\" class=\"label--inside\">First Name</label>\n<input type=\"text\" name=\"first_name\" id=\"first_name\" required placeholder=\"Charles\">\n</div>\n\n<div class=\"col col--6of12\">\n<label for=\"last_name\" class=\"label--inside\">Last Name</label>\n<input type=\"text\" name=\"last_name\" id=\"last_name\" required placeholder=\"Babbage\">\n</div>\n</div>\n\n<button class=\"button--full button--highlight button--medium normal_bottom\" type=\"submit\">Request Access</button>\n\n<a href=\"#\" class=\"a--underline\" data-slide-marker=0>You already have an account?</a>\n</div>\n</form>\n\n<form class=\"text_center slide\" data-slide=2 data-forgot-password-form style=\"width: 33.333%;\">\n<div class=\"text_center\" data-slide-content>\n<h2 class=\"h2--huge\">Forgot Password?</h2>\n\n<p class=\"p--tight medium_bottom\">Enter your email address and we'll send you a temporary link where you'll be able to reset your password.</p>\n\n<div data-success>\n<label for=\"forgot_email\" class=\"label--inside\">E-mail</label>\n<input type=\"email\" id=\"forgot_email\" name=\"email\" value=\"\" required autocomplete=\"email\" placeholder=\"email.address@gmail.com\">\n\n<button class=\"button--full button--highlight button--medium normal_bottom\" type=\"submit\">Send Request</button>\n\n<a href=\"#\" class=\"a--underline\" data-slide-marker=1>Create an account</a>\n</div>\n</div>\n</form>\n</div>\n</div>\n";
},"useData":true});

this["templates"]["user/nav"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<a href=\"?login=true\" class=\"a--underline\" data-show-login>Hi, "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.first_name : stack1), depth0))
    + "</a>\n";
},"useData":true});
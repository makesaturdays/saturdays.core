(function() {
  var Backbone, Saturdays, _, jQuery;

  window.Saturdays = {
    Collections: {},
    Models: {},
    Views: {},
    Routers: {},
    settings: {
      cdn: "https://d3hy1swj29dtr7.cloudfront.net/",
      api: "http://127.0.0.1:5000/"
    },
    init: function() {
      this.session = new Saturdays.Models.Session();
      this.user = new Saturdays.Models.User();
      this.admin_view = new Saturdays.Views.Admin();
      this.router = new Saturdays.Routers.Router();
      return Backbone.history.start({
        pushState: true
      });
    }
  };

  Saturdays = window.Saturdays;

  _ = window._;

  Backbone = window.Backbone;

  jQuery = window.jQuery;

  if (window.saturdays_settings != null) {
    _.extend(Saturdays.settings, window.saturdays_settings);
  }

  $(function() {
    return Saturdays.init();
  });

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Collection = (function(superClass) {
    extend(Collection, superClass);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Saturdays.Model;

    Collection.prototype.fetch = function(options) {
      if (options == null) {
        options = {};
      }
      return Collection.__super__.fetch.call(this, Saturdays.Model.prototype.set_secret_header(options));
    };

    return Collection;

  })(Backbone.Collection);

}).call(this);

(function() {
  window.Saturdays.cookies = {
    set: function(name, value, expiry_days) {
      var d, expires;
      d = new Date();
      d.setTime(d.getTime() + (expiry_days * 24 * 60 * 60 * 1000));
      expires = "expires=" + d.toGMTString();
      return document.cookie = "X-" + name + "=" + value + "; " + expires + "; path=/";
    },
    set_for_a_session: function(name, value) {
      return document.cookie = "X-" + name + "=" + value + "; path=/";
    },
    get: function(name) {
      var cookie, cookies, fn, i, len, value;
      name = "X-" + name + "=";
      value = false;
      cookies = document.cookie.split(';');
      fn = function(cookie) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
          return value = cookie.substring(name.length, cookie.length);
        }
      };
      for (i = 0, len = cookies.length; i < len; i++) {
        cookie = cookies[i];
        fn(cookie);
      }
      if (!value) {
        value = null;
      }
      return value;
    },
    "delete": function(name) {
      return document.cookie = 'X-' + name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }
  };

}).call(this);

(function() {
  Saturdays.helpers = {
    upload: function(file, options) {
      var data;
      if (options == null) {
        options = {};
      }
      data = new FormData();
      data.append("file", file);
      return $.ajax({
        type: "POST",
        url: Saturdays.settings.api + "_upload",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        headers: {
          "X-Session-Secret": Saturdays.cookies.get("Session-Secret")
        },
        success: function(response) {
          if (options.success != null) {
            return options.success(response);
          }
        }
      });
    },
    get_query_string: function() {
      var m, query_string, regex, result;
      result = {};
      query_string = location.search.slice(1);
      regex = /([^&=]+)=([^&]*)/g;
      m = null;
      while ((m = regex.exec(query_string))) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      return result;
    }
  };

  String.prototype.capitalize = function() {
    var array, string;
    array = this.split(" ");
    string = "";
    _.each(array, function(piece) {
      return string += piece.charAt(0).toUpperCase() + piece.slice(1) + " ";
    });
    return string.trim();
  };

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Model = (function(superClass) {
    extend(Model, superClass);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.urlRoot = Saturdays.settings.api + "models";

    Model.prototype.idAttribute = "_id";

    Model.prototype.save = function(data, options, local_only) {
      var e;
      if (options == null) {
        options = {};
      }
      if (local_only == null) {
        local_only = false;
      }
      if (this.local_storage != null) {
        this.set(data);
        try {
          localStorage.setItem(this.local_storage, JSON.stringify(this.toJSON()));
        } catch (_error) {
          e = _error;
          console.log("Warning: localStorage is disabled");
        }
      }
      if (local_only) {
        if (options.success != null) {
          return options.success(this, this.toJSON());
        }
      } else {
        return Model.__super__.save.call(this, data, this.set_secret_header(options));
      }
    };

    Model.prototype.fetch = function(options) {
      if (options == null) {
        options = {};
      }
      if ((this.local_storage != null) && (localStorage.getItem(this.local_storage) != null)) {
        this.set(this.parse(JSON.parse(localStorage.getItem(this.local_storage))));
      }
      if (this.id != null) {
        return Model.__super__.fetch.call(this, this.set_secret_header(options));
      }
    };

    Model.prototype.destroy = function(options) {
      if (options == null) {
        options = {};
      }
      if (this.local_storage != null) {
        localStorage.removeItem(this.local_storage);
      }
      return Model.__super__.destroy.call(this, this.set_secret_header(options));
    };

    Model.prototype.clear = function() {
      if (this.local_storage != null) {
        localStorage.removeItem(this.local_storage);
      }
      return Model.__super__.clear.call(this);
    };

    Model.prototype.set_secret_header = function(options) {
      if (options.headers == null) {
        options.headers = {};
      }
      options.headers["Accept"] = "application/json";
      options.headers["X-Session-Secret"] = Saturdays.cookies.get("Session-Secret");
      return options;
    };

    return Model;

  })(Backbone.Model);

}).call(this);

(function() {
  Handlebars.registerHelper('first', function(models, options) {
    if ((models != null) && (models[0] != null)) {
      return options.fn(models[0]);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('last', function(models, options) {
    if ((models != null) && (models[models.length - 1] != null)) {
      return options.fn(models[models.length - 1]);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('get', function(model, key) {
    if ((model != null) && (model[key] != null)) {
      return model[key];
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('if_get', function(model, key, options) {
    if ((model[key] != null) && model[key]) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('unless_get', function(model, key, options) {
    if ((model[key] != null) && model[key]) {
      return null;
    } else {
      return options.fn(this);
    }
  });

  Handlebars.registerHelper('if_equal', function(left, right, options) {
    if (left === right) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('if_lower', function(left, right, options) {
    if (left < right) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('if_higher', function(left, right, options) {
    if (left > right) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('if_get_equal', function(model, key, right, options) {
    if ((model[key] != null) && model[key] === right) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('unless_equal', function(left, right, options) {
    if (left !== right) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('if_in_array', function(array, right, options) {
    if ((array != null) && _.contains(array, right)) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('date', function(date) {
    date = new Date(date);
    return date.toLocaleDateString();
  });

  Handlebars.registerHelper('if_dates_equal', function(left, right, options) {
    left = new Date(left);
    right = new Date(right);
    if (left.toLocaleDateString() === right.toLocaleDateString()) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('json', function(json) {
    return JSON.stringify(JSON.parse(json), void 0, 2);
  });

  Handlebars.registerHelper('address', function(address) {
    var address_text;
    address_text = "";
    if (address != null) {
      if (address.name != null) {
        address.first_name = address.name;
        address.last_name = "";
      }
      address_text += address.first_name + " " + address.last_name + "<br>" + address.street;
      if ((address.street_continued != null) && address.street_continued !== "") {
        address_text += address.street_continued;
      }
      address_text += " " + address.city + ", " + address.region + ", " + address.country + " " + address.zip;
    }
    return address_text;
  });

  Handlebars.registerHelper('percentage', function(value) {
    return (value * 100) + "%";
  });

  Handlebars.registerHelper('ms', function(value) {
    return (parseFloat(value)).toFixed(3) + "ms";
  });

  Handlebars.registerHelper('plus', function(left, right) {
    return left + right;
  });

  Handlebars.registerHelper('minus', function(left, right) {
    return left - right;
  });

  Handlebars.registerHelper('times', function(value, times) {
    return value * times;
  });

  Handlebars.registerHelper('divide', function(left, right) {
    return left / right;
  });

  Handlebars.registerHelper('encode_uri', function(url) {
    return encodeURIComponent(url);
  });

  Handlebars.registerHelper('first_letter', function(string) {
    if (string != null) {
      return string[0].toUpperCase();
    }
  });

  Handlebars.registerHelper('first_word', function(string) {
    if (string != null) {
      return string.split(" ")[0];
    }
  });

  Handlebars.registerHelper('name_from_email', function(email) {
    if (email != null) {
      return email.split("@")[0];
    }
  });

  Handlebars.registerHelper('first_name_from_name', function(name) {
    if (name != null) {
      return name.split(" ")[0];
    }
  });

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.View = (function(superClass) {
    extend(View, superClass);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.template = null;

    View.prototype.templates = null;

    View.prototype.data = {};

    View.prototype.events = {};

    View.prototype.initialize = function() {
      if (Saturdays.session != null) {
        this.listenTo(Saturdays.session, "sync", this.render);
      }
      if (Saturdays.user != null) {
        this.listenTo(Saturdays.user, "sync", this.render);
      }
      _.extend(this.data, {
        pieces: window.pieces
      });
      return this.render();
    };

    View.prototype.render = function() {
      var html;
      _.extend(this.data, Saturdays.session != null ? {
        session: Saturdays.session.toJSON()
      } : void 0, Saturdays.user != null ? {
        user: Saturdays.user.toJSON()
      } : void 0, Saturdays.session != null ? {
        is_authenticated: Saturdays.session.has("user_id")
      } : void 0);
      if (this.templates != null) {
        html = "";
        _.each(this.templates, (function(_this) {
          return function(template) {
            return html += template(_this.data);
          };
        })(this));
        this.$el.html(html);
      } else {
        if (this.template != null) {
          this.$el.html(this.template(this.data));
        }
      }
      View.__super__.render.call(this);
      $(document.links).filter(function() {
        return this.hostname !== window.location.hostname;
      }).attr('target', '_blank');
      this.delegateEvents();
      return this;
    };

    return View;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Models.Author = (function(superClass) {
    extend(Author, superClass);

    function Author() {
      return Author.__super__.constructor.apply(this, arguments);
    }

    Author.prototype.urlRoot = Saturdays.settings.api + "authors";

    return Author;

  })(Saturdays.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Models.List = (function(superClass) {
    extend(List, superClass);

    function List() {
      return List.__super__.constructor.apply(this, arguments);
    }

    List.prototype.urlRoot = Saturdays.settings.api + "lists";

    return List;

  })(Saturdays.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Models.ListPost = (function(superClass) {
    extend(ListPost, superClass);

    function ListPost() {
      return ListPost.__super__.constructor.apply(this, arguments);
    }

    return ListPost;

  })(Saturdays.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Models.Piece = (function(superClass) {
    extend(Piece, superClass);

    function Piece() {
      return Piece.__super__.constructor.apply(this, arguments);
    }

    Piece.prototype.urlRoot = Saturdays.settings.api + "pieces";

    return Piece;

  })(Saturdays.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Models.Survey = (function(superClass) {
    extend(Survey, superClass);

    function Survey() {
      return Survey.__super__.constructor.apply(this, arguments);
    }

    Survey.prototype.urlRoot = Saturdays.settings.api + "surveys";

    return Survey;

  })(Saturdays.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Models.SurveyAnswer = (function(superClass) {
    extend(SurveyAnswer, superClass);

    function SurveyAnswer() {
      return SurveyAnswer.__super__.constructor.apply(this, arguments);
    }

    return SurveyAnswer;

  })(Saturdays.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Models.Product = (function(superClass) {
    extend(Product, superClass);

    function Product() {
      return Product.__super__.constructor.apply(this, arguments);
    }

    Product.prototype.urlRoot = Saturdays.settings.api + "products";

    return Product;

  })(Saturdays.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Models.Session = (function(superClass) {
    extend(Session, superClass);

    function Session() {
      return Session.__super__.constructor.apply(this, arguments);
    }

    Session.prototype.urlRoot = Saturdays.settings.api + "sessions";

    Session.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      return this.set({
        secret: Saturdays.cookies.get("Session-Secret"),
        user_id: Saturdays.cookies.get("User-Id")
      });
    };

    Session.prototype.login = function(data, options) {
      if (data == null) {
        data = {};
      }
      if (options == null) {
        options = {};
      }
      return Saturdays.session.save(data, {
        success: function(model, response) {
          Saturdays.cookies.set("Session-Secret", response.secret);
          Saturdays.cookies.set("User-Id", response.user_id);
          return Saturdays.user.initialize();
        }
      });
    };

    Session.prototype.logout = function() {
      this.clear();
      Saturdays.user.clear();
      Saturdays.cookies["delete"]("Session-Secret");
      Saturdays.cookies["delete"]("User-Id");
      return window.location = window.location;
    };

    Session.prototype.is_authenticated = function() {
      return Saturdays.cookies.get("User-Id") != null;
    };

    return Session;

  })(Saturdays.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Models.User = (function(superClass) {
    extend(User, superClass);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.urlRoot = Saturdays.settings.api + "users";

    User.prototype.initialize = function(options) {
      var user_id;
      if (options == null) {
        options = {};
      }
      user_id = Saturdays.cookies.get("User-Id");
      if (user_id != null) {
        this.set({
          _id: user_id
        });
        return this.fetch();
      }
    };

    return User;

  })(Saturdays.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Collections.Authors = (function(superClass) {
    extend(Authors, superClass);

    function Authors() {
      return Authors.__super__.constructor.apply(this, arguments);
    }

    Authors.prototype.url = Saturdays.settings.api + "authors";

    Authors.prototype.model = Saturdays.Models.Author;

    return Authors;

  })(Backbone.Collection);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Views.Editable = (function(superClass) {
    extend(Editable, superClass);

    function Editable() {
      return Editable.__super__.constructor.apply(this, arguments);
    }

    Editable.prototype.edit_admin_template = templates["admin/edit_admin"];

    Editable.prototype.tag_input_template = templates["admin/tag_input"];

    Editable.prototype.tag_template = templates["admin/tag"];

    Editable.prototype.initialize = function() {
      this.events["click .js-save_edit"] = "save_edit";
      this.events["click .js-destroy"] = "destroy";
      this.events["keypress [name='tag_input']"] = "input_tag";
      this.events["blur [name='tag_input']"] = "blur_tag";
      this.listenTo(this.model, "sync", this.render);
      this.model.set({
        _id: this.$el.attr("data-id")
      });
      this.model.fetch();
      return Editable.__super__.initialize.call(this);
    };

    Editable.prototype.render = function() {
      _.extend(this.data, {
        model: this.model.toJSON()
      });
      Editable.__super__.render.call(this);
      if (this.data.is_authenticated) {
        this.$el.find("[data-tag]").attr("contenteditable", "true");
        this.$el.find("[data-tag-input]").html(this.tag_input_template(this.data));
        this.$el.find("[data-admin]").html(this.edit_admin_template(this.data));
        this.delegateEvents();
      }
      return this;
    };

    Editable.prototype.save_edit = function(e) {
      var tags;
      this.model.set({
        is_online: this.$el.find("[name='is_online']")[0].checked
      });
      tags = [];
      this.$el.find("[data-tag]").each((function(_this) {
        return function(index, tag) {
          return tags.push(tag.innerHTML);
        };
      })(this));
      this.model.attributes.tags = tags;
      return this.model.save();
    };

    Editable.prototype.destroy = function() {
      if (confirm("Are you sure?")) {
        return this.model.destroy({
          success: function(model, response) {
            return window.location = "/lists/" + window.list_route;
          }
        });
      }
    };

    Editable.prototype.input_tag = function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        return this.insert_tag(e.currentTarget);
      }
    };

    Editable.prototype.blur_tag = function(e) {
      var value;
      value = e.currentTarget.value.trim();
      if (value !== "") {
        e.preventDefault();
        this.insert_tag(e.currentTarget);
        return $(e.currentTarget).focus();
      }
    };

    Editable.prototype.insert_tag = function(target) {
      var fn, i, len, value, values;
      values = target.value.trim().split(",");
      fn = (function(_this) {
        return function(value) {
          return $(_this.tag_template({
            tag: value.trim().toLowerCase()
          })).insertBefore($(target).parent());
        };
      })(this);
      for (i = 0, len = values.length; i < len; i++) {
        value = values[i];
        fn(value);
      }
      return target.value = "";
    };

    return Editable;

  })(Saturdays.View);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Views.Admin = (function(superClass) {
    extend(Admin, superClass);

    function Admin() {
      this.check_escape = bind(this.check_escape, this);
      return Admin.__super__.constructor.apply(this, arguments);
    }

    Admin.prototype.el = $("#admin");

    Admin.prototype.template = templates["admin/admin"];

    Admin.prototype.events = {
      "submit .js-submit_login": "submit_login",
      "click .js-show_new_post": "show_new_post",
      "submit .js-new_post_form": "submit_new_post_form",
      "click .js-logout": "logout"
    };

    Admin.prototype.initialize = function() {
      $(document).on("keyup", this.check_escape);
      return Admin.__super__.initialize.call(this);
    };

    Admin.prototype.render = function() {
      return Admin.__super__.render.call(this);
    };

    Admin.prototype.submit_login = function(e) {
      e.preventDefault();
      return Saturdays.session.login({
        email: e.currentTarget["email"].value,
        password: e.currentTarget["password"].value
      });
    };

    Admin.prototype.logout = function(e) {
      e.preventDefault();
      return Saturdays.session.logout();
    };

    Admin.prototype.show_new_post = function(e) {
      this.$el.find(".js-show_new_post").addClass("hide");
      return this.$el.find(".js-new_post_form").removeClass("hide");
    };

    Admin.prototype.submit_new_post_form = function(e) {
      var model;
      e.preventDefault();
      model = new Saturdays.Models.ListPost();
      model.urlRoot = Saturdays.settings.api + "lists/" + window.list_id + "/posts";
      return model.save({
        title: e.currentTarget["title"].value.trim(),
        route: e.currentTarget["route"].value.trim().toLowerCase()
      }, {
        success: function(model, response) {
          return window.location = "/lists/blog/posts/" + model.attributes.route;
        }
      });
    };

    Admin.prototype.check_escape = function(e) {
      var login_box;
      if (e.keyCode === 27) {
        login_box = this.$el.find(".js-login_box");
        if (login_box.hasClass("hide")) {
          login_box.removeClass("hide");
          return login_box.find("[name='email']").focus();
        } else {
          login_box.addClass("hide");
          if (Saturdays.session.is_authenticated()) {
            return Saturdays.session.logout();
          }
        }
      }
    };

    return Admin;

  })(Saturdays.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Views.Piece = (function(superClass) {
    extend(Piece, superClass);

    function Piece() {
      return Piece.__super__.constructor.apply(this, arguments);
    }

    Piece.prototype.piece_admin_template = templates["admin/piece_admin"];

    Piece.prototype.events = {
      "click .js-save_piece": "save_piece",
      "click [data-key]": "prevent_click"
    };

    Piece.prototype.initialize = function() {
      this.listenTo(this.model, "sync", this.render);
      this.model.fetch();
      return Piece.__super__.initialize.call(this);
    };

    Piece.prototype.render = function() {
      Piece.__super__.render.call(this);
      if (this.data.is_authenticated) {
        this.$el.find("[data-key]").attr("contenteditable", "true");
        this.$el.find("[data-piece-admin]").html(this.piece_admin_template(this.data));
      }
      return this;
    };

    Piece.prototype.save_piece = function(e) {
      e.preventDefault();
      this.$el.find("[data-key]").each((function(_this) {
        return function(index, key) {
          return _this.model.attributes.content[key.getAttribute("data-key")].value = key.innerHTML;
        };
      })(this));
      return this.model.save();
    };

    Piece.prototype.prevent_click = function(e) {
      if (this.data.is_authenticated) {
        return e.preventDefault();
      }
    };

    return Piece;

  })(Saturdays.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Views.Post = (function(superClass) {
    extend(Post, superClass);

    function Post() {
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.author_input_template = templates["admin/author_input"];

    Post.prototype.author_template = templates["admin/author"];

    Post.prototype.events = {
      "click .js-maximize": "maximize",
      "click .js-minimize": "minimize",
      "drop [data-is-markdown]": "drop_image"
    };

    Post.prototype.initialize = function() {
      if (Saturdays.authors == null) {
        Saturdays.authors = new Saturdays.Collections.Authors();
      }
      this.listenTo(Saturdays.authors, "sync", this.render);
      Saturdays.authors.fetch();
      return Post.__super__.initialize.call(this);
    };

    Post.prototype.render = function() {
      _.extend(this.data, {
        authors: Saturdays.authors.toJSON()
      });
      Post.__super__.render.call(this);
      if (this.data.is_authenticated) {
        this.$el.find("[data-title]").attr("contenteditable", "true");
        this.$el.find("[data-published-date]").attr("contenteditable", "true");
        this.$el.find("[data-content-key]").attr("contenteditable", "true");
        this.$el.find("[data-author-input]").html(this.author_input_template(this.data));
        this.delegateEvents();
      }
      return this;
    };

    Post.prototype.save_edit = function(e) {
      var value;
      this.model.set({
        title: this.$el.find("[data-title]").html(),
        published_date: this.$el.find("[data-published-date]").html(),
        authors: this.$el.find("[name='authors']").val()
      });
      value = "";
      this.$el.find("[data-content-key]").each((function(_this) {
        return function(index, content) {
          value = content.innerHTML;
          if (content.getAttribute("data-is-markdown") != null) {
            value = toMarkdown(content.innerHTML);
            content.innerHTML = marked(value);
          }
          return _this.model.attributes.content[content.getAttribute("data-content-key")].value = value;
        };
      })(this));
      return Post.__super__.save_edit.call(this);
    };

    Post.prototype.maximize = function(e) {
      e.preventDefault();
      $(e.currentTarget).addClass("hide");
      this.$el.find(".js-minimize").removeClass("hide");
      this.$el.find(".blog__post__content").removeClass("blog__post__content--minimized");
      return Saturdays.router.navigate(e.currentTarget.getAttribute("href"));
    };

    Post.prototype.minimize = function(e) {
      e.preventDefault();
      $(e.currentTarget).addClass("hide");
      this.$el.find(".js-maximize").removeClass("hide");
      this.$el.find(".blog__post__content").addClass("blog__post__content--minimized");
      return Saturdays.router.navigate("/lists/blog");
    };

    Post.prototype.drop_image = function(e) {
      var file;
      e.preventDefault();
      e.stopPropagation();
      file = e.originalEvent.dataTransfer.files[0];
      if (file.type.match('image.*')) {
        return Saturdays.helpers.upload(file, {
          success: function(response) {
            return $(e.target).before("<p>![" + response.file_name + "](" + Saturdays.settings.cdn + response.url + ")</p>");
          }
        });
      }
    };

    return Post;

  })(Saturdays.Views.Editable);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Views.Product = (function(superClass) {
    extend(Product, superClass);

    function Product() {
      return Product.__super__.constructor.apply(this, arguments);
    }

    Product.prototype.product_edit_admin_template = templates["admin/product_edit_admin"];

    Product.prototype.events = {};

    Product.prototype.initialize = function() {
      return Product.__super__.initialize.call(this);
    };

    Product.prototype.render = function() {
      Product.__super__.render.call(this);
      if (this.data.is_authenticated) {
        this.$el.find("[data-name]").attr("contenteditable", "true");
        this.$el.find("[data-price]").attr("contenteditable", "true");
        this.$el.find("[data-description]").attr("contenteditable", "true");
        this.$el.find("[data-product-admin]").html(this.product_edit_admin_template(this.data));
        this.delegateEvents();
      }
      return this;
    };

    Product.prototype.save_edit = function(e) {
      this.model.set({
        name: this.$el.find("[data-name]").html(),
        price: parseFloat(this.$el.find("[data-price]").text()),
        description: this.$el.find("[data-description]").html()
      });
      return Product.__super__.save_edit.call(this);
    };

    return Product;

  })(Saturdays.Views.Editable);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Views.Survey = (function(superClass) {
    extend(Survey, superClass);

    function Survey() {
      return Survey.__super__.constructor.apply(this, arguments);
    }

    Survey.prototype.el = $(".js-survey");

    Survey.prototype.events = {
      "focus .js-input": "focus_input",
      "submit .js-form": "submit_form",
      "click .js-reset": "reset"
    };

    Survey.prototype.initialize = function() {
      this.answers = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: pieces.survey.answers
      });
      this.survey = new Saturdays.Models.Survey({
        "_id": "56b60e72f5f9e96ffb235c64"
      });
      this.survey.fetch();
      return this.listenTo(this.survey, "sync", this.render);
    };

    Survey.prototype.render = function() {
      var answers, count, highest_count, key, second_answers;
      if (localStorage.getItem("survey_answer") != null) {
        answers = this.survey.get("questions")[0]["answers"];
        second_answers = this.survey.get("questions")[1]["answers"];
        highest_count = 0;
        for (key in answers) {
          count = answers[key];
          if (second_answers[key] != null) {
            answers[key] = answers[key] + second_answers[key];
            delete second_answers[key];
          }
        }
        for (key in second_answers) {
          count = second_answers[key];
          answers[key] = second_answers[key];
        }
        for (key in answers) {
          count = answers[key];
          if (answers[key] > highest_count) {
            highest_count = answers[key];
          }
        }
        this.$el.find(".js-answers").html(templates["answers"]({
          answers: answers,
          highest_count: highest_count
        }));
        this.$el.find(".js-results").removeClass("hide");
        setTimeout((function(_this) {
          return function() {
            return _this.$el.find(".js-results").removeClass("fade_out");
          };
        })(this), 1);
      } else {
        $("body").removeClass("white_back");
        this.$el.find(".js-questions").removeClass("hide");
        this.$el.find(".js-typeahead").typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        }, {
          source: this.answers,
          name: "answers",
          templates: {
            suggestion: templates["answer"]
          }
        });
        setTimeout((function(_this) {
          return function() {
            _this.$el.find(".js-questions").removeClass("fade_out");
            return _this.$el.find(".js-question")[1].focus();
          };
        })(this), 1);
      }
      return this;
    };

    Survey.prototype.focus_input = function(e) {
      this.$el.find(".js-input").addClass("input_box--faded");
      $(e.currentTarget).removeClass("input_box--faded");
      return $(e.currentTarget).removeClass("input_box--hidden");
    };

    Survey.prototype.submit_form = function(e) {
      var answers, form, i, len, question, ref;
      e.preventDefault();
      form = e.currentTarget;
      answers = [];
      ref = this.survey.get("questions");
      for (i = 0, len = ref.length; i < len; i++) {
        question = ref[i];
        if (form[question["key"]] != null) {
          if (form[question["key"]].value === "") {
            $(form[question["key"]]).focus();
            return false;
          }
          answers.push({
            question_key: question["key"],
            value: form[question["key"]].value.capitalize()
          });
        }
      }
      this.survey_answer = new Saturdays.Models.SurveyAnswer();
      this.survey_answer.local_storage = "survey_answer";
      this.survey_answer.urlRoot = Saturdays.settings.api + "surveys/" + this.survey.id + "/answers";
      return this.survey_answer.save({
        answers: answers
      }, {
        success: (function(_this) {
          return function(model, response) {
            _this.$el.find(".js-questions").addClass("fade_out");
            return setTimeout(function() {
              _this.$el.find(".js-questions").addClass("hide");
              return _this.survey.fetch();
            }, 666);
          };
        })(this)
      });
    };

    Survey.prototype.reset = function(e) {
      e.preventDefault();
      this.$el.find(".js-results").addClass("fade_out");
      this.$el.find(".js-form")[0].reset();
      this.$el.find(".js-typeahead").typeahead("destroy");
      localStorage.removeItem("survey_answer");
      return setTimeout((function(_this) {
        return function() {
          return _this.render();
        };
      })(this), 666);
    };

    return Survey;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Saturdays.Routers.Router = (function(superClass) {
    extend(Router, superClass);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      "products(/:pretty_url)(/)": "products",
      "lists/:list_route(/tags)(/authors)(/posts)(/:route)(/)": "list",
      "(/)": "home"
    };

    Router.prototype.views = [];

    Router.prototype.initialize = function() {};

    Router.prototype.execute = function(callback, args) {
      var i, len, ref, view;
      ref = this.views;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        view.destroy();
      }
      delete this.views;
      this.views = [];
      if (callback != null) {
        callback.apply(this, args);
      }
      return $(".js-piece").each((function(_this) {
        return function(index, element) {
          var model;
          model = new Saturdays.Models.Piece({
            "_id": element.getAttribute("data-id")
          });
          return _this.views.push(new Saturdays.Views.Piece({
            el: element,
            model: model
          }));
        };
      })(this));
    };

    Router.prototype.home = function() {
      if ($(".js-survey").length > 0) {
        return this.survey_view = new Saturdays.Views.Survey();
      }
    };

    Router.prototype.products = function(pretty_url) {
      return $(".js-product").each((function(_this) {
        return function(index, element) {
          var model;
          model = new Saturdays.Models.Product({
            "_id": element.getAttribute("data-id")
          });
          return _this.views.push(new Saturdays.Views.Product({
            el: element,
            model: model
          }));
        };
      })(this));
    };

    Router.prototype.list = function(list_route, route) {
      return $(".js-post").each((function(_this) {
        return function(index, element) {
          var model;
          model = new Saturdays.Models.ListPost();
          model.urlRoot = Saturdays.settings.api + "lists/" + window.list_id + "/posts";
          return _this.views.push(new Saturdays.Views.Post({
            el: element,
            model: model
          }));
        };
      })(this));
    };

    return Router;

  })(Backbone.Router);

}).call(this);

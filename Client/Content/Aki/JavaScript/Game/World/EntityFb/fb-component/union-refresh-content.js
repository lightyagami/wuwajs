"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionRefreshContent = exports.unionToUnionRefreshContent = exports.UnionRefreshContent = undefined;
const all_refresh_content_js_1 = require("../fb-component/all-refresh-content.js");
const random_entity_refresh_content_js_1 = require("../fb-component/random-entity-refresh-content.js");
var UnionRefreshContent;
function unionToUnionRefreshContent(e, n) {
  switch (UnionRefreshContent[e]) {
    case "NONE":
      return;
    case "AllRefreshContent":
      return n(new all_refresh_content_js_1.AllRefreshContent());
    case "RandomEntityRefreshContent":
      return n(new random_entity_refresh_content_js_1.RandomEntityRefreshContent());
    default:
      return;
  }
}
function unionListToUnionRefreshContent(e, n, t) {
  switch (UnionRefreshContent[e]) {
    case "NONE":
      return;
    case "AllRefreshContent":
      return n(t, new all_refresh_content_js_1.AllRefreshContent());
    case "RandomEntityRefreshContent":
      return n(t, new random_entity_refresh_content_js_1.RandomEntityRefreshContent());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.AllRefreshContent = 1] = "AllRefreshContent";
  e[e.RandomEntityRefreshContent = 2] = "RandomEntityRefreshContent";
})(UnionRefreshContent = exports.UnionRefreshContent ||= {});
exports.unionToUnionRefreshContent = unionToUnionRefreshContent;
exports.unionListToUnionRefreshContent = unionListToUnionRefreshContent; //# sourceMappingURL=union-refresh-content.js.map
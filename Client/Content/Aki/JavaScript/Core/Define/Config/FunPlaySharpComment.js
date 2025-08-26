"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunPlaySharpComment = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FunPlaySharpComment {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get CommentId() {
    return this.commentid();
  }
  get VarPriority() {
    return this.varpriority();
  }
  get PhotoPath() {
    return this.photopath();
  }
  get RoleHeadPath() {
    return this.roleheadpath();
  }
  get RoleName() {
    return this.rolename();
  }
  get Comment() {
    return this.comment();
  }
  get TimeTxt() {
    return this.timetxt();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsFunPlaySharpComment(t, e) {
    return (e || new FunPlaySharpComment()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  commentid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  varpriority() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  photopath(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  roleheadpath(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  rolename(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  comment(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  timetxt(t) {
    var e = this.J7.__offset(this.z7, 16);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.FunPlaySharpComment = FunPlaySharpComment;
//# sourceMappingURL=FunPlaySharpComment.js.map
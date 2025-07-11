"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideTutorial = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideTutorial {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TutorialType() {
    return this.tutorialtype();
  }
  get TutorialOrder() {
    return this.tutorialorder();
  }
  get PageId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.pageidLength(), this.pageid, this);
  }
  get PageReplaceConditionGroupId() {
    return this.pagereplaceconditiongroupid();
  }
  get ReplacePageId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.replacepageidLength(), this.replacepageid, this);
  }
  get GroupName() {
    return this.groupname();
  }
  get ExclusiveType() {
    return this.exclusivetype();
  }
  get TutorialTip() {
    return this.tutorialtip();
  }
  get DropId() {
    return this.dropid();
  }
  get DisableDropReward() {
    return this.disabledropreward();
  }
  get RequireReadAll() {
    return this.requirereadall();
  }
  get ExcludeFromWiki() {
    return this.excludefromwiki();
  }
  get CopiedFrom() {
    return this.copiedfrom();
  }
  get DefaultUnlock() {
    return this.defaultunlock();
  }
  get SilentUnlock() {
    return this.silentunlock();
  }
  get ShowLayer() {
    return this.showlayer();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGuideTutorial(t, i) {
    return (i || new GuideTutorial()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tutorialtype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 11;
    }
  }
  tutorialorder() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPageidAt(t) {
    return this.pageid(t);
  }
  pageid(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  pageidLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  pageidArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  pagereplaceconditiongroupid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetReplacepageidAt(t) {
    return this.replacepageid(t);
  }
  replacepageid(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  replacepageidLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  replacepageidArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  groupname(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  exclusivetype() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tutorialtip() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100001;
    }
  }
  disabledropreward() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  requirereadall() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  excludefromwiki() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  copiedfrom() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  defaultunlock() {
    var t = this.J7.__offset(this.z7, 32);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  silentunlock() {
    var t = this.J7.__offset(this.z7, 34);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  showlayer() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GuideTutorial = GuideTutorial;
//# sourceMappingURL=GuideTutorial.js.map
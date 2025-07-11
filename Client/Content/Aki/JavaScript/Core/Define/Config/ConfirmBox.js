"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmBox = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ConfirmBox {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Title() {
    return this.title();
  }
  get Content() {
    return this.content();
  }
  get SecondaryContent() {
    return this.secondarycontent();
  }
  get ButtonText() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buttontextLength(), this.buttontext, this);
  }
  get DelayTime() {
    return this.delaytime();
  }
  get DelayButtonIndex() {
    return this.delaybuttonindex();
  }
  get NeedMaskClose() {
    return this.needmaskclose();
  }
  get UiShowType() {
    return this.uishowtype();
  }
  get NeedClose() {
    return this.needclose();
  }
  get TimeDilation() {
    return this.timedilation();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsConfirmBox(t, i) {
    return (i || new ConfirmBox()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  content(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  secondarycontent(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetButtontextAt(t) {
    return this.buttontext(t);
  }
  buttontext(t, i) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, i) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  buttontextLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  delaytime() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  delaybuttonindex() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  needmaskclose() {
    var t = this.J7.__offset(this.z7, 18);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  uishowtype() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  needclose() {
    var t = this.J7.__offset(this.z7, 22);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  timedilation() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
}
exports.ConfirmBox = ConfirmBox;
//# sourceMappingURL=ConfirmBox.js.map
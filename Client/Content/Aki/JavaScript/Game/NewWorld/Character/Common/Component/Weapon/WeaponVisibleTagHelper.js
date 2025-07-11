"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponVisibleTagHelper = undefined;
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
class WeaponVisibleTagHelper {
  constructor() {
    this.cer = 0;
    this.mer = (i, s) => {
      var t = this.cer;
      if (s) {
        this.cer++;
      } else {
        this.cer--;
      }
      if (t === 0 && this.cer > 0) {
        this.der(true, this.Owner);
      } else if (t > 0 && this.cer === 0) {
        this.der(false, this.Owner);
      }
    };
    this.Tags = [];
    this.TagComp = undefined;
    this.Cer = new Array();
    this.der = undefined;
    this.Owner = undefined;
  }
  Init(i, s, t, h) {
    if (t) {
      this.Clear();
      this.cer = 0;
      this.TagComp = s;
      this.der = h;
      this.Owner = i;
      for (const e of t) {
        var o;
        if (e !== "") {
          o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
          this.Tags.push(o);
        }
      }
      for (const a of this.Tags) {
        if (s.HasTag(a)) {
          this.cer++;
        }
        this.Cer.push(s.ListenForTagAddOrRemove(a, this.mer));
      }
      if (this.cer > 0) {
        this.der(true, this.Owner);
      }
    }
  }
  Clear() {
    this.Owner = undefined;
    this.TagComp = undefined;
    this.der = undefined;
    for (const i of this.Cer) {
      i.EndTask();
    }
    this.Cer.length = 0;
    this.Tags.length = 0;
  }
}
exports.WeaponVisibleTagHelper = WeaponVisibleTagHelper;
//# sourceMappingURL=WeaponVisibleTagHelper.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AkComponentDynamicConditionProxy = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const BONE_HIDDEN_SWITCH = 4;
class BoneHiddenSwitch {
  constructor() {
    this.BoneName = "";
    this.SwitchGroup = "";
    this.HiddenSwitch = "";
    this.VisibleSwitch = "";
    this.LastHidden = false;
  }
  Init(t, i) {
    var o = i.BoneHiddenSwitch;
    if (o.length !== BONE_HIDDEN_SWITCH && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Audio", 57, "[BoneHiddenSwitch] BoneHiddenSwitch配置无效", ["ConfigId:", i.Id]);
    }
    this.BoneName = o[0];
    this.SwitchGroup = o[1];
    this.HiddenSwitch = o[2];
    this.VisibleSwitch = o[3];
    this.LastHidden = t.Actor.Mesh.IsBoneHiddenByName(FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName));
    this.pYo(this.LastHidden, t);
  }
  Do(t) {
    var i = t.Actor.Mesh.IsBoneHiddenByName(FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName));
    var o = i !== this.LastHidden;
    this.LastHidden = i;
    if (o) {
      this.pYo(this.LastHidden, t);
    }
  }
  pYo(t, i) {}
  Clear() {}
}
class AkComponentDynamicConditionProxy {
  constructor() {
    this.Qte = new Array();
  }
  Init(t, i) {
    var o;
    this.Clear();
    if (i.BoneHiddenSwitch.length > 0) {
      (o = new BoneHiddenSwitch()).Init(t, i);
      this.Qte.push(o);
    }
  }
  Do(t) {
    for (const i of this.Qte) {
      i.Do(t);
    }
  }
  Clear() {
    for (const t of this.Qte) {
      t.Clear();
    }
    this.Qte.length = 0;
  }
}
exports.AkComponentDynamicConditionProxy = AkComponentDynamicConditionProxy;
//# sourceMappingURL=AkComponentDynamicConditionProxy.js.map
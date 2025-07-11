"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const CharRenderingComponent_1 = require("../Render/Character/Manager/CharRenderingComponent");
class TsAnimNotifyStateAddMaterialController extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.ControllerData = undefined;
    this.UserData = undefined;
    this.Handles = undefined;
  }
  Constructor() {
    this.Handles = undefined;
  }
  K2_NotifyBegin(t, e, r) {
    var i = t.GetOwner().GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    if (!(i instanceof CharRenderingComponent_1.default)) {
      return false;
    }
    this.Handles ||= new Map();
    i = i.AddMaterialControllerDataWithUserData(this.ControllerData, this.UserData);
    this.Handles.set(t, i);
    return true;
  }
  K2_NotifyEnd(t, e) {
    var r;
    var i = t.GetOwner().GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    return i instanceof CharRenderingComponent_1.default && !!this.Handles && (r = this.Handles.get(t)) !== undefined && (this.Handles.delete(t), i.RemoveMaterialControllerData(r), true);
  }
}
exports.default = TsAnimNotifyStateAddMaterialController;
//# sourceMappingURL=TsAnimNotifyStateAddMaterialController.js.map
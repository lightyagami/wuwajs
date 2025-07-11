"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSubMeshControl extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MeshName = "";
    this.开始是否可见 = true;
    this.开始材质 = undefined;
    this.开始特效 = undefined;
    this.开始延迟时间 = 0;
    this.结束是否可见 = true;
    this.结束材质 = undefined;
    this.结束特效 = undefined;
    this.结束延迟时间 = 0;
  }
  Constructor() {}
  K2_NotifyBegin(t, s, i) {
    var t = t?.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.GetEntityNoBlueprint()?.GetComponent(223)) && (t.SetSubMeshOrder(this.MeshName, this.开始是否可见, this.开始材质, this.开始特效, this.开始延迟时间 * MathUtils_1.MathUtils.SecondToMillisecond), true);
  }
  K2_NotifyEnd(t, s) {
    var t = t?.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = t.GetEntityNoBlueprint()?.GetComponent(223)) && (t.SetSubMeshOrder(this.MeshName, this.结束是否可见, this.结束材质, this.结束特效, this.结束延迟时间 * MathUtils_1.MathUtils.SecondToMillisecond), true);
  }
}
exports.default = TsAnimNotifyStateSubMeshControl;
//# sourceMappingURL=TsAnimNotifyStateSubMeshControl.js.map
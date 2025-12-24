"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
const BaseLockOnComponent_1 = require("../NewWorld/Character/Common/Component/LockOn/BaseLockOnComponent");
const ActorUtils_1 = require("../Utils/ActorUtils");
class TsAnimNotifyStateIgnoreLockOnTarget extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.IgnoreSocket = "";
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && this.ForceIgnore(e, true);
  }
  K2_NotifyEnd(e, r) {
    e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && this.ForceIgnore(e, false);
  }
  GetNotifyName() {
    return "强制忽略目标";
  }
  ForceIgnore(e, r) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !!t && (e = ActorUtils_1.ActorUtils.GetEntityByActor(e), !!(t = t?.Entity?.GetComponent(33))) && (t.ForceIgnore(new BaseLockOnComponent_1.LockOnInfo(e, this.IgnoreSocket), r), true);
  }
}
exports.default = TsAnimNotifyStateIgnoreLockOnTarget;
//# sourceMappingURL=TsAnimNotifyStateIgnoreLockOnTarget.js.map
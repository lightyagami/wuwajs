"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyStateCameraStateChange extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.是否为单客户端 = false;
    this.是否跟随 = false;
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    e = e.GetOwner();
    return (!this.是否为单客户端 || e instanceof TsBaseCharacter_1.default && Global_1.Global.BaseCharacter === e) && (ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.IsFollowing = this.是否跟随, true);
  }
  K2_NotifyEnd(e, r) {
    e = e.GetOwner();
    return (!this.是否为单客户端 || e instanceof TsBaseCharacter_1.default && Global_1.Global.BaseCharacter === e) && (ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.IsFollowing = true);
  }
  GetNotifyName() {
    return "相机是否跟随角色移动";
  }
}
exports.default = TsAnimNotifyStateCameraStateChange;
//# sourceMappingURL=TsAnimNotifyStateCameraStateChange.js.map
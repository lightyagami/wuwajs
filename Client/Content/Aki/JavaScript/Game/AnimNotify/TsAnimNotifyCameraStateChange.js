"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyCameraStateChange extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.是否为单客户端 = false;
    this.是否跟随 = false;
  }
  Constructor() {}
  K2_Notify(e, r) {
    e = e.GetOwner();
    if (!this.是否为单客户端 || e instanceof TsBaseCharacter_1.default && e === Global_1.Global.BaseCharacter) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.IsFollowing = this.是否跟随;
    }
    return true;
  }
  GetNotifyName() {
    return "摄像机状态改变";
  }
}
exports.default = TsAnimNotifyCameraStateChange;
//# sourceMappingURL=TsAnimNotifyCameraStateChange.js.map
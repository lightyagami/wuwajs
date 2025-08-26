"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyDisableAllRoleWithoutControl extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.是否播放特效 = false;
  }
  Constructor() {}
  K2_Notify(e, r) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent)?.Valid && !!e.IsAutonomousProxy && !(ControllerHolder_1.ControllerHolder.SceneTeamController.DisableAllRoleWithoutControl(undefined, undefined, this.是否播放特效), 0);
  }
  GetNotifyName() {
    return "下场所有前台不受控角色（开启特效时有延迟）";
  }
}
exports.default = TsAnimNotifyDisableAllRoleWithoutControl;
//# sourceMappingURL=TsAnimNotifyDisableAllRoleWithoutControl.js.map
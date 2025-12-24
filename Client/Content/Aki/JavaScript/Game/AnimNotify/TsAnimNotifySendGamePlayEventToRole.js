"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifySendGamePlayEventToRole extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.事件Tag = undefined;
  }
  Constructor() {}
  K2_Notify(e, t) {
    var r = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    return !!r && !!(r = r.GetComponent(17))?.Valid && (r.SendGameplayEventToActor(this.事件Tag), true);
  }
  GetNotifyName() {
    return "发送动画通知广播给主控角色";
  }
}
exports.default = TsAnimNotifySendGamePlayEventToRole;
//# sourceMappingURL=TsAnimNotifySendGamePlayEventToRole.js.map
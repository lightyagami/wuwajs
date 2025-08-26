"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillCdController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const VisibleStateUtil_1 = require("../BattleUi/VisibleStateUtil");
class SkillCdController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(15652, this.uQe);
    Net_1.Net.Register(24380, this.cQe);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(15652);
    Net_1.Net.UnRegister(24380);
    return true;
  }
  static OnTick(e) {}
  static Pause(e, t) {
    var r = this.IsPause();
    this.mQe = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.mQe, !t, e);
    var t = this.IsPause();
    if (r !== t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharSkillCdPauseStateChanged, t);
    }
  }
  static IsPause() {
    return this.mQe !== 0;
  }
}
(exports.SkillCdController = SkillCdController).mQe = 0;
SkillCdController.uQe = e => {
  ModelManager_1.ModelManager.SkillCdModel?.HandlePlayerSkillInfoPbNotify(e);
};
SkillCdController.cQe = e => {
  ModelManager_1.ModelManager.SkillCdModel?.HandlePassiveSkillNotify(e);
}; //# sourceMappingURL=SkillCdController.js.map
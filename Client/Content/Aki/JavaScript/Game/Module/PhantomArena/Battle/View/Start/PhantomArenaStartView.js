"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaStartView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  SHOW_TIME = 2e3;
class PhantomArenaStartView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.vJ = void 0, this.Pe = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText]
    ]
  }
  OnStart() {
    this.Pe = this.OpenParam;
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.Round;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.ContentTextId), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PhantomBattle_1030", e), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "回合开始", ["回合数", e]), this.vJ = TimerSystem_1.TimerSystem.Delay(() => {
      this.Bfe(), this.CloseMe()
    }, SHOW_TIME)
  }
  OnBeforeDestroy() {
    this.Bfe(), this.Pe.Callback?.()
  }
  Bfe() {
    this.vJ && (TimerSystem_1.TimerSystem.Remove(this.vJ), this.vJ = void 0)
  }
  GetExtraResourceId(e) {
    return e.IsOwn ? "UiItem_BattleStart1" : "UiItem_BattleStart"
  }
}
exports.PhantomArenaStartView = PhantomArenaStartView;
//# sourceMappingURL=PhantomArenaStartView.js.map
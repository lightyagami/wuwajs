"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaStartView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const SHOW_TIME = 2000;
class PhantomArenaStartView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.vJ = undefined;
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    this.Pe = this.OpenParam;
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.Round;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.ContentTextId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PhantomBattle_1030", e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "回合开始", ["回合数", e]);
    }
    this.vJ = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.Bfe();
      this.CloseMe();
    }, SHOW_TIME);
  }
  OnBeforeDestroy() {
    this.Bfe();
    this.Pe.Callback?.();
  }
  Bfe() {
    if (this.vJ) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.vJ);
      this.vJ = undefined;
    }
  }
  GetExtraResourceId(e) {
    if (e.IsOwn) {
      return "UiItem_BattleStart1";
    } else {
      return "UiItem_BattleStart";
    }
  }
}
exports.PhantomArenaStartView = PhantomArenaStartView;
//# sourceMappingURL=PhantomArenaStartView.js.map
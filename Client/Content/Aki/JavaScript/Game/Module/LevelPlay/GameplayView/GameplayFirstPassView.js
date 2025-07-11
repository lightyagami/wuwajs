"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayFirstPassView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const PublicUtil_1 = require("../../../../Game/Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GameplayViewDefine_1 = require("./GameplayViewDefine");
class GameplayFirstPassView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TimerId = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    var e;
    var i = this.OpenParam;
    if (i) {
      e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(i.InfoId ?? "");
      i = PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TitleId ?? "");
      this.Tpi(e, i);
    }
  }
  Tpi(e, i) {
    this.GetText(0).SetText(e ?? "");
    this.GetText(1).SetText(i);
  }
  OnAfterPlayStartSequence() {
    this.Rbt();
  }
  Rbt() {
    this.TimerId = TimerSystem_1.TimerSystem.Delay(() => {
      this.$Oe();
    }, GameplayViewDefine_1.DelayCloseTime);
  }
  $Oe() {
    this.TimerId = undefined;
    this.CloseMe();
  }
  OnBeforeDestroy() {
    if (this.TimerId !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.TimerId);
      this.TimerId = undefined;
    }
  }
}
exports.GameplayFirstPassView = GameplayFirstPassView;
//# sourceMappingURL=GameplayFirstPassView.js.map
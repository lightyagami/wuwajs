"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayEnterView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const PublicUtil_1 = require("../../../../Game/Common/PublicUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GameplayViewDefine_1 = require("./GameplayViewDefine");
class GameplayEnterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TimerId = undefined;
    this.iZe = () => {
      this.Tpi();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.iZe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.iZe);
  }
  OnStart() {
    this.Tpi();
  }
  Tpi() {
    var e;
    var i = this.OpenParam;
    if (i) {
      e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(i.InfoId ?? "");
      i = PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TitleId ?? "");
      this.GetText(0).SetText(e ?? "");
      this.GetText(1).SetText(i);
    }
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
exports.GameplayEnterView = GameplayEnterView;
//# sourceMappingURL=GameplayEnterView.js.map
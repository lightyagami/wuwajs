"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaTitleInspirationItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CiacconaGalDefine_1 = require("../CiacconaGalDefine");
class CiacconaTitleInspirationItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CNe = e;
    this.TDe = undefined;
    this.r6 = () => {
      this.bl();
    };
    this.fVc = () => {
      this.bl();
    };
    this.eTt = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(CiacconaGalDefine_1.CIACCONA_INSPIRATION_HELP_ID);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.eTt]];
  }
  OnStart() {
    this.bl();
    this.TDe = TimerSystem_1.TimerSystem.Forever(this.r6, TimeUtil_1.TimeUtil.InverseMillisecond);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaInspirationDataUpdate, this.fVc);
  }
  OnBeforeDestroy() {
    if (this.TDe) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaInspirationDataUpdate, this.fVc);
  }
  bl() {
    var e = this.CNe.InspirationCount;
    var i = this.CNe.MaxInspirationCount;
    var t = e === 0 ? CiacconaGalDefine_1.TEXT_COLOR_INSPIRATION_ZERO : CiacconaGalDefine_1.TEXT_COLOR_INSPIRATION_NORMAL;
    this.GetText(0).SetText(`<color=${t}>${e}</color>/${i}`);
    var t = this.CNe.RemainTimeToNextRefreshStr;
    if (t) {
      this.GetText(1).SetText(t);
    }
    this.GetSprite(2).SetUIActive(e < i);
    this.GetItem(3).SetUIActive(e < i);
  }
}
exports.CiacconaTitleInspirationItem = CiacconaTitleInspirationItem;
//# sourceMappingURL=CiacconaGalTitleItem.js.map
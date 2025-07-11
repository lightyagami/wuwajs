"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SolarSpeedResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const SolarSpeedDefine_1 = require("../SolarSpeedDefine");
class SolarSpeedResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.tFe = undefined;
    this.lGe = undefined;
    this.hH_ = undefined;
    this.Pe = undefined;
    this.P3_ = () => new this.Pe.PanelType();
    this.kZs = () => {
      this.Pe.ConfirmClick?.();
      this.GetItem(3)?.SetUIActive(false);
    };
    this.eFl = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SolarSpeed", 64, "结果界面《start》动画触发", ["passData", e]);
      }
      this.lH_();
    };
    this.Hlc = e => {
      for (const t of this.tFe.GetLayoutItemList()) {
        t.RefreshAddFriendByPlayerIdExternal(e);
      }
    };
  }
  OnRegisterComponent() {
    this.Pe = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(3)?.SetUIActive(true);
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.P3_);
    this.hH_ = this.tFe.GetUiAnimController();
    this.lGe = new ButtonItem_1.ButtonItem(this.GetItem(2));
    this.lGe.SetFunction(this.kZs);
    this.lGe.SetLocalTextNew(SolarSpeedDefine_1.SOLAR_SPEED_CONFIRM_BUTTON_TEXT_ID_IN_RESULT);
    return Promise.resolve();
  }
  OnStart() {
    this.tFe.SetActive(false);
    this.mGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.eFl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ApplicationSent, this.Hlc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.eFl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ApplicationSent, this.Hlc);
  }
  async lH_() {
    await this.tFe.RefreshByDataAsync(this.Pe.RoleDataList);
    this.tFe.SetActive(true);
    this.hH_.Play("Start");
  }
  mGe() {
    if (this.Pe.TitleId) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.Pe.TitleId);
    }
  }
}
exports.SolarSpeedResultView = SolarSpeedResultView;
//# sourceMappingURL=SolarSpeedResultView.js.map
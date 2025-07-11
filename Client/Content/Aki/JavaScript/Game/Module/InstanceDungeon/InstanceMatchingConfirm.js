"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceMatchingConfirm = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
const InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
const ONE_SECONDS = 1000;
class InstanceMatchingConfirm extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.r_i = 0;
    this.j3 = undefined;
    this.$Ye = () => {
      switch (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()) {
        case 3:
          this.ShowWaitState();
          break;
        case 0:
        case 1:
        case 4:
          this.CloseMe();
      }
    };
    this.TDe = () => {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 2 && this.j3 !== undefined) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
        this.j3 = undefined;
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "MatchingCoolDown", TimeUtil_1.TimeUtil.GetCoolDown(this.r_i--));
      }
    };
    this.n_i = () => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(false);
      ModelManager_1.ModelManager.InstanceDungeonModel.ResetData();
    };
    this.L1i = () => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(true);
      this.ShowWaitState();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [0, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.n_i], [3, this.L1i]];
  }
  OnStart() {
    this.ShowConfirmState(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId()).MapName));
    this.ChildPopView?.PopItem?.SetMaskResponsibleState(false);
    this.ChildPopView?.PopItem?.OverrideBackBtnCallBack(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(false);
      ModelManager_1.ModelManager.InstanceDungeonModel.ResetData();
      this.CloseMe();
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
  }
  OnBeforeDestroy() {
    if (this.j3 !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
    }
    this.j3 = undefined;
    this.r_i = 0;
  }
  ShowConfirmState(e) {
    this.r_i = CommonParamById_1.configCommonParamById.GetIntConfig("match_confirm_time_out_seconds");
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "MatchingCoolDown", (this.r_i--).toString());
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "MatchingContext", e);
    this.GetText(0)?.SetUIActive(true);
    this.GetButton(2).GetRootComponent().SetUIActive(true);
    this.GetButton(3).GetRootComponent().SetUIActive(true);
    this.GetItem(4).SetUIActive(false);
    if (this.j3 !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
    this.j3 = TimerSystem_1.GameplayTimerSystem.Forever(this.TDe, ONE_SECONDS);
  }
  ShowWaitState() {
    this.GetText(0)?.SetUIActive(false);
    this.GetButton(2).GetRootComponent().SetUIActive(false);
    this.GetButton(3).GetRootComponent().SetUIActive(false);
    this.GetItem(4).SetUIActive(true);
    this.ChildPopView?.PopItem.SetMaskResponsibleState(false);
    this.ChildPopView?.PopItem.SetBackBtnShowState(false);
  }
}
exports.InstanceMatchingConfirm = InstanceMatchingConfirm;
//# sourceMappingURL=InstanceMatchingConfirm.js.map
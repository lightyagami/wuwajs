"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineMatchSuccessView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
class OnlineMatchSuccessView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.SNi = -1;
    this.yNi = -1;
    this.XFt = undefined;
    this.pNi = undefined;
    this.eOi = true;
    this.$Ye = () => {
      var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState();
      if (e === 3) {
        this.tOi();
      } else {
        if (e === 1) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MatchingOtherCancel");
        }
        this.eOi = false;
        this.CloseMe();
      }
    };
    this.MNi = () => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(true);
      this.eOi = false;
      this.tOi();
    };
    this.uHe = () => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(false);
      ModelManager_1.ModelManager.InstanceDungeonModel.ResetData();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[2, this.MNi], [8, this.uHe]];
  }
  OnStart() {
    this.GetItem(11)?.SetUIActive(false);
    this.GetButton(8).GetRootComponent().SetUIActive(true);
    this.XFt = this.GetText(5);
    this.pNi = this.GetSprite(6);
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("match_confirm_time_out_seconds");
    this.SNi = e;
    this.yNi = e;
    this.GetItem(9).SetUIActive(true);
    this.GetItem(10).SetUIActive(false);
    this.Og();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMatchingChange, this.$Ye);
  }
  OnTick(e) {
    if (this.eOi) {
      this.SNi -= e * TimeUtil_1.TimeUtil.Millisecond;
      if (this.SNi <= 0) {
        this.eOi = false;
        this.CloseMe();
      } else {
        this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi));
        this.pNi.SetFillAmount(this.SNi / this.yNi);
      }
    }
  }
  Og() {
    var e = this.GetItem(3);
    var i = this.GetItem(4);
    e.SetUIActive(true);
    i.SetUIActive(false);
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingSuccess");
    var i = this.GetText(7);
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId();
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).MapName) ?? "";
    i.SetText(e);
    this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi));
    this.pNi.SetFillAmount(this.SNi / this.yNi);
  }
  tOi() {
    this.GetButton(8).GetRootComponent().SetUIActive(false);
    this.GetButton(2).GetRootComponent().SetUIActive(false);
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingTeleport");
    this.GetText(7).SetUIActive(false);
    this.XFt.SetUIActive(false);
    this.pNi.SetUIActive(false);
  }
}
exports.OnlineMatchSuccessView = OnlineMatchSuccessView;
//# sourceMappingURL=OnlineMatchSuccessView.js.map
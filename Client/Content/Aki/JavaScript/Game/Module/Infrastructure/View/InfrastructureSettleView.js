"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureSettleViewButton = exports.InfrastructureSettleView = undefined;
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InfrastructureSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Button = new InfrastructureSettleViewButton();
    this.zFe = () => {
      UiManager_1.UiManager.ResetToBattleView();
    };
    this.eQf = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UITexture], [5, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [13, UE.UIItem], [14, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    await this.ZFe();
  }
  OnStart() {
    this.GetItem(13).SetUIActive(true);
    this.GetText(14).SetUIActive(true);
    this.SetTextureByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_Logo_Activity_1_UI"), this.GetTexture(2));
    this.GetText(10).SetColor(UE.Color.FromHex("#F0D33F"));
    this.GetText(11).SetColor(UE.Color.FromHex("#ECE5D8"));
    this.GetText(14).SetColor(UE.Color.FromHex("#ECE5D8"));
    this.GetText(1).ShowTextNew("Build_CompleteTitle");
    this.GetText(1).GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass()).SetOutlineColor(UE.Color.FromHex("#C48B29"));
    var t;
    var e = this.OpenParam;
    if (e.DeliveryType === Protocol_1.Aki.Protocol.a4m.Proto_Observatory) {
      t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(ModelManager_1.ModelManager.InfrastructureModel.FireLevel);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), t.BuildSuccessDes);
    } else {
      t = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(e.RoadId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "Build_CompleteDes", new LguiUtil_1.TableTextArgNew(t.Name));
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Build_CompleteTime");
    this.GetText(10).SetText(TimeUtil_1.TimeUtil.DateFormatString(Time_1.Time.ServerTimeStamp / CommonDefine_1.MILLIONSECOND_PER_SECOND));
    this.ZGe();
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence.PlaySequence("Success", true);
  }
  async ZFe() {
    await this.Button.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
  }
  ZGe() {
    this.GetItem(5).SetUIActive(true);
    this.Button.SetUiActive(true);
    this.Button.SetBtnText("Leave");
    this.Button.HideFloatText();
    this.Button.SetOnClickEvent(this.zFe);
    this.Button.SetOnClickLeftEvent(this.eQf);
  }
}
exports.InfrastructureSettleView = InfrastructureSettleView;
class InfrastructureSettleViewButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RFe = undefined;
    this.tQf = undefined;
    this.q9a = new ButtonItem_1.ButtonItem();
    this.EVt = () => {
      this.tQf?.();
    };
    this.UFe = () => {
      this.RFe?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.UFe]];
  }
  async OnBeforeStartAsync() {
    await this.q9a.CreateThenShowByActorAsync(this.GetButton(4).GetOwner());
    this.q9a.SetFunction(this.EVt);
  }
  OnStart() {
    this.GetButton(4).RootUIComp.SetUIActive(true);
    this.q9a.SetLocalTextNew("JijianTask_CompleteButton");
  }
  SetBtnText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), t, e);
  }
  HideFloatText() {
    this.GetText(2).SetUIActive(false);
  }
  SetOnClickEvent(t) {
    this.RFe = t;
  }
  SetOnClickLeftEvent(t) {
    this.tQf = t;
  }
}
exports.InfrastructureSettleViewButton = InfrastructureSettleViewButton;
//# sourceMappingURL=InfrastructureSettleView.js.map
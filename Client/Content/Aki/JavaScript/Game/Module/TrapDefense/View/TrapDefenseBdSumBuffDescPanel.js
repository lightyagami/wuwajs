"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdSumBuffDescPanel = undefined;
const UE = require("ue");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CommonSwitchItem_1 = require("../../../Ui/Common/CommonSwitchItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TrapDefenseBdSumBuffDescPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BdBuffData = undefined;
    this.SwitchComponent = undefined;
    this.SwitchStrengthenCallback = undefined;
    this.OnSelectCallback = undefined;
    this.OnCanClickCallback = undefined;
    this.OnClickSwitchStrengthen = t => {
      this.SwitchStrengthenCallback?.(t === 1, this.BdBuffData);
    };
    this.OnClickToggleRoot = t => {
      this.OnSelectCallback?.(this.BdBuffData);
    };
    this.CanExecuteChange = () => this.OnCanClickCallback?.() ?? false;
  }
  async Init(t) {
    await this.CreateByActorAsync(t.GetOwner());
    t = this.GetItem(0);
    this.SwitchComponent = new CommonSwitchItem_1.CommonSwitchItem();
    await this.SwitchComponent.CreateByActorAsync(t.GetOwner());
    this.SwitchComponent.SetOnStateChangedCallback(this.OnClickSwitchStrengthen);
    this.GetExtendToggle(11).CanExecuteChange.Bind(this.CanExecuteChange);
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UIExtendToggle], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UITexture], [18, UE.UIItem]];
    this.BtnBindInfo = [[11, this.OnClickToggleRoot]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    var t = {
      UiText: this.GetText(6),
      ViewType: 0,
      ReportType: 9
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(t);
  }
  OnBeforeShow() {}
  OnBeforeDestroy() {
    this.GetExtendToggle(11).CanExecuteChange.Unbind();
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(6));
  }
  t8u(t, e) {
    this.BdBuffData = t;
    this.i8u();
    this.B9u(e ?? t.BdBuffConfig);
    this.UpdateBdIcon();
  }
  B9u(t) {
    this.GetText(5).ShowTextNew(t.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.Desc, ...t.DescArgs);
    this.SetTextureByPath(t.Icon, this.GetTexture(3));
    this.SetTextureByPath(t.SubIcon, this.GetTexture(17));
  }
  UpdateBuffLockShowState() {
    this.GetText(5).ShowTextNew("TrapDefense_BdBuff_LockShowName");
  }
  UpdateDataShowMode(t) {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBdSum.IsInstance;
    var i = t.GetShowBdBuffConfig(e);
    this.t8u(t, i);
    this.SetSwitchStrengthenShowState(t.IsCanSwitchStrengthen(e));
    this.GetItem(4)?.SetUIActive(i.Level > 1);
    this.SetRecommendByType();
    this.SetStrengthenEffect();
  }
  UpdateDataSelectMode(t) {
    this.t8u(t);
    this.SetSwitchStrengthenShowState(false);
    this.GetItem(4)?.SetUIActive(false);
    this.SetStrengthenEffect();
    this.UpdateRecommendState();
  }
  UpdateDataGetMode(t) {
    this.t8u(t);
    this.SetSwitchStrengthenShowState(false);
    this.GetItem(4)?.SetUIActive(t.IsStrengthenFinish());
    this.SetRecommendByType();
    this.SetStrengthenEffect();
  }
  UpdateDataStrengthenModeBefore(t) {
    this.t8u(t, t.GetStrengthenBeforeConfig());
    this.SetSwitchStrengthenShowState(false);
    this.GetItem(4)?.SetUIActive(false);
    this.SetRecommendByType();
    this.SetStrengthenEffect();
  }
  UpdateDataStrengthenModeAfter(t) {
    this.t8u(t, t.GetStrengthenConfig());
    this.SetSwitchStrengthenShowState(false);
    this.GetItem(4)?.SetUIActive(true);
    this.SetRecommendByType();
    switch (t.Config.Quality) {
      case 5:
        this.SetStrengthenEffect(16);
        break;
      case 4:
        this.SetStrengthenEffect(15);
        break;
      default:
        this.SetStrengthenEffect();
    }
  }
  UpdateBdIcon() {
    var t = this.BdBuffData.GetBelongBdData().Config.Icon;
    this.SetTextureByPath(t, this.GetTexture(8));
  }
  i8u() {
    var t = this.GetTexture(1);
    var e = this.GetTexture(2);
    var i = this.BdBuffData.Config.Quality;
    var s = "T_TermsIconBgLight" + i;
    this.SetTextureBgByResId("T_TipsQualityTypeLevel" + i, t);
    this.SetTextureBgByResId(s, e);
  }
  SetSelect(t) {
    this.GetExtendToggle(11)?.SetToggleStateForce(t ? 1 : 0, false);
  }
  oSd(t) {
    switch (t) {
      case 5:
        return 14;
      case 4:
        return 13;
      case 3:
        return 12;
    }
    return 18;
  }
  SetRecommendByType(e) {
    [18, 12, 13, 14].forEach(t => {
      this.GetItem(t)?.SetUIActive(t === e);
    });
  }
  SetRecommendQualityLight(t, e) {
    var i = this.GetSprite(9);
    var s = this.GetSprite(10);
    i.SetUIActive(t);
    s.SetUIActive(t);
    if (t) {
      let t = "#A0FFB2FF";
      switch (e) {
        case 5:
          t = "#FFDD56FF";
          break;
        case 4:
          t = "#FE69FFFF";
          break;
        case 3:
          t = "#8DF7FFFF";
      }
      i.SetColor(UE.Color.FromHex(t));
      s.SetColor(UE.Color.FromHex(t));
    }
  }
  SetStrengthenEffect(e) {
    [15, 16].forEach(t => {
      this.GetItem(t).SetUIActive(t === e);
    });
  }
  SetTextureBgByResId(t, e) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, e);
  }
  SetSpriteBgByResId(t, e) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(t, e, false);
  }
  SetSwitchStrengthenShowState(t) {
    this.SwitchComponent.SetActive(t);
    if (t) {
      this.SwitchComponent.SetToggleState(this.BdBuffData.IsShowStrengthen);
    }
  }
  UpdateRecommendState() {
    var [t] = this.BdBuffData.GetBelongBdData().PreAddedBuffIsActiveNewQuality(1);
    var e = this.BdBuffData.Config.Quality;
    var i = t ? this.oSd(e) : undefined;
    this.SetRecommendByType(i);
    this.SetRecommendQualityLight(t, e);
  }
}
exports.TrapDefenseBdSumBuffDescPanel = TrapDefenseBdSumBuffDescPanel;
//# sourceMappingURL=TrapDefenseBdSumBuffDescPanel.js.map
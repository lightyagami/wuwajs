"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsItemDetailTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const SurvivorsRogueCardBase_1 = require("../Card/SurvivorsRogueCardBase");
const SurvivorsRogueCardDataFactory_1 = require("../Card/SurvivorsRogueCardDataFactory");
class SurvivorsItemDetailTabView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eVi = undefined;
    this.Spt = undefined;
    this.p_d = () => {
      var i = new SurvivorsItemGrid();
      i.SetClickCallback(this.Wvt);
      i.SetCanExecuteChange(this.Lke);
      return i;
    };
    this.Wvt = (i, t) => {
      this.hOd(t);
      this.Spt?.SelectGridProxy(i);
    };
    this.Lke = i => this.Spt?.GetSelectedGridIndex() !== i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.eVi = new SurvivorsRogueCardBase_1.SurvivorsRogueCardBase();
    await this.eVi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.Spt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.p_d);
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetItemGainList();
    if (i.length === 0) {
      this.B5d(true);
    } else {
      this.B5d(false);
      this.Spt?.RefreshByDataAsync(i).then(() => {
        this.Spt?.ScrollToGridIndex(0);
        this.Spt.UnsafeGetGridProxy(0)?.SetToggleStateForce(true, true, true);
      });
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "SurvivorsPropAttribute_PropNum", i.length);
  }
  B5d(i) {
    this.GetItem(4)?.SetUIActive(!i);
    this.GetItem(5)?.SetUIActive(i);
    this.GetTexture(6)?.SetUIActive(!i);
  }
  hOd(i) {
    if (i === undefined) {
      this.eVi?.SetUiActive(false);
    } else {
      this.eVi?.SetUiActive(true);
      i = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralItem(i);
      this.eVi?.Apply(i);
    }
  }
}
exports.SurvivorsItemDetailTabView = SurvivorsItemDetailTabView;
class SurvivorsItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.lOd = -1;
    this.eTt = undefined;
    this.Lke = undefined;
    this.H5e = undefined;
    this.Jgt = i => {
      if (this.eTt) {
        this.eTt(this.GridIndex, this.lOd);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIExtendToggle], [7, UE.UIItem], [8, UE.UISprite]];
    this.BtnBindInfo = [[6, this.Jgt]];
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(6);
    this.H5e?.CanExecuteChange.Bind(() => !this.Lke || this.Lke(this.GridIndex));
  }
  SetClickCallback(i) {
    this.eTt = i;
  }
  SetCanExecuteChange(i) {
    this.Lke = i;
  }
  SetToggleStateForce(i, t = false, e = false) {
    this.H5e?.SetToggleStateForce(i ? 1 : 0, t, false, e);
  }
  Refresh(i, t, e) {
    this.lOd = i.ConfigId;
    i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsItem(this.lOd);
    this.SetTextureByPath(i.Icon, this.GetTexture(1));
    this.GetText(2)?.ShowTextNew(i.Name);
    this.SetQualityIconById(this.GetSprite(0), i.Quality);
    this.SetToggleStateForce(t, false, true);
  }
  OnDeselected(i) {
    this.SetToggleStateForce(false, false, false);
  }
}
//# sourceMappingURL=SurvivorsItemDetailTabView.js.map
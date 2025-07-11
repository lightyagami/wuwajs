"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluenceDisplayItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class InfluenceDisplayItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.yGe = undefined;
    this.Tsi = 0;
    this.Lsi = 0;
    this.j5e = undefined;
    this.Xy = 0;
    this.Lke = () => {
      var t = this.IsUnLock();
      if (!t) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InfluenceLockTips");
      }
      return t;
    };
    this.Dsi = t => {
      if (t === 1) {
        this.SetActiveToggleState();
      } else {
        this.Rsi();
      }
      this.j5e?.(t, this.Xy);
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIExtendToggle], [5, UE.UIItem], [4, UE.UISprite], [3, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [10, UE.UIItem], [9, UE.UITexture]];
    this.BtnBindInfo = [[2, this.Dsi]];
  }
  OnStart() {
    this.GetExtendToggle(2).CanExecuteChange.Bind(this.Lke);
    this.yGe = new ContentItem(this.GetItem(8));
    this.yGe.SetActive(false);
  }
  OnBeforeDestroy() {
    var t = this.GetExtendToggle(2);
    t.SetToggleState(0);
    t.CanExecuteChange.Unbind();
    this.Ovt();
    this.yGe.Destroy();
    this.yGe = undefined;
  }
  UpdateItem(t, i) {
    this.Lsi = t;
    var e = ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(t);
    if (e) {
      this.Tsi = e.Relation;
    }
    this.Usi(t, i);
    this.K8e();
  }
  SetToggleState(t, i = false) {
    this.GetExtendToggle(2).SetToggleState(t, i);
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetIndex(t) {
    this.Xy = t;
  }
  SetActiveToggleState() {
    this.yGe.SetActive(true);
    this.yGe.BindRedDot();
    this.GetItem(10).SetUIActive(false);
  }
  SetDisActiveToggleState() {
    this.SetToggleState(0);
    this.Rsi();
  }
  Rsi() {
    this.yGe.SetActive(false);
    this.K8e();
  }
  Usi(t, i) {
    var e = this.GetText(0);
    var s = this.GetText(1);
    var n = this.GetTexture(9);
    this.GetItem(5).SetUIActive(this.Tsi === 1);
    this.GetItem(3).SetUIActive(this.Tsi === 2);
    this.GetItem(6).SetUIActive(this.Tsi === 3);
    this.GetItem(7).SetUIActive(this.Tsi === 0);
    if (this.Tsi === 0) {
      e.SetUIActive(false);
      n.SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalText(s, "InfluenceLockName");
    } else {
      e = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(t);
      s = this.GetText(0);
      if (e.ExtraDesc) {
        s.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(s, e.ExtraDesc);
      } else {
        s.SetUIActive(false);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
      this.yGe.UpdateItem(t, i, this.Tsi);
      if (this.Tsi === 2) {
        s = ModelManager_1.ModelManager.InfluenceReputationModel.GetReputationProgress(t);
        this.GetSprite(4).SetFillAmount(s.Current / s.Max);
      }
      n.SetUIActive(true);
      this.SetTextureByPath(e.Logo, n);
    }
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot("InfluenceReward", this.GetItem(10), undefined, this.Lsi);
  }
  Ovt() {
    RedDotController_1.RedDotController.UnBindRedDot("InfluenceReward");
  }
  IsUnLock() {
    return this.Tsi !== 0;
  }
}
exports.InfluenceDisplayItem = InfluenceDisplayItem;
class ContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Lsi = 0;
    this.z5t = 0;
    this.qAt = () => {
      var t = {
        InfluenceId: this.Lsi,
        CountryId: this.z5t
      };
      UiManager_1.UiManager.OpenView("ReputationDetailsView", t);
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText]];
    this.BtnBindInfo = [[1, this.qAt]];
  }
  UpdateItem(t, i, e) {
    this.Lsi = t;
    this.z5t = i;
    this.Asi();
    this.Usi(e);
  }
  Usi(t) {
    var i = this.GetButton(1);
    var e = this.GetText(3);
    if (t === 1) {
      i.RootUIComp.SetUIActive(false);
      e.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalText(e, "InfluenceBelongTips");
    } else if (t === 3) {
      i.RootUIComp.SetUIActive(false);
      e.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalText(e, "InfluenceHostilityTips");
    } else if (t === 2) {
      i.RootUIComp.SetUIActive(true);
      e.SetUIActive(false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InfluenceReputation", 10, "出现未知关系类型", ["Relation", t]);
    }
  }
  Asi() {
    var t = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(this.Lsi);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Introduction);
  }
  BindRedDot() {
    RedDotController_1.RedDotController.BindRedDot("InfluenceReward", this.GetItem(2), undefined, this.Lsi);
  }
}
//# sourceMappingURL=InfluenceDisplayItem.js.map
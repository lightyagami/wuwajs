"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerFightFinishView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ShipTowerFightFinishItem_1 = require("./ShipTowerFightFinishItem");
class ShipTowerFightFinishView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.HDo = undefined;
    this.GV_ = undefined;
    this.FV_ = undefined;
    this.NV_ = undefined;
    this.VV_ = undefined;
    this.Bqe = () => new ShipTowerFightFinishItem_1.ShipTowerFightFinishItem();
    this.jV_ = () => {
      if (this.NV_?.OnClickedCallback) {
        this.NV_.OnClickedCallback(0);
      }
      if (this.NV_?.IsClickedCloseView) {
        this.CloseMe();
      }
    };
    this.HV_ = () => {
      if (this.VV_?.OnClickedCallback) {
        this.VV_.OnClickedCallback(1);
      }
      if (this.VV_?.IsClickedCloseView) {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [6, UE.UIButtonComponent], [5, UE.UIButtonComponent], [7, UE.UIText]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerFightFinishView", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.Es_();
    this.HDo = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.Bqe);
    this.GV_ = new ButtonItem_1.ButtonItem(this.GetButton(6).RootUIComp);
    this.FV_ = new ButtonItem_1.ButtonItem(this.GetButton(5).RootUIComp);
    this.GV_.SetFunction(this.jV_);
    this.FV_.SetFunction(this.HV_);
  }
  OnBeforeShow() {
    this.Slo();
  }
  Slo() {
    this.HDo?.RefreshByData(this.OpenParam?.AreaList ?? []);
    this.GetText(3).SetText(this.$V_().toString());
    var i = this.GetTexture(4);
    var t = this.OpenParam?.GradeResId !== undefined;
    i.SetUIActive(t);
    if (t) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.OpenParam.GradeResId);
      this.SetTextureByPath(t, i);
    }
    this.GetItem(2).SetUIActive(this.OpenParam?.IsNewRecord ?? false);
    this.WV_();
  }
  $V_() {
    if (this.OpenParam?.TotalScore) {
      return this.OpenParam.TotalScore;
    } else {
      return this.OpenParam?.AreaList.reduce((i, t) => i + t.ScoreA + t.ScoreB, 0) ?? 0;
    }
  }
  WV_() {
    var i = this.GetText(7);
    var t = [this.GV_, this.FV_];
    const r = [undefined, i];
    t.forEach((i, t) => {
      var e;
      var s;
      var h = this.OpenParam?.ButtonList[t];
      if (h) {
        i?.SetShowText(h.ButtonTextId);
        if (e = h.DescriptionTextId) {
          s = h.DescriptionArgs ?? [];
          LguiUtil_1.LguiUtil.SetLocalTextNew(r[t], e, ...s);
        }
        r[t]?.SetUIActive(e !== undefined);
      }
      i?.SetActive(h !== undefined);
    });
    this.NV_ = this.OpenParam?.ButtonList[0];
    this.VV_ = this.OpenParam?.ButtonList[1];
  }
}
exports.ShipTowerFightFinishView = ShipTowerFightFinishView;
//# sourceMappingURL=ShipTowerFightFinishView.js.map
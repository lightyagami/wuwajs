"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryViewBase = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const attributeId = 13;
const ROOT_TRANSLUCENT_ALPHA = 0.2;
class HonamiStoryViewBase extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.DangerPercent = 0;
    this.NormalPercent = 0;
    this.zZd = 0;
    this.HpTextType = 0;
    this.InTweenType = 0;
    this.OutTweenType = 0;
    this.DangerPercentConfigId = "";
    this.ShowFunctionType = undefined;
    this.HideFunctionType = undefined;
    this.$pt = undefined;
    this.Oml = undefined;
    this.wto = (t, e) => {
      if (t === "PlotViewHUD") {
        if (e) {
          this.Oml.StopTweenAnim(this.InTweenType);
          this.Oml.PlayTweenAnim(this.OutTweenType);
        } else {
          this.Oml.StopTweenAnim(this.OutTweenType);
          this.Oml.PlayTweenAnim(this.InTweenType);
        }
      }
    };
    this._yo = (t, e, i) => {
      this.fvt();
    };
    this.RQe = (t, e) => {
      var i;
      if (t === this.ShowFunctionType || t === this.HideFunctionType) {
        t = !this.ShowFunctionType || ModelManager_1.ModelManager.FunctionModel.IsOpen(this.ShowFunctionType);
        i = !this.HideFunctionType || ModelManager_1.ModelManager.FunctionModel.IsOpen(this.HideFunctionType);
        t = !t || this.HideFunctionType && i;
        this.SetVisible(1, !t);
      }
    };
  }
  OnStart() {
    this.OnInitData();
    this.InitChildType(37);
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.DangerPercent = CommonParamById_1.configCommonParamById.GetFloatConfig(this.DangerPercentConfigId) ?? 0;
    this.NormalPercent = 1 - this.DangerPercent;
    var t = this.GetText(this.HpTextType);
    t.SetRichText(true);
    t.SetGameRichText(true);
    this.Oml = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.Oml.InitTweenAnim(this.InTweenType, this.GetItem(this.InTweenType));
    this.Oml.InitTweenAnim(this.OutTweenType, this.GetItem(this.OutTweenType));
    var t = !this.ShowFunctionType || ModelManager_1.ModelManager.FunctionModel.IsOpen(this.ShowFunctionType);
    var e = !this.HideFunctionType || ModelManager_1.ModelManager.FunctionModel.IsOpen(this.HideFunctionType);
    if (!t || this.HideFunctionType && e) {
      this.SetVisible(1, false);
    }
    if (!t || !e) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    }
  }
  OnBeforeDestroy() {
    this.$pt?.Clear();
    this.$pt = undefined;
    this.Oml?.Clear();
    this.Oml = undefined;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    }
  }
  OnBeforeShow() {
    this.RootItem.SetAlpha(UiManager_1.UiManager.GetViewByName("PlotViewHUD")?.IsShow ? ROOT_TRANSLUCENT_ALPHA : 1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotViewChange, this.wto);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(attributeId, this._yo);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddMaxListener(attributeId, this._yo);
    this.fvt(true);
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewChange, this.wto);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveValueListener(attributeId, this._yo);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveMaxListener(attributeId, this._yo);
  }
  fvt(e = false) {
    var t = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(attributeId);
    var i = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(attributeId);
    var s = t / i;
    let r = 0;
    if (s == 0) {
      r = 2;
    } else if (s <= this.DangerPercent) {
      r = 1;
    }
    if (e || r !== this.zZd) {
      this.OnRefreshState(r);
      let t = "Start";
      switch (r) {
        case 0:
          t = e ? "Start" : "Recover";
          break;
        case 1:
          t = "Red";
          break;
        case 2:
          t = "Ovr";
      }
      this.lwr(t);
    }
    this.zZd = r;
    this.OnRefreshAttribute(s, r);
    this.GetText(this.HpTextType).SetText(this.JZd(r, t, i));
  }
  JZd(t, e, i) {
    switch (t) {
      case 1:
        return `<color=#ec5a7aff>${Math.ceil(e)}</color><color=#ffffff>/${Math.ceil(i)}</color>`;
      case 2:
        return `<color=#ec5a7aff>${Math.ceil(e)}/${Math.ceil(i)}</color>`;
      default:
        return `<color=#ffffff>${Math.ceil(e)}/${Math.ceil(i)}</color>`;
    }
  }
  lwr(t) {
    this.$pt.StopPrevSequence(false, true);
    this.$pt.PlaySequencePurely(t);
  }
  OnInitData() {}
  OnRefreshState(t) {}
  OnRefreshAttribute(t, e) {}
}
exports.HonamiStoryViewBase = HonamiStoryViewBase;
//# sourceMappingURL=HonamiStroyViewBase.js.map
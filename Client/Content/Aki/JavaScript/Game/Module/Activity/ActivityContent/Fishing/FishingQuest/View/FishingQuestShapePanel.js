"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQuestShapePanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const FishingDefine_1 = require("../../FishingDefine");
const FishingQuestShapePanelItem_1 = require("./FishingQuestShapePanelItem");
class FishingQuestShapePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Kc_ = 0;
    this.$c_ = 0;
    this.zq_ = 0;
    this.Jq_ = 0;
    this.Zq_ = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetItem(1);
    this.Kc_ = e.Width;
    this.$c_ = e.Height;
    this.zq_ = e.GetAnchorOffsetX();
    this.Jq_ = e.GetAnchorOffsetY();
    e.SetUIActive(false);
  }
  RefreshPanel(e, i = true) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(e);
    var s = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShapeConfig(t.Shap).FillState;
    let h = -1;
    let a = -1;
    let r = -1;
    let n = -1;
    for (let t = 0, e = s.length; t < e; t++) {
      for (let e = 0, i = s[t].ArrayInt.length; e < i; e++) {
        if (s[t].ArrayInt[e] === 1) {
          h = h === -1 ? t : Math.min(h, t);
          a = a === -1 ? t : Math.max(a, t);
          r = r === -1 ? e : Math.min(r, e);
          n = n === -1 ? e : Math.max(n, e);
        }
      }
    }
    e = this.Zq_;
    for (const f of e) {
      f.SetUiActive(false);
    }
    this.eO_(s, h, r);
    var l = (n - r + 1) * this.Kc_;
    var o = (a - h + 1) * this.$c_;
    var g = this.GetTexture(2);
    g.SetWidth(l);
    g.SetHeight(o);
    var u = this.GetItem(0);
    u.SetWidth(l);
    u.SetHeight(o);
    var _ = t.Sprite;
    for (const p of e) {
      p.SetGirdSprite(t.Category, _);
    }
    this.SetTextureByPath(t.Pic, g);
    this.$A_(i);
    this.GetItem(3).SetUIActive(!i);
    this.GetItem(4).useChangeColor = i;
  }
  $A_(e) {
    if (e) {
      this.GetTexture(2).SetCustomMaterialScalarParameter(FishingDefine_1.materialProgressName, 1);
    } else {
      this.GetTexture(2).SetCustomMaterialScalarParameter(FishingDefine_1.materialProgressName, 0);
    }
  }
  eO_(s, h, a) {
    let r = 0;
    for (let t = 0, e = s.length; t < e; t++) {
      for (let e = 0, i = s[t].ArrayInt.length; e < i; e++) {
        if (s[t].ArrayInt[e] === 1) {
          this.tO_(r++, t - h, e - a);
        }
      }
    }
  }
  tO_(e, i, t) {
    let s = undefined;
    t = this.zq_ + t * this.Kc_;
    i = this.Jq_ - i * this.$c_;
    if (this.Zq_.length > e) {
      (s = this.Zq_[e]).SetUiActive(true);
    } else {
      e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(1), this.GetItem(0));
      (s = new FishingQuestShapePanelItem_1.FishingQuestShapePanelItem()).CreateThenShowByActorAsync(e.GetOwner());
      this.Zq_.push(s);
    }
    s.GetRootItem().SetAnchorOffsetX(t);
    s.GetRootItem().SetAnchorOffsetY(i);
  }
}
exports.FishingQuestShapePanel = FishingQuestShapePanel;
//# sourceMappingURL=FishingQuestShapePanel.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchToyGridItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
class FloroRanchToyGridItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.UiLevelSequence = undefined;
    this.Zqe = e => {};
    this.N8e = () => {
      var e = this.Jh?.CheckGetComponent(0)?.Point ?? -1;
      this.Zqe?.(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UITexture], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UITexture]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnBeforeCreate() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
  }
  OnStart() {
    this.SetInfoPanelActive(false);
    this.GetExtendToggle(0).SetSelfInteractive(false);
  }
  BindClickCallback(e) {
    this.Zqe = e;
  }
  RefreshItemGrid(e) {
    var i;
    var t;
    if (e) {
      i = (this.Jh = e).CheckGetComponent(0);
      e = e.CheckGetComponent(3).ToyData;
      this.GetItem(3).SetUIActive(false);
      if (t = e.GetToyQualityData()) {
        this.SetSpriteByPath(t.GetRaritySmallBg(), this.GetSprite(1), true);
      }
      t = e.GetIsUnique();
      i = i?.Count ?? 1;
      if (!t) {
        this.GetText(6).SetText(i.toString());
      }
      this.GetItem(5).SetUIActive(!t && i > 1);
      this.SetTextureByPath(e.GetIcon(), this.GetTexture(2));
      this.GetSprite(7).SetUIActive(!e?.IsUnLock);
      this.SetInfoPanelActive(true);
      this.GetExtendToggle(0).SetSelfInteractive(true);
      if (t = e.GetToyRaceData()) {
        this.GetItem(14)?.SetUIActive(true);
        this.SetTextureShowUntilLoaded(t.SmallIcon, this.GetTexture(15));
      }
    } else {
      this.SetInfoPanelActive(false);
      this.GetExtendToggle(0).SetSelfInteractive(false);
    }
  }
  SetInfoPanelActive(e) {
    this.GetItem(8).SetUIActive(e);
  }
  PlayShowAnim(e) {
    this.RefreshItemGrid(e);
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    this.UiLevelSequence.PlaySequence("Start", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
  }
  SetSelectState(e) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0);
  }
}
exports.FloroRanchToyGridItem = FloroRanchToyGridItem;
//# sourceMappingURL=FloroRanchToyGridItem.js.map
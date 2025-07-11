"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleVisionDragHeadItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
const RoleVisionCommonItem_1 = require("./RoleVisionCommonItem");
class RoleVisionDragHeadItem extends RoleVisionCommonItem_1.RoleVisionCommonItem {
  constructor() {
    super(...arguments);
    this.ClickFunction = undefined;
    this.bxt = undefined;
    this.wCo = false;
    this.BCo = 0;
    this.SPe = undefined;
    this.bCo = "";
    this.qCo = undefined;
    this.nZ_ = undefined;
    this.Yl_ = true;
    this.Lke = () => false;
  }
  GetPlusItem() {
    return this.GetItem(6);
  }
  GetVisionTextureComponent() {
    return this.GetTexture(2);
  }
  GetVisionQualitySprite() {
    return this.GetSprite(3);
  }
  GetVisionCostText() {
    return this.GetText(5);
  }
  GetVisionCostItem() {
    return this.GetItem(4);
  }
  GetDragComponent() {
    return this.GetDraggable(1);
  }
  GetSelectToggle() {
    return this.GetExtendToggle(0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIDraggableComponent], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText]];
    this.BtnBindInfo = [[0, this.OnClickVision]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(7));
    await this.bxt.Init();
  }
  SetAniLightState(t) {
    this.GetItem(11).SetUIActive(t);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(8).SetUIActive(false);
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => this.Lke());
  }
  OnSetClickCallBack(t) {
    this.ClickFunction = t;
  }
  OnDragBegin() {
    this.bxt.GetRootItem().SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
    this.GetItem(14)?.SetUIActive(false);
    this.GCo(true);
  }
  OnDragEnd() {
    this.bxt.GetRootItem().SetUIActive(true);
    this.GCo(false);
  }
  OnUpdateItem(t) {
    var i;
    if (t) {
      this.GetText(5).SetText(t.GetCost().toString());
      i = t.GetFetterGroupConfig();
      this.bxt.Update(i);
    }
    this.NCo();
    this.OCo(t);
    this.kCo(t);
    this.Ovt();
    this.K8e(t);
    this.GCo(t === undefined);
    this.Olt(t);
    this.GetItem(12)?.SetUIActive(false);
  }
  Olt(t) {
    if (t && this.Yl_) {
      t = t.GetPhantomLevel();
      this.GetItem(14)?.SetUIActive(true);
      this.GetText(15)?.SetText("+" + t.toString());
    }
  }
  GCo(t) {
    this.GetItem(10)?.SetUIActive(t);
    this.GetItem(13)?.SetUIActive(t);
  }
  kCo(t) {
    this.GetItem(9).SetUIActive(t !== undefined);
  }
  NCo() {
    if (!this.AnimationState && this.CurrentData) {
      this.GetItem(4).SetUIActive(true);
      this.bxt.GetRootItem().SetUIActive(true);
      if (this.Yl_) {
        this.GetItem(14)?.SetUIActive(true);
      }
    } else {
      this.bxt.GetRootItem().SetUIActive(false);
      this.GetItem(4).SetUIActive(false);
      this.GetItem(14)?.SetUIActive(false);
    }
  }
  OnScrollToScrollViewEvent() {
    this.GetItem(12)?.SetUIActive(true);
    this.GCo(false);
  }
  OnRemoveFromScrollViewEvent() {
    this.GetItem(12)?.SetUIActive(false);
    this.GCo(true);
  }
  OnChangeAnimationState() {
    this.NCo();
  }
  OnItemOverlay() {
    this.PlaySequence("HighLight");
  }
  OnItemUnOverlay() {
    this.PlaySequence("Normal");
  }
  OnPlaySequence(t) {
    if (this.bCo !== t) {
      this.bCo = t;
      this.SPe.PlaySequencePurely(t);
    }
  }
  K8e(t) {
    var i;
    if (!this.RoleData || this.RoleData.IsTrialRole()) {
      this.GetItem(8)?.SetUIActive(false);
    } else if (!this.wCo && this.NeedRedDot && t === undefined) {
      this.wCo = true;
      RedDotController_1.RedDotController.BindRedDot("VisionGridRedDot", this.GetItem(8), undefined, this.RoleData.GetRoleId());
      this.BCo = 0;
      this.nZ_ = this.RoleData;
    } else if (!this.wCo && this.NeedRedDot && t) {
      this.wCo = true;
      i = t.GetIncrId();
      RedDotController_1.RedDotController.BindRedDot("IdentifyTab", this.GetItem(8), undefined, i);
      this.BCo = 1;
      this.qCo = t;
    }
  }
  Ovt() {
    if (this.wCo) {
      this.wCo = false;
      if (this.BCo === 0) {
        RedDotController_1.RedDotController.UnBindGivenUi("VisionGridRedDot", this.GetItem(8), this.nZ_.GetRoleId());
      } else {
        RedDotController_1.RedDotController.UnBindGivenUi("IdentifyTab", this.GetItem(8), this.qCo?.GetIncrId());
      }
    }
  }
  OCo(t) {
    if (t !== undefined) {
      t = t.GetQuality();
      t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(t);
      this.SetSpriteByPath(t, this.GetSprite(3), false);
    } else {
      t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(0);
      this.SetSpriteByPath(t, this.GetSprite(3), false);
    }
  }
  OnResetPosition() {
    this.GetDragComponent()?.RootUIComp.SetAsLastHierarchy();
    if (this.bCo === "HighLight") {
      this.PlaySequence("Normal");
      this.SPe.StopCurrentSequence(false, true);
    } else {
      this.bCo = "Normal";
    }
    this.AnimationState = false;
    this.NCo();
  }
  OnBeforeClearComponent() {
    this.Ovt();
  }
  SetLevelItemShowState(t) {
    this.Yl_ = t;
  }
}
exports.RoleVisionDragHeadItem = RoleVisionDragHeadItem;
//# sourceMappingURL=RoleVisionDragHeadItem.js.map
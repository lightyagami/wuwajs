"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiToyItem = undefined;
const UE = require("ue");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const FloroRanchDefine_1 = require("../../FloroRanchDefine");
const FloroRanchEntityDebugInfoItem_1 = require("./FloroRanchEntityDebugInfoItem");
const FloroRanchUiItemBase_1 = require("./FloroRanchUiItemBase");
class FloroRanchUiToyItem extends FloroRanchUiItemBase_1.FloroRanchUiItemBase {
  constructor() {
    super(...arguments);
    this.qKu = undefined;
    this.UiLevelSequence = undefined;
    this.Zqe = () => {};
    this.N8e = () => {
      this.Zqe?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UITexture]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnBeforeCreate() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
  }
  async OnBeforeStartAsync() {}
  async RefreshItem() {
    var e = this.Entity.CheckGetComponent(0);
    var i = this.Entity.CheckGetComponent(3).ToyData;
    this.GetItem(3).SetUIActive(false);
    var t = i.GetToyQualityData();
    this.SetSpriteByPath(t.GetRaritySmallBg(), this.GetSprite(1), true);
    var t = i.GetIsUnique();
    var e = e?.Count ?? 1;
    if (!t) {
      this.GetText(6).SetText(e.toString());
    }
    this.GetItem(5).SetUIActive(!t && e > 1);
    await this.SetTextureAsync(i.GetIcon(), this.GetTexture(2));
    this.GetSprite(7).SetUIActive(!i?.IsUnLock);
    var t = i.GetToyRaceData();
    if (t) {
      this.GetItem(14)?.SetUIActive(true);
      this.SetTextureShowUntilLoaded(t.SmallIcon, this.GetTexture(15));
    }
  }
  GetRewardPopTransform() {
    return this.GetRootActor().GetTransform();
  }
  async PlayShowAnim() {
    await this.RefreshItem();
    this.GetItem(8).SetUIActive(true);
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    this.UiLevelSequence.PlaySequence("Start", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
  }
  async PlayHideAnim() {
    this.GetItem(8).SetUIActive(false);
    await Promise.resolve();
  }
  async PlayNormalAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    this.UiLevelSequence.PlaySequence("Act", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_TOY_SKILL_ANIM_WAIT_TIME);
  }
  SetSelectState(e) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0);
  }
  BindClickCallback(e) {
    this.Zqe = e;
  }
}
exports.FloroRanchUiToyItem = FloroRanchUiToyItem;
//# sourceMappingURL=FloroRanchUiToyItem.js.map
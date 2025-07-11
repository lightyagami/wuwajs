"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalChapterEntryItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CiacconaGalChapterEntryItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.hVc = undefined;
    this.eTt = () => {
      this.GetExtendToggle(4).SetToggleState(0);
      if (ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(this.Pe.ChapterId).IsUnlocked) {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenChapterViewById(this.Pe.ChapterId);
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RequirePreChapter");
      }
    };
    this.B4c = () => new CiacconaSubEndingIcon();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIExtendToggle], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[4, this.eTt]];
  }
  OnStart() {
    this.hVc = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.B4c);
  }
  Refresh(e, r, t) {
    this.Pe = e;
    var i = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(e.ChapterId);
    this.GetSprite(1).SetUIActive(!i.IsUnlocked);
    var n = i.IsUnlocked ? e.SlotImagePath : e.SlotLockImagePath;
    this.SetTextureByPath(n, this.GetTexture(0));
    this.SetSpriteByPath(e.RomanNumberIconPath, this.GetSprite(3), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Title);
    var n = i.SubEndingIds.map(e => ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e));
    this.hVc.RefreshByData(n);
    this.GetItem(7).SetUIActive(ModelManager_1.ModelManager.CiacconaGalModel.HasAnySubEndingRewardByChapterId(e.ChapterId));
  }
}
exports.CiacconaGalChapterEntryItem = CiacconaGalChapterEntryItem;
class CiacconaSubEndingIcon extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(e, r, t) {
    let i = "SP_PlotReasoningLock";
    if (e.IsFinished) {
      i = e.Type === 1 ? "SP_PlotReasoningFinishMain" : "SP_PlotReasoningFinishBranch";
    }
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(e, this.GetSprite(0), false);
  }
}
//# sourceMappingURL=CiacconaGalChapterEntryItem.js.map
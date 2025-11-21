"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseDifficultyChangePanel = undefined;
const UE = require("ue");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TrapDefenseDifficultyChangePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DataList = [];
    this.SelectIndex = 0;
    this.OnRedDotLeftVisibleCallback = undefined;
    this.OnRedDotRightVisibleCallback = undefined;
    this.OnSelectDifficultyCallback = undefined;
    this.OnClickBtnLeft = () => {
      this.ChangeDifficultyAdd(-1);
    };
    this.OnClickBtnRight = () => {
      this.ChangeDifficultyAdd(1);
    };
  }
  async Init(e) {
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.OnClickBtnLeft], [4, this.OnClickBtnRight]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  SetRedDotLeftVisible(e) {
    this.GetItem(3)?.SetUIActive(e);
  }
  SetRedDotRightVisible(e) {
    this.GetItem(5)?.SetUIActive(e);
  }
  UpdateDataList(e, t = 0) {
    this.DataList = e;
    this.SelectIndex = t;
    this.SJc();
  }
  SJc() {
    var e = this.DataList[this.SelectIndex];
    this.GetText(1).ShowTextNew(e.NameKey);
    var t = this.GetSprite(0);
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.NameBgKey);
    this.SetSpriteByPath(i, t, false);
    this.GetItem(3)?.SetUIActive(!!this.OnRedDotLeftVisibleCallback?.(this.GetAddAfterIndex(this.SelectIndex, -1)));
    this.GetItem(5)?.SetUIActive(!!this.OnRedDotRightVisibleCallback?.(this.GetAddAfterIndex(this.SelectIndex, 1)));
    this.OnSelectDifficultyCallback?.(e);
  }
  ChangeDifficultyAdd(e) {
    this.SelectIndex = this.GetAddAfterIndex(this.SelectIndex, e);
    this.SJc();
    ModelManager_1.ModelManager.GuideModel.FinishFocusGuideGroupOnView("TrapDefenseMainLevelView");
  }
  GetAddAfterIndex(e, t) {
    return MathCommon_1.MathCommon.Warp(e + t, 0, this.DataList.length);
  }
}
exports.TrapDefenseDifficultyChangePanel = TrapDefenseDifficultyChangePanel;
//# sourceMappingURL=TrapDefenseDifficultyChangePanel.js.map
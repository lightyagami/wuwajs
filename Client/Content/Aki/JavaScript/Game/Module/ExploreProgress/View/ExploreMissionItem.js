"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreMissionItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreMissionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.zHs = undefined;
    this.ZHs = () => {
      if (this.zHs) {
        SkipTaskManager_1.SkipTaskManager.Run(7, this.zHs.QuestId);
        UiManager_1.UiManager.CloseView("ExploreMissionView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UIText]];
    this.BtnBindInfo = [[3, this.ZHs]];
  }
  Refresh(i, e, s) {
    var t = (this.zHs = i).IsBranchQuest();
    var r = i.IsQuestVisible();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.QuestNameId);
    this.GetSprite(1)?.SetUIActive(!t);
    this.GetSprite(0)?.SetUIActive(t);
    if (r) {
      this.GetItem(4)?.SetUIActive(true);
      this.GetText(6)?.SetUIActive(false);
      this.GetSprite(5)?.SetUIActive(false);
    } else if (i.QuestStatus === 3) {
      this.GetItem(4)?.SetUIActive(false);
      this.GetText(6)?.SetUIActive(false);
      this.GetSprite(5)?.SetUIActive(true);
    } else {
      this.GetItem(4)?.SetUIActive(false);
      this.GetText(6)?.SetUIActive(true);
      this.GetSprite(5)?.SetUIActive(false);
    }
  }
  Clear() {}
  OnSelected(i) {}
  OnDeselected(i) {}
  GetKey(i, e) {
    return this.GridIndex;
  }
}
exports.ExploreMissionItem = ExploreMissionItem;
//# sourceMappingURL=ExploreMissionItem.js.map
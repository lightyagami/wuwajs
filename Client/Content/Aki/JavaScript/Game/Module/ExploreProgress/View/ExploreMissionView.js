"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreMissionView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ExploreAreaMissionData_1 = require("../ExploreAreaMissionData");
const ExploreMissionItem_1 = require("./ExploreMissionItem");
class ExploreMissionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.L9e = 0;
    this.ejs = [];
    this.tjs = undefined;
    this.cHe = () => {
      return new ExploreMissionItem_1.ExploreMissionItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.L9e = this.OpenParam;
    var e = ConfigManager_1.ConfigManager.ExploreProgressConfig.GetAreaMissionConfigByAreaId(this.L9e);
    if (e) {
      for (const r of e) {
        var s = new ExploreAreaMissionData_1.ExploreAreaMissionData(r);
        this.ejs.push(s);
      }
      this.ejs.sort((i, e) => {
        var s = i.IsQuestVisible();
        if (s !== e.IsQuestVisible()) {
          if (s) {
            return -1;
          } else {
            return 1;
          }
        } else if ((s = i.QuestStatus) !== e.QuestStatus) {
          if (s === 3) {
            return 1;
          } else {
            return -1;
          }
        } else if ((s = i.IsBranchQuest()) !== e.IsBranchQuest()) {
          if (s) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return i.QuestId - e.QuestId;
        }
      });
      this.tjs = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1)?.GetOwner(), this.cHe);
      this.tjs.RefreshByData(this.ejs);
      let i = 0;
      for (const t of this.ejs) {
        if (t.QuestStatus === 3) {
          i++;
        }
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "ExploreMissionProgress", i, this.ejs.length);
    }
  }
  OnBeforeDestroy() {
    this.L9e = 0;
    this.ejs.length = 0;
  }
}
exports.ExploreMissionView = ExploreMissionView;
//# sourceMappingURL=ExploreMissionView.js.map
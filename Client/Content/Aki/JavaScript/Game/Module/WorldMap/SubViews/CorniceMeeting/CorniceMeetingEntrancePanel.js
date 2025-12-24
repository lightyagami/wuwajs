"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CorniceMeetingEntrancePanel = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityCorniceMeetingController_1 = require("../../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingController");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const CURRENT_DUNGEON = "CurrentDungeon";
const SCORE_KEY = "score";
class CorniceMeetingEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.c2o = undefined;
    this.OnConfirmBtnClick = () => {
      this.Close(() => {
        var e = ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingChallengeByMarkId(this.LayoutContext.MarkItem.MarkId);
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.CorniceMeetingChallengeTransRequest(e.Id);
      });
    };
  }
  GetResourceId() {
    return "UiView_Huodong_Prefab";
  }
  OnStart() {
    this.c2o = new TipsListView_1.TipsListView();
    this.c2o.Initialize(this.GetVerticalLayout(5));
    super.OnStart();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(32).SetUIActive(false);
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.c2o.Clear();
    super.OnBeforeDestroy();
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    this.l_i();
    this.l3e();
  }
  OnCloseWorldMapSecondaryUi() {
    this.c2o.Clear();
  }
  l3e() {
    var e;
    var t;
    var i = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    if (i !== undefined && (e = ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingChallengeByMarkId(this.LayoutContext.MarkItem.MarkId)) !== undefined && (t = i.GetLevelEntryData(e.Id)) !== undefined) {
      (i = this.c2o.AddItemByKey(CURRENT_DUNGEON)).SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CorniceMeetingMarkPanelCurrent") ?? "");
      i.SetRightText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title) ?? "");
      i.SetHelpButtonVisible(false);
      (e = this.c2o.AddItemByKey(SCORE_KEY)).SetHelpButtonVisible(false);
      e.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CorniceMeetingMarkPanelScore") ?? "");
      if (t.MaxScore === 0) {
        e.SetRightText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityCorniceMeetingScoreNoRecord") ?? "");
      } else {
        i = t.MaxScore;
        t = t.GetMaxScoreConfig();
        i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemCost_Text") ?? "", (t < i ? t : i).toString(), t.toString());
        e.SetRightText(i);
      }
    }
  }
  l_i() {
    this.LayoutContext.SetConfirmBtnText("Text_TeleportFastMove_Text");
  }
}
exports.CorniceMeetingEntrancePanel = CorniceMeetingEntrancePanel;
//# sourceMappingURL=CorniceMeetingEntrancePanel.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParkourEntrancePanel = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ParkourChallengeByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/ParkourChallengeByMarkId");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const SCORE_KEY = "score";
const LINE_NUMBER_KEY = "line";
class ParkourEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.u2o = undefined;
    this.c2o = undefined;
    this.OnConfirmBtnClick = () => {
      this.HandleTrack();
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
  OnBeforeDestroy() {
    this.c2o.Clear();
    super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(14).SetUIActive(false);
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.u2o = e;
    this.LayoutContext.MarkItem = e;
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(this.LayoutContext);
    this.l3e();
  }
  OnCloseWorldMapSecondaryUi() {
    this.c2o.Clear();
  }
  l3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetChallengeDataByMarkId(this.u2o.MarkConfigId);
    var r = ParkourChallengeByMarkId_1.configParkourChallengeByMarkId.GetConfig(this.u2o.MarkId);
    var t = this.c2o.AddItemByKey(LINE_NUMBER_KEY);
    t.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CurrentLine") ?? "");
    var r = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineNumber") ?? "", r.Id.toString());
    t.SetRightText(r);
    t.SetHelpButtonVisible(false);
    var r = this.c2o.AddItemByKey(SCORE_KEY);
    r.SetHelpButtonVisible(false);
    var t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ActiveRunMaxPoint_Text") ?? "", "");
    r.SetLeftText(t);
    if (e.GetMiniTime() === 0) {
      r.SetRightText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ActivityRunNoPoint_Text") ?? "");
    } else {
      r.SetRightText(e.GetMaxScore().toString());
    }
  }
}
exports.ParkourEntrancePanel = ParkourEntrancePanel;
//# sourceMappingURL=ParkourEntrancePanel.js.map
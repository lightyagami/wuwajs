"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestPanel = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController");
const MapController_1 = require("../../../Map/Controller/MapController");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const RewardItemBar_1 = require("../RewardItemBar");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const QUEST_CONDIGION_KEY = "questCondition";
class QuestPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.sOe = undefined;
    this.Wno = undefined;
    this.Fno = false;
    this.FRe = 0;
    this.Z2o = 0;
    this.u2o = undefined;
    this.eFo = undefined;
    this.tFo = undefined;
    this.OnTrackBtnClick = () => {
      this.CheckAndShowCrossMapTips(this.u2o);
      if (this.Z2o !== 0) {
        QuestController_1.QuestNewController.RequestTrackQuest(this.FRe, !this.Fno, 1, 0, () => {
          this.Zno();
          this.Close();
        });
      } else {
        MapController_1.MapController.RequestTrackMapMark({
          MarkType: 12,
          MarkId: this.u2o.MarkId,
          Track: !this.Fno
        });
        this.Fno = !this.Fno;
        this.Close();
      }
    };
  }
  GetResourceId() {
    return "UiView_Task_Prefab";
  }
  async OnBeforeStartAsync() {
    this.eFo = new RewardItemBar_1.RewardItemBar();
    this.eFo.SkipDestroyActor = true;
    await Promise.all([super.OnBeforeStartAsync(), this.eFo.CreateThenShowByActorAsync(this.GetItem(8).GetOwner(), true)]);
  }
  OnStart() {
    this.Wno = [];
    this.sOe = [];
    this.tFo = new TipsListView_1.TipsListView();
    this.tFo.Initialize(this.GetVerticalLayout(5));
    super.OnStart();
  }
  OnBeforeDestroy() {
    for (const e of this.sOe) {
      this.AddChild(e);
    }
    this.sOe.length = 0;
    this.eFo.Destroy();
    this.tFo.Clear();
    super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(2).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.FRe = e.TreeConfigId;
    this.Z2o = e.NodeId;
    this.u2o = e;
    this.LayoutContext.MarkItem = e;
    this.iFo();
    this.Zno();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(this.LayoutContext);
    e = this.UpdateQuickGoto();
    this.ConfirmButton.SetActive(!e);
  }
  OnCloseWorldMapSecondaryUi() {
    this.tFo?.Clear();
  }
  GetGuideFocusUiItem() {
    var e = this.GetButton(29)?.GetRootComponent();
    if (e !== undefined) {
      return e;
    }
  }
  iFo() {
    var e = ModelManager_1.ModelManager.QuestNewModel;
    this.GetText(1).SetText(e.GetQuestName(this.FRe));
    this.GetText(4).SetText(e.GetQuestDetails(this.FRe));
    if (this.Z2o === 0) {
      this.eFo.SetActive(false);
    } else {
      this.eFo.SetActive(true);
      this.oFo(this.FRe, this.Z2o);
      this.rso();
    }
  }
  oFo(e, t) {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (e) {
      e = GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(e.TreeId, t);
      (t = this.tFo.AddItemByKey(QUEST_CONDIGION_KEY)).SetHelpButtonVisible(false);
      t.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ?? "");
      t.SetRightText(e);
    }
  }
  rso() {
    this.Wno.length = 0;
    var e = ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardCommonInfo(this.FRe);
    if (e) {
      this.Wno = e;
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(true);
      this.eFo.RebuildRewardsByData(this.Wno);
    } else {
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    }
  }
  Zno() {
    var e;
    var t;
    if (this.Z2o !== 0) {
      this.Fno = ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(this.FRe);
    } else {
      e = this.u2o.MarkId;
      t = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
      this.Fno = !!t && t.MarkId === e;
    }
    this.ConfirmButton.SetLocalText(this.Fno ? "InstanceDungeonEntranceCancelTrack" : "InstanceDungeonEntranceTrack");
    this.TrackBtn.SetLocalText(this.Fno ? "InstanceDungeonEntranceCancelTrack" : "InstanceDungeonEntranceTrack");
  }
}
exports.QuestPanel = QuestPanel;
//# sourceMappingURL=QuestPanel.js.map
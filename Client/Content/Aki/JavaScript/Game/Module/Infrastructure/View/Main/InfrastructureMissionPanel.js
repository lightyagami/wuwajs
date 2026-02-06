"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureMissionPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const InfrastructureMissionItem_1 = require("./InfrastructureMissionItem");
class InfrastructureMissionPanel extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.q5m = undefined;
    this.LevelSequencePlayer = undefined;
    this.T8a = () => {
      if (this.Pe?.Index === 0) {
        var r = ModelManager_1.ModelManager.InfrastructureModel.FireLevel;
        for (const i of ConfigManager_1.ConfigManager.InfrastructureConfig.GetLevelConfigById(r).QuestIds) {
          var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i);
          if (e && e.CanShowInUiPanel()) {
            UiManager_1.UiManager.OpenView("QuestView", i, () => {
              var e = ModelManager_1.ModelManager.InfrastructureModel.GetActivityData();
              if (e) {
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
              }
            });
            break;
          }
        }
      } else {
        let e = ModelManager_1.ModelManager.InfrastructureModel.TracedRoadId;
        if (e === 0) {
          e = ModelManager_1.ModelManager.InfrastructureModel.RecommendRoadId;
        }
        var t;
        var r = ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(e);
        if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r.BuildConditionQuestId) === 3) {
          t = {
            MarkType: 43,
            MarkId: r.MarkId
          };
          WorldMapController_1.WorldMapController.OpenView(2, false, t);
        } else {
          SkipTaskManager_1.SkipTaskManager.RunByConfigId(r.JumpId);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIVerticalLayout], [3, UE.UIText], [4, UE.UIVerticalLayout], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISpriteTransition], [8, UE.UISprite], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[1, this.T8a]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(11).SetUIActive(false);
  }
  async OnBeforeStartAsync() {
    this.q5m = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), () => {
      return new InfrastructureMissionItem_1.InfrastructureMissionItem();
    });
    return Promise.resolve();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("QuestViewItem", this.GetItem(6));
  }
  Refresh(e) {
    this.Pe = e;
    RedDotController_1.RedDotController.UnBindGivenUi("QuestViewItem", this.GetItem(6));
    if (e.Index === 0) {
      this.X5m();
    } else {
      this.Y5m();
    }
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  X5m() {
    this.GetText(0).ShowTextNew("BuildRoadNet_CoreTask");
    this.GetItem(6).SetUIActive(true);
    var e = ModelManager_1.ModelManager.InfrastructureModel;
    var r = ConfigManager_1.ConfigManager.InfrastructureConfig;
    var t = e.GetCurrentQuestId();
    var i = e.FireLevel;
    var a = r.GetLevelConfigById(i);
    var n = a.QuestIds.indexOf(t);
    RedDotController_1.RedDotController.BindRedDot("QuestViewItem", this.GetItem(6), undefined, t);
    this.GetText(3).ShowTextNew(a.QuestDescriptions[n]);
    if (i < r.GetMaxLevel()) {
      t = r.GetLevelConfigById(i + 1);
      this.GetText(9).SetUIActive(e.FireExp >= t.Exp);
    }
    this.SetSpriteByPath("/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity30/ActivityInfrastructure/Main/SP_IconActivityInfrastructure8.SP_IconActivityInfrastructure8", this.GetSprite(8), true);
  }
  Y5m() {
    var e = ModelManager_1.ModelManager.InfrastructureModel;
    var r = ConfigManager_1.ConfigManager.InfrastructureConfig;
    this.GetItem(6).SetUIActive(false);
    let t = e.TracedRoadId;
    if (t === 0) {
      t = e.RecommendRoadId;
    }
    var i;
    var a;
    var n = r.GetRoadConfigById(t);
    var o = [];
    for ([i, a] of Array.from(n?.Requirement.entries()).sort((e, r) => e[0] - r[0])) {
      var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
      o.push({
        DesText: s?.Name ?? "",
        MaxCount: a,
        CurrentCount: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i)
      });
    }
    this.q5m?.RefreshByData(o);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "BuildRoadNet_RoadTask", e.GetCompleteRoadIds().length, r.GetRoadConfigList().length);
    this.GetText(0).ShowTextNew("BuildRoadNet_RoadTask");
    this.GetText(3).ShowTextNew(n.QuestDescription);
  }
  PlayFocusSequence() {
    this.GetItem(11).SetUIActive(true);
    this.LevelSequencePlayer.PlayLevelSequenceByName("Update");
  }
}
exports.InfrastructureMissionPanel = InfrastructureMissionPanel;
//# sourceMappingURL=InfrastructureMissionPanel.js.map
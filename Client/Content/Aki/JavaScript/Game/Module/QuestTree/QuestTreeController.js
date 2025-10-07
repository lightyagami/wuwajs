"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeController = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const MapUtil_1 = require("../Map/MapUtil");
class QuestTreeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsTrackQuest, this.hjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsQuestTreeGotoQuest, this.ljd);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsTrackQuest, this.hjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsQuestTreeGotoQuest, this.ljd);
    return true;
  }
  static OpenMainView() {
    UiManager_1.UiManager.OpenView("QuestTreeMainView");
  }
  static OpenChapterView(e, r) {
    e = {
      ChapterId: e,
      NodeId: r
    };
    UiManager_1.UiManager.OpenView("QuestTreeChapterView", e);
  }
  static OpenNodeDetailView(e) {
    var r = UiManager_1.UiManager.GetViewByName("QuestTreeNodeDetailView");
    if (r) {
      r.ChangeData(e);
    }
    UiManager_1.UiManager.OpenView("QuestTreeNodeDetailView", e);
  }
  static OpenAvailableListView(e) {
    UiManager_1.UiManager.OpenView("QuestTreeAvailableListView", e);
  }
  static TrackNode(e, r = true) {
    var o = e.QuestId;
    switch (ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(o, true, 1)) {
      case 1:
        return;
      case 2:
      case 3:
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("Task_NoSwitch_Tips");
        return;
      case 4:
        return;
    }
    if (r) {
      this.GotoNode(e);
    }
  }
  static GotoNode(e) {
    return this.GotoNodeByQuestId(e.QuestId);
  }
  static GotoNodeByQuestId(e) {
    var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (r) {
      e = r.GetCurrentActiveChildQuestNodes();
      if (e && e.length !== 0) {
        for (const a of e) {
          var o = r.GetDefaultMark(a.NodeId);
          if (o) {
            var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
            if (MapUtil_1.MapUtil.GetDungeonsRelation(t, r.DungeonId) === 1) {
              t = MapUtil_1.MapUtil.GetTrackDistanceByMarkId(o);
              if (!t) {
                continue;
              }
              if (t < (CommonParamById_1.configCommonParamById.GetIntConfig("QuestTrackNeedOpenWordMapDistance") ?? 50)) {
                UiManager_1.UiManager.ResetToBattleView();
                return true;
              }
            }
            const n = {
              MarkType: 12,
              MarkId: o,
              IsNotFocusTween: true,
              OpenFogId: 0
            };
            UiLayer_1.UiLayer.SetShowMaskLayer("QuestNodeGoto", true);
            if (UiManager_1.UiManager.GetViewByName("WorldMapView")) {
              UiManager_1.UiManager.CloseViewAsync("WorldMapView").then(() => {
                UiManager_1.UiManager.OpenView("WorldMapView", n, () => {
                  UiLayer_1.UiLayer.SetShowMaskLayer("QuestNodeGoto", false);
                });
              });
            } else {
              UiManager_1.UiManager.OpenView("WorldMapView", n, () => {
                UiLayer_1.UiLayer.SetShowMaskLayer("QuestNodeGoto", false);
              });
            }
            UiManager_1.UiManager.CloseView("QuestTreeNodeDetailView");
            return true;
          }
        }
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("FollowQuestStepGuide");
      }
    }
    return false;
  }
  static CancelTrackNode(e) {
    ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(e.QuestId, false, 1, undefined, () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, e);
    });
  }
  static TrackOrGotoNode(r) {
    var e = ModelManager_1.ModelManager.QuestNewModel;
    var o = r.QuestId;
    const t = e.GetQuest(o);
    if (t) {
      switch (e.GetQuestSpecialState(t)) {
        case 4:
          if (e.IsInFocusMode() && !e.IsInFocusOnQuest(o)) {
            (a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(322)).FunctionMap.set(2, () => {
              var e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
              ControllerHolder_1.ControllerHolder.QuestNewController.RequestCancelQuestFocusMode(e, () => {
                ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestForcedOccupation(t.TreeId, () => {
                  this.TrackNode(r);
                });
              });
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(a);
          } else {
            (a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(162)).FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestForcedOccupation(t.TreeId, () => {
                this.TrackNode(r);
              });
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(a);
          }
          break;
        case 8:
          var a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(311);
          a.FunctionMap.set(2, () => {
            ControllerHolder_1.ControllerHolder.QuestNewController.RequestSetQuestFocusMode(t.Id, () => {
              this.GotoNode(r);
            });
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(a);
          break;
        case 10:
          a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(322);
          a.FunctionMap.set(2, () => {
            var e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
            ControllerHolder_1.ControllerHolder.QuestNewController.RequestCancelQuestFocusMode(e, () => {
              this.TrackNode(r);
            });
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(a);
          break;
        default:
          if (r.IsTracking) {
            this.GotoNode(r);
          } else {
            this.TrackNode(r);
          }
      }
    }
  }
  static JumpToQuest(e) {
    const r = ModelManager_1.ModelManager.QuestTreeModel.GetNodeDataFromQuestId(e);
    if (r) {
      if (r.State === 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("QuestTree_NotTreeNode_Unavailable");
      } else if (ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SelectedData?.ChapterId === r.ChapterId) {
        ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SelectData(r);
        ControllerHolder_1.ControllerHolder.QuestTreeController.OpenNodeDetailView(r);
      } else {
        const o = {
          ChapterId: r.ChapterId
        };
        UiLayer_1.UiLayer.SetShowMaskLayer("QuestNodeGoto", true);
        UiManager_1.UiManager.CloseView("QuestTreeNodeDetailView", () => {
          UiManager_1.UiManager.CloseView("QuestTreeChapterView", () => {
            UiManager_1.UiManager.OpenView("QuestTreeChapterView", o, () => {
              ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SelectData(r);
              ControllerHolder_1.ControllerHolder.QuestTreeController.OpenNodeDetailView(r);
              UiLayer_1.UiLayer.SetShowMaskLayer("QuestNodeGoto", false);
            });
          });
        });
      }
    } else if (!ControllerHolder_1.ControllerHolder.QuestTreeController.GotoNodeByQuestId(e)) {
      UiManager_1.UiManager.OpenView("WorldMapView", undefined, () => {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("QuestTree_NotTreeNode_Unavailable");
      });
      UiManager_1.UiManager.CloseView("QuestTreeNodeDetailView");
    }
  }
}
exports.QuestTreeController = QuestTreeController;
(_a = QuestTreeController).hjd = (e, r, o, t) => {
  ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(e, r, o, t, () => {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyCsTrackQuestResponse);
  });
};
QuestTreeController.ljd = e => {
  e = ModelManager_1.ModelManager.QuestTreeModel.GetNodeDataFromNodeId(e);
  if (e) {
    _a.GotoNode(e);
  }
}; //# sourceMappingURL=QuestTreeController.js.map
"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
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
  static get IsGmSetAllNodeFinish() {
    var e = (0, puerts_1.$ref)(false);
    UE.KuroVariableFunctionLibrary.GetBoolValue("Gm_QuestTreeNode_Finish", e);
    return (0, puerts_1.$unref)(e);
  }
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsTrackQuest, this.hjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsQuestTreeGotoQuest, this.ljd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestTsHandleQuestTreeNode, this.MXd);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsTrackQuest, this.hjd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsQuestTreeGotoQuest, this.ljd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestTsHandleQuestTreeNode, this.MXd);
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
  static CloseNodeDetailView() {
    UiManager_1.UiManager.CloseView("QuestTreeNodeDetailView");
  }
  static OpenAvailableListView(e) {
    UiManager_1.UiManager.OpenView("QuestTreeAvailableListView", e);
  }
  static TrackNode(e, r = true) {
    var t = e.QuestId;
    var t = ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(t, true, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, e);
    switch (t) {
      case 1:
        return;
      case 2:
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Task_NoSwitch_Tips");
        return;
      case 3:
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("FollowQuestStepGuide");
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
        for (const n of e) {
          var t = r.GetDefaultMark(n.NodeId);
          if (t) {
            var o = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
            if (MapUtil_1.MapUtil.GetDungeonsRelation(o, r.DungeonId) === 1) {
              o = MapUtil_1.MapUtil.GetTrackDistanceByMarkId(t);
              if (!o) {
                continue;
              }
              if (o < (CommonParamById_1.configCommonParamById.GetIntConfig("QuestTrackNeedOpenWordMapDistance") ?? 50)) {
                UiManager_1.UiManager.ResetToBattleView();
                return true;
              }
            }
            const i = {
              MarkType: 12,
              MarkId: t,
              IsNotFocusTween: true,
              OpenFogId: 0
            };
            UiLayer_1.UiLayer.SetShowMaskLayer("QuestNodeGoto", true);
            if (UiManager_1.UiManager.GetViewByName("WorldMapView")) {
              UiManager_1.UiManager.CloseViewAsync("WorldMapView").then(() => {
                UiManager_1.UiManager.OpenView("WorldMapView", i, () => {
                  UiLayer_1.UiLayer.SetShowMaskLayer("QuestNodeGoto", false);
                });
              });
            } else {
              UiManager_1.UiManager.OpenView("WorldMapView", i, () => {
                UiLayer_1.UiLayer.SetShowMaskLayer("QuestNodeGoto", false);
              });
            }
            UiManager_1.UiManager.CloseView("QuestTreeNodeDetailView");
            return true;
          }
        }
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("FollowQuestStepGuide");
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
    var t = r.QuestId;
    const o = e.GetQuest(t);
    if (o) {
      switch (e.GetQuestSpecialState(o)) {
        case 4:
          if (e.IsInFocusMode() && !e.IsInFocusOnQuest(t)) {
            (n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(322)).FunctionMap.set(2, () => {
              var e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
              ControllerHolder_1.ControllerHolder.QuestNewController.RequestCancelQuestFocusMode(e, () => {
                ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestForcedOccupation(o.TreeId, () => {
                  this.TrackNode(r);
                  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsHandleQuestTreeNodeResponse, 1, r.Id);
                });
              });
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
          } else {
            (n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(162)).FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestForcedOccupation(o.TreeId, () => {
                this.TrackNode(r);
                EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsHandleQuestTreeNodeResponse, 1, r.Id);
              });
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
          }
          break;
        case 2:
          ControllerHolder_1.ControllerHolder.QuestNewController.SetVideoResourceDownloadTriggerId(o.Id);
          UiManager_1.UiManager.OpenView("ResDownLoadView");
          break;
        case 3:
          ControllerHolder_1.ControllerHolder.QuestNewController.ConfirmQuestResourceRequest(o.Id, () => {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, r);
            EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsHandleQuestTreeNodeResponse, 2, r.Id);
            EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsHandleQuestTreeNodeResponse, 4, r.Id);
          });
          break;
        case 8:
          var n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(311);
          n.FunctionMap.set(2, () => {
            ControllerHolder_1.ControllerHolder.QuestNewController.RequestSetQuestFocusMode(o.Id, () => {
              this.GotoNode(r);
            });
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
          break;
        case 9:
          ControllerHolder_1.ControllerHolder.QuestNewController.RequestAcceptFocusWaitQuest(o.Id, () => {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, r);
            EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsHandleQuestTreeNodeResponse, 2, r.Id);
            EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsHandleQuestTreeNodeResponse, 3, r.Id);
          });
          break;
        case 10:
          n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(322);
          n.FunctionMap.set(2, () => {
            var e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
            ControllerHolder_1.ControllerHolder.QuestNewController.RequestCancelQuestFocusMode(e, () => {
              this.TrackNode(r);
              EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsHandleQuestTreeNodeResponse, 1, r.Id);
            });
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
          break;
        default:
          if (r.IsTracking) {
            this.GotoNode(r);
          } else {
            this.TrackNode(r);
            EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsHandleQuestTreeNodeResponse, 1, r.Id);
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
        const t = {
          ChapterId: r.ChapterId
        };
        UiLayer_1.UiLayer.SetShowMaskLayer("QuestNodeGoto", true);
        UiManager_1.UiManager.CloseView("QuestTreeNodeDetailView", () => {
          UiManager_1.UiManager.CloseView("QuestTreeChapterView", () => {
            UiManager_1.UiManager.OpenView("QuestTreeChapterView", t, () => {
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
  static GmSetAllNodeFinish() {
    UE.KuroVariableFunctionLibrary.RemoveBoolValue("Gm_QuestTreeNode_Finish");
    UE.KuroVariableFunctionLibrary.SetBoolValue("Gm_QuestTreeNode_Finish", true);
  }
  static GmResetAllNodeFinish() {
    UE.KuroVariableFunctionLibrary.RemoveBoolValue("Gm_QuestTreeNode_Finish");
    UE.KuroVariableFunctionLibrary.SetBoolValue("Gm_QuestTreeNode_Finish", false);
  }
}
exports.QuestTreeController = QuestTreeController;
(_a = QuestTreeController).hjd = (e, r, t, o) => {
  ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(e, r, t, o, () => {
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyCsTrackQuestResponse);
  });
};
QuestTreeController.ljd = e => {
  e = ModelManager_1.ModelManager.QuestTreeModel.GetNodeDataFromNodeId(e);
  if (e) {
    _a.GotoNode(e);
  }
};
QuestTreeController.MXd = e => {
  e = ModelManager_1.ModelManager.QuestTreeModel.GetNodeDataFromNodeId(e);
  if (e) {
    _a.TrackOrGotoNode(e);
  }
}; //# sourceMappingURL=QuestTreeController.js.map
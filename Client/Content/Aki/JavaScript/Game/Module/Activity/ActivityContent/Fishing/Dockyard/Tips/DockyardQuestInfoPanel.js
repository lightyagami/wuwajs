"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardQuestInfoPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class DockyardQuestInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.ListLayout = undefined;
    this.ExitFunc = undefined;
    this.LockState = false;
    this.Bqe = () => {
      return new QuestInfoItem();
    };
    this.d4e = () => {
      if (ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust) {
        var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust);
        if (e) {
          var t;
          var i;
          var r = e.EntrustTarget;
          var s = [];
          var n = e.TargetDesText;
          for ([t, i] of r) {
            var o = ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(t);
            var o = {
              MaxCount: i,
              CurrentCount: o,
              DesText: n.get(t) ?? ""
            };
            s.push(o);
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
          this.ListLayout.RefreshByData(s);
          this.GetVerticalLayout(1).RootUIComp.SetUIActive(true);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Fishing_NotTraceEntrustInShip");
        this.GetVerticalLayout(1).RootUIComp.SetUIActive(false);
      }
    };
    this.b5_ = () => {
      ControllerHolder_1.ControllerHolder.FishingController.OpenFishingQuestView();
    };
    this.ti_ = () => {
      this.ExitFunc?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.b5_], [4, this.ti_]];
  }
  OnStart() {
    this.ListLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Bqe);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(e => {
      if (e === "Hide") {
        this.SetActive(false);
      }
    });
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingRefreshBackpackData, this.d4e);
    this.Refresh();
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingRefreshBackpackData, this.d4e);
  }
  SetPanelVisible(e) {
    if (!this.LockState) {
      if (e) {
        this.LevelSequencePlayer.StopCurrentSequence(true, true);
        this.LevelSequencePlayer.PlaySequencePurely("Show");
        this.SetActive(true);
      } else {
        this.LevelSequencePlayer.StopCurrentSequence(true, true);
        this.LevelSequencePlayer.PlaySequencePurely("Hide");
      }
    }
  }
  Refresh() {
    this.d4e();
  }
  SetButtonQuestVisible(e) {
    this.GetButton(3).RootUIComp.SetUIActive(e);
  }
  SetButtonExitVisible(e) {
    this.GetButton(4).RootUIComp.SetUIActive(e);
  }
}
exports.DockyardQuestInfoPanel = DockyardQuestInfoPanel;
class QuestInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.DesText, e.MaxCount);
    var t = this.GetText(1);
    var i = e.CurrentCount >= e.MaxCount;
    t.SetText(`(${Math.min(e.CurrentCount, e.MaxCount)}/${e.MaxCount})`);
    t.SetChangeColor(i, t.changeColor);
  }
}
//# sourceMappingURL=DockyardQuestInfoPanel.js.map
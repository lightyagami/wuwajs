"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeTextNodeItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const QuestTreeNodeItemLoader_1 = require("./IoC/QuestTreeNodeItemLoader");
class QuestTreeTextNodeItem extends QuestTreeNodeItemLoader_1.QuestTreeNodeItemBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Loader = undefined;
    this.aPd = undefined;
    this.Type = 2;
    this.HierarchyIndex = 0;
    this.Hea = undefined;
    this.kqe = () => {
      ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SelectData(this.Pe);
      ControllerHolder_1.ControllerHolder.QuestTreeController.OpenNodeDetailView(this.Pe);
    };
    this.hPd = t => {
      if (t !== this.Pe) {
        this.GetExtendToggle(0).SetToggleState(0);
      } else {
        this.GetExtendToggle(0).SetToggleState(1);
        this.LocateSelf();
      }
    };
    this.AOe = t => {
      if (t === this.Pe) {
        this.nOe(t);
      }
    };
    this.lPd = t => {
      if (t === this.Pe && !this.Pe.BelongedNode) {
        this.LocateSelf();
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.RootItem, true);
      }
    };
    this.Cjd = () => {
      if (this.Pe) {
        this.nOe(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [24, UE.UIItem], [8, UE.UIItem], [23, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(8).SetUIActive(false);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnSelectedDataChange(this.hPd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnLocatingNode(this.lPd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnUpdateNode(this.Cjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnUpdateNode(this.Cjd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnLocatingNode(this.lPd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnSelectedDataChange(this.hPd);
  }
  async CreateSelf(t) {
    await this.CreateThenShowByResourceIdAsync("UiItem_TaskTreeBranchB", t);
  }
  UpdateData(t) {
    this.Pe = t;
    this.nOe(t);
    this.xTd(t);
    this.DTd(t);
  }
  Refresh(t, e, i) {
    this.UpdateData(t);
  }
  GetAdditionalHeight() {
    if (this.Pe.NextQuestNode?.Config.NodeType === 3 && this.aPd) {
      return this.aPd.GetAdditionalHeight() + this.GetExtendToggle(0).GetRootComponent().GetHeight();
    } else {
      return 0;
    }
  }
  LocateSelf() {
    var t = this.GetExtendToggle(0).GetRootComponent();
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.LocatingHelper?.LocateToNode(t, true);
    if (!!this.Pe.IsTracking || this.Pe.State === 2) {
      this.Hea.PlayLevelSequenceByName("Jumpy");
    }
  }
  nOe(t) {
    this.GetItem(4).SetUIActive(!t.IsTracking && t.State === 1);
    this.GetItem(1).SetUIActive(!t.IsTracking && t.State === 4);
    this.GetItem(2).SetUIActive(!t.IsTracking && t.State === 2);
    this.GetItem(3).SetUIActive(t.IsTracking);
    this.GetItem(5).SetUIActive(!t.IsTracking && t.State === 3);
    this.SetSpriteByPath(t.TypeIconPath, this.GetSprite(6), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.Config.Name);
  }
  async DTd(t) {
    var e;
    if (t.State === 4) {
      if ((e = t.IsInPredecessorUnion()) && t.IsFirstNodeOfPredecessorUnion()) {
        this.aPd = await this.LTd(t.NextQuestNode);
      } else if (!e && t.NextQuestNode) {
        this.aPd = await this.PTd(t.NextQuestNode);
      }
    }
  }
  xTd(t) {
    this.UTd();
    var e = t.PreQuestNodes[0]?.Config.QuestType === 1 || t.PreQuestNodes.length === 0;
    this.GetItem(9).SetUIActive(true);
    this.GetItem(10).SetUIActive(t.Config.SortOrder < 0);
    this.GetItem(11).SetUIActive(t.Config.SortOrder > 0 && e && !t.BelongedNode);
    this.GetItem(12).SetUIActive(!!t.BelongedNode);
    this.GetItem(24).SetUIActive(t.IsInPredecessorUnion() && t.IsLastNodeOfPredecessorUnion());
    this.GetItem(23).SetUIActive(t.IsInPredecessorUnion() && !t.IsFirstNodeOfPredecessorUnion() && !t.IsLastNodeOfPredecessorUnion());
  }
  async PTd(t) {
    var e = t.Config.NodeType === 1 ? this.GetItem(20) : this.GetItem(22);
    (t.Config.NodeType === 1 ? this.GetItem(19) : this.GetItem(21)).SetUIActive(true);
    e.SetUIActive(true);
    return this.Loader.LoadNodeItem(t, e);
  }
  async LTd(t) {
    let e = undefined;
    let i = undefined;
    e = t.Config.NodeType === 1 ? (i = this.GetItem(15), this.GetItem(16)) : t.Config.NodeType === 2 ? (i = this.GetItem(17), this.GetItem(18)) : (i = this.GetItem(13), this.GetItem(14));
    i.SetUIActive(true);
    e.SetUIActive(true);
    return this.Loader.LoadNodeItem(t, e);
  }
  UTd() {
    this.GetItem(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    this.GetItem(24).SetUIActive(false);
    this.GetItem(23).SetUIActive(false);
    this.GetItem(15).SetUIActive(false);
    this.GetItem(16).SetUIActive(false);
    this.GetItem(17).SetUIActive(false);
    this.GetItem(18).SetUIActive(false);
    this.GetItem(13).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
    this.GetItem(19).SetUIActive(false);
    this.GetItem(20).SetUIActive(false);
    this.GetItem(21).SetUIActive(false);
    this.GetItem(22).SetUIActive(false);
  }
}
exports.QuestTreeTextNodeItem = QuestTreeTextNodeItem;
//# sourceMappingURL=QuestTreeTextNodeItem.js.map
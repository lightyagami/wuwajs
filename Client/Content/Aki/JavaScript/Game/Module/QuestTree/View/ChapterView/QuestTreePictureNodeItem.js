"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreePictureNodeItem = undefined;
const UE = require("ue");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const QuestTreeNodeItemLoader_1 = require("./IoC/QuestTreeNodeItemLoader");
const EPS = 1;
class QuestTreePictureNodeItem extends QuestTreeNodeItemLoader_1.QuestTreeNodeItemBase {
  constructor() {
    super(...arguments);
    this.Loader = undefined;
    this.Pe = undefined;
    this.TTd = undefined;
    this.Hea = undefined;
    this.aPd = undefined;
    this.Type = 1;
    this.HierarchyIndex = 0;
    this.OriginalTopHeight = 0;
    this.OriginalBottomHeight = 0;
    this.Rjd = 0;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.J_ = t => {
      this.bTd();
      var i = this.GetUiSizeControlByOther(34);
      var e = this.TTd.GetLayoutItemByIndex(this.TTd.GetDatas().length - 1);
      if (e) {
        i.SetAdditionalHeight(this.Rjd - e.GetAdditionalHeight());
      }
    };
    this.eTt = () => {
      ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SelectData(this.Pe);
      if (this.Pe.IsDummy) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("QuestTree_ToBeContinued");
        this.GetExtendToggle(0).SetToggleState(0);
      } else {
        ControllerHolder_1.ControllerHolder.QuestTreeController.OpenNodeDetailView(this.Pe);
      }
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
      if (t === this.Pe) {
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
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIVerticalLayout], [19, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [31, UE.UIItem], [9, UE.UIItem], [30, UE.UIItem], [33, UE.UISizeControlByOther], [32, UE.UISizeControlByOther], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [34, UE.UISizeControlByOther]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.TTd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(18), () => this.Loader.CreateLogicalNodeItem(4), undefined, true);
    this.OriginalTopHeight = this.GetUiSizeControlByOther(32).GetAdditionalHeight();
    this.OriginalBottomHeight = this.GetUiSizeControlByOther(33).GetAdditionalHeight();
    this.GetItem(9).SetUIActive(false);
    this.Rjd = this.GetUiSizeControlByOther(34).GetAdditionalHeight();
    this.sKe = TickSystem_1.TickSystem.Add(this.J_, "QuestTreePictureNodeItem", 0, true, undefined, true)?.Id ?? TickSystem_1.TickSystem.InvalidId;
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnSelectedDataChange(this.hPd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnLocatingNode(this.lPd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnUpdateNode(this.Cjd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
  }
  OnBeforeDestroy() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnUpdateNode(this.Cjd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnLocatingNode(this.lPd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnSelectedDataChange(this.hPd);
  }
  async CreateSelf(t) {
    await this.CreateThenShowByResourceIdAsync("UiItem_TaskTreeBranch", t);
  }
  UpdateData(t) {
    this.MVd(t);
  }
  async MVd(t) {
    this.Pe = t;
    this.nOe(this.Pe);
    await this.RTd(this.Pe);
    var i = (t.PreQuestNodes[0]?.Config.QuestType === 1 || t.PreQuestNodes.length === 0) && t.Config.QuestType !== 1;
    this.GetItem(10).SetUIActive(t.Config.SortOrder < 0);
    this.GetItem(11).SetUIActive(i);
    this.GetUiSizeControlByOther(33).GetRootComponent().SetUIActive(t.Config.QuestType === 1);
    this.GetUiSizeControlByOther(32).GetRootComponent().SetUIActive(t.Config.QuestType === 1);
  }
  Refresh(t, i, e) {
    this.UpdateData(t);
  }
  async RefreshAsync(t) {
    await this.MVd(t);
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
    this.Hea.PlayLevelSequenceByName("Jumpy");
  }
  nOe(t) {
    this.SetTextureByPath(t.ImageSmall, this.GetTexture(1));
    this.GetItem(2).SetUIActive(!t.IsTracking && t.State === 1);
    this.GetItem(3).SetUIActive(false);
    this.GetItem(4).SetUIActive(!t.IsTracking && t.State === 2);
    this.GetItem(5).SetUIActive(t.IsTracking);
    this.GetItem(6).SetUIActive(t.State === 3);
    this.SetSpriteByPath(t.TypeIconPath, this.GetSprite(7), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t.Name);
    t = this.GetExtendToggle(0).GetRootComponent().GetHeight();
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RecordToggleHeight(t);
  }
  async RTd(t) {
    var i;
    var e;
    var s;
    var h;
    this.wTd();
    if (t.State === 4) {
      i = t.IsFirstNodeOfPredecessorUnion();
      e = t.IsLastNodeOfPredecessorUnion();
      s = t.IsInPredecessorUnion();
      if (t.Config.QuestType === 1) {
        this.GetItem(12).SetUIActive(!t.IsLastMainNodeOfChapter());
        if ((h = t.GetDirectChildrenGroupsInDownArea()).length > 0) {
          this.GetItem(17).SetUIActive(true);
          this.GetVerticalLayout(18).GetRootComponent().SetUIActive(true);
          await this.TTd.RefreshByDataAsync(h);
        }
      } else if (s && i) {
        await this.LTd(t.NextQuestNode);
        this.GetItem(22).SetUIActive(t.NextQuestNode.Config.NodeType === 1);
        this.GetItem(20).SetUIActive(t.NextQuestNode.Config.NodeType !== 3);
        this.GetItem(24).SetUIActive(t.NextQuestNode.Config.NodeType === 2);
      } else if ((t.NextQuestNode?.PreQuestNodes?.length ?? 0) === 1) {
        await this.PTd(t.NextQuestNode);
        this.GetItem(26).SetUIActive(t.NextQuestNode.Config.NodeType === 1);
        this.GetItem(28).SetUIActive(t.NextQuestNode.Config.NodeType !== 1);
      }
      this.GetItem(31).SetUIActive(e);
      this.GetItem(30).SetUIActive(s && !i && !e);
    }
  }
  async PTd(t) {
    var i = t.Config.NodeType === 1 ? this.GetItem(27) : this.GetItem(29);
    this.aPd = await this.Loader.LoadNodeItem(t, i);
  }
  async LTd(t) {
    let i = undefined;
    switch (t.Config.NodeType) {
      case 1:
        i = this.GetItem(23);
        break;
      case 2:
        i = this.GetItem(25);
        break;
      case 3:
        i = this.GetItem(21);
        break;
      default:
        i = this.GetItem(23);
    }
    this.aPd = await this.Loader.LoadNodeItem(t, i);
  }
  bTd() {
    var t;
    var i = this.GetUiSizeControlByOther(33);
    var e = this.GetUiSizeControlByOther(32);
    var s = i.GetRootComponent().GetHeight() - e.GetRootComponent().GetHeight();
    if (!(Math.abs(s) <= EPS)) {
      ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RecordHeightBalanceValue(this.Pe.Id, s);
      if (s > 0) {
        t = e.GetAdditionalHeight();
        e.SetAdditionalHeight(t + s);
      } else {
        e = i.GetAdditionalHeight();
        i.SetAdditionalHeight(e - s);
      }
    }
  }
  wTd() {
    this.GetItem(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    this.GetItem(13).SetUIActive(false);
    this.GetItem(16).SetUIActive(false);
    this.GetItem(17).SetUIActive(false);
    this.GetVerticalLayout(18).GetRootComponent().SetUIActive(false);
    this.GetItem(19).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
    this.GetItem(15).SetUIActive(false);
    this.GetItem(31).SetUIActive(false);
    this.GetItem(30).SetUIActive(false);
    this.GetItem(20).SetUIActive(false);
    this.GetItem(21).SetUIActive(false);
    this.GetItem(22).SetUIActive(false);
    this.GetItem(23).SetUIActive(false);
    this.GetItem(24).SetUIActive(false);
    this.GetItem(25).SetUIActive(false);
    this.GetItem(26).SetUIActive(false);
    this.GetItem(27).SetUIActive(false);
    this.GetItem(28).SetUIActive(false);
    this.GetItem(29).SetUIActive(false);
  }
}
exports.QuestTreePictureNodeItem = QuestTreePictureNodeItem;
//# sourceMappingURL=QuestTreePictureNodeItem.js.map
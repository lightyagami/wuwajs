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
    this.YRd = undefined;
    this.FTm = undefined;
    this.Hea = undefined;
    this.VDd = undefined;
    this.Type = 1;
    this.HierarchyIndex = 0;
    this.OriginalTopHeight = 0;
    this.OriginalBottomHeight = 0;
    this.Rom = 0;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.J_ = t => {
      this.zRd();
      var i = this.GetUiSizeControlByOther(34);
      var e = this.YRd.GetLayoutItemByIndex(this.YRd.GetDatas().length - 1);
      if (e) {
        i.SetAdditionalHeight(this.Rom - e.GetAdditionalHeight());
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
    this.jDd = t => {
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
    this.HDd = (t, i) => {
      if (t === this.Pe) {
        this.LocateSelf(i);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.RootItem, true);
      }
    };
    this.Brm = () => {
      if (this.Pe) {
        this.nOe(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [16, UE.UIVerticalLayout], [17, UE.UIItem], [18, UE.UIVerticalLayout], [19, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [31, UE.UIItem], [9, UE.UIItem], [30, UE.UIItem], [33, UE.UISizeControlByOther], [32, UE.UISizeControlByOther], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [34, UE.UISizeControlByOther]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.YRd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(18), () => this.Loader.CreateLogicalNodeItem(4), undefined, true);
    this.FTm = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(16), () => this.Loader.CreateLogicalNodeItem(4), undefined, true);
    this.OriginalTopHeight = this.GetUiSizeControlByOther(32).GetAdditionalHeight();
    this.OriginalBottomHeight = this.GetUiSizeControlByOther(33).GetAdditionalHeight();
    this.GetItem(9).SetUIActive(false);
    this.Rom = this.GetUiSizeControlByOther(34).GetAdditionalHeight();
    this.sKe = TickSystem_1.TickSystem.Add(this.J_, "QuestTreePictureNodeItem", 0, true, undefined, true)?.Id ?? TickSystem_1.TickSystem.InvalidId;
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnSelectedDataChange(this.jDd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnLocatingNode(this.HDd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnUpdateNode(this.Brm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
  }
  OnBeforeDestroy() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnUpdateNode(this.Brm);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnLocatingNode(this.HDd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnSelectedDataChange(this.jDd);
  }
  async CreateSelf(t) {
    await this.CreateThenShowByResourceIdAsync("UiItem_TaskTreeBranch", t);
  }
  UpdateData(t) {
    this.yWd(t);
  }
  async yWd(t) {
    this.Pe = t;
    this.nOe(this.Pe);
    await this.JRd(this.Pe);
    var i = (t.PreQuestNodes[0]?.Config.QuestType === 1 || t.PreQuestNodes.length === 0) && t.Config.QuestType !== 1;
    this.GetItem(10).SetUIActive(t.Config.SortOrder < 0);
    this.GetItem(11).SetUIActive(i && t.Config.SortOrder > 0);
    this.GetUiSizeControlByOther(33).GetRootComponent().SetUIActive(t.Config.QuestType === 1);
    this.GetUiSizeControlByOther(32).GetRootComponent().SetUIActive(t.Config.QuestType === 1);
  }
  Refresh(t, i, e) {
    this.UpdateData(t);
  }
  async RefreshAsync(t) {
    await this.yWd(t);
  }
  GetAdditionalHeight() {
    if (this.Pe.NextQuestNode?.Config.NodeType === 3 && this.VDd) {
      return this.VDd.GetAdditionalHeight() + this.GetExtendToggle(0).GetRootComponent().GetHeight();
    } else {
      return 0;
    }
  }
  LocateSelf(t = true) {
    var i = this.GetExtendToggle(0).GetRootComponent();
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.LocatingHelper?.LocateToNode(i, t);
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
  async JRd(t) {
    var i;
    var e;
    var s;
    var h;
    var r;
    this.ZRd();
    if (t.State === 4) {
      i = t.IsFirstNodeOfPredecessorUnion();
      e = t.IsLastNodeOfPredecessorUnion();
      s = t.IsInPredecessorUnion();
      if (t.Config.QuestType === 1) {
        this.GetItem(12).SetUIActive(!t.IsLastMainNodeOfChapter());
        if ((h = t.GetDirectChildrenGroupsInUpArea()).length > 0) {
          r = h[0][0];
          this.GetItem(14).SetUIActive(r.Config.NodeType === 1);
          this.GetItem(15).SetUIActive(r.Config.NodeType !== 1);
          this.GetItem(13).SetUIActive(true);
          this.GetVerticalLayout(16).GetRootComponent().SetUIActive(true);
          await this.FTm.RefreshByDataAsync(h);
        }
        if ((r = t.GetDirectChildrenGroupsInDownArea()).length > 0) {
          this.GetItem(17).SetUIActive(true);
          this.GetVerticalLayout(18).GetRootComponent().SetUIActive(true);
          await this.YRd.RefreshByDataAsync(r);
        }
      } else if (s && i) {
        await this.ewd(t.NextQuestNode);
        this.GetItem(22).SetUIActive(t.NextQuestNode.Config.NodeType === 1);
        this.GetItem(20).SetUIActive(t.NextQuestNode.Config.NodeType !== 3);
        this.GetItem(24).SetUIActive(t.NextQuestNode.Config.NodeType === 2);
      } else if ((t.NextQuestNode?.PreQuestNodes?.length ?? 0) === 1) {
        await this.twd(t.NextQuestNode);
        this.GetItem(26).SetUIActive(t.NextQuestNode.Config.NodeType === 1);
        this.GetItem(28).SetUIActive(t.NextQuestNode.Config.NodeType !== 1);
      }
      this.GetItem(31).SetUIActive(e);
      this.GetItem(30).SetUIActive(s && !i && !e);
    }
  }
  async twd(t) {
    var i = t.Config.NodeType === 1 ? this.GetItem(27) : this.GetItem(29);
    this.VDd = await this.Loader.LoadNodeItem(t, i);
  }
  async ewd(t) {
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
    this.VDd = await this.Loader.LoadNodeItem(t, i);
  }
  zRd() {
    var t = this.GetUiSizeControlByOther(33);
    var i = this.GetUiSizeControlByOther(32);
    var e = i.GetRootComponent().GetHeight();
    var s = t.GetRootComponent().GetHeight();
    var h = s - e;
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RecordHeightBalanceValue(this.Pe.Id, e, s);
    if (!(Math.abs(h) <= EPS)) {
      if (h > 0) {
        e = i.GetAdditionalHeight();
        i.SetAdditionalHeight(e + h);
      } else {
        s = t.GetAdditionalHeight();
        t.SetAdditionalHeight(s - h);
      }
    }
  }
  ZRd() {
    this.GetItem(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    this.GetItem(13).SetUIActive(false);
    this.GetVerticalLayout(16).GetRootComponent().SetUIActive(false);
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
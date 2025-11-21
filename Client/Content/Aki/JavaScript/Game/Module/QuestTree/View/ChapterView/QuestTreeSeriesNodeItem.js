"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeSeriesNodeItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const QuestTreeNodeItemLoader_1 = require("./IoC/QuestTreeNodeItemLoader");
class QuestTreeSeriesNodeItem extends QuestTreeNodeItemLoader_1.QuestTreeNodeItemBase {
  constructor() {
    super(...arguments);
    this.Loader = undefined;
    this.Pe = undefined;
    this.iwd = undefined;
    this.Type = 3;
    this.HierarchyIndex = 0;
    this.$Dd = false;
    this.Ijd = undefined;
    this.ltm = undefined;
    this._tm = 0;
    this.N8e = () => {
      this.$Dd = !this.$Dd;
      this.CWd(this.$Dd);
    };
    this.HDd = (e, t) => {
      if (e === this.Pe || e?.BelongedNode === this.Pe) {
        this.LocateSelf(t);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.RootItem, true);
        if (e.IsTracking) {
          this.Ijd.PlayLevelSequenceByName("Jumpy");
        }
      }
    };
    this.jem = e => {
      if (e === this.Pe || e?.BelongedNode === this.Pe) {
        this.nOe(this.Pe);
      }
    };
    this.Vem = () => {
      if (this.Pe) {
        this.nOe(this.Pe);
      }
    };
    this.utm = e => {
      this.GetUiSizeControlByOther(14).SetAdditionalHeight(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIVerticalLayout], [13, UE.UIItem], [14, UE.UISizeControlByOther]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.iwd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(12), () => this.Loader.CreateLogicalNodeItem(2));
    this.Ijd = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.ltm = (0, puerts_1.toManualReleaseDelegate)(this.utm);
    this._tm = this.GetUiSizeControlByOther(14).GetAdditionalHeight();
    this.GetExtendToggle(0).bLockStateOnSelect = false;
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnLocatingNode(this.HDd);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.AddOnUpdateNode(this.Vem);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.jem);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.jem);
    this.Ijd.Clear();
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnUpdateNode(this.Vem);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.RemoveOnLocatingNode(this.HDd);
    if (this.ltm) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.utm);
      this.ltm = undefined;
    }
  }
  async CreateSelf(e) {
    await this.CreateThenShowByResourceIdAsync("UiItem_TaskTreeBranchTab", e);
  }
  UpdateData(e) {
    var t = (this.Pe = e).PreQuestNodes.length === 0 || e.PreQuestNodes[0]?.Config.QuestType === 1;
    this.nOe(e);
    this.rwd(e.GetIncludeNodes());
    this.GetItem(10).SetUIActive(t);
    this.GetItem(9).SetUIActive(!t);
    this.Hem(true);
  }
  GetAdditionalHeight() {
    return this.GetRootItem().GetHeight();
  }
  nOe(e) {
    this.GetItem(4).SetUIActive(!e.IsTracking && e.State === 1);
    this.GetItem(1).SetUIActive(!e.IsTracking && e.State === 4);
    this.GetItem(2).SetUIActive(!e.IsTracking && e.State === 2);
    this.GetItem(3).SetUIActive(e.IsTracking);
    this.GetItem(5).SetUIActive(!e.IsTracking && e.State === 3);
    this.SetSpriteByPath(e.TypeIconPath, this.GetSprite(6), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Config.Name);
    var [e, t] = e.GetIncludeNodesProgress();
    this.GetText(8).SetText(e + "/" + t);
  }
  rwd(e) {
    this.iwd.RefreshByData(e, undefined, true);
  }
  async CWd(e) {
    var t = ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.View.GetScrollView();
    t.SetHorizontal(false);
    if (e) {
      this.Ijd.PlaySequenceAsync("CloseList", new CustomPromise_1.CustomPromise());
      await TimerSystem_1.TimerSystem.Wait(200);
      this.ctm();
    } else {
      this.dtm();
      this.Hem(true);
      await this.Ijd.PlaySequenceAsync("OpenList", new CustomPromise_1.CustomPromise());
    }
    await TimerSystem_1.TimerSystem.Wait(500);
    t.SetHorizontal(true);
  }
  Hem(e) {
    if (this.Pe.IsLastNodeOfMainQuestChildren()) {
      this.GetUiSizeControlByOther(14).GetRootComponent().SetUIActive(false);
    } else {
      this.GetUiSizeControlByOther(14).GetRootComponent().SetUIActive(e);
    }
  }
  dtm() {
    var e = this.GetUiSizeControlByOther(14);
    var t = -(this.GetVerticalLayout(12).GetRootComponent().GetHeight() + this._tm);
    var i = this._tm;
    e.SetAdditionalHeight(t);
    UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.ltm, t, i, 0.3);
  }
  ctm() {
    var e = this._tm;
    var t = -this.GetVerticalLayout(12).GetRootComponent().GetHeight();
    UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.ltm, e, t, 0.3);
  }
}
exports.QuestTreeSeriesNodeItem = QuestTreeSeriesNodeItem;
//# sourceMappingURL=QuestTreeSeriesNodeItem.js.map
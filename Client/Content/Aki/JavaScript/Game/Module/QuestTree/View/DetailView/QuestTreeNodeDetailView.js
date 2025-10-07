"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeDetailView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const QuestTreeDetailImageItem_1 = require("./QuestTreeDetailImageItem");
const QuestTreeNodeDetailTipsItem_1 = require("./QuestTreeNodeDetailTipsItem");
const QuestTreeNodeTargetItem_1 = require("./QuestTreeNodeTargetItem");
class QuestTreeNodeDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.z$1 = undefined;
    this.uPd = undefined;
    this.cPd = undefined;
    this.K8u = undefined;
    this.dPd = undefined;
    this.mPd = undefined;
    this._U1 = undefined;
    this.EXd = false;
    this.fPd = () => {
      ControllerHolder_1.ControllerHolder.QuestTreeController.CancelTrackNode(this.Pe);
    };
    this.gPd = () => {
      if (this.Pe.State === 2) {
        if (this.Pe.GetOnAcceptGoto()?.()) {
          this.CloseMe();
        }
      } else {
        ControllerHolder_1.ControllerHolder.QuestTreeController.TrackOrGotoNode(this.Pe);
      }
    };
    this.AOe = e => {
      if (e === this.Pe) {
        this.IXd();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIVerticalLayout], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIScrollViewWithScrollbarComponent], [23, UE.UIText], [24, UE.UIScrollViewWithScrollbarComponent]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    var e = [];
    this.z$1 = new QuestTreeDetailImageItem_1.QuestTreeDetailImageItem(this.Pe);
    e.push(this.z$1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.uPd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), () => new QuestTreeNodeTargetItem_1.QuestTreeNodeTargetItem());
    this.cPd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(22), () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = e => this.Pe.State === 4;
      return e;
    });
    this.K8u = new ButtonItem_1.ButtonItem();
    this.dPd = new ButtonItem_1.ButtonItem();
    this.mPd = new ButtonItem_1.ButtonItem();
    this.K8u.SetFunction(this.fPd);
    this.dPd.SetFunction(this.gPd);
    this.mPd.SetFunction(this.gPd);
    this._U1 = new QuestTreeNodeDetailTipsItem_1.QuestTreeNodeDetailTipsItem(this.Pe);
    e.push(this.K8u.CreateThenShowByActorAsync(this.GetItem(16).GetOwner()), this.dPd.CreateThenShowByActorAsync(this.GetItem(18).GetOwner()), this.mPd.CreateThenShowByActorAsync(this.GetItem(17).GetOwner()), this._U1.CreateThenShowByActorAsync(this.GetItem(21).GetOwner()));
    this.kjd();
    await Promise.all(e);
    await this.CPd();
  }
  OnStart() {
    this.GetRootItem().SetStretchTop(0);
    this.GetRootItem().SetStretchBottom(0);
    this.GetRootItem().SetStretchLeft(0);
    this.GetRootItem().SetStretchRight(0);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SelectData(this.Pe);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.QuestTreeNodeDataUpdate, this.AOe);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SelectData(undefined);
  }
  ChangeData(e) {
    this.Pe = e;
    this.CPd();
  }
  GetOverrideRootItem() {
    return this.GetRootItem();
  }
  async CPd() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.Pe.QuestId);
    var t = [];
    t.push(this.SetSpriteAsync(this.Pe.TypeIconPath, this.GetSprite(0), false));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.Config.Name);
    var i = ModelManager_1.ModelManager.QuestTreeModel.GetChapterDataById(this.Pe.ChapterId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Config.RegionName);
    this.z$1.SetUiActive(this.Pe.State >= 2 && this.Pe.Config.NodeType === 1);
    this.z$1.RefreshInfo(this.Pe);
    await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME);
    this.GetItem(7).SetUIActive(this.Pe.State <= 2);
    this.uPd.RefreshByData(this.Pe.GetTargetDataList());
    if (this.Pe.State === 2) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "QuestTree_AcceptCondition");
    } else if (this.Pe.State === 1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "QuestTree_UnlockCondition");
    }
    this.GetScrollViewWithScrollbar(24).SetScrollProgress(0);
    this.GetText(11).SetUIActive(this.Pe.State >= 3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), this.Pe.Desc);
    this.cPd.RefreshByData(this.Pe.RewardList);
    i = e?.IsSuspend() && e.GetSuspendType() === 2;
    this.GetItem(19).SetUIActive(this.Pe.State === 4);
    this.GetItem(20).SetUIActive(this.Pe.State === 1 && !i && !this.TXd());
    this.beu();
    this.GetItem(15).SetUIActive(this.Pe.IsTracking && !i);
    this.dPd.SetActive(this.TXd());
    this.GetItem(5).SetUIActive(false);
    this._U1.SetActive(e?.IsSuspend() ?? false);
    this._U1.UpdateData(this.Pe);
    await Promise.all(t);
    this.K8u.SetLocalTextNew("QuestTree_Status_Ongoing_CancelTrack");
    this.bXd();
    this.mPd.SetLocalTextNew("QuestTree_Status_Ongoing_Track");
    if (this.Pe.State === 1) {
      this._U1.SetLocalText("QuestTree_Status_Locked");
    } else if (this.Pe.State === 4) {
      this._U1.SetLocalText("QuestTree_Status_Complete");
    }
    if (i) {
      this._U1.SetLocalText("QuestTree_OnlineRestriction");
    } else {
      this._U1.SetLocalText("QuestTree_Status_Occupied");
    }
    this._U1.SetBtnActive(!i);
  }
  Ojd() {
    var e = this.GetRootItem();
    if (e) {
      return e.GetOwner().GetComponentByClass(UE.TsUiBlur_C.StaticClass());
    }
  }
  kjd() {
    var e;
    var t = this.Ojd();
    if (t && (e = ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.View?.GetOverrideBlurItem()) && e.IsValid()) {
      t.OverrideItem = e.GetOwner();
    }
  }
  TXd() {
    var e;
    return !this.Pe.IsTracking && !!(e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.Pe.QuestId)) && (!e.IsSuspend() || e.GetSuspendType() !== 2) && ((e = ModelManager_1.ModelManager.QuestNewModel.GetQuestSpecialState(e)) === 2 || e === 3 || e === 9 ? this.EXd = true : this.Pe.State === 2 || this.Pe.State === 3);
  }
  bXd() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.Pe.QuestId);
    if (e) {
      switch (ModelManager_1.ModelManager.QuestNewModel.GetQuestSpecialState(e)) {
        case 2:
          this.dPd.SetLocalTextNew("GoToDownload");
          break;
        case 3:
          this.dPd.SetLocalTextNew("GoOnTask");
          break;
        case 9:
          this.dPd.SetLocalTextNew("Task_Focus_Tips02");
          break;
        default:
          this.dPd.SetLocalTextNew("QuestTree_Status_Ongoing_Go");
      }
    }
  }
  beu() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.Pe.QuestId);
    if (e) {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestSpecialState(e) === 8) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(23), "QuestTree_FocusModeTips");
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(23), "QuestTree_Status_Locked");
      }
    }
  }
  async IXd() {
    if (this.EXd) {
      this.EXd = false;
      await this.PlaySequenceAsync("Close");
      await this.CPd();
      await this.PlaySequenceAsync("Start");
    } else {
      await this.CPd();
    }
  }
}
exports.QuestTreeNodeDetailView = QuestTreeNodeDetailView;
//# sourceMappingURL=QuestTreeNodeDetailView.js.map
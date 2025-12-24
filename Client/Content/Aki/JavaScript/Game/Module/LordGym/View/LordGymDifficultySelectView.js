"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymDifficultySelectView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const LordGymEntranceById_1 = require("../../../../Core/Define/ConfigQuery/LordGymEntranceById");
const LordGymEntranceSetById_1 = require("../../../../Core/Define/ConfigQuery/LordGymEntranceSetById");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const HelpController_1 = require("../../Help/HelpController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const LordGymController_1 = require("../LordGymController");
const LordGymDifficultyItem_1 = require("./LordGymDifficultyItem");
class LordGymDifficultySelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.LordEntranceSetId = 0;
    this.LordEntranceId = 0;
    this.LordList = undefined;
    this.LordDifficultyScrollView = undefined;
    this.bOe = undefined;
    this.SelectedLordId = 0;
    this.AMo = () => {
      this.CloseMe();
    };
    this.dpt = () => {
      var e = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(this.LordEntranceSetId).HelpId;
      HelpController_1.HelpController.OpenHelpById(e);
    };
    this.Nxl = () => this.CreateItem();
    this.rOe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Hxl = () => {
      this.OnStartChallenge();
    };
    this.qPl = () => {
      UiManager_1.UiManager.OpenView("LordGymChallengeRecordView", this.LordEntranceId);
    };
    this.CanLordDifficultyToggleChange = e => e !== this.LordDifficultyScrollView.GetSelectedGridIndex();
    this.OnLordDifficultyToggleClick = e => {
      if (this.CanLordDifficultyToggleChange(e)) {
        this.SelectLordDifficultyByIndex(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIButtonComponent]];
    this.BtnBindInfo = [[10, this.Hxl], [7, this.qPl], [14, this.AMo]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e) {
      this.LordEntranceSetId = e.LordEntranceSetId;
      this.LordEntranceId = e.LordEntranceId;
      if (LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(this.LordEntranceSetId) && (this.LordList = ModelManager_1.ModelManager.LordGymModel.GetLordGymEntranceList(this.LordEntranceId), this.LordList)) {
        this.LordDifficultyScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.Nxl, true);
        this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.rOe);
        this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem();
        await Promise.all([this.LordDifficultyScrollView?.RefreshByDataAsync(this.LordList), this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
        e = LordGymEntranceById_1.configLordGymEntranceById.GetConfig(this.LordEntranceId);
        this.CaptionItem.SetTitleByTextIdAndArgNew(e.EntranceTitle);
        this.CaptionItem.SetHelpCallBack(this.dpt);
        this.nyi();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 43, "领主道馆打开错误, ILordGymDifficultySelectViewParam为空");
    }
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.InitLordSkeletalHandle();
    ControllerHolder_1.ControllerHolder.LordGymController.CreateLordModelByEntranceId();
    ControllerHolder_1.ControllerHolder.LordGymController.LoadLordModelByEntranceId(this.LordEntranceId);
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyLordSkeletalHandle();
  }
  CreateItem() {
    var e = new LordGymDifficultyItem_1.LordGymDifficultyItem();
    e.OnToggleClick = this.OnLordDifficultyToggleClick;
    e.CanExecuteChangeCallBack = this.CanLordDifficultyToggleChange;
    return e;
  }
  OnStartChallenge() {
    var e;
    if (LordGymController_1.LordGymController.IsInEntranceEntity()) {
      e = this.LordDifficultyScrollView.GetSelectedGridIndex();
      e = this.LordList[e];
      LordGymController_1.LordGymController.LordGymBeginRequest(e).then(e => {
        if (e) {
          UiManager_1.UiManager.ResetToBattleView();
          ModelManager_1.ModelManager.LordGymModel.LastChallengeLordEntranceId = this.LordEntranceId;
        }
      });
    } else {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("LordGymOpen_ErrorTipText");
    }
  }
  nyi() {
    if (this.LordList && this.LordList.length !== 0) {
      let i = 0;
      var t = ModelManager_1.ModelManager.LordGymModel;
      for (let e = 0; e < this.LordList.length; e++) {
        var r = this.LordList[e];
        if (t.GetLordGymIsUnLock(r) && t.GetLastGymFinish(r) && e >= i) {
          i = e;
        }
      }
      this.SelectLordDifficultyByIndex(i);
    }
  }
  SelectLordDifficultyByIndex(e) {
    this.LordDifficultyScrollView?.SelectGridProxy(e);
    this.SelectedLordId = this.LordList[e];
    this.RefreshDetail();
  }
  RefreshDetail() {
    var e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(this.SelectedLordId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "Text_InstanceDungeonRecommendLevel_Text", e.MonsterLevel.toString());
    var i = e.RewardId;
    var i = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(i);
    const t = ModelManager_1.ModelManager.LordGymModel?.GetLordGymIsFinish(this.SelectedLordId);
    this.bOe.RefreshByData(i, () => {
      for (const e of this.bOe.GetScrollItemList()) {
        e.SetReceivedVisible(t);
      }
    });
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.PlayDescription);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.NewGymTitle);
    var i = ModelManager_1.ModelManager.LordGymModel.LordGymRecord.get(this.SelectedLordId);
    if (i !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "BestPassTime", TimeUtil_1.TimeUtil.GetTimeString(i.Qxs));
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "NoPassRecord");
    }
    var i = !ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(this.SelectedLordId);
    var r = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(this.SelectedLordId);
    var o = e.MonsterLevel > ModelManager_1.ModelManager.EditFormationModel.GetFormationAverageLevel();
    this.GetItem(12).SetUIActive(i || !r);
    this.GetItem(9).SetUIActive(o && !i && r);
    this.GetButton(10).RootUIComp.SetUIActive(!i && !!r);
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), e.LockDescription);
    } else if (r) {
      if (o) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "LordGymLowLevel");
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "LordGymLockTips");
    }
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Text_ButtonTextChallengeOneMore_Text");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Text_StartBattle_Text");
    }
  }
}
exports.LordGymDifficultySelectView = LordGymDifficultySelectView;
//# sourceMappingURL=LordGymDifficultySelectView.js.map
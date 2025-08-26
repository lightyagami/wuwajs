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
    this.lqe = undefined;
    this.Gxl = 0;
    this.jSi = 0;
    this.WSi = undefined;
    this.kxl = undefined;
    this.bOe = undefined;
    this.Oxl = 0;
    this.AMo = () => {
      this.CloseMe();
    };
    this.dpt = () => {
      var e = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(this.Gxl).HelpId;
      HelpController_1.HelpController.OpenHelpById(e);
    };
    this.Nxl = () => {
      var e = new LordGymDifficultyItem_1.LordGymDifficultyItem();
      e.OnToggleClick = this.Fxl;
      e.CanExecuteChangeCallBack = this.Vxl;
      return e;
    };
    this.rOe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Hxl = () => {
      var e;
      if (LordGymController_1.LordGymController.IsInEntranceEntity()) {
        e = this.kxl.GetSelectedGridIndex();
        e = this.WSi[e];
        LordGymController_1.LordGymController.LordGymBeginRequest(e).then(e => {
          if (e) {
            UiManager_1.UiManager.ResetToBattleView();
            ModelManager_1.ModelManager.LordGymModel.LastChallengeLordEntranceId = this.jSi;
          }
        });
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("LordGymOpen_ErrorTipText");
      }
    };
    this.qPl = () => {
      UiManager_1.UiManager.OpenView("LordGymChallengeRecordView", this.jSi);
    };
    this.Vxl = e => e !== this.kxl.GetSelectedGridIndex();
    this.Fxl = e => {
      if (this.Vxl(e)) {
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
      this.Gxl = e.LordEntranceSetId;
      this.jSi = e.LordEntranceId;
      if (LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(this.Gxl) && (this.WSi = ModelManager_1.ModelManager.LordGymModel.GetLordGymEntranceList(this.jSi), this.WSi)) {
        this.kxl = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.Nxl, true);
        this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.rOe);
        this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
        await Promise.all([this.kxl?.RefreshByDataAsync(this.WSi), this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
        e = LordGymEntranceById_1.configLordGymEntranceById.GetConfig(this.jSi);
        this.lqe.SetTitleByTextIdAndArgNew(e.EntranceTitle);
        this.lqe.SetHelpCallBack(this.dpt);
        this.nyi();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 43, "领主道馆打开错误, ILordGymDifficultySelectViewParam为空");
    }
  }
  OnHandleLoadScene() {
    ControllerHolder_1.ControllerHolder.LordGymController.CreateLordModelByEntranceId(this.jSi);
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyLordSkeletalHandle();
  }
  nyi() {
    if (this.WSi && this.WSi.length !== 0) {
      let i = 0;
      var t = ModelManager_1.ModelManager.LordGymModel;
      for (let e = 0; e < this.WSi.length; e++) {
        var r = this.WSi[e];
        if (t.GetLordGymIsUnLock(r) && t.GetLastGymFinish(r) && e >= i) {
          i = e;
        }
      }
      this.SelectLordDifficultyByIndex(i);
    }
  }
  SelectLordDifficultyByIndex(e) {
    this.kxl?.SelectGridProxy(e);
    this.Oxl = this.WSi[e];
    this.RefreshDetail();
  }
  RefreshDetail() {
    var e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(this.Oxl);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "Text_InstanceDungeonRecommendLevel_Text", e.MonsterLevel.toString());
    var i = e.RewardId;
    var i = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(i);
    const t = ModelManager_1.ModelManager.LordGymModel?.GetLordGymIsFinish(this.Oxl);
    this.bOe.RefreshByData(i, () => {
      for (const e of this.bOe.GetScrollItemList()) {
        e.SetReceivedVisible(t);
      }
    });
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.PlayDescription);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.NewGymTitle);
    var i = ModelManager_1.ModelManager.LordGymModel.LordGymRecord.get(this.Oxl);
    if (i !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "BestPassTime", TimeUtil_1.TimeUtil.GetTimeString(i.Qxs));
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "NoPassRecord");
    }
    var i = !ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(this.Oxl);
    var r = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(this.Oxl);
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
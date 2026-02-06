"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncircleLevelDetailView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList");
const ActivityEncircleController_1 = require("../ActivityEncircleController");
const EncirclePlayLevelController_1 = require("../EncirclePlayLevelController");
const EncircleLevelDetailGridView_1 = require("./EncircleLevelDetailGridView");
const HELP_ID = 507;
class EncircleLevelDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.pDe = undefined;
    this.lqe = undefined;
    this.UNe = undefined;
    this.wbg = undefined;
    this.Pbg = 0;
    this._Dt = 0;
    this.jK1 = undefined;
    this.l8f = undefined;
    this.ZUg = [];
    this.InitGridItem = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = () => {
        var e = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
        var i = this.jK1[this.Pbg];
        return e.CheckChallengeComplete(i);
      };
      return e;
    };
    this.Xqe = () => {
      var e = new EncircleLevelDetailGridView_1.EncircleLevelDetailGridView();
      this.ZUg.push(e);
      return e;
    };
    this.Rbg = () => {
      if (ActivityEncircleController_1.ActivityEncircleController.GetEncircleData().CheckPreChallengeComplete(this.jK1[this.Pbg])) {
        EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().EnterPlay(this.pDe.GroupId, this.jK1[this.Pbg]);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Encirle_DifficultyLockTips_Text");
      }
    };
    this.Vgt = () => {
      UiManager_1.UiManager.CloseView("EncircleLevelDetailView");
    };
    this.pcr = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HELP_ID);
    };
    this.g3e = e => {
      if (e.has(ActivityEncircleController_1.ActivityEncircleController.ActivityId)) {
        ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIArtText], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[8, this.Rbg]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(6);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await Promise.all([this.UNe.CreateThenShowByActorAsync(e.GetOwner())]);
    this.UNe.SetTitleByTextId("CollectActivity_reward");
    this.UNe.InitGridLayout(this.InitGridItem);
    this.l8f = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.Vgt);
    this.lqe.SetHelpCallBack(this.pcr);
    this.pDe = this.OpenParam;
    var e = ActivityEncircleController_1.ActivityEncircleController.ActivityId;
    this._Dt = this.pDe.GroupId;
    this.jK1 = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallenges(e, this.pDe.GroupId);
    this.wbg = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.Xqe);
    this.bqe();
  }
  Abg() {
    if (this.jK1) {
      var i = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
      if (i) {
        for (let e = 0; e < this.jK1.length; e++) {
          var t = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(this.jK1[e]);
          if (t.PreId === 0 || i.CheckChallengeComplete(t.PreId)) {
            this.Pbg = e;
          }
        }
      }
    }
  }
  OnBeforeShow() {
    this.Abg();
    this.Refresh();
  }
  Refresh(e = false) {
    this.Pqe(e);
    this.jqe();
    this.mPg();
    this.exg();
  }
  OnBeforeDestroy() {
    this.l8f?.Clear();
    this.l8f = undefined;
  }
  exg() {
    for (const i of this.ZUg) {
      var e = i.GetChallengeDifficulty();
      if (e && e === this.Pbg) {
        i.SetToggleActive();
      }
    }
  }
  mPg() {
    var e = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
    if (e) {
      for (const i of this.jK1) {
        if (e?.CheckChallengeNewUnlock(i)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Encirle_LevelUnlockTips_Text");
          e.MarkChallengeNewUnlock(i);
        }
      }
    }
  }
  Pqe(e = false) {
    var i = this.jK1[this.Pbg];
    var i = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.LevelTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.LevelDesc);
    this.SetSpriteByPath(i.LevelIcon, this.GetSprite(12), false);
    this.GetArtText(1)?.SetText(this._Dt >= 10 ? this._Dt.toString() : "0" + this._Dt.toString());
    this.GetItem(9)?.SetUIActive(this.Pbg === 0);
    this.GetItem(10)?.SetUIActive(this.Pbg === 1);
    this.GetItem(11)?.SetUIActive(this.Pbg === 1);
    this.GetItem(12)?.SetUIActive(this.Pbg === 0);
    if (e) {
      this.l8f?.StopCurrentSequence(false, true);
      this.l8f.PlayLevelSequenceByName(this.Pbg === 1 ? "Switch" : "Switch02");
    }
  }
  jqe() {
    var e = this.jK1[this.Pbg];
    var e = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(e).RewardId;
    var e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e);
    this.UNe.RefreshItemLayout(e);
  }
  bqe() {
    this.wbg.RefreshByData(this.jK1);
  }
  ChangeDifficultyIndex(e) {
    this.Pbg = e;
    this.Refresh(true);
  }
}
exports.EncircleLevelDetailView = EncircleLevelDetailView;
//# sourceMappingURL=EncircleLevelDetailView.js.map
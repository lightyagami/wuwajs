"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaChallengeDetailTabViewNew = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase");
const PhantomArenaChallengeDetailDeckItem_1 = require("./PhantomArenaChallengeDetailDeckItem");
const PhantomArenaRoleOverviewItem_1 = require("./PhantomArenaRoleOverviewItem");
class PhantomArenaChallengeDetailTabViewNew extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments);
    this.y81 = undefined;
    this.x3_ = undefined;
    this.S81 = undefined;
    this.M81 = undefined;
    this.E81 = undefined;
    this.I81 = undefined;
    this.jQm = undefined;
    this.RewardLayout = undefined;
    this.pct = false;
    this.rOe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.tWt = () => {
      var e;
      var i;
      var t;
      if (!this.pct) {
        t = this.ViewModel.GetUsedDeck();
        if ((e = this.ViewModel.SelectedCardRoleId) <= 0 || !t || !t.CanDeckBeUsed()) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattleGym_Not_Ready");
        } else {
          i = this.ViewModel.GetChallengeId();
          t = t.GetDeckServerId();
          this.pct = true;
          ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestEnterPhantomArenaBattleAsync(i, e, t).finally(() => {
            this.pct = false;
          });
        }
      }
    };
    this.T81 = () => {
      this.OpenChildView("PhantomArenaRoleSelectTabView");
    };
    this.b81 = () => {
      this.ViewModel.SelectedDeckIndex = this.ViewModel.UsedDeckIndex >= 0 ? this.ViewModel.UsedDeckIndex : 0;
      this.OpenChildView("PhantomArenaDeckOverviewTabView");
    };
    this.R81 = () => {
      var e;
      var i = this.E81;
      if (i) {
        i = {
          DeckInfo: i,
          ShowLocked: false,
          ActivityId: this.ActivityId
        };
        e = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.ActivityId) ? "PhantomArenaDeckDetailViewNew" : "PhantomArenaDeckDetailView";
        UiManager_1.UiManager.OpenView(e, i);
      }
    };
    this.mxl = () => {
      var e;
      var i = this.jQm;
      if (i) {
        i = {
          DeckInfo: i,
          ShowLocked: true,
          ActivityId: this.ActivityId,
          IsRecommend: true,
          SaveRecommendDeckCallback: this.$Qm
        };
        e = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.ActivityId) ? "PhantomArenaDeckDetailViewNew" : "PhantomArenaDeckDetailView";
        UiManager_1.UiManager.OpenView(e, i);
      }
    };
    this.$Qm = e => {
      this.ViewModel.SelectedDeckIndex = this.ViewModel.UsedDeckIndex >= 0 ? this.ViewModel.UsedDeckIndex : 0;
      this.ViewModel.RecommendDeck = e;
      this.OpenChildView("PhantomArenaDeckOverviewTabView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIScrollViewWithScrollbarComponent], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIText], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[11, this.tWt], [13, this.mxl]];
  }
  async OnBeforeStartAsync() {
    this.x3_ = new PhantomArenaRoleOverviewItem_1.PhantomArenaRoleOverviewItem();
    this.M81 = new PhantomArenaChallengeDetailDeckItem_1.PhantomArenaChallengeDetailDeckItem();
    this.I81 = new PhantomArenaChallengeDetailDeckItem_1.PhantomArenaChallengeDetailDeckItem();
    await Promise.all([this.x3_.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.M81.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.I81.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())]);
    this.x3_.OnRoleOverviewItemClick = this.T81;
    this.M81.OnButtonClick = this.b81;
    this.I81.OnButtonClick = this.R81;
    var e;
    var i = this.ViewModel.GetChallengeId();
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(i);
    if (i.IsReChallenge) {
      if (e = await PhantomArenaController_1.PhantomArenaController.ReChallengeRequestAsync(this.ViewModel.GetChallengeId())) {
        this.ViewModel.NpcId = e.y1u;
        this.ViewModel.NpcDeckConfigId = e.S1u;
      }
    } else {
      e = i.NpcGroupId;
      i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleNpcList(e)[0];
      this.ViewModel.NpcId = i.Id;
      this.ViewModel.NpcDeckConfigId = i.CardGroupId[0];
    }
  }
  OnStart() {
    super.OnStart();
    this.RewardLayout = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(9), this.rOe, this.GetItem(10).GetOwner());
  }
  OnBeforeShow() {
    this.ViewModel.SetViewTitle?.("PhantomArenaEntranceLevelTabView_Name");
    this.ViewModel.SetViewHelpBtnActive?.(false);
    this.ViewModel.SetViewIcon?.("SP_IconSoundRemnantArena4");
    if (this.ViewModel.SelectedCardRoleId === 0) {
      this.ViewModel.TextureCardRoleId = this.ViewModel.SelectedCardRoleId;
      this.ViewModel.HideRoleTexture?.(true);
    } else if (this.ViewModel.RoleTextureActive) {
      if (this.ViewModel.TextureCardRoleId !== this.ViewModel.SelectedCardRoleId) {
        this.ViewModel.ChangeRoleTexture?.(this.ViewModel.SelectedCardRoleId, true);
      }
    } else {
      this.ViewModel.ShowRoleTexture?.(true);
      this.ViewModel.RefreshRoleTexture?.();
    }
    this.D7c();
    this.B7c();
    this.RefreshView();
  }
  RefreshView() {
    var e = this.ViewModel.GetChallengeId();
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.ChallengeName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.NpcName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.NpcTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.PassConditionDesc);
    this.GetText(6)?.SetText("Lv." + i.NpcLevel);
    this.SetTextureByPath(i.NpcChallengeIcon, this.GetTexture(3));
    this.y81 = {
      CardRoleId: this.ViewModel.SelectedCardRoleId
    };
    this.x3_.Refresh(this.y81);
    this.S81 = this.ViewModel.GetUsedDeck();
    if (this.S81) {
      this.M81.Refresh(this.S81);
    } else {
      this.M81.Refresh(undefined);
    }
    this.E81 = ModelManager_1.ModelManager.PhantomArenaModel.CreateDeckInfoFromDeckConfigId(this.ViewModel.NpcDeckConfigId);
    if (this.E81) {
      this.I81.Refresh(this.E81);
    } else {
      this.I81.Refresh(undefined);
    }
    var t = i.RecommendCardGroupId;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10139) && t !== 0) {
      this.GetButton(13)?.RootUIComp.SetUIActive(true);
      this.jQm = ModelManager_1.ModelManager.PhantomArenaModel.CreateDeckInfoFromDeckConfigId(t);
    } else {
      this.GetButton(13)?.RootUIComp.SetUIActive(false);
    }
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateById(e) === 2;
    var e = t ? "PhantomBattle_1087" : "PhantomBattle_1088";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), e);
    let h = undefined;
    if (t) {
      h = [];
      for (var [a, s] of i.PassDropId) {
        a = [{
          ItemId: a,
          IncId: 0
        }, s];
        h.push(a);
      }
    } else {
      h = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(i.FirstPassDropId);
    }
    this.RewardLayout.RefreshByData(h);
  }
  D7c() {
    if (this.ViewModel.RoleSelectedConfirmFlag) {
      this.x3_?.PlaySelectAnim();
      this.ViewModel.RoleSelectedConfirmFlag = false;
    }
  }
  B7c() {
    if (this.ViewModel.DeckSelectedConfirmFlag) {
      this.M81?.PlaySelectAnim();
      this.ViewModel.DeckSelectedConfirmFlag = false;
    }
  }
}
exports.PhantomArenaChallengeDetailTabViewNew = PhantomArenaChallengeDetailTabViewNew;
//# sourceMappingURL=PhantomArenaChallengeDetailTabViewNew.js.map
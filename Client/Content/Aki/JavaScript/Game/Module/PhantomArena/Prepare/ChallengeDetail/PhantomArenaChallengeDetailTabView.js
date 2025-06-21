"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaChallengeDetailTabView = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase"),
  PhantomArenaChallengeDetailDeckItem_1 = require("./PhantomArenaChallengeDetailDeckItem"),
  PhantomArenaRoleOverviewItem_1 = require("./PhantomArenaRoleOverviewItem");
class PhantomArenaChallengeDetailTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments), this.G51 = void 0, this.x3_ = void 0, this.F51 = void 0, this.N51 = void 0, this.V51 = void 0, this.j51 = void 0, this.RewardLayout = void 0, this.pct = !1, this.rOe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid
    }, this.tWt = () => {
      var e, i, t;
      this.pct || (t = this.ViewModel.GetUsedDeck(), (e = this.ViewModel.SelectedCardRoleId) <= 0 || !t || !t.CanDeckBeUsed() ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattleGym_Not_Ready") : (i = this.ViewModel.GetChallengeId(), t = t.GetDeckServerId(), this.pct = !0, ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestEnterPhantomArenaBattleAsync(i, e, t).finally(() => {
        this.pct = !1
      })))
    }, this.H51 = () => {
      this.OpenChildView("PhantomArenaRoleSelectTabView")
    }, this.$51 = () => {
      this.ViewModel.SelectedDeckIndex = 0 <= this.ViewModel.UsedDeckIndex ? this.ViewModel.UsedDeckIndex : 0, this.OpenChildView("PhantomArenaDeckOverviewTabView")
    }, this.W51 = () => {
      var e = this.V51;
      e && (e = {
        DeckInfo: e,
        ShowLocked: !1
      }, UiManager_1.UiManager.OpenView("PhantomArenaDeckDetailView", e))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIScrollViewWithScrollbarComponent],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
      [11, UE.UIText],
      [12, UE.UISprite],
      [13, UE.UISprite]
    ], this.BtnBindInfo = [
      [10, this.tWt]
    ]
  }
  async OnBeforeStartAsync() {
    this.x3_ = new PhantomArenaRoleOverviewItem_1.PhantomArenaRoleOverviewItem, this.N51 = new PhantomArenaChallengeDetailDeckItem_1.PhantomArenaChallengeDetailDeckItem, this.j51 = new PhantomArenaChallengeDetailDeckItem_1.PhantomArenaChallengeDetailDeckItem, await Promise.all([this.x3_.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.N51.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.j51.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())]), this.x3_.OnRoleOverviewItemClick = this.H51, this.N51.OnButtonClick = this.$51, this.j51.OnButtonClick = this.W51;
    var e, i = this.ViewModel.GetChallengeId(),
      i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(i);
    i.IsReChallenge ? (e = await PhantomArenaController_1.PhantomArenaController.ReChallengeRequestAsync(this.ViewModel.GetChallengeId())) && (this.ViewModel.NpcId = e.Rnu, this.ViewModel.NpcDeckConfigId = e.Lnu) : (e = i.NpcGroupId, i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleNpcList(e)[0], this.ViewModel.NpcId = i.Id, this.ViewModel.NpcDeckConfigId = i.CardGroupId[0])
  }
  OnStart() {
    super.OnStart(), this.RewardLayout = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.rOe, this.GetItem(9).GetOwner())
  }
  OnBeforeShow() {
    this.ViewModel.SetViewTitle?.("PhantomArenaEntranceLevelTabView_Name"), this.ViewModel.SetViewHelpBtnActive?.(!1), this.ViewModel.SetViewIcon?.("SP_IconSoundRemnantArena4"), 0 === this.ViewModel.SelectedCardRoleId ? (this.ViewModel.TextureCardRoleId = this.ViewModel.SelectedCardRoleId, this.ViewModel.HideRoleTexture?.(!0)) : this.ViewModel.RoleTextureActive ? this.ViewModel.TextureCardRoleId !== this.ViewModel.SelectedCardRoleId && this.ViewModel.ChangeRoleTexture?.(this.ViewModel.SelectedCardRoleId, !0) : (this.ViewModel.ShowRoleTexture?.(!0), this.ViewModel.RefreshRoleTexture?.()), this.buu(), this.Ruu(), this.RefreshView()
  }
  RefreshView() {
    var e = this.ViewModel.GetChallengeId(),
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e),
      i = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.ChallengeName), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.NpcName), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.NpcTitle), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.PassConditionDesc), this.SetTextureByPath(e.NpcChallengeIcon, this.GetTexture(3)), this.SetSpriteByPath(e.NpcLevelBgIcon, this.GetSprite(12), !1), this.SetSpriteByPath(e.NpcLevelIcon, this.GetSprite(13), !1), this.G51 = {
        CardRoleId: this.ViewModel.SelectedCardRoleId
      }, this.x3_.Refresh(this.G51), this.F51 = this.ViewModel.GetUsedDeck(), this.F51 ? this.N51.Refresh(this.F51) : this.N51.Refresh(void 0), this.V51 = ModelManager_1.ModelManager.PhantomArenaModel.CreateDeckInfoFromDeckConfigId(this.ViewModel.NpcDeckConfigId), this.V51 ? this.j51.Refresh(this.V51) : this.j51.Refresh(void 0), e.IsReChallenge),
      t = i ? "PhantomBattle_1087" : "PhantomBattle_1088";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), t);
    let h = void 0;
    if (i) {
      h = [];
      for (var [s, r] of e.PassDropId) {
        s = [{
          ItemId: s,
          IncId: 0
        }, r];
        h.push(s)
      }
    } else h = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.FirstPassDropId);
    this.RewardLayout.RefreshByData(h)
  }
  buu() {
    this.ViewModel.RoleSelectedConfirmFlag && (this.x3_?.PlaySelectAnim(), this.ViewModel.RoleSelectedConfirmFlag = !1)
  }
  Ruu() {
    this.ViewModel.DeckSelectedConfirmFlag && (this.N51?.PlaySelectAnim(), this.ViewModel.DeckSelectedConfirmFlag = !1)
  }
}
exports.PhantomArenaChallengeDetailTabView = PhantomArenaChallengeDetailTabView;
//# sourceMappingURL=PhantomArenaChallengeDetailTabView.js.map
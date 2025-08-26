"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaChallengeDetailTabView = undefined;
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
class PhantomArenaChallengeDetailTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments);
    this.y81 = undefined;
    this.x3_ = undefined;
    this.S81 = undefined;
    this.M81 = undefined;
    this.E81 = undefined;
    this.I81 = undefined;
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
      var e = this.E81;
      if (e) {
        e = {
          DeckInfo: e,
          ShowLocked: false
        };
        UiManager_1.UiManager.OpenView("PhantomArenaDeckDetailView", e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIText], [12, UE.UISprite], [13, UE.UISprite]];
    this.BtnBindInfo = [[10, this.tWt]];
  }
  async OnBeforeStartAsync() {
    this.x3_ = new PhantomArenaRoleOverviewItem_1.PhantomArenaRoleOverviewItem();
    this.M81 = new PhantomArenaChallengeDetailDeckItem_1.PhantomArenaChallengeDetailDeckItem();
    this.I81 = new PhantomArenaChallengeDetailDeckItem_1.PhantomArenaChallengeDetailDeckItem();
    await Promise.all([this.x3_.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.M81.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.I81.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())]);
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
    this.RewardLayout = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.rOe, this.GetItem(9).GetOwner());
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
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.ChallengeName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.NpcName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.NpcTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.PassConditionDesc);
    this.SetTextureByPath(e.NpcChallengeIcon, this.GetTexture(3));
    this.SetSpriteByPath(e.NpcLevelBgIcon, this.GetSprite(12), false);
    this.SetSpriteByPath(e.NpcLevelIcon, this.GetSprite(13), false);
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
    var i = e.IsReChallenge;
    var t = i ? "PhantomBattle_1087" : "PhantomBattle_1088";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), t);
    let h = undefined;
    if (i) {
      h = [];
      for (var [s, r] of e.PassDropId) {
        s = [{
          ItemId: s,
          IncId: 0
        }, r];
        h.push(s);
      }
    } else {
      h = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.FirstPassDropId);
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
exports.PhantomArenaChallengeDetailTabView = PhantomArenaChallengeDetailTabView;
//# sourceMappingURL=PhantomArenaChallengeDetailTabView.js.map
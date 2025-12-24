"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMainViewModel = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PhantomArenaController_1 = require("../PhantomArenaController");
class PhantomArenaMainViewModel {
  constructor() {
    this.hyc = 0;
    this.ActivityId = 0;
    this.P81 = undefined;
    this.QuicklyBuildDeckUseTimes = new Map();
    this.LastQuicklyBuildId = 0;
    this.SelectedCardRoleId = 0;
    this.TextureCardRoleId = 0;
    this.RoleTextureActive = false;
    this.j81 = undefined;
    this.RecommendDeck = undefined;
    this.EditableDeckList = [];
    this.UsedDeckIndex = -1;
    this.SelectedDeckIndex = -1;
    this.CanShowRewardInRoleSelectTabView = false;
    this.CanShowSelectBtnInRoleSelectTabView = false;
    this.CanShowSelectBtnInDeckOverviewTabView = false;
    this.NpcId = 0;
    this.NpcDeckConfigId = 0;
    this.CardRoleList = [];
    this.RoleSelectedConfirmFlag = false;
    this.DeckSelectedConfirmFlag = false;
    this.ChangeRoleTexture = undefined;
    this.ShowRoleTexture = undefined;
    this.HideRoleTexture = undefined;
    this.PlayRoleTextureShowAnim = undefined;
    this.RefreshRoleTexture = undefined;
    this.SetViewTitle = undefined;
    this.SetViewIcon = undefined;
    this.SetViewHelpId = undefined;
    this.SetViewHelpBtnActive = undefined;
    this.Dj1 = undefined;
    this.F81 = undefined;
    this.H81 = undefined;
  }
  Init(t) {
    var i = ModelManager_1.ModelManager.PhantomArenaModel;
    if ((this.hyc = t) > 0) {
      this.P81 = i.GetChallengeData(t);
      this.CanShowSelectBtnInRoleSelectTabView = true;
      this.CanShowRewardInRoleSelectTabView = false;
      this.CanShowSelectBtnInDeckOverviewTabView = true;
    } else {
      this.CanShowSelectBtnInRoleSelectTabView = false;
      this.CanShowRewardInRoleSelectTabView = true;
      this.CanShowSelectBtnInDeckOverviewTabView = false;
    }
    var t = i.GetLastUsedCardRoleId(this.ActivityId);
    this.CardRoleList = i.GetCardRoleList(this.ActivityId);
    this.SelectedCardRoleId = t;
    this.TextureCardRoleId = t;
    var t = i.GetLastUsedCardDeckServerId(this.ActivityId);
    this.UsedDeckIndex = t >= 0 ? t : -1;
    this.SelectedDeckIndex = this.UsedDeckIndex;
    this.UpdateEditableDeckList();
  }
  SetOverrideCloseFunc(t) {
    this.Dj1 = t;
  }
  ResetOverrideCloseFunc() {
    this.Dj1 = undefined;
  }
  GetOverrideCloseFunc() {
    return this.Dj1;
  }
  SetGetSwitchItemFunc(t) {
    this.F81 = t;
  }
  GetSwitchItem() {
    return this.F81?.();
  }
  GetChallengeId() {
    return this.hyc;
  }
  GetChallengeInfo() {
    return this.P81;
  }
  GetUsedDeck() {
    if (!(this.UsedDeckIndex < 0)) {
      return ModelManager_1.ModelManager.PhantomArenaModel.GetDeckByDeckId(this.UsedDeckIndex, this.ActivityId);
    }
  }
  UpdateEditableDeckList() {
    this.EditableDeckList = ModelManager_1.ModelManager.PhantomArenaModel.CreateEditableDeckListFromProtocolData(this.ActivityId);
    var t = this.EditableDeckList.length;
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData(this.ActivityId).GetMaxDeckCount();
    if (this.EditableDeckList.length < i) {
      this.EditableDeckList.push(this.CreateEmptyTempDeck());
    }
    this.SelectedDeckIndex = MathUtils_1.MathUtils.Clamp(this.SelectedDeckIndex, 0, this.EditableDeckList.length - 1);
    if (this.UsedDeckIndex >= t) {
      this.UsedDeckIndex = -1;
    }
  }
  GetCurEditDeck() {
    return this.j81;
  }
  GetEditableDeckList() {
    return this.EditableDeckList;
  }
  CreateEmptyTempDeck() {
    return ModelManager_1.ModelManager.PhantomArenaModel.CreateEmptyTempDeckInfo(this.ActivityId);
  }
  CreateTempDeckFromDeck(t) {
    return t.DeepCopy();
  }
  StartEditDeck(t) {
    this.j81 = t;
    this.H81 = this.j81?.Record();
  }
  EndEditDeck() {
    this.j81 = undefined;
    this.H81 = undefined;
    this.QuicklyBuildDeckUseTimes.clear();
    this.LastQuicklyBuildId = 0;
  }
  RecordDeck(t) {
    this.H81 = this.j81?.Record();
  }
  CheckCurEditDeckHasChange() {
    return !!this.H81 && !!this.j81 && this.j81.CheckDeckDifferent(this.H81);
  }
  RecordQuicklyBuildClick(t) {
    var i = this.QuicklyBuildDeckUseTimes.get(t);
    if (i) {
      this.QuicklyBuildDeckUseTimes.set(t, i + 1);
    } else {
      this.QuicklyBuildDeckUseTimes.set(t, 1);
    }
    this.LastQuicklyBuildId = t;
  }
  ReportDeckDelete(t) {
    t = {
      ActivityId: this.ActivityId,
      DeckInfo: t,
      Operation: 2,
      QuicklyBuildDeckUseTimes: this.QuicklyBuildDeckUseTimes,
      LastQuicklyBuildId: this.LastQuicklyBuildId
    };
    PhantomArenaController_1.PhantomArenaController.ReportDeckUpdate(t);
  }
  ReportDeckCreate(t) {
    t = {
      ActivityId: this.ActivityId,
      DeckInfo: t,
      Operation: 1,
      QuicklyBuildDeckUseTimes: this.QuicklyBuildDeckUseTimes,
      LastQuicklyBuildId: this.LastQuicklyBuildId
    };
    PhantomArenaController_1.PhantomArenaController.ReportDeckUpdate(t);
  }
  ReportDeckCover(t) {
    t = {
      ActivityId: this.ActivityId,
      DeckInfo: t,
      Operation: 3,
      QuicklyBuildDeckUseTimes: this.QuicklyBuildDeckUseTimes,
      LastQuicklyBuildId: this.LastQuicklyBuildId
    };
    PhantomArenaController_1.PhantomArenaController.ReportDeckUpdate(t);
  }
}
exports.PhantomArenaMainViewModel = PhantomArenaMainViewModel;
//# sourceMappingURL=PhantomArenaMainViewModel.js.map
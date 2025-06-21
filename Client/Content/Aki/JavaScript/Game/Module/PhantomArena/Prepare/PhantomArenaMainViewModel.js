"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaMainViewModel = void 0;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PhantomArenaController_1 = require("../PhantomArenaController");
class PhantomArenaMainViewModel {
  constructor() {
    this.hyc = 0, this.Y51 = void 0, this.QuicklyBuildDeckUseTimes = new Map, this.LastQuicklyBuildId = 0, this.SelectedCardRoleId = 0, this.TextureCardRoleId = 0, this.RoleTextureActive = !1, this.h81 = void 0, this.EditableDeckList = [], this.UsedDeckIndex = -1, this.SelectedDeckIndex = -1, this.CanShowRewardInRoleSelectTabView = !1, this.CanShowSelectBtnInRoleSelectTabView = !1, this.CanShowSelectBtnInDeckOverviewTabView = !1, this.NpcId = 0, this.NpcDeckConfigId = 0, this.CardRoleList = [], this.RoleSelectedConfirmFlag = !1, this.DeckSelectedConfirmFlag = !1, this.ChangeRoleTexture = void 0, this.ShowRoleTexture = void 0, this.HideRoleTexture = void 0, this.PlayRoleTextureShowAnim = void 0, this.RefreshRoleTexture = void 0, this.SetViewTitle = void 0, this.SetViewIcon = void 0, this.SetViewHelpId = void 0, this.SetViewHelpBtnActive = void 0, this.J81 = void 0, this.n81 = void 0, this.l81 = void 0
  }
  Init(t) {
    var i = ModelManager_1.ModelManager.PhantomArenaModel,
      t = (0 < (this.hyc = t) ? (this.Y51 = i.GetChallengeData(t), this.CanShowSelectBtnInRoleSelectTabView = !0, this.CanShowRewardInRoleSelectTabView = !1, this.CanShowSelectBtnInDeckOverviewTabView = !0) : (this.CanShowSelectBtnInRoleSelectTabView = !1, this.CanShowRewardInRoleSelectTabView = !0, this.CanShowSelectBtnInDeckOverviewTabView = !1), i.GetLastUsedCardRoleId()),
      t = (this.CardRoleList = i.GetCardRoleList(), this.SelectedCardRoleId = t, this.TextureCardRoleId = t, i.GetLastUsedCardDeckServerId());
    this.UsedDeckIndex = 0 <= t ? t : -1, this.SelectedDeckIndex = this.UsedDeckIndex, this.UpdateEditableDeckList()
  }
  SetOverrideCloseFunc(t) {
    this.J81 = t
  }
  ResetOverrideCloseFunc() {
    this.J81 = void 0
  }
  GetOverrideCloseFunc() {
    return this.J81
  }
  SetGetSwitchItemFunc(t) {
    this.n81 = t
  }
  GetSwitchItem() {
    return this.n81?.()
  }
  GetChallengeId() {
    return this.hyc
  }
  GetChallengeInfo() {
    return this.Y51
  }
  GetUsedDeck() {
    if (!(this.UsedDeckIndex < 0)) return ModelManager_1.ModelManager.PhantomArenaModel.GetDeckByDeckId(this.UsedDeckIndex)
  }
  UpdateEditableDeckList() {
    this.EditableDeckList = ModelManager_1.ModelManager.PhantomArenaModel.CreateEditableDeckListFromProtocolData();
    var t = this.EditableDeckList.length,
      i = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData().GetMaxDeckCount();
    this.EditableDeckList.length < i && this.EditableDeckList.push(this.CreateEmptyTempDeck()), this.SelectedDeckIndex = MathUtils_1.MathUtils.Clamp(this.SelectedDeckIndex, 0, this.EditableDeckList.length - 1), this.UsedDeckIndex >= t && (this.UsedDeckIndex = -1)
  }
  GetCurEditDeck() {
    return this.h81
  }
  GetEditableDeckList() {
    return this.EditableDeckList
  }
  CreateEmptyTempDeck() {
    return ModelManager_1.ModelManager.PhantomArenaModel.CreateEmptyTempDeckInfo()
  }
  CreateTempDeckFromDeck(t) {
    return t.DeepCopy()
  }
  StartEditDeck(t) {
    this.h81 = t, this.l81 = this.h81?.Record()
  }
  EndEditDeck() {
    this.h81 = void 0, this.l81 = void 0, this.QuicklyBuildDeckUseTimes.clear(), this.LastQuicklyBuildId = 0
  }
  RecordDeck(t) {
    this.l81 = this.h81?.Record()
  }
  CheckCurEditDeckHasChange() {
    return !(!this.l81 || !this.h81) && this.h81.CheckDeckDifferent(this.l81)
  }
  RecordQuicklyBuildClick(t) {
    var i = this.QuicklyBuildDeckUseTimes.get(t);
    i ? this.QuicklyBuildDeckUseTimes.set(t, i + 1) : this.QuicklyBuildDeckUseTimes.set(t, 1), this.LastQuicklyBuildId = t
  }
  ReportDeckDelete(t) {
    t = {
      DeckInfo: t,
      Operation: 2,
      QuicklyBuildDeckUseTimes: this.QuicklyBuildDeckUseTimes,
      LastQuicklyBuildId: this.LastQuicklyBuildId
    };
    PhantomArenaController_1.PhantomArenaController.ReportDeckUpdate(t)
  }
  ReportDeckCreate(t) {
    t = {
      DeckInfo: t,
      Operation: 1,
      QuicklyBuildDeckUseTimes: this.QuicklyBuildDeckUseTimes,
      LastQuicklyBuildId: this.LastQuicklyBuildId
    };
    PhantomArenaController_1.PhantomArenaController.ReportDeckUpdate(t)
  }
  ReportDeckCover(t) {
    t = {
      DeckInfo: t,
      Operation: 3,
      QuicklyBuildDeckUseTimes: this.QuicklyBuildDeckUseTimes,
      LastQuicklyBuildId: this.LastQuicklyBuildId
    };
    PhantomArenaController_1.PhantomArenaController.ReportDeckUpdate(t)
  }
}
exports.PhantomArenaMainViewModel = PhantomArenaMainViewModel;
//# sourceMappingURL=PhantomArenaMainViewModel.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BottomPanel = void 0;
const UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MoraleTempExpView_1 = require("../../../Battle/Morale/View/MoraleTempExpView"),
  ConcertoResponseItem_1 = require("../ConcertoResponseItem"),
  FishingStateView_1 = require("../FishingStateView"),
  RoleBuffView_1 = require("../RoleBuffView"),
  RoleStateView_1 = require("../RoleStateView"),
  RoleTopBuffView_1 = require("../RoleTopBuffView"),
  SpecialEnergyBarContainer_1 = require("../SpecialEnergy/SpecialEnergyBarContainer"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
class BottomPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments), this.lJe = void 0, this._Je = void 0, this.uJe = void 0, this.cJe = void 0, this.kXa = void 0, this.DF_ = void 0, this.MH1 = void 0, this.EH1 = !1, this.mJe = e => {
      this.uJe?.RefreshVisible()
    }, this.xie = () => {
      var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      e && (BottomPanel.kQe.Start(), e.IsPhantom() && 0 < e.RoleConfig.SpecialEnergyBarId && e.MorphShowSpecialEnergyBar ? (this.lJe.Refresh(void 0), this.uJe.Refresh(void 0)) : (this.lJe.Refresh(e), this.uJe.Refresh(e)), this._Je.Refresh(e), this.cJe.OnChangeRole(e.MorphShowSpecialEnergyBar ? e : void 0), this.kXa.OnChangeRole(e), BottomPanel.kQe.Stop())
    }, this.Kou = e => {
      var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      t && (BottomPanel.kQe.Start(), t.IsPhantom() && !e ? (this.lJe.Refresh(void 0), this.uJe.Refresh(void 0)) : (this.lJe.Refresh(t), this.uJe.Refresh(t)), this.cJe.OnChangeRole(e ? t : void 0), BottomPanel.kQe.Stop())
    }, this.zpe = e => {
      this.lJe.GetEntityId() === e.Id && this.lJe.Refresh(void 0), this.uJe.GetEntityId() === e.Id && this.uJe.Refresh(void 0), this._Je.GetEntityId() === e.Id && this._Je.Refresh(void 0), this.cJe.OnRemoveEntity(e.Id), this.kXa.OnRemoveEntity(e.Id)
    }, this.dJe = (e, t) => {
      var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (i?.Valid && t && i.Id === e)
        for (const s of t.GSs) s.tSs === EAttributeId.Proto_Life && this.lJe.RefreshHpAndShield(!0)
    }, this.AQe = (e, t, i, s) => {
      this._Je.GetEntityId() === e && (i ? this._Je.AddBuff(t, s) : this._Je.RemoveBuff(t, s))
    }, this.Gd_ = e => {
      this.BF_(2, !e), this.kF_(e)
    }, this.Zpe = e => {
      ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive() && this.IH1(e)
    }, this.TH1 = e => {
      e ? ControllerHolder_1.ControllerHolder.FormationDataController.GlobalIsInFight && this.IH1(!0) : this.IH1(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem]
    ]
  }
  async InitializeAsync() {
    await Promise.all([this.CJe(), this.gJe(), this.fJe(), this.pJe(), this.NXa()]);
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData(),
      e = (this.lJe.Refresh(e), this.uJe.Refresh(e), this._Je.Refresh(e), this.cJe.OnChangeRole(e), this.kXa.OnChangeRole(e), ControllerHolder_1.ControllerHolder.FishingController.IsInFishingShip());
    this.BF_(2, !e), this.kF_(e)
  }
  Reset() {
    this.lJe = void 0, this.uJe = void 0, this._Je = void 0, this.cJe = void 0, this.kXa = void 0, this.kF_(!1), super.Reset()
  }
  OnShowBattleChildViewPanel() {
    this.lJe?.SetNiagaraActive(!1)
  }
  OnTickBattleChildViewPanel(e) {
    BottomPanel.vJe.Start(), this.lJe?.Tick(e), this._Je?.Tick(e), this.cJe?.Tick(e), this.kXa?.Tick(e), BottomPanel.vJe.Stop()
  }
  async CJe() {
    var e = this.GetItem(0);
    this.lJe = await this.NewStaticChildViewAsync(e.GetOwner(), RoleStateView_1.RoleStateView), this.lJe.ShowBattleVisibleChildView()
  }
  async fJe() {
    var e = this.GetItem(1);
    this.uJe = await this.NewStaticChildViewAsync(e.GetOwner(), ConcertoResponseItem_1.ConcertoResponseItem), this.uJe.ShowBattleVisibleChildView()
  }
  async gJe() {
    var e = this.GetItem(3);
    this._Je = await this.NewStaticChildViewAsync(e.GetOwner(), RoleBuffView_1.RoleBuffView), this._Je.ShowBattleVisibleChildView()
  }
  async pJe() {
    var e = this.GetItem(2);
    this.cJe = await this.NewStaticChildViewAsync(e.GetOwner(), SpecialEnergyBarContainer_1.SpecialEnergyBarContainer, this.GetItem(4)), this.cJe.ShowBattleVisibleChildView()
  }
  async NXa() {
    var e = this.GetItem(5);
    this.kXa = await this.NewStaticChildViewAsync(e.GetOwner(), RoleTopBuffView_1.RoleTopBuffView), this.kXa.ShowBattleVisibleChildView()
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiEnergyBarVisible, this.Kou), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiRemoveRoleData, this.zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddUITexture, this.AQe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnServerAttributeChange, this.dJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnConcertoResponseOpen, this.mJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleActiveChanged, this.TH1)
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiEnergyBarVisible, this.Kou), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiRemoveRoleData, this.zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnServerAttributeChange, this.dJe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddUITexture, this.AQe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnConcertoResponseOpen, this.mJe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleActiveChanged, this.TH1)
  }
  BF_(e, t) {
    this.lJe?.SetVisible(e, t), this.uJe?.SetVisible(e, t), this._Je?.SetVisible(e, t), this.cJe?.SetVisible(e, t), this.kXa?.SetVisible(e, t)
  }
  kF_(e) {
    e ? this.DF_ || (this.DF_ = this.NewDynamicChildViewByResourceIdWithCallback(this.RootItem, "UiItem_NavigationFightHp", FishingStateView_1.FishingStateView)) : this.DF_ && (this.DF_.Destroy(), this.DF_ = void 0)
  }
  async bH1() {
    var e;
    this.MH1 || this.EH1 || (e = this.GetItem(6), this.EH1 = !0, this.MH1 = await this.NewDynamicChildViewByResourceId(e, "UiItem_MoraleFightBar", MoraleTempExpView_1.MoraleTempExpView), this.EH1 = !1)
  }
  IH1(e) {
    e ? this.MH1 ? this.MH1?.ShowBattleVisibleChildView() : this.bH1().then(() => {
      ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive() && ControllerHolder_1.ControllerHolder.FormationDataController.GlobalIsInFight && this.MH1?.ShowBattleVisibleChildView()
    }) : this.MH1?.HideBattleVisibleChildView()
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return e && !(e.length <= 0) && "MoraleTempExp" === e[0] && (e = this.MH1?.GetRootItem()) ? [e, e] : void 0
  }
}(exports.BottomPanel = BottomPanel).vJe = Stats_1.Stat.Create("[BattleView]BottomPanelTick"), BottomPanel.kQe = Stats_1.Stat.Create("[ChangeRole]BottomPanel");
//# sourceMappingURL=BottomPanel.js.map
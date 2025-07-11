"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomPanel = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MoraleTempExpView_1 = require("../../../Battle/Morale/View/MoraleTempExpView");
const ConcertoResponseItem_1 = require("../ConcertoResponseItem");
const FishingStateView_1 = require("../FishingStateView");
const RoleBuffView_1 = require("../RoleBuffView");
const RoleStateView_1 = require("../RoleStateView");
const RoleTopBuffView_1 = require("../RoleTopBuffView");
const SpecialEnergyBarContainer_1 = require("../SpecialEnergy/SpecialEnergyBarContainer");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
class BottomPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.lJe = undefined;
    this._Je = undefined;
    this.uJe = undefined;
    this.cJe = undefined;
    this.kXa = undefined;
    this.DF_ = undefined;
    this.n$1 = undefined;
    this.s$1 = false;
    this.mJe = e => {
      this.uJe?.RefreshVisible();
    };
    this.xie = () => {
      var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      if (e) {
        BottomPanel.kQe.Start();
        if (e.IsPhantom() && e.RoleConfig.SpecialEnergyBarId > 0 && e.MorphShowSpecialEnergyBar) {
          this.lJe.Refresh(undefined);
          this.uJe.Refresh(undefined);
        } else {
          this.lJe.Refresh(e);
          this.uJe.Refresh(e);
        }
        this._Je.Refresh(e);
        this.cJe.OnChangeRole(e.MorphShowSpecialEnergyBar ? e : undefined);
        this.kXa.OnChangeRole(e);
        BottomPanel.kQe.Stop();
      }
    };
    this.llu = e => {
      var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      if (t) {
        BottomPanel.kQe.Start();
        if (t.IsPhantom() && !e) {
          this.lJe.Refresh(undefined);
          this.uJe.Refresh(undefined);
        } else {
          this.lJe.Refresh(t);
          this.uJe.Refresh(t);
        }
        this.cJe.OnChangeRole(e ? t : undefined);
        BottomPanel.kQe.Stop();
      }
    };
    this.zpe = e => {
      if (this.lJe.GetEntityId() === e.Id) {
        this.lJe.Refresh(undefined);
      }
      if (this.uJe.GetEntityId() === e.Id) {
        this.uJe.Refresh(undefined);
      }
      if (this._Je.GetEntityId() === e.Id) {
        this._Je.Refresh(undefined);
      }
      this.cJe.OnRemoveEntity(e.Id);
      this.kXa.OnRemoveEntity(e.Id);
    };
    this.dJe = (e, t) => {
      var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (i?.Valid && t && i.Id === e) {
        for (const s of t.GSs) {
          if (s.tSs === EAttributeId.Proto_Life) {
            this.lJe.RefreshHpAndShield(true);
          }
        }
      }
    };
    this.AQe = (e, t, i, s) => {
      if (this._Je.GetEntityId() === e) {
        if (i) {
          this._Je.AddBuff(t, s);
        } else {
          this._Je.RemoveBuff(t, s);
        }
      }
    };
    this.Gd_ = e => {
      this.BF_(2, !e);
      this.kF_(e);
    };
    this.Zpe = e => {
      if (ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive()) {
        this.a$1(e);
      }
    };
    this.h$1 = e => {
      if (e) {
        if (ControllerHolder_1.ControllerHolder.FormationDataController.GlobalIsInFight) {
          this.a$1(true);
        }
      } else {
        this.a$1(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async InitializeAsync() {
    await Promise.all([this.CJe(), this.gJe(), this.fJe(), this.pJe(), this.NXa()]);
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    this.lJe.Refresh(e);
    this.uJe.Refresh(e);
    this._Je.Refresh(e);
    this.cJe.OnChangeRole(e);
    this.kXa.OnChangeRole(e);
    var e = ControllerHolder_1.ControllerHolder.FishingController.IsInFishingShip();
    this.BF_(2, !e);
    this.kF_(e);
  }
  Reset() {
    this.lJe = undefined;
    this.uJe = undefined;
    this._Je = undefined;
    this.cJe = undefined;
    this.kXa = undefined;
    this.kF_(false);
    super.Reset();
  }
  OnShowBattleChildViewPanel() {
    this.lJe?.SetNiagaraActive(false);
  }
  OnTickBattleChildViewPanel(e) {
    BottomPanel.vJe.Start();
    this.lJe?.Tick(e);
    this._Je?.Tick(e);
    this.cJe?.Tick(e);
    this.kXa?.Tick(e);
    BottomPanel.vJe.Stop();
  }
  async CJe() {
    var e = this.GetItem(0);
    this.lJe = await this.NewStaticChildViewAsync(e.GetOwner(), RoleStateView_1.RoleStateView);
    this.lJe.ShowBattleVisibleChildView();
  }
  async fJe() {
    var e = this.GetItem(1);
    this.uJe = await this.NewStaticChildViewAsync(e.GetOwner(), ConcertoResponseItem_1.ConcertoResponseItem);
    this.uJe.ShowBattleVisibleChildView();
  }
  async gJe() {
    var e = this.GetItem(3);
    this._Je = await this.NewStaticChildViewAsync(e.GetOwner(), RoleBuffView_1.RoleBuffView);
    this._Je.ShowBattleVisibleChildView();
  }
  async pJe() {
    var e = this.GetItem(2);
    this.cJe = await this.NewStaticChildViewAsync(e.GetOwner(), SpecialEnergyBarContainer_1.SpecialEnergyBarContainer, this.GetItem(4));
    this.cJe.ShowBattleVisibleChildView();
  }
  async NXa() {
    var e = this.GetItem(5);
    this.kXa = await this.NewStaticChildViewAsync(e.GetOwner(), RoleTopBuffView_1.RoleTopBuffView);
    this.kXa.ShowBattleVisibleChildView();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiEnergyBarVisible, this.llu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiRemoveRoleData, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddUITexture, this.AQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnServerAttributeChange, this.dJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnConcertoResponseOpen, this.mJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleActiveChanged, this.h$1);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiEnergyBarVisible, this.llu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiRemoveRoleData, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnServerAttributeChange, this.dJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddUITexture, this.AQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnConcertoResponseOpen, this.mJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleActiveChanged, this.h$1);
  }
  BF_(e, t) {
    this.lJe?.SetVisible(e, t);
    this.uJe?.SetVisible(e, t);
    this._Je?.SetVisible(e, t);
    this.cJe?.SetVisible(e, t);
    this.kXa?.SetVisible(e, t);
  }
  kF_(e) {
    if (e) {
      this.DF_ ||= this.NewDynamicChildViewByResourceIdWithCallback(this.RootItem, "UiItem_NavigationFightHp", FishingStateView_1.FishingStateView);
    } else if (this.DF_) {
      this.DF_.Destroy();
      this.DF_ = undefined;
    }
  }
  async l$1() {
    var e;
    if (!this.n$1 && !this.s$1) {
      e = this.GetItem(6);
      this.s$1 = true;
      this.n$1 = await this.NewDynamicChildViewByResourceId(e, "UiItem_MoraleFightBar", MoraleTempExpView_1.MoraleTempExpView);
      this.s$1 = false;
    }
  }
  a$1(e) {
    if (e) {
      if (this.n$1) {
        this.n$1?.ShowBattleVisibleChildView();
      } else {
        this.l$1().then(() => {
          if (ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive() && ControllerHolder_1.ControllerHolder.FormationDataController.GlobalIsInFight) {
            this.n$1?.ShowBattleVisibleChildView();
          }
        });
      }
    } else {
      this.n$1?.HideBattleVisibleChildView();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length <= 0) && e[0] === "MoraleTempExp" && (e = this.n$1?.GetRootItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
(exports.BottomPanel = BottomPanel).vJe = Stats_1.Stat.Create("[BattleView]BottomPanelTick");
BottomPanel.kQe = Stats_1.Stat.Create("[ChangeRole]BottomPanel"); //# sourceMappingURL=BottomPanel.js.map
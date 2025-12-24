"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const CooperationController_1 = require("../../Battle/Cooperation/CooperationController");
const RoleDefine_1 = require("../../RoleUi/RoleDefine");
const BattleUiDefine_1 = require("../BattleUiDefine");
const BattleUiRoleData_1 = require("../BattleUiRoleData");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const FormationLevelUpItem_1 = require("./FormationLevelUpItem");
const FormationOnlineItem_1 = require("./FormationOnlineItem");
const FormationTrialItem_1 = require("./FormationTrialItem");
const CombineKeyItem_1 = require("./KeyItem/CombineKeyItem");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const FormationDataController_1 = require("../../Abilities/FormationDataController");
const RoleUtils_1 = require("../../RoleUi/RoleUtils");
const REFRESH_COOLDOWN_INTERVAL = 100;
const CURE_DELAY = 1000;
const LOW_HP_PERCENT = 0.2;
const LEVE_UP_TIME = 5000;
class FormationItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Hnt = undefined;
    this.PrefabIndex = 0;
    this.PlayerId = 0;
    this.IsMyRole = false;
    this.RoleConfigId = 0;
    this.RoleSkinId = 0;
    this.RoleData = undefined;
    this.EntityId = undefined;
    this.RoleConfig = undefined;
    this.RoleSkinConfig = undefined;
    this.i$e = [];
    this.hhf = 0;
    this.vat = 0;
    this.Sat = 0;
    this.yat = undefined;
    this.Iat = undefined;
    this.Tat = undefined;
    this.Lat = "";
    this.Dat = false;
    this.Rat = undefined;
    this.Uat = 0;
    this.Qtt = undefined;
    this.Aat = undefined;
    this.Pat = undefined;
    this.xat = undefined;
    this.wat = false;
    this.Bat = false;
    this.bat = false;
    this.yoh = false;
    this.rxl = false;
    this.Znh = false;
    this.JAf = undefined;
    this.qat = t => {
      if (Info_1.Info.OperationType === 2) {
        t = t * TimeUtil_1.TimeUtil.InverseMillisecond;
        this.Gat(t, t);
      }
    };
    this.u$e = () => {
      if (this.RoleData) {
        this.RefreshRoleHealthPercent();
      }
    };
    this.hXe = t => {
      if (this.RoleData && this.EntityId === t) {
        this.RefreshRoleHealthPercent();
      }
    };
    this.s$e = (t, i, e) => {
      if (!(0, FormationDataController_1.isBattleMulti)()) {
        this.kat();
      }
    };
    this.Vat = (t, i) => {
      this.Hat();
    };
    this.jat = (t, i) => {
      this.Wat();
    };
    this.f51 = (t, i) => {
      if (this.wat !== i) {
        this.wat = i;
        this.iht();
      }
    };
    this.RefreshQteActive = () => {
      if ((0, FormationDataController_1.isBattleMulti)()) {
        this.Hat();
      } else {
        this.kat();
      }
    };
    this.Kat = () => {
      var t = this.RoleData?.CreatureDataId;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 17, "当点击阵容头像按钮时", ["CreatureDataId", t]);
      }
      if (GlobalData_1.GlobalData.GameInstance && t) {
        CooperationController_1.CooperationController.TryCooperate(t);
      }
    };
    this.$at = () => {
      this.Yat();
    };
    this.o$e = t => {
      if (t === this.EntityId) {
        this.yTa();
      }
    };
    this.Trc = t => {
      if (t === this.EntityId) {
        this.Oat();
      }
    };
    this.r$e = (t, i, e) => {
      if (t === this.EntityId) {
        this.RefreshElementVisible();
      }
    };
    this.Eoh = t => {
      var i;
      if (ModelManager_1.ModelManager.WeeklyRogueModel?.CheckIsInWeeklyRogue() || (i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity) && i.Id === this.EntityId && t !== 4) {
        this.RefreshLinkActive(false);
      } else if (t === 2) {
        this.RefreshLinkActive(true);
      } else if (t === 3) {
        if (this.EntityId) {
          i = !ModelManager_1.ModelManager.BattleLinkModel.HasLinkEntityId(this.EntityId);
          this.RefreshLinkActive(i);
        } else {
          this.RefreshLinkActive(false);
        }
      } else if (t === 4) {
        this.RefreshLinkActive(true, true);
      } else {
        this.RefreshLinkActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIItem], [5, UE.UINiagara], [9, UE.UITexture], [12, UE.UISprite], [17, UE.UISprite], [13, UE.UISprite], [14, UE.UIItem], [15, UE.UITexture], [16, UE.UISprite], [6, UE.UIItem], [10, UE.UIItem], [7, UE.UINiagara], [8, UE.UIText], [11, UE.UISprite], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UINiagara], [22, UE.UINiagara], [23, UE.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([24, UE.UIItem]);
    }
  }
  Initialize(t) {
    super.Initialize(t);
    this.PrefabIndex = t;
    this.Uat = ModelManager_1.ModelManager.BattleUiModel.ConcertoChangeEffectDelay;
    this.GetTexture(9).SetUIActive(false);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "FormationItem init", ["", t]);
    }
    this.Ore();
  }
  async InitializeAsync(t) {
    var i;
    if (!Info_1.Info.IsInTouch()) {
      this.Est(18);
      this.Est(19);
      i = this.GetItem(24);
      this.Qtt = new CombineKeyItem_1.CombineKeyItem();
      await this.Qtt.CreateByActorAsync(i.GetOwner());
    }
    await this.v4f();
  }
  async v4f() {
    this.Pat = new FormationTrialItem_1.FormationTrialItem();
    await this.Pat.CreateThenShowByResourceIdAsync("UiItem_FigthRoleHeadTest", this.RootItem);
  }
  ResetItem() {
    this.ClearData();
    this.SetActive(false);
  }
  Refresh(t, i, e, s) {
    this.ClearData();
    this.PlayerId = t;
    this.IsMyRole = t === ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    if (this.RoleConfigId !== i || this.RoleSkinId !== e) {
      this.RoleConfigId = i;
      this.RoleSkinId = e;
      this.RoleConfig = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleConfigId);
      if (this.RoleConfig.RoleType === 1) {
        this.RoleSkinConfig = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(this.RoleSkinId);
      } else {
        this.RoleSkinConfig = undefined;
      }
      this.Jat();
      this.RefreshRoleName();
    }
    this.RefreshOnlineItem();
    t = s?.EntityHandle?.Entity;
    if (t?.IsInit) {
      this.EntityId = t.Id;
      this.RoleData = s;
      this.wat = this.RoleData?.GameplayTagComponent.HasTag(-2107968822) ?? false;
      this.c$e(t);
      this.RefreshRoleHealthPercent();
      this.zat();
      this.Oat();
      this.Zat();
      this.eht();
      this.tht();
      this.RefreshQteActive();
      this.RefreshLinkEffect();
      this.iht();
    } else {
      this.RefreshRoleHealthPercent();
      this.GetItem(14).SetUIActive(false);
      this.GetSprite(17).SetUIActive(false);
    }
    this.SetActive(true);
  }
  ClearData() {
    let t = this.RoleData?.EntityHandle?.Entity;
    if (!t && this.EntityId) {
      t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(this.EntityId)?.Entity;
    }
    this.RemoveEntityEvents(t);
    this.RoleData = undefined;
    this.EntityId = undefined;
    this.PlayerId = 0;
    this.IsMyRole = false;
    this.RoleConfigId = 0;
    this.RoleConfig = undefined;
  }
  Ore() {
    this.GetExtendToggle(0).OnPointDownCallBack.Bind(this.Kat);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiElementEnergyChanged, this.o$e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiEnergyChanged, this.Trc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiElementHideTagChanged, this.r$e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiHealthChanged, this.hXe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiShieldChanged, this.u$e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiQteEnableTagChanged, this.s$e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiDeadTagChanged, this.RefreshQteActive);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiQteCdTagChanged, this.RefreshQteActive);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharInQteChanged, this.RefreshQteActive);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.RefreshQteActive);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleLinkStatusChanged, this.Eoh);
  }
  kre() {
    this.GetExtendToggle(0).OnPointDownCallBack.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiElementEnergyChanged, this.o$e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiEnergyChanged, this.Trc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiElementHideTagChanged, this.r$e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiHealthChanged, this.hXe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiShieldChanged, this.u$e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiQteEnableTagChanged, this.s$e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiDeadTagChanged, this.RefreshQteActive);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiQteCdTagChanged, this.RefreshQteActive);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharInQteChanged, this.RefreshQteActive);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.RefreshQteActive);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleLinkStatusChanged, this.Eoh);
  }
  c$e(t) {
    var i;
    EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnChangeRoleCoolDownChanged, this.qat);
    if (this.IsMyRole) {
      i = t.GetComponent(215);
      this.d$e(i, 1414093614, this.jat);
      this.d$e(i, -2107968822, this.f51);
    } else {
      i = t.GetComponent(215);
      this.d$e(i, 166024319, this.Vat);
    }
  }
  d$e(t, i, e) {
    t = t.ListenForTagAddOrRemove(i, e);
    if (t) {
      this.i$e.push(t);
    }
  }
  RemoveEntityEvents(t) {
    if (t) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnChangeRoleCoolDownChanged, this.qat);
    }
    for (const i of this.i$e) {
      i.EndTask();
    }
    this.i$e.length = 0;
  }
  OnShowBattleChildView() {
    this.rht(false);
  }
  Reset() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "FormationItem Reset");
    }
    this.Qtt = undefined;
    this.kre();
    this.vat = 0;
    this.nht();
    this.Yat();
    if (TimerSystem_1.TimerSystem.Has(this.yat)) {
      TimerSystem_1.TimerSystem.Remove(this.yat);
    }
    if (this.Pat) {
      this.Pat.Destroy();
      this.Pat = undefined;
    }
    if (this.Aat) {
      this.Aat.Destroy();
      this.Aat = undefined;
    }
    if (this.xat) {
      this.xat.Destroy();
      this.xat = undefined;
    }
    super.Reset();
  }
  OnTick(t) {
    var i;
    if (this.vat > 0) {
      if ((i = this.hhf - Time_1.Time.PlayerWorldTime) <= 0) {
        this.vat = 0;
        this.nht();
      } else {
        if (Math.abs(this.Sat - i) > BattleUiDefine_1.CHANGE_COOLDOWN_INTERVAL) {
          this.Sat -= REFRESH_COOLDOWN_INTERVAL;
          this.sht();
        }
        this.aht(i);
      }
    }
  }
  zPl() {
    let t = undefined;
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(this.PlayerId);
    return (t = i ? i.GetGroup(1)?.GetCurrentRole()?.RoleId : ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(this.PlayerId)?.CurRoleId) === this.RoleConfigId;
  }
  JPl() {
    this.hht(false, true);
  }
  kat() {
    if (this.RoleData) {
      let t = false;
      var i;
      if (this.Dat && (i = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.EntityHandle) && this.RoleData.EntityHandle !== i) {
        t = this.RoleData.RoleQteComponent?.IsQteReady(i) ?? false;
      }
      this.hht(t, false);
    } else {
      this.JPl();
    }
  }
  Hat() {
    if (!this.RoleData || this.IsMyRole) {
      this.JPl();
    } else {
      let t = false;
      var i = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.EntityHandle;
      var e = this.RoleData.EntityHandle;
      if (i && e?.IsInit) {
        t = i.Entity.GetComponent(104).IsQteReady(e);
      }
      this.hht(t, false);
    }
  }
  hht(t, i) {
    var e;
    if (this.Bat !== t) {
      this.Bat = t;
      (e = this.GetUiNiagara(5)).SetUIActive(t);
      if (t) {
        e.ActivateSystem(true);
        if (!i) {
          t = this.wat ? 1 : 0;
          i = Info_1.Info.IsInGamepad() ? 8 : 7;
          ModelManager_1.ModelManager.BattleUiModel.AudioData.PlayAudio(t, i);
        }
      } else {
        e.Deactivate();
      }
    }
    this._ht();
  }
  tht() {
    var t = this.RoleData?.EntityHandle?.Entity?.GetComponent(99);
    if (!!t && !((t = t.GetChangeRoleCoolDown()) <= 0)) {
      this.Gat(t, t);
    }
  }
  uht(t) {
    if (this.bat !== t) {
      if (this.bat = t) {
        this.Gnt(19);
        this.bnt(18);
      } else {
        this.Gnt(18);
        this.bnt(19);
      }
    }
  }
  nht() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 17, "重置换人冷却表现");
    }
    this.rht(false);
  }
  LevelUp(t) {
    t = t.toString();
    if (this.Aat) {
      this.Aat.SetActive(true);
    } else {
      this.Aat = new FormationLevelUpItem_1.FormationLevelUpItem(this.RootItem);
    }
    this.Aat.SetLevelText(t);
    TimerSystem_1.TimerSystem.Delay(() => {
      if (this.Aat) {
        this.Aat.SetActive(false);
      }
    }, LEVE_UP_TIME);
  }
  RefreshConcertoResponseModule(t) {
    this.Dat = t;
    this.RefreshElementVisible();
  }
  CureRole() {
    if (!this.zPl() && !(this.RoleData?.BaseDeathComponent?.IsDead() ?? true)) {
      this.GetItem(4).SetUIActive(true);
      this.yat = TimerSystem_1.TimerSystem.Delay(() => {
        this.GetItem(4).SetUIActive(false);
      }, CURE_DELAY);
    }
  }
  dht(t, i) {
    const e = this.GetTexture(9);
    if (e) {
      const s = this.GetTexture(2);
      if (s) {
        this.SetRoleIcon(t, e, i, undefined, () => {
          e.SetUIActive(true);
        });
        s.SetUIActive(false);
        this.SetRoleIcon(t, s, i, undefined, () => {
          s.SetUIActive(true);
        });
      }
    }
  }
  pkl(t, i) {
    const e = this.GetTexture(9);
    if (e) {
      const s = this.GetTexture(2);
      if (s) {
        this.SetRoleSkinIcon(t, e, i, undefined, () => {
          e.SetUIActive(true);
        });
        s.SetUIActive(false);
        this.SetRoleSkinIcon(t, s, i, undefined, () => {
          s.SetUIActive(true);
        });
      }
    }
  }
  Cht(t) {
    let i = undefined;
    if (t <= LOW_HP_PERCENT) {
      i = this.GetSprite(13);
      this.GetSprite(12).SetUIActive(false);
      this.GetSprite(13).SetUIActive(true);
    } else {
      i = this.GetSprite(12);
      this.GetSprite(12).SetUIActive(true);
      this.GetSprite(13).SetUIActive(false);
    }
    if (i) {
      i.SetFillAmount(t);
    }
  }
  RefreshRoleName() {
    var i = this.RoleConfigId;
    if (i <= RoleDefine_1.ROBOT_DATA_MIN_ID) {
      this.Pat?.SetActive(false);
    } else {
      var e = ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(i);
      if (e?.HideTrialLabel) {
        this.Pat?.SetActive(false);
      } else {
        this.Pat?.SetActive(true);
        let t = "";
        t = this.IsMyRole ? RoleUtils_1.RoleUtils.IsSpecialTrialRole(i) ? "" : ModelManager_1.ModelManager.RoleModel.GetRoleName(i) : ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(this.PlayerId)?.Name ?? "";
        this.Pat?.SetNameText(t);
        i = e?.Type ?? 1;
        e = RoleUtils_1.RoleUtils.GetTrialRoleLabelIconByType(i);
        this.Pat?.SetTrialIcon(e);
      }
    }
  }
  SetRoleSelected(i) {
    if (Info_1.Info.OperationType === 2) {
      let t = false;
      if (ModelManager_1.ModelManager.SceneTeamModel.GetTeamLength() > 1) {
        t = i;
      }
      this.uht(t);
    } else {
      this.uht(i);
    }
    this.Oat();
  }
  RefreshCoolDownOnShow() {
    if (this.RoleData) {
      this.tht();
      this.Wat();
    }
  }
  Gat(t, i) {
    if (t <= 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Formation", 17, "播放换人冷却CD时，CD时间小于0，不会播放换人冷却CD表现", ["coolDownTime", t]);
      }
      this.nht();
    } else {
      this.hhf = Time_1.Time.PlayerWorldTime + i;
      this.vat = t;
      this.Sat = i;
      this.sht();
      this.aht(i);
      this.rht(true);
    }
  }
  aht(t) {
    if (!this.Znh && !(t <= 0)) {
      t = t / this.vat;
      this.GetTexture(2).SetFillAmount(t);
    }
  }
  sht() {
    if (!this.Znh) {
      this.GetText(3)?.SetText((this.Sat * TimeUtil_1.TimeUtil.Millisecond).toFixed(1));
    }
  }
  rht(t) {
    if (!this.Znh) {
      this.GetItem(1)?.SetUIActive(t);
    }
  }
  RefreshCoolDownExternal(t, i) {
    var e = this.GetItem(1);
    if (t === undefined || i === undefined) {
      if (this.Znh) {
        this.Znh = false;
        e?.SetUIActive(false);
      }
    } else {
      this.Znh = true;
      e?.SetUIActive(true);
      this.GetText(3)?.SetText(t.toFixed(1));
      e = t / i;
      this.GetTexture(2).SetFillAmount(e);
    }
  }
  Jat() {
    if (this.RoleSkinConfig) {
      const t = this.RoleSkinConfig.RoleHeadIconBig;
      if (t && t.length > 0) {
        this.pkl(t, this.RoleSkinConfig.Id);
        return;
      }
    }
    if (this.RoleConfig) {
      const t = this.RoleConfig.RoleHeadIconBig;
      if (t && t.length !== 0) {
        this.dht(t, this.RoleConfig.Id);
      }
    }
  }
  RefreshSelectedRole() {
    var t;
    if (this.RoleData?.AttributeComponent) {
      if (!this.IsMyRole || (this.eht(), this.RoleData.AttributeComponent.GetCurrentValue(EAttributeId.Proto_Life) <= 0)) {
        this.SetRoleSelected(false);
      } else {
        t = this.zPl();
        this.SetRoleSelected(t);
        this.RefreshElementVisible();
      }
    }
  }
  ActivateConcertoChangeEffect(t, i) {
    this.GetText(8).SetUIActive(false);
    this.GetUiNiagara(7).ActivateSystem(true);
    var e = this.GetItem(6);
    if (!e.IsUIActiveSelf()) {
      e.SetUIActive(true);
    }
    this.Rat = TimerSystem_1.TimerSystem.Delay(this.$at, this.Uat);
  }
  Yat() {
    var t = this.GetItem(6);
    if (t.IsUIActiveSelf()) {
      t.SetUIActive(false);
    }
    this.GetUiNiagara(7).DeactivateSystem();
    if (this.Rat && TimerSystem_1.TimerSystem.Has(this.Rat)) {
      TimerSystem_1.TimerSystem.Remove(this.Rat);
      this.Rat = undefined;
    }
  }
  iht() {
    this.GetItem(10).SetUIActive(!this.wat);
    this.Wat();
  }
  Wat() {
    var t;
    var i;
    if (this.wat) {
      if (!(this.RoleData?.GameplayTagComponent.HasTag(1414093614) ?? false) || (t = (i = this.RoleData?.BuffComponent.GetBuffById(CharacterBuffIds_1.buffId.QteAssistCd))?.GetRemainDuration() ?? 0, i = i?.Duration ?? 0, t <= 0) || i <= 0) {
        this.nht();
      } else {
        this.Gat(i * TimeUtil_1.TimeUtil.InverseMillisecond, t * TimeUtil_1.TimeUtil.InverseMillisecond);
      }
    }
  }
  GetExtraContainer() {
    return this.GetItem(23);
  }
  RefreshRoleHealthPercent() {
    var t;
    var i;
    var e;
    var s;
    var h = this.GetExtendToggle(0);
    if (h) {
      t = this.RoleData?.AttributeComponent?.GetCurrentValue(EAttributeId.Proto_Life) ?? 1;
      i = this.RoleData?.AttributeComponent?.GetCurrentValue(EAttributeId.l5n) ?? 1;
      e = this.RoleData?.ShieldComponent.ShieldTotal ?? 0;
      if (t <= 0 || i <= 0) {
        h.SetToggleState(2, false);
        this.GetTexture(9).SetIsGray(true);
        this.GetTexture(2)?.SetIsGray(true);
        this.GetSprite(11).SetUIActive(false);
        this.Cht(0);
      } else {
        if (e > 0) {
          (s = this.GetSprite(11)).SetUIActive(true);
          s.SetFillAmount(e / i);
        } else {
          this.GetSprite(11).SetUIActive(false);
        }
        h.SetToggleState(0, false);
        this.GetTexture(9).SetIsGray(false);
        this.GetTexture(2)?.SetIsGray(false);
        this.Cht(t / i);
        this.RefreshSelectedRole();
      }
    }
  }
  Oat() {
    var t;
    if (Info_1.Info.OperationType === 2) {
      if (this.IsMyRole && this.zPl()) {
        this.GetSprite(17).SetUIActive(false);
      } else {
        t = this.ght();
        this.GetSprite(17).SetUIActive(t);
      }
    } else {
      t = this.ght();
      this.GetSprite(17).SetUIActive(t);
    }
  }
  Zat() {
    var t = this.RoleData?.ElementConfig;
    if (t && this.Lat !== t.UltimateSkillColor) {
      this.Lat = t.UltimateSkillColor;
      this.GetSprite(17).SetColor(this.RoleData.UltimateSkillColor);
    }
  }
  eht() {
    var t;
    if (Info_1.Info.OperationType === 2) {
      if (this.IsMyRole && this.zPl() || (t = ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetRolePosition(this.PlayerId, this.RoleConfigId) ?? 0) <= 0 || (this.Qtt.RefreshAction("切换角色" + t), (t = this.Qtt.GetKeyName()) && this.JAf?.includes(t))) {
        this.Qtt.SetActive(false);
      } else {
        this.Qtt.SetActive(true);
      }
    }
  }
  _ht() {
    if (this.Qtt) {
      let t = false;
      if (!this.IsMyRole) {
        t = !this.Bat;
      }
      this.Qtt.SetGray(t);
    }
  }
  ght() {
    return this.RoleData?.CanUseUltraSkill() ?? false;
  }
  zat() {
    if (this.RoleData) {
      if (this.Iat !== this.RoleData.ElementType) {
        this.Iat = this.RoleData.ElementType;
        this.Tat = this.RoleData.ElementConfig;
        this.Jst(this.Tat, this.Iat);
      }
      this.yTa();
      this.RefreshElementVisible();
    } else {
      this.GetItem(14).SetUIActive(false);
    }
  }
  RefreshElementVisible() {
    if (this.RoleData) {
      var t = this.GetItem(14);
      if (this.Dat) {
        if (this.RoleConfig?.RoleType === 2) {
          t.SetUIActive(false);
          this.JPl();
        } else {
          var i = Info_1.Info.OperationType;
          if (i === 2 && this.IsMyRole && this.zPl()) {
            t.SetUIActive(false);
          } else {
            for (const e of BattleUiRoleData_1.BattleUiRoleData.HideElementTagList) {
              if (this.RoleData.GameplayTagComponent?.HasTag(e)) {
                t.SetUIActive(false);
                return;
              }
            }
            t.SetUIActive(true);
          }
        }
      } else {
        t.SetUIActive(false);
      }
    }
  }
  Jst(t, i) {
    var t = t.Icon5;
    var e = this.GetSprite(16);
    var s = this.GetTexture(15);
    this.SetElementIcon(t, s, i);
    s.SetColor(this.RoleData.ElementColor);
    e.SetColor(this.RoleData.ElementColor);
  }
  yTa() {
    var t = this.GetSprite(16);
    var i = this.RoleData?.GetElementAttributePercent() ?? 0;
    t.SetFillAmount(i);
  }
  RefreshOnlineItem() {
    var t;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      this.xat ||= new FormationOnlineItem_1.FormationOnlineItem(this.RootItem);
      if (t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(this.PlayerId)) {
        this.RefreshPlayerPingState(t.PingState);
      }
      if (this.IsMyRole) {
        this.xat.SetOnlineNumber(-1);
        this.xat.SetNameText("");
        this.xat.RefreshPlayStationItem(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId() ?? "");
      } else {
        this.xat.SetOnlineNumber(t?.PlayerNumber ?? -1);
        this.xat.SetNameText(t?.GetFormationName() ?? "");
        this.xat.RefreshPlayStationItem(t?.PlayerDetails.ywa ?? "");
        this.xat.SetIsGrayByOtherControl(!this.zPl());
      }
    } else {
      this.xat?.Destroy();
      this.xat = undefined;
    }
  }
  RefreshPlayerPingState(t) {
    if (this.xat) {
      if (t === Protocol_1.Aki.Protocol.r7s.Proto_POOR) {
        this.xat.SetNetWeak(true);
        this.xat.SetNetDisconnect(false);
      } else if (t === Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN) {
        this.xat.SetNetDisconnect(true);
        this.xat.SetNetWeak(false);
      } else {
        this.xat.SetNetWeak(false);
        this.xat.SetNetDisconnect(false);
      }
    }
  }
  Est(t) {
    var i = [];
    var e = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var s = e.Num();
    for (let t = 0; t < s; t++) {
      i.push(e.Get(t));
    }
    this.Hnt ||= new Map();
    this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt?.get(t);
    if (t) {
      for (const i of t) {
        i.Play();
      }
    }
  }
  Gnt(t) {
    t = this.Hnt?.get(t);
    if (t) {
      for (const i of t) {
        i.Stop();
      }
    }
  }
  RefreshLinkEffect() {
    var t;
    if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()) {
      t = ModelManager_1.ModelManager.BattleLinkModel.GetLinkStatus();
      this.Eoh(t);
    } else {
      this.Eoh(0);
    }
  }
  RefreshLinkActive(t, i = false) {
    var e;
    var s;
    if (this.yoh !== t || !this.rxl) {
      this.yoh = t;
      this.rxl = true;
      if (e = this.GetItem(20)) {
        e.SetUIActive(t);
      }
      e = this.GetUiNiagara(21);
      s = this.GetUiNiagara(22);
      i = i && t;
      t = t && !i;
      if (e) {
        if (t) {
          e.ActivateSystem(true);
        } else {
          e.Deactivate();
        }
        e.SetUIActive(t);
      }
      if (s) {
        if (i) {
          s.ActivateSystem(true);
        } else {
          s.Deactivate();
        }
        s.SetUIActive(i);
      }
    }
  }
  SetInvisibleByKeyList(t) {
    this.JAf = t;
    this.eht();
  }
}
exports.FormationItem = FormationItem;
//# sourceMappingURL=FormationItem.js.map
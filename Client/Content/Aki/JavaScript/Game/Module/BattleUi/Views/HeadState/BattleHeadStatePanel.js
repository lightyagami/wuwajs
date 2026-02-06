"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleHeadStatePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const ObjectSystem_1 = require("../../../../../Core/Object/ObjectSystem");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const ChargingDeviceHeadState_1 = require("./ChargingDeviceHeadState");
const CommonHeadState_1 = require("./CommonHeadState");
const DurabilityDamageHeadState_1 = require("./DurabilityDamageHeadState");
const DurabilityHeadState_1 = require("./DurabilityHeadState");
const EliteMonsterHeadStateView_1 = require("./EliteMonsterHeadStateView");
const GuardianHeadState_1 = require("./GuardianHeadState");
const HeadStateData_1 = require("./HeadStateData");
const MingSuTiHeadState_1 = require("./MingSuTiHeadState");
const MonsterNpcAttackHeadState_1 = require("./MonsterNpcAttackHeadState");
const MonsterNpcAttackHeadStateData_1 = require("./MonsterNpcAttackHeadStateData");
const ProgressControlHeadState_1 = require("./ProgressControlHeadState");
const headStateViewMap = new Map([[1, CommonHeadState_1.CommonHeadState], [2, EliteMonsterHeadStateView_1.EliteMonsterHeadStateView], [4, MingSuTiHeadState_1.MingSuTiHeadState], [5, GuardianHeadState_1.GuardianHeadState], [6, DurabilityHeadState_1.DurabilityHeadState], [7, DurabilityDamageHeadState_1.DurabilityDamageHeadState], [8, DurabilityDamageHeadState_1.DurabilityDamageHeadState], [9, ProgressControlHeadState_1.ProgressControlHeadState], [10, ChargingDeviceHeadState_1.ChargingDeviceHeadState], [11, MonsterNpcAttackHeadState_1.MonsterNpcAttackHeadState]]);
const specialHeadStateDataMap = new Map([[11, MonsterNpcAttackHeadStateData_1.MonsterNpcAttackHeadStateData]]);
class BattleHeadStatePanel {
  constructor() {
    this.olt = new Map();
    this.EO1 = new Map();
    this.rlt = new Map();
    this.nlt = 0;
    this.slt = 0;
    this.hlt = 0;
    this.llt = 0;
    this._lt = 0;
    this.ult = undefined;
    this.clt = undefined;
    this.mlt = 0;
    this.dlt = 0;
    this.flt = t => {
      if (this.plt(t.Id) === 8 && this.vlt(t)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 17, "[HeadState]当任何使用多阶段打击机关耐久度（不可完全破坏）的可破坏物受击时，添加显示血条的实体", ["EntityId", t.Id]);
        }
        this.Mlt(t);
      }
    };
    this.Elt = (t, e, a) => {
      if (e !== a) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 17, "[HeadState]当任何可破坏物受击时", ["EntityId", t.Id], ["newDurability", e], ["currentDurability", a]);
        }
        if (e <= 0) {
          var i = this.glt(t.Id);
          if (i) {
            switch (i.HeadStateType) {
              case 7:
              case 8:
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Battle", 17, "[HeadState]可破坏物耐久度<=0时，不自动删除可破坏物血条", ["EntityId", t.Id], ["newDurability", e], ["currentDurability", a]);
                }
                break;
              default:
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Battle", 17, "[HeadState]可破坏物耐久度<=0时，删除可破坏物血条", ["EntityId", t.Id], ["newDurability", e], ["currentDurability", a]);
                }
                this.Slt(t.Entity, true);
            }
          } else if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Battle", 17, "[HeadState]可破坏物耐久度<=0时，找不到对应的可破坏物血条", ["EntityId", t.Id], ["newDurability", e], ["currentDurability", a]);
          }
        } else if (this.vlt(t.Entity)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Battle", 17, "[HeadState]当任何可破坏物耐久改变时，添加显示血条的实体", ["EntityId", t.Id], ["newDurability", e], ["currentDurability", a]);
          }
          this.Mlt(t.Entity, a);
        }
      }
    };
    this.ylt = (t, e, a) => {
      var i = t.GetComponent(0)?.GetPbDataId();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 39, "[HeadState] 当任何进度控制机关启用状态改变时", ["EntityId", t.Id], ["PbDataId", i], ["IsEnable", e], ["ProgressData", a]);
      }
      if (!e) {
        if (this.olt.get(t.Id)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Battle", 39, "[HeadState] 进度控制机关停用时，删除进度条", ["EntityId", t.Id], ["PbDataId", i], ["ProgressData", a]);
          }
          this.Slt(t, true);
          return;
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Battle", 39, "[HeadState] 进度控制机关停用时，找不到对应的进度条", ["EntityId", t.Id], ["PbDataId", i], ["ProgressData", a]);
          }
          return;
        }
      }
      if (this.vlt(t)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 39, "[HeadState] 进度控制机关启用时，尝试添加进度条", ["EntityId", t.Id], ["PbDataId", i], ["ProgressData", a]);
        }
        switch (a.ProgressCtrlType) {
          case "CaptureStrategicPoint":
          case "CaptureStrategicPoint2":
          case "ChargingDevice":
            this.Mlt(t, a.CurrentValue / a.MaxValue, false);
            break;
          default:
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Battle", 39, "[HeadState] 进度控制机关启用时，尚未支持所用的进度数据类型", ["EntityId", t.Id], ["PbDataId", i], ["ProgressData", a]);
            }
        }
      }
    };
    this.hMe = () => {
      this.ClearAllHeadState();
    };
    this.Ilt = () => {
      this.ClearAllHeadState();
    };
    this.OnAddOrRemoveBuff = (t, e, a, i) => {
      var s = this.glt(t);
      if (s) {
        s.AddOrRemoveBuff(t, e, a, i);
      }
    };
    this.OnRoleLevelChange = (t, e, a) => {
      for (const i of this.rlt.values()) {
        i.RoleLevelChange(t, e, a);
      }
    };
    this.OnChangeTeam = () => {
      for (const t of this.rlt.values()) {
        t.ChangeTeam();
      }
    };
    this.OnEntityCampModify = (t, e, a) => {
      t = this.olt.get(t.Id);
      if (t) {
        t.ModifyEntityCamp(a);
      }
    };
    this.Tlt = t => {
      this.Slt(t);
    };
    this.T9c = (t, e) => {
      e = this.EO1.get(e);
      if (e) {
        e.push(t);
      } else {
        t.DestroyHeadStateView();
      }
    };
    this.slt = CommonParamById_1.configCommonParamById.GetIntConfig("ComStateShowMaxDistance");
    this.hlt = CommonParamById_1.configCommonParamById.GetIntConfig("ComStateShowDistance");
    this.llt = CommonParamById_1.configCommonParamById.GetIntConfig("GameplayStateShowMaxDistance");
    this._lt = CommonParamById_1.configCommonParamById.GetIntConfig("GameplayStateShowDistance");
    this.mlt = CommonParamById_1.configCommonParamById.GetIntConfig("TempHeadStateHideTime");
    this.dlt = CommonParamById_1.configCommonParamById.GetIntConfig("Detail_Head_State_Range");
  }
  async Preload() {
    await Promise.all([this.IO1(1, 6), this.IO1(2, 4)]);
  }
  Init() {
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("HeadStateScaleCurvePath");
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("DurabilityHeadStateScaleCurvePath");
    this.clt = ResourceSystem_1.ResourceSystem.Load(e, UE.CurveFloat);
    this.ult = ResourceSystem_1.ResourceSystem.Load(t, UE.CurveFloat);
    this.RefreshCurrentRole();
    this.InitializeEntityList();
    this.Ore();
  }
  async IO1(e, a) {
    if (!this.EO1.has(e)) {
      var i = headStateViewMap.get(e);
      if (i) {
        var s = [];
        this.EO1.set(e, s);
        var r = [];
        for (let t = 0; t < a; t++) {
          var n = new i();
          r.push(n.CreateHeadStateViewAsync(UiLayer_1.UiLayer.WorldSpaceUiRootItem, e, this.dlt, this.slt, this.hlt));
          s.push(n);
        }
        await Promise.all(r);
      }
    }
  }
  InitializeEntityList() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t) {
      for (const e of t) {
        if (e.IsInit && this.Llt(e.Entity)) {
          this.Dlt(e.Entity);
        }
      }
      this.RefreshAllHeadState(0);
    }
  }
  ResetAllHeadStates() {
    this.kre();
    this.ClearAllHeadState();
    this.Rlt();
    this.ult = undefined;
    this.clt = undefined;
  }
  ClearAllHeadState() {
    for (const t of this.rlt.values()) {
      t.DestroyHeadStateView();
    }
    this.rlt.clear();
    for (const e of this.EO1.values()) {
      for (const a of e) {
        a.DestroyHeadStateView();
      }
    }
    this.EO1.clear();
  }
  Rlt() {
    for (const t of this.olt.values()) {
      t.Clear();
    }
    this.olt.clear();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAnySceneItemEntityHit, this.flt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAnySceneItemDurabilityChange, this.Elt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange, this.ylt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartLoadingState, this.hMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddUITexture, this.OnAddOrRemoveBuff);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleLevelUp, this.OnRoleLevelChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.OnChangeTeam);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EntityCampModify, this.OnEntityCampModify);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAnySceneItemEntityHit, this.flt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAnySceneItemDurabilityChange, this.Elt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange, this.ylt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartLoadingState, this.hMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddUITexture, this.OnAddOrRemoveBuff);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleLevelUp, this.OnRoleLevelChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.OnChangeTeam);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EntityCampModify, this.OnEntityCampModify);
  }
  Tick(t) {
    BattleHeadStatePanel.Ult.Start();
    this.RefreshAllHeadState(t);
    BattleHeadStatePanel.Ult.Stop();
  }
  RefreshAllHeadState(t) {
    for (const i of this.olt.values()) {
      var e;
      var a = i.GetEntityId();
      if (this.Alt(i)) {
        if (e = this.glt(a)) {
          this.Plt(e, i.DistanceSquared, t);
        } else {
          BattleHeadStatePanel.xlt.Start();
          this.wlt(i);
          BattleHeadStatePanel.xlt.Stop();
        }
      } else {
        this.Blt(a);
      }
    }
  }
  Alt(t) {
    if (t.IsEntityActive() && !t.HasDeadTag && !t.HasHideTag) {
      t.RefreshDistance();
      var e = t.DistanceSquared;
      var a = t.GetHeadStateType();
      if (a === 1 || a === 2) {
        if (e <= this.hlt) {
          return false;
        }
        if (t.HasFightTag) {
          return true;
        }
        if (e <= this.slt) {
          return true;
        }
      } else {
        if (e <= this._lt) {
          return false;
        }
        if (e <= this.llt) {
          return true;
        }
      }
    }
    return false;
  }
  Plt(t, e, a) {
    BattleHeadStatePanel.blt.Start();
    let i = -1;
    if (t.HeadStateType === 1 || t.HeadStateType === 2) {
      if (this.ult) {
        i = this.ult.GetFloatValue(e);
      }
    } else if (this.clt) {
      i = this.clt.GetFloatValue(e);
    }
    if (!(i < 0)) {
      t.OnRefresh(e, i, a);
    }
    BattleHeadStatePanel.blt.Stop();
  }
  RefreshCurrentRole() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    this.nlt = t?.Id ?? 0;
  }
  OnCreateEntity(t) {
    if (this.Llt(t)) {
      this.Dlt(t);
    }
  }
  OnRemoveEntity(t) {
    if (this.Flh(t)) {
      TimerSystem_1.TimerSystem.Delay(() => {
        this.Slt(t);
      }, 500);
    } else if (this.Llt(t) || this.vlt(t)) {
      this.Slt(t);
    }
  }
  Dlt(t, e) {
    if (ObjectSystem_1.ObjectSystem.IsValid(t)) {
      var a = t.Id;
      var i = this.plt(a);
      if (i) {
        if (!this.olt.has(a)) {
          (i = new (specialHeadStateDataMap.get(i) ?? HeadStateData_1.HeadStateData)()).Initialize(t);
          i.SetOriginalHp(e ?? 0);
          this.olt.set(a, i);
          return i;
        }
      }
    }
  }
  Mlt(t, e, a = true) {
    var i;
    if (!a || !!this.mlt) {
      if (i = this.glt(t.Id)) {
        if (a) {
          i.ActivateHideTimeDown(this.mlt, this.Tlt);
        }
      } else if (i = this.Dlt(t, e)) {
        if (a) {
          if (t = this.wlt(i)) {
            t.ActivateHideTimeDown(this.mlt, this.Tlt);
          }
        } else {
          this.wlt(i);
        }
      }
    }
  }
  Slt(t, e = false) {
    this.qlt(t, e);
    e = t.Id;
    t = this.olt.get(e);
    if (t) {
      t.Clear();
      this.olt.delete(e);
    }
  }
  Glt(a) {
    var i = a.GetHeadStateType();
    var s = this.EO1.get(i);
    if (s) {
      const r = s.pop();
      if (r) {
        const n = a.GetEntityId();
        this.rlt.set(n, r);
        r.ShowHeadStateView(a);
        return r;
      }
    }
    s = headStateViewMap.get(i);
    if (s) {
      const n = a.GetEntityId();
      const r = new s();
      this.rlt.set(n, r);
      let t = undefined;
      let e = undefined;
      e = i === 1 || i === 2 ? (t = this.slt, this.hlt) : (t = this.llt, this._lt);
      r.CreateHeadStateView(UiLayer_1.UiLayer.WorldSpaceUiRootItem, i, this.dlt, t, e);
      r.ShowHeadStateView(a);
      return r;
    }
  }
  wlt(t) {
    var e = t.GetEntityId();
    if (e !== this.nlt && (t.IsNormalMonster() || t.IsSceneItem())) {
      return this.Glt(t);
    }
  }
  Blt(t, e = false) {
    BattleHeadStatePanel.Nlt.Start();
    var a = this.glt(t);
    if (a) {
      if (e && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 17, "[HeadState]休眠头顶状态条", ["EntityId", t]);
      }
      if (this.EO1.has(a.HeadStateType)) {
        a.RecycleHeadStateView(this.T9c);
      } else {
        a.DestroyHeadStateView();
      }
      this.rlt.delete(t);
    } else if (e && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 17, "[HeadState]休眠头顶状态条时，找不到对应的状态条", ["EntityId", t]);
    }
    BattleHeadStatePanel.Nlt.Stop();
  }
  qlt(t, e = false) {
    var a;
    if (t?.Valid) {
      a = t.Id;
      this.Blt(a, e);
    } else if (e && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 17, "[HeadState]休眠头顶状态条时，实体不可用", ["EntityId", t.Id]);
    }
  }
  Llt(t) {
    t = t.GetComponent(3);
    return !!t?.Valid && t.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster && !t.IsBoss;
  }
  vlt(t) {
    t = t.GetComponent(1);
    return !!t?.Valid && t.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
  }
  Flh(t) {
    return !!this.vlt(t) && !!(t = t.GetComponent(140))?.Valid && !!(t = t.GetProgressData()) && t.ProgressCtrlType === "ChargingDevice";
  }
  plt(t) {
    t = EntitySystem_1.EntitySystem.Get(t).GetComponent(0);
    if (t?.Valid) {
      return t.GetBaseInfo()?.HeadStateViewConfig?.HeadStateViewType ?? 0;
    }
  }
  glt(t) {
    return this.rlt.get(t);
  }
}
(exports.BattleHeadStatePanel = BattleHeadStatePanel).Ult = Stats_1.Stat.Create("[BattleView]BattleHeadStatePanelTick");
BattleHeadStatePanel.Nlt = Stats_1.Stat.Create("[BattleView]DeactivateHeadState");
BattleHeadStatePanel.xlt = Stats_1.Stat.Create("[BattleView]ActivateHeadState");
BattleHeadStatePanel.blt = Stats_1.Stat.Create("[BattleView]RefreshHeadState"); //# sourceMappingURL=BattleHeadStatePanel.js.map
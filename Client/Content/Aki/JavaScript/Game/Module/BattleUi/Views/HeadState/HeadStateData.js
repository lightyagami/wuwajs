"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStateData = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const CameraController_1 = require("../../../../Camera/CameraController");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const SOCKET_NAME = new UE.FName("MarkCase");
const UPDATE_TOLERATION = 0.1;
class HeadStateData {
  constructor() {
    this.CommonParam = undefined;
    this.Entity = undefined;
    this.E0 = 0;
    this.OC = undefined;
    this.h1t = undefined;
    this.ActorComponent = undefined;
    this.Xte = undefined;
    this.$te = undefined;
    this.l1t = undefined;
    this._1t = undefined;
    this.CreatureDataComponent = undefined;
    this.c1t = undefined;
    this.m1t = undefined;
    this.d1t = undefined;
    this.C1t = false;
    this.tfe = undefined;
    this.g1t = undefined;
    this.f1t = 0;
    this.p1t = 0;
    this.v1t = undefined;
    this.M1t = undefined;
    this.E1t = undefined;
    this.Lz = Vector_1.Vector.Create();
    this.S1t = Vector_1.Vector.Create();
    this._ka = Vector_1.Vector.Create();
    this.uka = Vector_1.Vector.Create();
    this.y1t = Vector_1.Vector.Create();
    this.I1t = undefined;
    this.T1t = undefined;
    this.L1t = undefined;
    this.D1t = undefined;
    this.R1t = undefined;
    this.U1t = undefined;
    this.A1t = undefined;
    this.P1t = undefined;
    this.x1t = undefined;
    this.w1t = undefined;
    this.txl = undefined;
    this.bk_ = undefined;
    this.B1t = undefined;
    this.b1t = undefined;
    this.q1t = undefined;
    this.G1t = undefined;
    this.N1t = undefined;
    this.O1t = undefined;
    this.HasHideTag = false;
    this.HasDeadTag = false;
    this.HasFightTag = false;
    this.HasFallDownTag = false;
    this.Camp = 1;
    this.k1t = "";
    this.DistanceSquared = 0;
    this.OriginalHp = 0;
    this.u$e = t => {
      if (this.I1t) {
        this.I1t(t);
      }
    };
    this.zrt = (t, i) => {
      this.HasFallDownTag = i;
      if (this.T1t) {
        this.T1t();
      }
    };
    this.F1t = (t, i) => {
      if (this.L1t) {
        this.L1t(t, i);
      }
    };
    this.Qlt = t => {
      if (this.D1t) {
        this.D1t(t);
      }
    };
    this.V1t = (t, i) => {
      if (this.R1t) {
        this.R1t(i);
      }
    };
    this.Yrt = (t, i) => {
      if (this.U1t) {
        this.U1t(i);
      }
    };
    this.Zrt = (t, i) => {
      if (this.A1t) {
        this.A1t(i);
      }
    };
    this.ent = (t, i) => {
      if (this.P1t) {
        this.P1t(i);
      }
    };
    this.Yst = (t, i) => {
      this.HasHideTag = i;
    };
    this.n$e = (t, i) => {
      this.HasDeadTag = i;
    };
    this.aXe = (t, i) => {
      this.HasFightTag = i;
    };
    this.tnt = (t, i, s) => {
      if (this.x1t) {
        this.x1t(t, i, s);
      }
    };
    this.m2 = (t, i, s) => {
      if (this.w1t) {
        this.w1t(t, i, s);
      }
    };
    this.Nbr = (t, i, s) => {
      if (this.txl) {
        this.txl(t, i, s);
      }
    };
    this.Ylt = () => {
      if (this.B1t) {
        this.B1t();
      }
    };
    this.H1t = t => {
      if (this.b1t) {
        this.b1t(t);
      }
    };
  }
  Initialize(t) {
    this.CommonParam = ModelManager_1.ModelManager.BattleUiModel.HeadStateCommonParam;
    this.Entity = t;
    this.E0 = t.Id;
    this.OC = t.GetComponent(1)?.Owner;
    this.ActorComponent = t.GetComponent(1);
    this.$te = t.GetComponent(177);
    this.Xte = t.GetComponent(209);
    this.l1t = t.GetComponent(75);
    this._1t = t.GetComponent(152);
    this.CreatureDataComponent = t.GetComponent(0);
    this.c1t = this.Entity.GetComponent(21);
    this.m1t = this.Entity.GetComponent(178);
    this.d1t = this.Entity.GetComponent(133);
    var t = this.CreatureDataComponent.GetBaseInfo();
    this.h1t = t?.HeadStateViewConfig;
    this.C1t = false;
    if (this.OC instanceof TsBaseCharacter_1.default) {
      this.tfe = this.OC.Mesh;
      t = this.h1t?.HeadStateSocketName;
      t = FNameUtil_1.FNameUtil.GetDynamicFName(t);
      this.g1t = t || SOCKET_NAME;
      this.C1t = this.tfe.DoesSocketExist(this.g1t);
    }
    this.f1t = this.h1t?.ZOffset ?? 0;
    this.p1t = this.h1t?.ForwardOffset ?? 0;
    this.Camp = this.CreatureDataComponent.GetEntityCamp();
    this.Hlt();
    this.HasHideTag = this.Xte?.HasTag(-13489149) ?? false;
    this.HasFallDownTag = this.Xte?.HasTag(1922078392) ?? false;
    this.AddEntityEvents();
  }
  Hlt() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetHeadStateHpColor(this.Camp);
    if (t) {
      this.k1t = t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "[headState]该怪物阵营没有配置血条颜色", ["EntityId", this.E0], ["PbDataId", this.CreatureDataComponent?.GetPbDataId()], ["Camp", this.Camp], ["HpColor", this.k1t]);
      }
      this.k1t = ModelManager_1.ModelManager.BattleUiModel.GetHeadStateHpColor(1);
    }
  }
  Clear() {
    this.RemoveEntityEvents();
    this.UnBindAllCallback();
    this.Entity = undefined;
    this.OC = undefined;
    this.ActorComponent = undefined;
    this.$te = undefined;
    this.Xte = undefined;
    this.l1t = undefined;
    this._1t = undefined;
    this.CreatureDataComponent = undefined;
    this.h1t = undefined;
    this.HasHideTag = false;
    this.HasDeadTag = false;
    this.HasFightTag = false;
    this.HasFallDownTag = false;
  }
  UnBindAllCallback() {
    this.I1t = undefined;
    this.T1t = undefined;
    this.L1t = undefined;
    this.D1t = undefined;
    this.R1t = undefined;
    this.U1t = undefined;
    this.A1t = undefined;
    this.P1t = undefined;
    this.x1t = undefined;
    this.w1t = undefined;
    this.txl = undefined;
    this.B1t = undefined;
    this.b1t = undefined;
    this.bk_ = undefined;
  }
  AddEntityEvents() {
    var t;
    if (this.Entity && (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharShieldChange, this.u$e) || EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharShieldChange, this.u$e), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, this.F1t) || EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, this.F1t), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Qlt) || EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Qlt), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHit, this.Ylt) || EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHit, this.Ylt), (t = this.Entity.GetComponent(209))?.Valid && (this.v1t = t.ListenForTagAddOrRemove(242005298, this.V1t), this.v1t = t.ListenForTagAddOrRemove(1261361093, this.Yrt), this.M1t = t.ListenForTagAddOrRemove(-1109506297, this.Zrt), this.E1t = t.ListenForTagAddOrRemove(-1838149281, this.ent), this.q1t = t.ListenForTagAddOrRemove(-13489149, this.Yst), this.G1t = t.ListenForTagAddOrRemove(1008164187, this.n$e), this.N1t = t.ListenForTagAddOrRemove(1996802261, this.aXe), this.O1t = t.ListenForTagAddOrRemove(1922078392, this.zrt)), (t = this.Entity.GetComponent(177))?.Valid && (t.AddListener(EAttributeId.Proto_Hardness, this.tnt, "Hardness.HeadState"), t.AddListener(EAttributeId.Proto_Rage, this.tnt, "Range.HeadState"), t.AddListener(EAttributeId.Proto_RageMax, this.tnt, "RangeMax.HeadState"), t.AddListener(EAttributeId.Proto_Lv, this.m2, "Lv.HeadState"), t.AddListener(EAttributeId.Proto_Life, this.Nbr, "Life.HeadState"), t.AddListener(EAttributeId.l5n, this.Nbr, "LifeMax.HeadState")), (t = this.Entity.GetComponent(133))?.Valid)) {
      t.AddProgressDataChangedCallback(this.H1t);
    }
  }
  RemoveEntityEvents() {
    var t;
    if (this.Entity && (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharShieldChange, this.u$e) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharShieldChange, this.u$e), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, this.F1t) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, this.F1t), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Qlt) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Qlt), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHit, this.Ylt) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHit, this.Ylt), this.v1t && (this.v1t.EndTask(), this.v1t = undefined), this.E1t && (this.E1t.EndTask(), this.E1t = undefined), this.M1t && (this.M1t.EndTask(), this.M1t = undefined), this.q1t && (this.q1t.EndTask(), this.q1t = undefined), this.G1t && (this.G1t.EndTask(), this.G1t = undefined), this.N1t && (this.N1t.EndTask(), this.N1t = undefined), this.O1t && (this.O1t.EndTask(), this.O1t = undefined), (t = this.Entity?.GetComponent(177)) && (t.RemoveListener(EAttributeId.Proto_Hardness, this.tnt), t.RemoveListener(EAttributeId.Proto_Rage, this.tnt), t.RemoveListener(EAttributeId.Proto_RageMax, this.tnt), t.RemoveListener(EAttributeId.Proto_Lv, this.m2), t.RemoveListener(EAttributeId.Proto_Life, this.Nbr), t.RemoveListener(EAttributeId.l5n, this.Nbr)), t = this.Entity?.GetComponent(133))) {
      t.RemoveProgressDataChangedCallback(this.H1t);
    }
  }
  BindOnShieldChanged(t) {
    this.I1t = t;
  }
  BindOnFallDownVisibleChange(t) {
    this.T1t = t;
  }
  BindOnTimeScale(t) {
    this.L1t = t;
  }
  BindOnSceneItemDurabilityChange(t) {
    this.D1t = t;
  }
  BindOnHardnessHideChanged(t) {
    this.U1t = t;
  }
  BindOnVulnerabilityActivated(t) {
    this.R1t = t;
  }
  BindOnHardnessActivated(t) {
    this.A1t = t;
  }
  BindOnRageActivated(t) {
    this.P1t = t;
  }
  BindOnHardnessChanged(t) {
    this.x1t = t;
  }
  BindOnLevelChanged(t) {
    this.w1t = t;
  }
  BindOnLifeChanged(t) {
    this.txl = t;
  }
  BindOnCampChanged(t) {
    this.bk_ = t;
  }
  BindOnSceneItemEntityHit(t) {
    this.B1t = t;
  }
  BindOnProgressControlDataChange(t) {
    this.b1t = t;
  }
  ContainsTagById(t) {
    return !!this.Xte && this.Xte.HasTag(t);
  }
  GetAttributeCurrentValueById(t) {
    if (this.$te) {
      return this.$te.GetCurrentValue(t);
    } else {
      return 0;
    }
  }
  GetEntity() {
    return this.Entity;
  }
  GetEntityId() {
    return this.E0;
  }
  IsEntityActive() {
    return this.Entity.Active;
  }
  GetLevel() {
    if (this.$te) {
      return this.$te.GetCurrentValue(EAttributeId.Proto_Lv);
    } else {
      return 0;
    }
  }
  GetMaxHp() {
    if (this.$te) {
      return this.$te.GetCurrentValue(EAttributeId.l5n);
    } else {
      return 1;
    }
  }
  GetHp() {
    if (this.$te) {
      return this.$te.GetCurrentValue(EAttributeId.Proto_Life);
    } else {
      return 0;
    }
  }
  GetShield() {
    if (this.l1t) {
      return this.l1t.ShieldTotal;
    } else {
      return 0;
    }
  }
  GetHpAndMaxHp() {
    return [this.GetHp(), this.GetMaxHp()];
  }
  GetMaxDurable() {
    if (this._1t) {
      return this._1t.GetMaxDurablePoint();
    } else {
      return 1;
    }
  }
  GetDurable() {
    if (this.CreatureDataComponent) {
      return this.CreatureDataComponent.GetDurabilityValue();
    } else {
      return 0;
    }
  }
  GetHpAndShieldPercent() {
    var [t, i] = this.GetHpAndMaxHp();
    var s = this.GetShield();
    let h = s <= i ? s / i : 1;
    return [t / i, h];
  }
  GetWorldLocation() {
    var t;
    if (this.C1t) {
      this.uka.FromUeVector(this.tfe.D_GetSocketLocation(this.g1t));
    } else {
      t = this.ActorComponent.ActorLocationProxy;
      this.uka.FromUeVector(t);
    }
    if (this.CommonParam.DrawHeadStateSocket) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, this.S1t.ToUeVector(), 4, 8, ColorUtils_1.ColorUtils.LinearYellow, 0, 3);
    }
    if (!this.uka.Equals(this._ka, UPDATE_TOLERATION)) {
      this._ka.FromUeVector(this.uka);
      this.S1t.FromUeVector(this._ka);
      this.Lz.FromUeVector(this.ActorComponent.ActorGravityDirectProxy);
      this.Lz.MultiplyEqual(-this.f1t);
      this.S1t.AdditionEqual(this.Lz);
      if (this.p1t !== 0) {
        CameraController_1.CameraController.CameraLocation.Subtraction(this.S1t, this.y1t);
        this.y1t.Normalize();
        this.y1t.MultiplyEqual(this.p1t);
        this.S1t.Addition(this.y1t, this.S1t);
      }
    }
    return this.S1t;
  }
  RefreshDistance() {
    this.DistanceSquared = this.GetSquaredDistanceToMonster();
  }
  GetSquaredDistanceToMonster() {
    var t = CameraController_1.CameraController.CameraLocation;
    return Vector_1.Vector.DistSquared(t, this.ActorComponent.ActorLocationProxy);
  }
  IsNormalMonster() {
    return !!this.ActorComponent?.Valid && this.ActorComponent.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster && (!(0, RegisterComponent_1.isComponentInstance)(this.ActorComponent, 3) || !this.ActorComponent.IsBoss);
  }
  IsSceneItem() {
    return !!this.ActorComponent?.Valid && this.ActorComponent.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
  }
  GetHeadStateType() {
    if (this.CreatureDataComponent?.Valid) {
      return this.h1t?.HeadStateViewType ?? 0;
    }
  }
  GetAllCurrentCueRef() {
    if (this.c1t) {
      return this.c1t.GetAllCurrentCueRef();
    }
  }
  GetHardnessColor() {
    if (this.CreatureDataComponent) {
      var t = this.CreatureDataComponent.GetAttributeComponent();
      if (t) {
        t = t.PropertyId;
        t = ConfigManager_1.ConfigManager.BattleUiConfig.GetPropertyType(t);
        return ModelManager_1.ModelManager.BattleUiModel.GetPropertyColor(t);
      }
    }
  }
  GetHpColor() {
    return this.k1t;
  }
  GetBuff(t) {
    return this.m1t?.GetBuffByHandle(t);
  }
  GetProgressControlData() {
    return this.d1t?.GetProgressData();
  }
  SetOriginalHp(t) {
    this.OriginalHp = t;
  }
  ModifyEntityCamp(t) {
    if (this.Camp !== t) {
      this.Camp = t;
      this.Hlt();
      this.bk_?.();
    }
  }
  HasTag(t) {
    return this.Xte?.HasTag(t) ?? false;
  }
}
exports.HeadStateData = HeadStateData;
//# sourceMappingURL=HeadStateData.js.map
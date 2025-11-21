"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var n = arguments.length;
  var r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterBehaviorComponent = undefined;
const UE = require("ue");
const MonsterBattleConfById_1 = require("../../../../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const SkeletalMeshEffectContext_1 = require("../../../../../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const MONSTER_ENTER_WUYINQU_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Wuyinqu/DA_Fx_Wuyinqu_Ordinary_Origin.DA_Fx_Wuyinqu_Ordinary_Origin";
const ELITE_MONSTER_ENTER_WUYINQU_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Wuyinqu/DA_Fx_Wuyinqu_Elite_Origin.DA_Fx_Wuyinqu_Elite_Origin";
let MonsterBehaviorComponent = class MonsterBehaviorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Xte = undefined;
    this.N1t = undefined;
    this.S7a = undefined;
    this.Rne = 0;
    this.y7a = 0;
    this.tVr = undefined;
    this.Llt = true;
    this.K1_ = false;
    this.Kqr = (t, e) => {
      var i;
      if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Water && !this.Xte.HasTag(-1714966381)) {
        e = this.Hte.ActorLocationProxy;
        (i = Protocol_1.Aki.Protocol.Ve_.create()).l8n = e;
        CombatMessage_1.CombatNet.Send(27582, this.Entity, i);
      }
    };
    this.qtn = () => {
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.tVr.SetEnableMovementSync(false, "MonsterBehaviorComponent LeaveFight");
      }
    };
    this.Ntn = (t, e) => {
      if (!!e && !ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.tVr.SetEnableMovementSync(true, "MonsterBehaviorComponent InFight");
      }
    };
    this.E7a = (t, e) => {
      if (e) {
        var i;
        var s;
        var e = this.Entity?.GetComponent(3)?.SkeletalMesh;
        if (e) {
          (i = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(this.Entity.Id)).SkeletalMeshComp = e;
          s = this.Llt ? MONSTER_ENTER_WUYINQU_EFFCT : ELITE_MONSTER_ENTER_WUYINQU_EFFCT;
          this.y7a = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e.D_GetSocketTransform(new UE.FName("Root")), s, "MonsterBehaviorComponent.DisableTag exist", i);
        }
        this.Rne = this.Entity.Disable("MonsterBehaviorComponent.DisableTag exist");
      } else {
        if (this.y7a !== 0) {
          EffectSystem_1.EffectSystem.StopEffectById(this.y7a, "MonsterBehaviorComponent.DisableTag do not exist", false);
          this.y7a = 0;
        }
        this.Entity.Enable(this.Rne, "MonsterBehaviorComponent.DisableTag do not exist");
        if (!this.Llt) {
          const o = this.Hte?.Actor?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
          if (o) {
            o.SetVisibility(false);
            TimerSystem_1.TimerSystem.Delay(() => {
              o.SetVisibility(true);
            }, 100);
          }
        }
      }
    };
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(3);
    this.Xte = this.Entity.CheckGetComponent(209);
    this.tVr = this.Entity.CheckGetComponent(68);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.Kqr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.AiTaskWanderForResetEnd, this.qtn);
    this.N1t = this.Xte.ListenForTagAddOrRemove(1996802261, this.Ntn);
    this.S7a = this.Xte.ListenForTagAddOrRemove(1681491134, this.E7a);
    var t = this.Entity?.GetComponent(0);
    this.Llt = t?.GetBaseInfo()?.Category?.MonsterMatchType === 0;
    var t = t?.GetMonsterComponent()?.FightConfigId;
    if ((t &&= MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(t)) && t.FixedLocation) {
      this.K1_ = true;
      this.Hte.NeedFixBornLocation = false;
    }
    return true;
  }
  OnActivate() {
    var t = !!this.Entity.GetComponent(226);
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && !t) {
      this.tVr?.SetEnableMovementSync(false, "MonsterBehaviorComponent OnActivate");
    }
    if (this.K1_) {
      MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.Hte.CreatureData.GetInitLocation());
      this.Hte.Actor.KuroSetMovementMode({
        Mode: 5,
        Context: "怪物固定位置"
      });
      this.Hte.SetActorLocation(MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), "怪物固定位置", false);
      this.Entity.GetComponent(117)?.Disable("怪物固定位置");
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.Kqr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.AiTaskWanderForResetEnd, this.qtn);
    if (this.N1t) {
      this.N1t.EndTask();
    }
    this.N1t = undefined;
    if (this.S7a) {
      this.S7a.EndTask();
      this.S7a = undefined;
    }
    if (this.y7a !== 0) {
      EffectSystem_1.EffectSystem.StopEffectById(this.y7a, "MonsterBehaviorComponent.OnEnd", true);
      this.y7a = 0;
    }
    return true;
  }
};
MonsterBehaviorComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(91)], MonsterBehaviorComponent);
exports.MonsterBehaviorComponent = MonsterBehaviorComponent; //# sourceMappingURL=MonsterBehaviorComponent.js.map
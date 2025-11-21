"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillLuPa = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D");
const TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../../Global");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const HudUnitUtils_1 = require("../../../../../../Module/HudUnit/Utils/HudUnitUtils");
const CampUtils_1 = require("../../../Blueprint/Utils/CampUtils");
const LockOnUtils_1 = require("../../LockOn/LockOnUtils");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const GAP_TIME = 200;
const DISTANCE = 5000;
const RADIUS = 500;
const PROFILE_KEY = "SpecialSkillLuPa_IsBlock";
const SPECIAL_SKILL_ID = 1207601;
class SpecialSkillLuPa extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.EIe = undefined;
    this.cBe = undefined;
    this.rqo = undefined;
    this.eMc = false;
    this.Opu = undefined;
    this.HFt = 0;
    this.soi = Vector_1.Vector.Create();
    this.jma = new Vector2D_1.Vector2D();
    this.jk1 = 0;
    this.hoi = undefined;
    this.hBa = undefined;
  }
  OnStart() {
    this.Hte = this.SpecialSkillComponent.Entity.GetComponent(3);
    this.EIe = this.SpecialSkillComponent.Entity.GetComponent(0);
    this.cBe = this.SpecialSkillComponent.Entity.GetComponent(40);
    var i = this.SpecialSkillComponent.Entity.GetComponent(209);
    this.hBa = this.cBe?.GetSkill(SPECIAL_SKILL_ID);
    if (this.Hte?.IsAutonomousProxy) {
      this.rqo = i.ListenForTagAddOrRemove(-307383857, (i, t) => {
        this.qpu();
        this.eMc = t;
        this.HFt = 0;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpecialSkillLuPaSwitchLockTarget, undefined);
      });
    }
    if (this.jk1 === 0 && (i = this.hBa?.SkillInfo?.SpecialBuffInCode)?.Num()) {
      this.jk1 = Number(i.Get(0));
    }
  }
  OnEnd() {
    this.rqo?.EndTask();
  }
  OnTick(i) {
    if (this.eMc && (this.HFt === 0 && this.Yhc(DISTANCE, RADIUS), this.HFt += i, this.HFt > GAP_TIME)) {
      this.HFt = 0;
    }
  }
  Yhc(i, t) {
    var e = [];
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(i, 248, e);
    var s = this.Hte.Actor.Camp;
    this.soi.FromUeVector(Global_1.Global.CharacterCameraManager.D_GetCameraLocation());
    var r = this.soi;
    let o = Number.MAX_VALUE;
    let h = undefined;
    for (const _ of e) {
      if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(_)) {
        if (_.Entity.GetComponent(178)) {
          var l = _.Entity.GetComponent(2);
          if (l) {
            l = CampUtils_1.CampUtils.GetCampRelationship(l.Actor.Camp, s);
            if (l === 2) {
              l = _.Entity.GetComponent(0)?.GetEntityType();
              if (l === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
                var l = _.Entity.GetComponent(1).ActorLocationProxy;
                var n = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(l.ToUeVector(), this.jma);
                if (n && !(this.jma.Size() > t)) {
                  const i = Vector_1.Vector.Dist(r, l);
                  if (!(i > o)) {
                    n = this.Coi(r, l);
                    if (n?.bBlockingHit) {
                      var l = _.Entity.GetComponent(1).Owner;
                      var n = n.Actors.Get(0);
                      var a = ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(n);
                      if (l !== n && l !== a) {
                        continue;
                      }
                    }
                    o = i;
                    h = _;
                  }
                }
              }
            }
          }
        }
      }
    }
    if (h !== this.Opu) {
      this.qpu();
      if (h) {
        this.NEn(h);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpecialSkillLuPaSwitchLockTarget, h);
    }
  }
  Coi(i, t) {
    if (!this.hoi) {
      this.hoi = ModelManager_1.ModelManager.BulletModel.NewTraceElement(UE.TraceLineElement, ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim);
      this.hoi.bIsSingle = true;
      this.hoi.bIgnoreSelf = true;
    }
    this.hoi.WorldContextObject = this.Hte.Owner;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hoi, i);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hoi, t);
    if (TraceElementCommon_1.TraceElementCommon.LineTrace(this.hoi, PROFILE_KEY)) {
      return this.hoi.HitResult;
    }
  }
  NEn(i) {
    i.Entity.GetComponent(178).AddBuff(this.jk1, {
      InstigatorId: this.EIe.GetCreatureDataId(),
      Reason: "露帕特殊技能瞄准目标加Buff",
      PreMessageId: this.hBa?.MNc
    });
    this.Opu = i;
  }
  qpu() {
    if (this.Opu?.Valid) {
      this.Opu.Entity.GetComponent(178)?.RemoveBuff(this.jk1, -1, "露帕特殊技能瞄准目标移除Buff", this.hBa?.MNc);
      this.Opu = undefined;
    }
  }
}
exports.SpecialSkillLuPa = SpecialSkillLuPa;
//# sourceMappingURL=SpecialSkillLuPa.js.map
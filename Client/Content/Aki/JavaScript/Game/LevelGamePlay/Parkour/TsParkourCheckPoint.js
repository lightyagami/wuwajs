"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsParkourCheckPoint = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ParkourController_1 = require("./ParkourController");
const PARKOUR_CHECK_POINT_PRESET = new UE.FName("ParkourCheckPoint");
class TsParkourCheckPoint extends UE.Actor {
  constructor() {
    super(...arguments);
    this.SphereComponent = undefined;
    this.CheckPointIndex = 0;
    this.IndexInGroup = 0;
    this.ParkourId = 0;
    this.CheckTag = "";
    this.DestroyEffectModelBasePath = "";
    this.EffectViewHandler = 0;
    this.EventRegistered = false;
  }
  Constructor() {
    this.EffectViewHandler = 0;
  }
  ReceiveBeginPlay() {
    this.FindComponents();
    this.SphereComponent.SetCollisionProfileName(PARKOUR_CHECK_POINT_PRESET);
    this.SphereComponent.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap = true;
    this.SphereComponent.bKuroPassiveCollision = true;
    this.RegisterEvents();
  }
  ReceiveEndPlay() {
    this.RemoveEvents();
    if (this.EffectViewHandler) {
      EffectSystem_1.EffectSystem.StopEffectById(this.EffectViewHandler, "[TsParkourCheckPoint.ReceiveEndPlay]", false);
      this.EffectViewHandler = 0;
    }
    if (!StringUtils_1.StringUtils.IsEmpty(this.DestroyEffectModelBasePath)) {
      EffectSystem_1.EffectSystem.SpawnUnloopedEffect(this, this.D_GetTransform(), this.DestroyEffectModelBasePath, "[TsParkourCheckPoint.ReceiveEndPlay]");
    }
  }
  SetDetectSphere(t) {
    this.SphereComponent.SetSphereRadius(t, true);
  }
  GenerateFx(t) {
    t = UE.KismetSystemLibrary.GetPathName(t);
    this.EffectViewHandler = EffectSystem_1.EffectSystem.SpawnEffect(this, this.D_GetTransform(), t, "[TsParkourCheckPoint.GenerateFx]", new EffectContext_1.EffectContext(undefined, this));
    if (!EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandler)) {
      this.EffectViewHandler = 0;
    }
  }
  GenerateFxByPath(t) {
    this.EffectViewHandler = EffectSystem_1.EffectSystem.SpawnEffect(this, this.D_GetTransform(), t, "[TsParkourCheckPoint.GenerateFxByPath]", new EffectContext_1.EffectContext(undefined, this));
    if (!EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandler)) {
      this.EffectViewHandler = 0;
    }
  }
  FindComponents() {
    this.SphereComponent ||= this.GetComponentByClass(UE.SphereComponent.StaticClass());
  }
  RegisterEvents() {
    if (!this.EventRegistered) {
      this.SphereComponent.OnComponentBeginOverlapNoGcAlloc.Add((t, e, i) => {
        this.OnCollisionEnter(e);
      });
      this.SphereComponent.OnComponentEndOverlap.Add((t, e, i, s) => {
        this.OnCollisionExit(e);
      });
      this.EventRegistered = true;
    }
  }
  RemoveEvents() {
    if (this.SphereComponent) {
      this.SphereComponent.OnComponentBeginOverlapNoGcAlloc.Clear();
      this.SphereComponent.OnComponentEndOverlap.Clear();
    }
    this.EventRegistered = false;
  }
  OnCollisionEnter(t) {
    if (ParkourController_1.ParkourController.MatchParkourRoleConfig(this.ParkourId) && t === ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTrigger()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Level", 7, "[ParkourCheckPoint]检测到玩家", ["ParkourId", this.ParkourId], ["Index", this.CheckPointIndex]);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(this.CheckTag)) {
        t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
        if (t) {
          t = t.GetComponent(205);
          if (t && !t.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.CheckTag))) {
            return;
          }
        }
      }
      if (this.ParkourId !== undefined) {
        ParkourController_1.ParkourController.HandleParkourPoint(this.ParkourId, this.CheckPointIndex, this.IndexInGroup);
      }
    }
  }
  OnCollisionExit(t) {}
}
exports.TsParkourCheckPoint = TsParkourCheckPoint;
exports.default = TsParkourCheckPoint; //# sourceMappingURL=TsParkourCheckPoint.js.map
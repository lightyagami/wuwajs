"use strict";

var __decorate = this && this.__decorate || function (t, e, i, a) {
  var s;
  var r = arguments.length;
  var h = r < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, i) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, a);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        h = (r < 3 ? s(h) : r > 3 ? s(e, i, h) : s(e, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleGaitComponent = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig");
const FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController");
const CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const RoleGaitStatic_1 = require("./Define/RoleGaitStatic");
const RoleForbidMovementHelper_1 = require("./Helper/RoleForbidMovementHelper");
const RoleStrengthComponent_1 = require("./RoleStrengthComponent");
const STOP_SPEED = 5;
let RoleGaitComponent = class RoleGaitComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Nce = undefined;
    this.Gce = undefined;
    this.$zo = undefined;
    this.HBr = undefined;
    this.Xte = undefined;
    this.RoleForbidMovementHelper = undefined;
    this.RoleGaitUnEnableState = new Map();
    this.Xin = t => {
      if (t) {
        this.Xte.RemoveTag(388142570);
        this.$zo.RemoveBuffByTag(388142570);
        this.RoleGaitUnEnableState.get(2).add(-63548288);
        this.RoleGaitUnEnableState.get(3).add(-63548288);
      } else {
        this.RoleGaitUnEnableState.get(2).delete(-63548288);
        this.RoleGaitUnEnableState.get(3).delete(-63548288);
      }
      this.$in();
    };
    this.Yin = t => {
      if (t) {
        this.Xte.RemoveTag(388142570);
        this.$zo.RemoveBuffByTag(388142570);
        this.RoleGaitUnEnableState.get(1).add(229513169);
        this.RoleGaitUnEnableState.get(3).add(229513169);
      } else {
        this.RoleGaitUnEnableState.get(1).delete(229513169);
        this.RoleGaitUnEnableState.get(3).delete(229513169);
      }
      this.$in();
    };
    this.Jin = t => {
      if (t) {
        this.RoleGaitUnEnableState.get(1).add(930178923);
      } else {
        this.RoleGaitUnEnableState.get(1).delete(930178923);
      }
      this.$in();
    };
    this.zin = t => {
      if (t) {
        this.RoleGaitUnEnableState.get(3).add(477750727);
      } else {
        this.RoleGaitUnEnableState.get(3).delete(477750727);
      }
      this.$in();
    };
  }
  static get Dependencies() {
    return [3, 182];
  }
  OnInitData() {
    this.RoleForbidMovementHelper = new RoleForbidMovementHelper_1.RoleForbidMovementHelper();
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(3);
    this.Gce = this.Entity.CheckGetComponent(182);
    this.HBr = this.Entity.CheckGetComponent(179);
    this.Xte = this.Entity.CheckGetComponent(209);
    this.Nce = this.Entity.CheckGetComponent(62);
    this.$zo = this.Entity.CheckGetComponent(178);
    RoleGaitStatic_1.RoleGaitStatic.Init();
    this.InitRoleForbidMovementHelper();
    return true;
  }
  InitRoleForbidMovementHelper() {
    this.RoleGaitUnEnableState.set(2, new Set());
    this.RoleGaitUnEnableState.set(1, new Set());
    this.RoleGaitUnEnableState.set(3, new Set());
    this.RoleForbidMovementHelper.TagComp = this.Entity.CheckGetComponent(209);
    this.RoleForbidMovementHelper.CreateTagHandler(-63548288, 1, this.Xin);
    this.RoleForbidMovementHelper.CreateTagHandler(229513169, 1, this.Yin);
    this.RoleForbidMovementHelper.CreateTagHandler(930178923, 0, this.Jin);
    this.RoleForbidMovementHelper.RegisterMutuallyTags([-63548288, 930178923]);
    this.RoleForbidMovementHelper.CreateTagHandler(477750727, 0, this.zin);
    this.RoleForbidMovementHelper.Awake();
  }
  OnClear() {
    this.RoleForbidMovementHelper.Clear();
    return true;
  }
  OnTick(t) {
    this.$in();
  }
  $in() {
    var t;
    var e;
    var i;
    var a;
    if (this.Hte.IsAutonomousProxy) {
      this.Zin();
      t = this.HBr.MoveState;
      e = this.HBr.PositionState;
      i = this.Xte.HasTag(388142570);
      a = this.HBr.DirectionState;
      if (this.Gce.HasMoveInput) {
        this.UpdateMovePressing(i, e, t, a);
      } else {
        this.UpdateMoveReleasing(i, e, t, a);
      }
    }
  }
  EnableRoleGaitState(t) {
    return this.RoleGaitUnEnableState.get(t).size === 0;
  }
  FindEnableGaitState() {
    for (var [t, e] of this.RoleGaitUnEnableState) {
      if (e.size === 0) {
        return t;
      }
    }
  }
  FindEnableCharMoveState() {
    var t = this.FindEnableGaitState();
    if (t) {
      switch (t) {
        case 1:
          return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
        case 2:
        case 3:
          return CharacterUnifiedStateTypes_1.ECharMoveState.Run;
      }
    }
  }
  UpdateMovePressing(t, e, i, a) {
    switch (e) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
        if (t && this.EnableRoleGaitState(3)) {
          var s = FormationAttributeController_1.FormationAttributeController.GetValue(1);
          if (i !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) {
            if (s >= RoleStrengthComponent_1.STRENGTH_TOLERANCE) {
              this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Sprint);
              break;
            }
          } else if (s > 0) {
            break;
          }
        }
        if (this.HBr.IsWalkBaseMode) {
          if (!this.EnableRoleGaitState(1) && this.EnableRoleGaitState(2)) {
            this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
          } else {
            this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
          }
        } else if (!this.EnableRoleGaitState(2) && this.EnableRoleGaitState(1)) {
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
        } else {
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
        }
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
        if (i !== CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim && i !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim) {
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim);
        }
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
        if (i !== CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb && i !== CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb && i !== CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb && i !== CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb) {
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb);
        }
    }
  }
  UpdateMoveReleasing(t, e, i, a) {
    if (t) {
      this.Xte.RemoveTag(388142570);
      this.$zo.RemoveBuffByTag(388142570);
    }
    switch (e) {
      case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
        if (a !== CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
          switch (i) {
            case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
            case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
            case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
              this.SetRunStop();
              break;
            case CharacterUnifiedStateTypes_1.ECharMoveState.KnockDown:
            case CharacterUnifiedStateTypes_1.ECharMoveState.Parry:
            case CharacterUnifiedStateTypes_1.ECharMoveState.SoftKnock:
            case CharacterUnifiedStateTypes_1.ECharMoveState.HeavyKnock:
            case CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp:
            case CharacterUnifiedStateTypes_1.ECharMoveState.Captured:
            case CharacterUnifiedStateTypes_1.ECharMoveState.BreakWeakness:
              break;
            default:
              if (this.Gce.Speed < STOP_SPEED) {
                this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
              }
          }
        }
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
        this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
        break;
      case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
        if (this.HBr.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.EnterClimb && this.HBr.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.ExitClimb) {
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
        }
    }
  }
  SetRunStop() {
    switch (this.HBr.MoveState) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
        this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Dodge:
      case CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll:
        if (this.Gce.Speed < this.Gce.MovementData.FaceDirection.Standing.SprintSpeed - TsBaseRoleConfig_1.tsBaseRoleConfig.MaxRunStopSpeed) {
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.RunStop);
        } else {
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop);
        }
    }
  }
  Zin() {
    if (!Info_1.Info.IsInKeyBoard()) {
      if (Info_1.Info.IsInGamepad()) {
        this.eon();
      } else if (Info_1.Info.IsInTouch()) {
        this.ton();
      }
    }
  }
  eon() {
    if (this.Nce.GetMoveVectorCache().SizeSquared() > MathUtils_1.MathUtils.Square(RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate())) {
      if (this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Walk) {
        this.HBr.WalkPress();
      }
    } else if (this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Run) {
      this.HBr.WalkPress();
    }
  }
  ton() {
    if (this.Nce.GetMoveVectorCache().SizeSquared() > MathUtils_1.MathUtils.Square(RoleGaitStatic_1.RoleGaitStatic.GetWalkOrRunRate())) {
      if (this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Walk) {
        this.HBr.WalkPress();
      }
    } else if (this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Run) {
      this.HBr.WalkPress();
    }
  }
};
RoleGaitComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(97)], RoleGaitComponent);
exports.RoleGaitComponent = RoleGaitComponent; //# sourceMappingURL=RoleGaitComponent.js.map
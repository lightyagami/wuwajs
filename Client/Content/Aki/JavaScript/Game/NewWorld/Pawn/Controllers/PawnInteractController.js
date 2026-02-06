"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnInteractController = exports.InteractEntity = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const Global_1 = require("../../../Global");
const LevelGameplayActionsDefine_1 = require("../../../LevelGamePlay/LevelGameplayActionsDefine");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralContextUtil_1 = require("../../../LevelGamePlay/LevelGeneralContextUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ChildQuestNodeBase_1 = require("../../../Module/GeneralLogicTree/BehaviorNode/ChildQuestNode/ChildQuestNodeBase");
const GeneralLogicTreeUtil_1 = require("../../../Module/GeneralLogicTree/GeneralLogicTreeUtil");
const InteractionModel_1 = require("../../../Module/Interaction/InteractionModel");
const InteractConfirmController_1 = require("../../../Module/Interaction/SecondConfirm/InteractConfirmController");
const TsInteractionUtils_1 = require("../../../Module/Interaction/TsInteractionUtils");
const PlotController_1 = require("../../../Module/Plot/PlotController");
const SceneTeamController_1 = require("../../../Module/SceneTeam/SceneTeamController");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../../Ui/UiManager");
const WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary");
const DEFAULT_INTERACT_RANGE = 300;
const PROFILE_DETECT_VISIBLE_BLOCK = "PawnInteractController_DetectVisibleBlock";
const DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET = 10;
const EXECUTION_MAX_HEIGHT_DIFF = 50;
class InteractEntity {
  constructor(t) {
    this.IsAdvice = false;
    this.Jh = undefined;
    this.Hte = undefined;
    this.EntityId = undefined;
    this.InteractRange = -0;
    this.cui = 0;
    this.Crr = -100;
    this.grr = -9999;
    this.DirectOptionInstanceIds = [];
    this.DirectOptionNames = [];
    this.DirectOptionConditionIcon = [];
    this.DirectOptionGray = [];
    this.Jh = t;
    this.EntityId = t?.Id;
    this.IsAdvice = t.GetComponent(0).GetAdviceInfo() !== undefined;
    this.Hte = t.GetComponent(1);
    this.DirectOptionInstanceIds = new Array();
    this.DirectOptionNames = new Array();
  }
  get Priority() {
    var t;
    var i;
    if (this.Jh) {
      if (this.IsAdvice) {
        i = this.Hte.ActorLocationProxy;
        t = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
        i = Vector_1.Vector.Distance(i, t);
        this.cui = MathCommon_1.MathCommon.Clamp(i / this.InteractRange, 0, 1) * this.Crr;
      }
      return this.cui;
    } else {
      return this.grr;
    }
  }
  GetEntity() {
    return this.Jh;
  }
}
exports.InteractEntity = InteractEntity;
class PawnInteractController {
  constructor(t) {
    this.Hte = undefined;
    this.frr = undefined;
    this.prr = undefined;
    this.vrr = undefined;
    this.Mrr = undefined;
    this.Err = undefined;
    this.Srr = undefined;
    this.yrr = "";
    this.Irr = DEFAULT_INTERACT_RANGE;
    this.Trr = -1;
    this.j3f = new Map();
    this.SectorRange = undefined;
    this.LocationOffset = undefined;
    this.InteractCameraOffsetConifg = undefined;
    this.Lrr = -0;
    this.Drr = "Option";
    this._i_ = undefined;
    this.IsTurnAround = false;
    this.IsTurnRecoveryImmediately = false;
    this.IsWaitTurnComplete = false;
    this.IsWaitMontageFinish = undefined;
    this.A_d = "Dialog";
    this.D_d = undefined;
    this.x_d = undefined;
    this.PreTalkConfigs = undefined;
    this.PlayerInteractiveRange = undefined;
    this.IsPlayerTurnAround = false;
    this.NUe = 0;
    this.Rrr = 0;
    this.Urr = 0;
    this.InteractEntity = undefined;
    this.Arr = undefined;
    this.Prr = Vector_1.Vector.Create();
    this.a$t = undefined;
    this.TempDirectOptionInstances = new Array();
    this.PreDirectOptionInstances = new Array();
    this.OnInteractionUpdate = undefined;
    this.OnInteractActionEnd = undefined;
    this.rOu = new Set();
    this.$3f = new Set();
    this.W3f = new Map();
    this.SecondConfirmHandle = 0;
    this.NeedActiveUi = true;
    this.Q3f = (t, i) => {
      if (!i && this.$3f.has(t)) {
        this.$3f.delete(t);
        this.frr?.ForceUpdate();
      } else if (i && !this.$3f.has(t)) {
        this.$3f.add(t);
        this.frr?.ForceUpdate();
      }
    };
    this.InteractEntity = new InteractEntity(t.Entity);
    this.frr = t;
    this.Hte = t.Entity.GetComponent(1);
    this.wrr();
    this.InteractEntity.InteractRange = Math.max(this.InteractRange, this.InteractExitRange);
  }
  Dispose() {
    this.Hte = undefined;
    this.frr = undefined;
    this.prr = undefined;
    this.Mrr = undefined;
    this.Err = undefined;
    this.vrr = undefined;
    this.Arr = undefined;
    this.Srr = undefined;
    this.PlayerInteractiveRange = undefined;
    this.PreTalkConfigs = undefined;
    this.SectorRange = undefined;
    this.OnInteractionUpdate = undefined;
    this.OnInteractActionEnd = undefined;
    if (InteractConfirmController_1.InteractConfirmController.CheckHandleValid(this.SecondConfirmHandle)) {
      InteractConfirmController_1.InteractConfirmController.CancelAction(this.SecondConfirmHandle);
    }
    this.SecondConfirmHandle = 0;
    this.$3f.clear();
    for (const t of this.W3f.values()) {
      t.EndTask();
    }
    this.W3f.clear();
    this.j3f.clear();
  }
  get DefaultShowOption() {
    var t = this.GetInteractiveOption();
    if (this.HasDynamicOption && t?.DoIntactType === "Direct" && t.TidContent) {
      return PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidContent);
    } else if (StringUtils_1.StringUtils.IsEmpty(this.yrr)) {
      return undefined;
    } else {
      return PublicUtil_1.PublicUtil.GetConfigTextByKey(this.yrr);
    }
  }
  GetInteractType() {
    return this.Drr;
  }
  GetInteractIcon() {
    if (this.D_d && this.x_d) {
      return this.x_d;
    } else {
      return this.A_d;
    }
  }
  wrr() {
    var t = this.Hte.CreatureData;
    var i = t.GetPbEntityInitData();
    if (i) {
      this.prr = new Array();
      this.Mrr = new Array();
      this.Err = new Array();
      this.vrr = new Array();
      var e = (0, IComponent_1.getComponent)(i.ComponentsData, "InteractComponent");
      if (e) {
        if (e.InteractStyleType) {
          this.NeedActiveUi = false;
        }
        this.PreTalkConfigs = e.PreFlow;
        if (e.Range) {
          this.Irr = e.Range;
        }
        if (e.RangesByTags) {
          for (const r of e.RangesByTags) {
            this.j3f.set(r.Tag, r);
          }
        }
        if (e.ExitRange) {
          this.Trr = e.ExitRange;
        }
        if (e.SectorRange) {
          this.SectorRange = e.SectorRange;
        }
        if (e.SectorRangeFromPlayerToEntity) {
          switch (e.SectorRangeFromPlayerToEntity.Type) {
            case IComponent_1.EInteractPlayerDiractionType.LeisureInteraction:
              this.PlayerInteractiveRange = e.SectorRangeFromPlayerToEntity;
              break;
            case IComponent_1.EInteractPlayerDiractionType.Npc:
          }
        }
        if (e.InteractPointOffset) {
          this.LocationOffset = Vector_1.Vector.Create(e.InteractPointOffset.X || 0, e.InteractPointOffset.Y, e.InteractPointOffset.Z);
        }
        if (e.InteractCameraOffsetConfig) {
          this.InteractCameraOffsetConifg = e.InteractCameraOffsetConfig;
        }
        if (e.TidContent) {
          this.yrr = e.TidContent;
        }
        if (e.InterruptMontageType) {
          this.IsWaitMontageFinish = e.InterruptMontageType;
        }
        this.Drr = e.DoIntactType;
        if (e.TurnAroundType) {
          switch (e.TurnAroundType) {
            case IComponent_1.EInteractTurnAround.FaceEachOther:
            case IComponent_1.EInteractTurnAround.FaceEachOtherWithRecoveryImmediately:
              this.IsTurnAround = true;
              this.IsPlayerTurnAround = true;
              if (e.IsWaitForTurnAroundComplete) {
                this.IsWaitTurnComplete = true;
              }
              break;
            case IComponent_1.EInteractTurnAround.PlayerTurnToInteractor:
              this.IsPlayerTurnAround = true;
          }
          if (e.TurnAroundType === IComponent_1.EInteractTurnAround.FaceEachOtherWithRecoveryImmediately) {
            this.IsTurnRecoveryImmediately = true;
          }
        }
        if (e.InteractAdditionalInfo) {
          this._i_ = e.InteractAdditionalInfo.Type;
        }
        this.a$t = e.MatchRoleOption;
        this.Brr(e);
      } else {
        this.Lrr = this.Irr;
      }
      i = t.ComponentDataMap.get("Tys")?.Tys;
      this.brr(i, e?.RandomInteract, t.GetPbDataId());
      this.qrr(i);
      if (i) {
        this.frr.SetServerLockInteract(i.UIs, "Init Interact Controller");
      }
      this.Grr();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Interaction", 7, "[PawnInteractComponent.OnStart] 交互组件初始化失败", ["CreatureGenID:", t.GetOwnerId()], ["PbDataId:", t.GetPbDataId()]);
    }
  }
  qrr(t) {
    if (t?.AIs) {
      for (const r of t.AIs) {
        var i = ModelManager_1.ModelManager.InteractionModel.GetDynamicConfig(r.e6n);
        var e = LevelGeneralContextUtil_1.LevelGeneralContextUtil.CreateByServerContext(r.cvs);
        this.AddDynamicInteractOption(i, e, r.DIs, r.XCa, false);
      }
    }
  }
  ClearDirectOptions() {
    if (this.InteractEntity) {
      this.InteractEntity.DirectOptionInstanceIds.length = 0;
      this.InteractEntity.DirectOptionNames.length = 0;
      this.InteractEntity.DirectOptionConditionIcon.length = 0;
      this.InteractEntity.DirectOptionGray.length = 0;
    }
  }
  UpdateDirectOptions(t, i = true, e = true, r = false) {
    if (!this.prr) {
      return false;
    }
    if (!this.Hte) {
      return false;
    }
    var n;
    var s;
    if (!this.Hte.Owner) {
      return false;
    }
    if (!this.InteractEntity) {
      return false;
    }
    if (!this.NeedActiveUi) {
      return false;
    }
    this.TempDirectOptionInstances.length = 0;
    this.InteractEntity.DirectOptionInstanceIds.length = 0;
    this.InteractEntity.DirectOptionNames.length = 0;
    this.InteractEntity.DirectOptionConditionIcon.length = 0;
    this.InteractEntity.DirectOptionGray.length = 0;
    if (this.HasDynamicOption) {
      return true;
    }
    let o = false;
    for (const a of this.prr) {
      if (!a.Disabled) {
        if (a.DoIntactType !== "Direct") {
          o = true;
        } else if (!r || a.Type.Type === "Flow") {
          if (a.CustomOptionType !== 1 && a.CustomOptionType !== 3 && this.Nrr(a) && this.oOu(a, e) && !!this.InteractEntity.EntityId && ModelManager_1.ModelManager.InteractionModel.CheckOptionUniqueness(this.InteractEntity.EntityId, a, t)) {
            this.TempDirectOptionInstances.push(a);
            this.InteractEntity.DirectOptionInstanceIds.push(a.InstanceId);
            if ((n = a.TidContent ? PublicUtil_1.PublicUtil.GetConfigTextByKey(a.TidContent) : undefined) && !a.ConditionCheck && a.LockTips?.TidAppendText) {
              s = PublicUtil_1.PublicUtil.GetConfigTextByKey(a.LockTips.TidAppendText);
              s = new StringBuilder_1.StringBuilder(n, InteractionModel_1.COLOR_PREFIX, s, InteractionModel_1.COLOR_SUFFIX);
              this.InteractEntity.DirectOptionNames.push(s.ToString());
            } else {
              this.InteractEntity.DirectOptionNames.push(n);
            }
            if (a.LockTips) {
              this.InteractEntity.DirectOptionConditionIcon.push(a.ConditionCheck ? InteractionModel_1.UNLOCK_TEXTURE : InteractionModel_1.LOCK_TEXTURE);
            } else {
              this.InteractEntity.DirectOptionConditionIcon.push(undefined);
            }
            this.InteractEntity.DirectOptionGray.push(!a.ConditionCheck);
          }
        }
      }
    }
    let h = false;
    if (i) {
      if (this.PreDirectOptionInstances.length === this.TempDirectOptionInstances.length) {
        for (let t = 0; t < this.TempDirectOptionInstances.length; t++) {
          if (this.TempDirectOptionInstances[t] !== this.PreDirectOptionInstances[t]) {
            h = true;
            break;
          }
        }
      } else {
        h = true;
      }
      if (h) {
        TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView();
        this.PreDirectOptionInstances.length = 0;
        for (const l of this.TempDirectOptionInstances) {
          this.PreDirectOptionInstances.push(l);
        }
      }
    }
    return o || this.InteractEntity.DirectOptionInstanceIds.length > 0;
  }
  brr(t, i, e) {
    if (t && t.PIs && t.PIs.length) {
      if (i) {
        for (const n of t.PIs) {
          var r = i.Options[n].Option;
          var r = this.Orr(r, 2);
          r.RandomOptionIndex = n;
          this.prr.push(r);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 18, "找不到随机交互组件的配置", ["实体配置Id", e]);
      }
    }
  }
  Brr(e) {
    if (e.InteractIcon) {
      this.A_d = e.InteractIcon;
    } else if (e.InteractDefaultIcon) {
      this.A_d = e.InteractDefaultIcon;
    } else {
      this.A_d = "Dialog";
    }
    if (e.Options?.length > 0) {
      for (let t = 0, i = e.Options.length; t < i; t++) {
        var r = this.Orr(e.Options[t], 0);
        this.prr.push(r);
      }
    }
  }
  InitOptionWithOffset(t) {
    var i = this.prr;
    if (i && i.length !== 0) {
      for (const s of i) {
        if (s.Offset && !s.Offset.IsNearlyZero()) {
          const o = s.InstanceId;
          var e = s.Range;
          var r = this.Trr === -1 ? e : this.Trr;
          var n = s.Offset;
          t(o, e, r, n, () => {
            this.rOu.add(o);
          }, () => {
            this.rOu.delete(o);
          });
        }
      }
    }
  }
  Grr() {
    this.krr();
    this.Frr();
    this.vrr.length = 0;
    if (this.OnInteractionUpdate) {
      this.OnInteractionUpdate();
    }
    if (this.frr) {
      this.frr.UpdateInteractRange();
    }
  }
  IsInSectorRange() {
    if (!this.SectorRange) {
      return true;
    }
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (e) {
      if (e.MoveComp && !e.MoveComp.IsStandardGravity) {
        return this.Zuc();
      }
      var r = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.Begin);
      var n = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.End);
      let t = undefined;
      var s = this.Hte.CreatureData.GetEntityType();
      t = s === Protocol_1.Aki.Protocol.kks.Proto_SceneItem ? this.Hte.ActorRightProxy : this.Hte.ActorForwardProxy;
      var s = PawnInteractController.cz;
      var o = PawnInteractController.fz;
      e.ActorLocationProxy.Subtraction(this.GetInteractPoint(), s);
      s.Z = 0;
      s.Normalize();
      var e = s.DotProduct(t);
      let i = Math.acos(e) * MathUtils_1.MathUtils.RadToDeg;
      s.CrossProduct(t, o);
      if (o.Z > 0) {
        i *= -1;
      }
      i = MathCommon_1.MathCommon.WrapAngle(i);
      if (n < r) {
        if (i > r || i < n) {
          return true;
        }
      } else if (i > r && i < n) {
        return true;
      }
    }
    return false;
  }
  IsInPlayerInteractiveRange() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!t) {
      return false;
    }
    if (!this.PlayerInteractiveRange) {
      return true;
    }
    if (this.PlayerInteractiveRange.Begin === -MathUtils_1.PI_DEG && this.PlayerInteractiveRange.End === MathUtils_1.PI_DEG) {
      return true;
    }
    if (t.MoveComp && !t.MoveComp.IsStandardGravity) {
      return this.edc();
    }
    var i = PawnInteractController.cz;
    var e = PawnInteractController.fz;
    i.FromUeVector(this.Hte.ActorLocationProxy);
    i.SubtractionEqual(t.ActorLocationProxy);
    i.Z = 0;
    i.Normalize();
    var t = t.ActorForwardProxy;
    var r = i.DotProduct(t);
    let n = Math.acos(r) * MathUtils_1.MathUtils.RadToDeg;
    i.CrossProduct(t, e);
    if (e.Z > 0) {
      n *= -1;
    }
    return n > this.PlayerInteractiveRange.Begin && n < this.PlayerInteractiveRange.End;
  }
  Zuc() {
    if (!this.SectorRange) {
      return true;
    }
    var e = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.Begin);
    var r = MathCommon_1.MathCommon.WrapAngle(this.SectorRange.End);
    var n = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (n) {
      let t = undefined;
      var s = this.Hte.CreatureData.GetEntityType();
      t = s === Protocol_1.Aki.Protocol.kks.Proto_SceneItem ? this.Hte.ActorRightProxy : this.Hte.ActorForwardProxy;
      var s = PawnInteractController.pz;
      this.Hte.ActorInitGravityRotationProxy.Quaternion().RotateVector(Vector_1.Vector.UpVectorProxy, s);
      var o = PawnInteractController.tdc;
      t.CrossProduct(s, o);
      var h = PawnInteractController.cz;
      var a = PawnInteractController.fz;
      n.ActorLocationProxy.Subtraction(this.GetInteractPoint(), h);
      h.Normalize();
      var n = h.DotProduct(t);
      var l = h.DotProduct(o);
      t.Multiply(n, a);
      o.Multiply(l, h);
      h.AdditionEqual(a);
      h.Normalize();
      var n = h.DotProduct(t);
      let i = Math.acos(n) * MathUtils_1.MathUtils.RadToDeg;
      if (i !== 0 && (h.CrossProduct(t, a), a.DotProduct(s) > 0)) {
        i *= -1;
      }
      i = MathCommon_1.MathCommon.WrapAngle(i);
      if (r < e) {
        if (i > e || i < r) {
          return true;
        }
      } else if (i > e && i < r) {
        return true;
      }
    }
    return false;
  }
  edc() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (!t) {
      return false;
    }
    if (!this.PlayerInteractiveRange) {
      return true;
    }
    if (this.PlayerInteractiveRange.Begin === -MathUtils_1.PI_DEG && this.PlayerInteractiveRange.End === MathUtils_1.PI_DEG) {
      return true;
    }
    var i = PawnInteractController.cz;
    var e = PawnInteractController.fz;
    i.FromUeVector(this.Hte.ActorLocationProxy);
    i.SubtractionEqual(t.ActorLocationProxy);
    i.Normalize();
    var r = t.ActorForwardProxy;
    var n = t.ActorRightProxy;
    var s = i.DotProduct(r);
    var o = i.DotProduct(n);
    r.Multiply(s, e);
    n.Multiply(o, i);
    i.AdditionEqual(e);
    i.Normalize();
    var s = i.DotProduct(r);
    let h = Math.acos(s) * MathUtils_1.MathUtils.RadToDeg;
    if (h !== 0 && (i.CrossProduct(r, e), e.DotProduct(t.ActorUpProxy) > 0)) {
      h *= -1;
    }
    return h > this.PlayerInteractiveRange.Begin && h < this.PlayerInteractiveRange.End;
  }
  IsMatchRoleOption() {
    if (!this.a$t || this.a$t?.length <= 0) {
      return !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam;
    } else {
      return SceneTeamController_1.SceneTeamController.IsMatchRoleOption(this.a$t);
    }
  }
  GetInteractPoint() {
    this.Prr.DeepCopy(this.Hte.ActorLocationProxy);
    var t = PawnInteractController.cz;
    var i = this.LocationOffset;
    if (!!i && (i.X !== 0 || i.Y !== 0 || i.Z !== 0)) {
      if (i.X !== 0) {
        this.Hte.ActorForwardProxy.Multiply(i.X, t);
        this.Prr.AdditionEqual(t);
      }
      if (i.Y !== 0) {
        this.Hte.ActorRightProxy.Multiply(i.Y, t);
        this.Prr.AdditionEqual(t);
      }
      if (i.Z !== 0) {
        this.Hte.ActorUpProxy.Multiply(i.Z, t);
        this.Prr.AdditionEqual(t);
      }
    }
    return this.Prr;
  }
  GetCameraOffsetConfig() {
    return this.InteractCameraOffsetConifg;
  }
  krr() {
    this.Lrr = this.Irr;
    if (this.prr) {
      for (const t of this.prr) {
        if (t.Range > this.Lrr) {
          this.Lrr = t.Range;
        }
      }
    }
  }
  Frr() {
    if (this.prr && this.prr.length !== 0) {
      this.Srr = this.prr[0];
      this.Arr = undefined;
    }
  }
  GetInteractiveOption(i = false) {
    if (this.Urr === Time_1.Time.Frame && this.Arr) {
      return this.Arr;
    }
    if (this.Hte && this.Hte.Owner) {
      var e = this.prr;
      if (e) {
        this.Arr = undefined;
        for (let t = e.length - 1; t > -1; t--) {
          var r = e[t];
          if (!r.Disabled && (!i || r.Type.Type === "Flow")) {
            var n = this.Nrr(r);
            var s = this.oOu(r);
            if (n && s) {
              this.Arr = r;
              break;
            }
          }
        }
        this.Urr = Time_1.Time.Frame;
        return this.Arr;
      }
    }
  }
  Orr(t, i, e, r = 0, n = 0, s = false) {
    var o = t.Range || this.Irr;
    let h = this.Drr;
    if (t.DoIntactType) {
      h = t.DoIntactType;
    }
    var a = new LevelGameplayActionsDefine_1.CommonInteractOption();
    a.Init(++this.NUe, t, e, o, h, i, r, n, s, t.OptionLockTip);
    return a;
  }
  AddDynamicInteractOption(t, i, e, r = false, n = true) {
    if (!this.prr) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 36, "AddDynamicInteractOption failed. Controller is not init", ["PbDataId", this.GetPbDataId()]);
      }
      return -1;
    }
    let s = 0;
    let o = 0;
    if (i) {
      if (i instanceof LevelGeneralContextDefine_1.QuestContext) {
        o = 1;
        s = i.QuestId;
      } else if (i instanceof LevelGeneralContextDefine_1.GeneralLogicTreeContext && i.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        o = 1;
        s = i.TreeConfigId;
      }
    }
    r = this.Orr(t, 1, i, 0, o, r);
    r.OptionContentId = s;
    if (e !== undefined) {
      r.TidContent = e;
    }
    if (t.DoIntactType === "Direct") {
      this.D_d = t.Guid;
      this.x_d = t.Icon;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "AddDynamicInteractOption success", ["PbDataId", this.GetPbDataId()]);
    }
    this.prr.push(r);
    this.Mrr.push(r);
    if (o === 1) {
      this.Err.push(r);
      this.Vrr();
    }
    if (i) {
      e = this.Hrr(r.Context);
      this.ChangeOptionDisabled(r.InstanceId, !e);
    }
    if (this.NeedActiveUi) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Panoramic", 45, "[环视]设置为无法交互");
      }
      this.ChangeOptionDisabled(r.InstanceId, false);
    }
    if (n) {
      this.Grr();
    }
    if (this.frr?.Entity.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(this.frr.Entity, EventDefine_1.EEventName.OnAddDynamicOption);
    }
    return r.InstanceId;
  }
  Vrr() {
    this.Err.sort((t, i) => {
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.OptionContentId);
      i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i.OptionContentId);
      if (t && i) {
        if (t.Type !== i.Type) {
          return t.Type - i.Type;
        } else if (t.ChapterId !== i.ChapterId) {
          return t.ChapterId - i.ChapterId;
        } else {
          return t.Id - i.Id;
        }
      } else {
        return -1;
      }
    });
  }
  RemoveDynamicInteractOption(i) {
    if (!this.prr) {
      return false;
    }
    let e = false;
    for (let t = this.Mrr.length - 1; t > -1; t--) {
      var r = this.Mrr[t];
      if (r.Guid === i) {
        e = r.ContentType === 1;
        this.Mrr.splice(t, 1);
        break;
      }
    }
    if (e) {
      for (let t = this.Err.length - 1; t > -1; t--) {
        if (this.Err[t].Guid === i) {
          this.Err.splice(t, 1);
          break;
        }
      }
    }
    let n = false;
    for (let t = this.prr.length - 1; t > -1; t--) {
      if (this.prr[t].Guid === i) {
        n = true;
        this.prr.splice(t, 1)[0].Dispose();
        break;
      }
    }
    if (n) {
      this.Grr();
    }
    if (this.frr?.Entity.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(this.frr.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption);
    }
    if (this.D_d === i) {
      this.D_d = undefined;
      this.x_d = undefined;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 36, "RemoveDynamicInteractOption success", ["PbDataId", this.GetPbDataId()], ["IsMatch", n]);
    }
    return n;
  }
  AddClientInteractOption(t, i, e = "Option", r, n, s = 0, o, h) {
    var a = new LevelGameplayActionsDefine_1.CommonActionInfo();
    a.Params = t;
    var t = new Array();
    t.push(a);
    var a = new LevelGameplayActionsDefine_1.CommonInteractActions();
    a.Actions = t;
    var t = new LevelGameplayActionsDefine_1.CommonInteractOption();
    t.Type = a;
    t.Condition = i;
    t.DoIntactType = e;
    if (r) {
      t.Range = r;
    }
    if (n) {
      t.TidContent = n;
    }
    if (o) {
      this.LocationOffset = o;
    }
    if (this.prr) {
      a = this.Orr(t, 3, undefined, s);
      this.prr.push(a);
      this.Grr();
      if (h !== undefined) {
        this.IsPlayerTurnAround = h;
      }
      return a.InstanceId;
    } else {
      return -1;
    }
  }
  RemoveClientInteractOption(i) {
    if (!this.prr) {
      return false;
    }
    let e = false;
    for (let t = this.prr.length - 1; t > -1; t--) {
      if (this.prr[t].InstanceId === i) {
        e = true;
        this.prr.splice(t, 1)[0].Dispose();
        break;
      }
    }
    if (e) {
      this.Grr();
    }
    return e;
  }
  OnChangeModeFinish() {
    if (this.prr) {
      for (const i of this.prr) {
        var t;
        if (i.Context && i.OptionType === 1) {
          t = this.Hrr(i.Context);
          this.ChangeOptionDisabled(i.InstanceId, !t);
        }
      }
    }
  }
  ChangeOptionText(i, t) {
    var e;
    if (this.prr && (e = this.prr.find(t => t.Guid === i))) {
      e.TidContent = t;
    }
  }
  ChangeOptionDisabled(i, t) {
    var e;
    if (this.prr && (e = this.prr.find(t => t.InstanceId === i))) {
      e.SetDisable(t);
    }
  }
  ChangeOptiontRange(i, t, e = 0) {
    var r;
    if (this.prr && (r = this.prr.find(t => t.InstanceId === i))) {
      r.Range = t;
      this.Grr();
    }
  }
  ChangeInteractOption(t) {
    this.Srr = t;
  }
  get CurrentInteractOption() {
    return this.Srr;
  }
  get Options() {
    if (this.vrr && this.prr) {
      for (let t = this.vrr.length = 0, i = this.prr.length; t < i; t++) {
        var e = this.prr[t];
        if (!e.Disabled) {
          this.vrr.push(e);
        }
      }
    }
    return this.vrr;
  }
  get QuestOptionList() {
    return this.Err;
  }
  get ShowOptions() {
    var e = new Array();
    for (const t of this.Err) {
      if (!StringUtils_1.StringUtils.IsEmpty(t.TidContent) && !t.Disabled && t.DoIntactType === "Option") {
        if (this.Nrr(t)) {
          e.push(t);
        }
      }
    }
    for (let t = 0, i = this.prr.length; t < i; t++) {
      var r = this.prr[t];
      if (!StringUtils_1.StringUtils.IsEmpty(r.TidContent) && !r.Disabled && r.DoIntactType === "Option" && r.ContentType !== 1) {
        if (this.Nrr(r)) {
          e.push(r);
        }
      }
    }
    e.push(undefined);
    return e;
  }
  get HasDynamicOption() {
    return this.Mrr.length > 0;
  }
  get Owner() {
    return this.Hte?.Owner;
  }
  get EntityId() {
    return this.Hte?.Entity?.Id;
  }
  get CreatureData() {
    return this.Hte?.CreatureData;
  }
  HasInteractOptions() {
    return this.prr?.length !== undefined && this.prr?.length > 0;
  }
  get InteractRange() {
    return this.Lrr;
  }
  get InteractExitRange() {
    if (this.Trr === -1) {
      return this.Lrr;
    } else {
      return this.Trr;
    }
  }
  GetAutoTriggerOption() {
    if (this.prr) {
      for (let t = 0, i = this.prr.length; t < i; t++) {
        var e = this.prr[t];
        if (e.DoIntactType === "Auto") {
          if (this.Nrr(e)) {
            return e;
          }
        }
      }
    }
  }
  InteractOption(t = 0) {
    if (!(t >= this.prr.length)) {
      if (!(t = this.prr[t]).Disabled && this.Nrr(t)) {
        PlotController_1.PlotController.EndInteraction(t.Type.Type === "Flow");
        TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(t, this);
      }
    }
  }
  Nrr(i) {
    i.ConditionCheck = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(i.Condition, this.Hte.Owner, LevelGeneralContextDefine_1.EntityContext.Create(this.Hte.Entity.Id));
    if (!i.ConditionCheck && !i.LockTips) {
      return false;
    }
    if (i.OptionType === 3 && i.CustomOptionType === 1) {
      var t = this.Hte;
      if (t) {
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(3);
        if (e) {
          e = e.ActorLocationProxy.Z - e.HalfHeight;
          t = t.ActorLocationProxy.Z - t.HalfHeight;
          if (Math.abs(e - t) > EXECUTION_MAX_HEIGHT_DIFF || this.jrr()) {
            return false;
          }
        }
      }
    }
    if (i.Context) {
      let t = 0;
      if (i.Context.Type === 6 && i.Context.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        t = i.Context.TreeConfigId;
      } else if (i.Context.Type === 2) {
        t = i.Context.QuestId;
      }
      if (t) {
        return !ModelManager_1.ModelManager.QuestNewModel.CheckNeedBanQuestPushByFocusMode(t);
      }
    }
    return true;
  }
  oOu(t, i = true) {
    return (!t.Offset || !!t.Offset.IsNearlyZero()) && !!i || !!this.rOu && !!this.rOu.has(t.InstanceId);
  }
  InAnyOptionWithOffsetRange() {
    return this.rOu.size > 0;
  }
  jrr() {
    var t;
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    var e = i.Entity.GetComponent(3);
    var i = i.Entity.GetComponent(29)?.ExecutionTrace;
    if (i) {
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, e.ActorLocationProxy);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.Hte.ActorLocationProxy);
      return !!TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_DETECT_VISIBLE_BLOCK) && (t = PawnInteractController.cz, e.ActorUpProxy.Multiply(e.HalfHeight - DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET, t), e.ActorLocationProxy.Addition(t, t), TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, t), (0, RegisterComponent_1.isComponentInstance)(this.Hte, 3) ? (e = PawnInteractController.fz, this.Hte.ActorUpProxy.Multiply(this.Hte.HalfHeight - DETECT_VISIBLE_BLOCK_HEIGHT_OFFSET, e), this.Hte.ActorLocationProxy.Addition(e, e), TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, e)) : TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.Hte.ActorLocationProxy), !!TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_DETECT_VISIBLE_BLOCK));
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Interaction", 36, "ExecutionTrace is undefined");
      }
      return false;
    }
  }
  HandlePreInterativeLogic() {
    this.PreTalkConfigs;
  }
  RecordInteraction() {
    this.Rrr++;
  }
  HasDynamicOptionType(t) {
    for (const r of this.Mrr) {
      if (r.Context.Type === 6) {
        var i = r.Context.TreeConfigId;
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i)?.GetNode(r.Context.NodeId);
        if (e && e instanceof ChildQuestNodeBase_1.ChildQuestNodeBase) {
          for (const n of t) {
            if (e.ChildQuestType === n) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  HasDynamicOptionTask() {
    for (const t of this.Mrr) {
      if (t.Context.Type === 6) {
        return t.Context.NodeId === 0;
      }
    }
    return false;
  }
  CheckInteractCount(t, i) {
    switch (i) {
      case 0:
        return this.Rrr === t;
      case 1:
        return this.Rrr !== t;
      case 2:
        return this.Rrr < t;
      case 3:
        return this.Rrr <= t;
      case 4:
        return this.Rrr > t;
      case 5:
        return this.Rrr >= t;
    }
    return false;
  }
  GetPbDataId() {
    return this.Hte?.CreatureData.GetPbDataId() ?? 0;
  }
  GetOptionByIndex(t) {
    if (this.prr) {
      var i = t + 1;
      for (const e of this.prr) {
        if (e.InstanceId === i) {
          return e;
        }
      }
    }
  }
  GetOptionByInstanceId(t) {
    if (this.prr) {
      for (const i of this.prr) {
        if (i.InstanceId === t) {
          return i;
        }
      }
    }
  }
  GetOptionByGuid(t) {
    if (t && this.prr) {
      for (const i of this.prr) {
        if (i.Guid === t) {
          return i;
        }
      }
    }
  }
  HandleInteractRequest() {
    if (this.frr?.Valid) {
      if (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(this.frr.Entity.Id) === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
        this.frr.Entity.GetComponent(48)?.MoveController?.PushMoveInfo();
      }
      this.frr.SetInteractionState(false, "发送交互请求");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
    if (this.OnInteractActionEnd) {
      this.OnInteractActionEnd();
    }
  }
  HandleInteractResponse(t, i) {
    if (this.frr?.Valid) {
      this.frr.SetServerLockInteract(i, "Interaction Response");
      this.frr.SetInteractionState(true, "接收交互应答");
    }
    if (t !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Interaction", 36, "交互失败", ["errorCode", t]);
      }
      this.frr.SetServerLockInteract(false, "交互失败");
      if (t !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist && t !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrInteractRange && t !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrInteractCd && t !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrPreCondition && t !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrInteractOptionGuidInvalid && t !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrInteractIsNotParticipant && t !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrInteracTreeSuspend && t !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrorBanInteractEntity) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t, 23746);
      }
      if (!ModelManager_1.ModelManager.PlotModel.IsInPlot && UiManager_1.UiManager.IsViewShow("PlotView")) {
        PlotController_1.PlotController.EndInteraction(false, true);
      }
    } else {
      if (i = this.Hte?.Entity?.GetComponent(152)) {
        i.CloseAllCollisions();
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInteractDropItemSuccess);
    }
  }
  HandleInteractClientAction() {
    if (this.frr?.Valid) {
      this.frr.SetInteractionState(false, "执行纯客户端行为");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
  }
  FinishInteractClientAction() {
    if (this.frr?.Valid) {
      this.frr.SetInteractionState(true, "完成纯客户端行为");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
  }
  Hrr(t) {
    if (!t) {
      return true;
    }
    let i = true;
    switch (t.Type) {
      case 2:
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.QuestId);
        if (e) {
          i = e.IsInteractValid;
        }
        break;
      case 3:
        e = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(t.LevelPlayId);
        if (e) {
          i = e.IsInteractValid;
        }
        break;
      case 6:
        e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(t.BtType, t.TreeConfigId);
        if (e) {
          i = e.IsInteractValid;
        }
    }
    return i;
  }
  GetInteractAdditionalInfoType() {
    return this._i_;
  }
  GetInteractionDebugInfos() {
    if (this.prr && this.prr?.length > 0) {
      let t = "";
      for (const e of this.prr) {
        t = (t = (t = (t = t + ("选项: " + (e.TidContent || "空名字")) + "\t\t") + ("交互选项类型: " + LevelGameplayActionsDefine_1.optionTypeLogString[e.OptionType]) + "\t\t") + ("交互类型: " + e.DoIntactType) + "\t\t") + ("Enable: " + !e.Disabled) + "\t\t";
        var i = this.Nrr(e);
        t += "满足开启条件: " + i;
        if (!i) {
          for (const r of e.Condition.Conditions) {
            t = (t += "\n") + "Condition: " + JSON.stringify(r);
          }
        }
        if (e.OptionType === 1) {
          t = (t += "\nContext:\n") + JSON.stringify(e.Context);
        }
        t += "\n\n";
      }
      return t;
    }
    return "无";
  }
  InitInteractPerceptionWithOffset(t) {
    var i = this.j3f;
    if (i.size !== 0) {
      for (const r of i.values()) {
        var e = r.ExitRange || this.Trr;
        t(r.Tag, r.Range, e, this.LocationOffset, () => {
          var t;
          this.$3f.add(r.Tag);
          if (!this.W3f.has(r.Tag)) {
            t = this.frr.PlayerTagComponent.ListenForTagAddOrRemove(r.Tag, this.Q3f);
            this.W3f.set(r.Tag, t);
          }
          if (this.frr?.PlayerTagComponent?.HasExactTag(r.Tag)) {
            this.frr?.ForceUpdate();
          }
        }, () => {
          this.$3f.delete(r.Tag);
          var t = this.W3f.get(r.Tag);
          if (t) {
            t.EndTask();
            this.W3f.delete(r.Tag);
          }
          if (this.frr?.PlayerTagComponent?.HasExactTag(r.Tag)) {
            this.frr?.ForceUpdate();
          }
        });
      }
    }
  }
  IsAnyTagCheckInRange() {
    return this.$3f.size > 0;
  }
  IsHasTagInTagCheckRange() {
    for (const t of this.$3f) {
      if (this.frr?.PlayerTagComponent?.HasExactTag(t)) {
        return true;
      }
    }
    return false;
  }
}
(exports.PawnInteractController = PawnInteractController).cz = Vector_1.Vector.Create();
PawnInteractController.fz = Vector_1.Vector.Create();
PawnInteractController.pz = Vector_1.Vector.Create();
PawnInteractController.tdc = Vector_1.Vector.Create(); //# sourceMappingURL=PawnInteractController.js.map
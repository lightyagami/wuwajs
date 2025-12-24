"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorAssistant = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const WorldFunctionLibrary_1 = require("../../../../World/Bridge/WorldFunctionLibrary");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
const HoldingHandsController_1 = require("../../../HoldHands/HoldingHandsController");
const PlotAudioModel_1 = require("../../PlotAudioModel");
const PlotController_1 = require("../../PlotController");
const SequenceDefine_1 = require("../SequenceDefine");
const SeqBaseAssistant_1 = require("./SeqBaseAssistant");
const BindingActorAnimBlendOutTime = 0.2;
const MaxPos = -999999;
const HidePos = new UE.VectorDouble(0, 0, MaxPos);
class ActorAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments);
    this.jto = undefined;
    this.Wto = undefined;
    this.Kto = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Qto = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Xto = undefined;
    this.$to = undefined;
    this.PreLoadMouthAssetName = new Array();
    this.CurLoadMouthIndex = 0;
    this.PreLoadMouthAssetMap = new Map();
    this.Yto = undefined;
    this.Haa = false;
    this.PreLoadNpcMap = new Map();
    this.NpcEntityMap = new Map();
  }
  Load(t) {
    this.Jto();
    this.sjc();
    this.zto(e => {
      this.Zto(e);
      this.tio(t);
    });
  }
  PreAllPlay(i) {
    var e;
    if ((!this.Model.SequenceData.SaveFinalTransform || (e = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity)?.Valid && e.Entity?.GetComponent(242)?.IsOnVehicle && e.Entity?.GetComponent(242)?.VehicleType === "Motorcycle" || Global_1.Global.BaseCharacter.KuroSetMovementMode({
      Mode: Global_1.Global.BaseCharacter.CharacterMovement.DefaultLandMovementMode,
      Context: "[Plot Sequence: ActorAssistant.PreAllPlay]"
    }), this.PreLoadNpcMap && this.PreLoadNpcMap.size > 0) && this.Model.BlendInCharacters) {
      for (const s of this.PreLoadNpcMap.keys()) {
        var t = this.PreLoadNpcMap.get(s);
        if (t) {
          let e = undefined;
          if (this.Model.BlendInCharacters) {
            for (const r of this.Model.BlendInCharacters) {
              if (r?.IsA(UE.BP_BaseRole_Seq_V2_C.StaticClass())) {
                var o = r;
                if (o && o.SkeletalMeshComponent0?.SkeletalMesh === t.Mesh?.SkeletalMesh) {
                  e = o;
                  break;
                }
              }
            }
            if (t && e) {
              if (e.SkeletalMeshComponent0?.SkeletalMesh === t.Mesh?.SkeletalMesh) {
                e.BeginSwitchPose(t, e, this.Model.SequenceData.AnimationBlendInTime, true);
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Plot", 45, "[NPC Blend]BeginSwitchPose 开始", ["Actor", e.GetName()]);
                }
                TimerSystem_1.TimerSystem.Next(() => {
                  e.EndSwitchPose(e, true);
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("Plot", 45, "[NPC Blend]EndSwitchPose 结束", ["Actor", e.GetName()]);
                  }
                });
                if (this.NpcEntityMap.has(s)) {
                  ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet.add(this.NpcEntityMap.get(s));
                }
              } else if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Plot", 45, "[NPC Blend]SkeletalMesh不相等", ["Actor", e.GetName()]);
              }
            }
          }
        }
      }
    }
    this.iio(() => {
      if (this.Model.PoseSwitched) {
        i(true);
      } else {
        let e = this.Model.BlendInCharacter;
        if (e = e === undefined ? this.Model.SeqMainCharacter : e) {
          const t = e;
          if (t.SkeletalMeshComponent0.SkeletalMesh === Global_1.Global.BaseCharacter.Mesh.SkeletalMesh) {
            t.BeginSwitchPose(Global_1.Global.BaseCharacter, t, this.Model.SequenceData.AnimationBlendInTime, true);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 38, "BeginSwitchPose 开始", ["Actor", Global_1.Global.BaseCharacter?.GetName()]);
            }
            this.Model.PoseSwitched = true;
            TimerSystem_1.TimerSystem.Next(() => {
              t.EndSwitchPose(t, true);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Plot", 38, "EndSwitchPose 结束", ["Actor", t]);
              }
              i(true);
            });
          } else {
            i(true);
          }
        } else {
          i(true);
        }
      }
    });
  }
  PreEachPlay() {
    if (!this.Haa) {
      this.eio();
      this.Haa = true;
    }
    const o = UE.NewArray(UE.Actor);
    this.Model.BindingActorMap.forEach((e, t) => {
      e.D_K2_SetActorLocation(HidePos, false, undefined, true);
      o.Empty();
      o.Add(e);
      if (t.op_Equality(SequenceDefine_1.HERO_TAG)) {
        (i = UE.NewArray(UE.BuiltinName)).Add(SequenceDefine_1.HERO_TAG);
        i.Add(ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1 ? SequenceDefine_1.MALE_TAG : SequenceDefine_1.FEMALE_TAG);
        i = UE.KuroSequenceRuntimeFunctionLibrary.FindMatchAllTagsBinding(i, this.Model.GetCurrentSequence());
        UE.KuroSequenceRuntimeFunctionLibrary.SetBindings(this.Model.CurLevelSeqActor, i, o);
      } else {
        this.Model.CurLevelSeqActor.SetBindingByTag(t, o, false, true);
      }
      var i = e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      if (i && (t = i.GetLinkedAnimGraphInstanceByTag(SequenceDefine_1.ABP_Base_Name))) {
        t.Montage_MuteAllMontage();
      }
    });
    this.Model.BindingEntityMap.forEach((e, t) => {
      o.Empty();
      e = e.Entity?.GetComponent(1)?.Owner;
      if (e) {
        o.Add(e);
        this.Model.CurLevelSeqActor.SetBindingByTag(t, o, false, true);
      }
    });
  }
  EachStop() {
    this.Model.BindingActorMap.forEach((e, t) => {
      e.D_K2_SetActorLocation(HidePos, false, undefined, true);
    });
  }
  async AllStopPromise() {
    this.Promise = new CustomPromise_1.CustomPromise();
    if (ModelManager_1.ModelManager.PlotModel.InSeamlessFormation) {
      await PlotController_1.PlotController.CheckFormation();
    }
    this.TeleportToFinal();
    this.rio();
    this.Model.BindingEntityMap.clear();
    this.PreLoadMouthAssetMap.clear();
    if (this.Model.IsSeamless) {
      return true;
    }
    let t = false;
    for (const n of ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n, true, "显示NPC", false);
    }
    if (this.PreLoadNpcMap && this.PreLoadNpcMap.size > 0 && this.Model.BlendOutCharacters) {
      for (const l of this.PreLoadNpcMap.keys()) {
        var i = this.PreLoadNpcMap.get(l);
        if (i) {
          let e = undefined;
          if (this.Model.BlendOutCharacters) {
            for (const a of this.Model.BlendOutCharacters) {
              if (a?.IsA(UE.BP_BaseRole_Seq_V2_C.StaticClass())) {
                var o = a;
                if (o && o.SkeletalMeshComponent0?.SkeletalMesh === i.Mesh?.SkeletalMesh) {
                  e = o;
                  break;
                }
              }
            }
            if (i && e) {
              if (e.SkeletalMeshComponent0?.SkeletalMesh === i.Mesh?.SkeletalMesh) {
                t = true;
                e.BeginSwitchPose(e, i, this.Model.SequenceData.AnimationBlendOutTime, true);
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Plot", 45, "[NPC Blend]BeginSwitchPose 开始", ["Actor", i.GetName()]);
                }
              } else if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Plot", 45, "[NPC Blend]SkeletalMesh不相等", ["Actor", i.GetName()]);
              }
            }
          }
        }
      }
    }
    let e = this.Model.BlendOutCharacter;
    if (!(e = e === undefined ? this.Model.SeqMainCharacter : e)) {
      if (t) {
        this.Model.BeginSwitchFrame = 2;
        const r = await this.Promise.Promise;
        return r;
      }
      return !(this.Promise = undefined);
    }
    this.jaa(false);
    var s = e;
    if (s.SkeletalMeshComponent0.SkeletalMesh !== Global_1.Global.BaseCharacter.Mesh.SkeletalMesh) {
      if (t) {
        this.Model.BeginSwitchFrame = 2;
        const r = await this.Promise.Promise;
        return r;
      }
      this.nio();
      return !(this.Promise = undefined);
    }
    t = true;
    s.BeginSwitchPose(s, Global_1.Global.BaseCharacter, this.Model.SequenceData.AnimationBlendOutTime, true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "BeginSwitchPose 开始", ["Actor", Global_1.Global.BaseCharacter?.GetName()]);
    }
    if (t) {
      this.Model.BeginSwitchFrame = 2;
    }
    const r = await this.Promise.Promise;
    return r;
  }
  EndSwitchPose() {
    let e = this.Model.BlendOutCharacter;
    (e = e === undefined ? this.Model.SeqMainCharacter : e)?.EndSwitchPose(Global_1.Global.BaseCharacter, true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "EndSwitchPose结束", ["Actor", Global_1.Global.BaseCharacter?.GetName()]);
    }
    for (const o of this.PreLoadNpcMap.keys()) {
      var t = this.PreLoadNpcMap.get(o);
      if (t) {
        let e = undefined;
        if (this.Model.BlendOutCharacters) {
          for (const s of this.Model.BlendOutCharacters) {
            if (s?.IsA(UE.BP_BaseRole_Seq_V2_C.StaticClass())) {
              var i = s;
              if (i && i.SkeletalMeshComponent0?.SkeletalMesh === t.Mesh?.SkeletalMesh) {
                e = i;
                break;
              }
            }
          }
          if (t && e) {
            if (e.SkeletalMeshComponent0?.SkeletalMesh === t.Mesh?.SkeletalMesh) {
              e.EndSwitchPose(t, true);
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Plot", 45, "[NPC Blend]EndSwitchPose 结束", ["Actor", t.GetName()]);
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Plot", 45, "[NPC Blend]SkeletalMesh不相等", ["Actor", t.GetName()]);
            }
          }
        }
      }
    }
    this.PreLoadNpcMap.clear();
    this.nio();
    if (this.Promise) {
      this.Promise.SetResult(true);
      this.Promise = undefined;
    }
  }
  TeleportToFinal() {
    var e;
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (t?.Valid && this.Model.SequenceData.SaveFinalTransform) {
      if (e = this.Model.GetLastTransform()) {
        this.Dqf(t, e);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "SequenceData内缺失FinalPos，联系演出进行后处理");
      }
    }
  }
  Dqf(e, t) {
    var i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (i?.Valid && i.Entity?.GetComponent(242)?.IsOnVehicle && i.Entity?.GetComponent(242)?.VehicleType === "Motorcycle") {
      i = new UE.VectorDouble(t.GetLocation().X, t.GetLocation().Y, t.GetLocation().Z);
      ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayerInVehicle({
        ClientReason: "Sequence最终位置同步",
        TargetPosition: i,
        TargetRotation: t.GetRotation().Rotator(),
        TeleportMode: 1,
        NeedWaitStreaming: !this.Model.SequenceData.bIsForceFinalTrans
      });
    } else {
      if (!e.FixBornLocation("Sequence最终位置同步", true, t.GetLocation(), false) && this.Model.SequenceData.bIsForceFinalTrans) {
        e.SetActorLocation(t.GetLocation().ToUeVector(), "Sequence最终位置同步", false);
      }
      e.SetActorRotation(t.GetRotation().Rotator().ToUeRotator(), "Sequence最终位置同步");
    }
    e.ClearInput();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "SaveFinalPos", ["transform", t]);
    }
    ControllerHolder_1.ControllerHolder.FlowController.RequestPosition(t.GetLocation(), t.GetRotation().Rotator());
    var i = this.Model.NpcGroupPerform;
    for (const n of i) {
      var o;
      var s;
      var r = ModelManager_1.ModelManager.SequenceModel.NpcRelationMap.get(n);
      if (r) {
        if (r.RelationType === 1) {
          r = r;
          o = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(r.Leader?.Entity);
          s = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(r.Follower?.Entity);
          if (o && s) {
            HoldingHandsController_1.HoldingHandsController.RequestHoldHands(r.Key, o, s, r.LeaderHandType, false, false, "Sequence结束");
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Plot", 45, "牵手者获取失败", ["leaderHandle", o], ["followerHandle", s]);
          }
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 45, "Relation获取失败");
      }
    }
  }
  End() {
    if (this.jto) {
      this.jto.Cancel();
    }
    if (this.Kto !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Kto);
      this.Kto = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (this.Qto !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Qto);
      this.Qto = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (this.Wto) {
      this.Wto.Remove();
      this.Wto = undefined;
    }
    if (this.Promise) {
      this.Promise.SetResult(false);
    }
    this.$to = undefined;
    this.rio();
    this.jaa(false);
    this.nio();
    ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet.clear();
    ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle = undefined;
    if (!this.Model.IsSeamless) {
      this.Model.PoseSwitched = false;
    }
  }
  sjc() {
    this.PreLoadNpcMap.clear();
    ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet.clear();
    this.NpcEntityMap.clear();
    ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle = undefined;
    var t = this.Model.SequenceData.绑定角色标签;
    var i = t.Num();
    if (i !== 0) {
      for (let e = 0; e < i; e++) {
        var o = t.Get(e);
        if (o.toString().includes("Perform_NPC")) {
          var s = new Array();
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(o.toString(), s);
          if (s.length !== 1) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "[NPC Blend]tag获取的Entity数量并非唯一", ["Tag", o.toString()], ["num", s.length]);
            }
            continue;
          }
          var r = s[0];
          var n = r.Entity?.GetComponent(0);
          if (!n) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "[NPC Blend]不存在的Entity", ["Tag", o.toString()], ["num", s.length]);
            }
            continue;
          }
          var r = r.Entity?.EntityData?.GetActor();
          if (!r?.IsValid()) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "[NPC Blend]不存在的Entity actor", ["Tag", o.toString()], ["num", s.length]);
            }
            continue;
          }
          if (!r.IsA(UE.BP_BaseNPC_C.StaticClass())) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "[NPC Blend]非BP_BaseNPC_C", ["Tag", o.toString()], ["num", s.length]);
            }
            continue;
          }
          var s = r;
          this.PreLoadNpcMap.set(n.GetPbDataId(), s);
          var r = n.GetCreatureDataId();
          var s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(r);
          var r = EntitySystem_1.EntitySystem.Get(s);
          if (!r) {
            continue;
          }
          this.NpcEntityMap.set(n.GetPbDataId(), r);
        }
        if (SequenceDefine_1.MOTOR_TAG.op_Equality(o)) {
          s = new Array();
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(o.toString(), s);
          if (s.length !== 1) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "[Motor Blend]tag获取的Entity数量并非唯一", ["Tag", o.toString()], ["num", s.length]);
            }
          } else if ((n = s[0]).Entity?.GetComponent(0)) {
            if ((r = n.Entity?.EntityData?.GetActor())?.IsValid()) {
              if (r.IsA(UE.TsBaseVehicle_C.StaticClass())) {
                ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle = n;
              } else if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Plot", 45, "[Motor Blend]非BP_BaseVehicle_C", ["Tag", o.toString()], ["num", s.length]);
              }
            } else if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "[Motor Blend]不存在的Entity actor", ["Tag", o.toString()], ["num", s.length]);
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 45, "[Motor Blend]不存在的Entity", ["Tag", o.toString()], ["num", s.length]);
          }
        }
      }
    }
  }
  Jto() {
    this.Model.BlendInCharacter = undefined;
    this.Model.BlendOutCharacter = undefined;
    var t = this.Model.SequenceData.GeneratedData?.BindingBP;
    if (t) {
      var i = this.Model.SequenceData.GeneratedData?.BlendInTag;
      var o = this.Model.SequenceData.GeneratedData?.BlendInTags;
      var s = this.Model.SequenceData.GeneratedData?.BlendOutTag;
      var r = this.Model.SequenceData.GeneratedData?.BlendOutTags;
      var n = this.Model.SequenceData.葫芦状态;
      var l = t.Num();
      for (let e = 0; e < l; e++) {
        var a = t.Get(e);
        var h = UE.KuroActorManager.D_SpawnActor(Info_1.Info.World, a, MathUtils_1.MathUtils.DefaultTransformDouble, 1, undefined);
        if (ObjectUtils_1.ObjectUtils.IsValid(h)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "生成Seq绑定蓝图的Actor", ["Class", h.GetName()]);
          }
          var _ = h;
          if (_) {
            this.Model.BindingActorMap.set(_.BindingTag, h);
            h.D_K2_SetActorLocation(HidePos, false, undefined, true);
            if (n > 0) {
              _.ChangeHuluState(n);
            }
            if (i && i.op_Equality(_.BindingTag) && !FNameUtil_1.FNameUtil.IsNothing(i)) {
              this.Model.BlendInCharacter = _;
            }
            if (o) {
              for (let e = 0; e < o.Num(); e++) {
                var d = o.Get(e);
                if (d && d.op_Equality(_.BindingTag) && !FNameUtil_1.FNameUtil.IsNothing(d)) {
                  this.Model.BlendInCharacters?.push(_);
                  break;
                }
              }
            }
            if (s && s.op_Equality(_.BindingTag) && !FNameUtil_1.FNameUtil.IsNothing(s)) {
              this.Model.BlendOutCharacter = _;
            }
            if (s) {
              for (let e = 0; e < r.Num(); e++) {
                var g = r.Get(e);
                if (g && g.op_Equality(_.BindingTag) && !FNameUtil_1.FNameUtil.IsNothing(g)) {
                  this.Model.BlendOutCharacters?.push(_);
                  break;
                }
              }
            }
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "Seq绑定蓝图生成Actor失败", ["Class", a.GetName()]);
        }
      }
    }
  }
  nio() {
    if (this.Model.BindingActorMap && this.Model.BindingActorMap.size !== 0) {
      this.Model.BindingActorMap.forEach(e => {
        e.D_K2_SetActorLocation(HidePos, false, undefined, true);
        if (e) {
          e.CleanHuluState();
        }
        UE.KuroActorManager.DestroyActor(e);
      });
      this.Model.BindingActorMap.clear();
      this.Model.SeqMainCharacter = undefined;
      this.Model.MainSeqCharacterMesh = undefined;
      this.Model.BlendInCharacter = undefined;
      this.Model.BlendOutCharacter = undefined;
      this.Model.BlendInCharacters = undefined;
      this.Model.BlendOutCharacters = undefined;
    }
  }
  jaa(e) {
    var t;
    var i = this.Model.HidePlayerEntityHandle;
    if (e) {
      t = (e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Entity;
      if (!i && t) {
        this.Model.HidePlayerEntityHandle = e;
        t.DisableByKey(7);
        ControllerHolder_1.ControllerHolder.PlotController.HideSummonedEntity();
      }
      if (ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle?.Entity) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle?.Entity, false, "Plot hide vehicle", false);
      }
    } else {
      if (i) {
        if (e = i.Entity) {
          e.EnableByKey(7);
        }
        this.Model.HidePlayerEntityHandle = undefined;
      }
      if (ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle?.Entity) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle?.Entity, true, "Plot enable vehicle", false);
        ModelManager_1.ModelManager.SequenceModel.PlotBindingVehicle = undefined;
      }
    }
  }
  zto(t) {
    const i = new Map();
    var o = this.Model.SequenceData.绑定角色标签;
    var s = o.Num();
    if (s === 0) {
      t(undefined);
    } else {
      var r = new Array();
      for (let e = 0; e < s; e++) {
        var n = new Array();
        var l = o.Get(e);
        if (!SequenceDefine_1.HERO_TAG.op_Equality(l) && !l.toString().includes("Perform_NPC") && !SequenceDefine_1.MOTOR_TAG.op_Equality(l) && (n.length = 0, ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(l.toString(), n), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "Sequence绑定找到实体", ["Tag", l.toString()], ["num", n.length]), n.length !== 0)) {
          i.set(l, n);
          for (const h of n) {
            var a = h.Entity.GetComponent(0);
            r.push(a.GetCreatureDataId());
          }
        }
      }
      if (r.length === 0) {
        t(undefined);
      } else {
        this.jto = WaitEntityTask_1.WaitEntityTask.Create("ActorAssistant.WaitBindingEntities", r, e => {
          if (!e) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 26, "有需要绑定的实体，但实体创建失败了");
            }
          }
          this.jto = undefined;
          t(i);
        });
      }
    }
  }
  Zto(t) {
    if (t) {
      var i;
      var o = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
      if (o) {
        let e = undefined;
        for (var [s, r] of t) {
          e = undefined;
          if (r && r.length !== 0) {
            for (const n of r) {
              if (n?.IsInit && n?.Valid && (i = n.Entity.GetComponent(1).ActorLocationProxy, i = Vector_1.Vector.DistSquared(i, o), e === undefined || e > i)) {
                this.Model.BindingEntityMap.set(s, n);
                e = i;
              }
            }
          }
        }
        this.Model.BindingEntityMap.forEach((e, t) => {
          e = e.Entity.GetComponent(0)?.GetCreatureDataId();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "实体被绑定入Sequence：", ["Tag", t.toString()], ["PbDataId", e]);
          }
        });
      }
    }
  }
  eio() {
    for (var [e, t] of this.Model.BindingEntityMap) {
      var i;
      var o;
      if (t.Valid) {
        i = new SequenceDefine_1.SequenceEntityInfo();
        this.Model.ControlEntityMap.set(t.Id, i);
        if ((o = t.Entity.GetComponent(41))?.Valid) {
          o.StopAllSkills("ActorAssistant.ControlBindingEntity");
        }
        if ((o = t.Entity.GetComponent(1))?.Valid && (o.SetCollisionEnable(false, "Plot Sequence Binding"), o.SetSequenceBinding(true), (0, RegisterComponent_1.isComponentInstance)(o, 3))) {
          o.Actor.CharRenderingComponent?.SetDisableFightDither(true);
        }
        if ((o = t.Entity.GetComponent(71))?.Valid) {
          i.CacheMovementSync = o.GetEnableMovementSync();
          o.SetEnableMovementSync(false, "ActorAssistant");
        }
        if (e.op_Equality(SequenceDefine_1.BOSS_TAG) && (o = t.Entity.GetComponent(186))?.Valid) {
          o.MainAnimInstance.Montage_Stop(0);
          o.StartForceDisableAnimOptimization(0, false);
        }
        if ((e = t.Entity.GetComponent(46))?.Valid) {
          e.StopMove(true);
          i.MoveCompDisableHandle = e.Disable("Plot Sequence Binding");
        }
        if ((o = t.Entity.GetComponent(122))?.Valid) {
          i.UeMoveCompDisableHandle = o.Disable("Plot Sequence Binding");
        }
        if ((e = t.Entity.GetComponent(183))?.Valid) {
          e.AddBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, {
            InstigatorId: e.CreatureDataId,
            Reason: "ActorAssistant.ControlBindingEntity"
          });
        }
        t.Entity.GetComponent(48)?.DisableAi("Plot Sequence Binding");
      }
    }
  }
  rio() {
    this.Haa = false;
    if (this.Model.BindingEntityMap && this.Model.BindingEntityMap.size !== 0) {
      for (var [e, t] of this.Model.BindingEntityMap) {
        var i;
        var o;
        var s;
        var r = this.Model.ControlEntityMap.get(t.Id);
        if (t?.Valid) {
          if ((o = t.Entity.GetComponent(1))?.Valid && (o.SetCollisionEnable(true, "Plot Sequence Binding"), o.SetSequenceBinding(false), (0, RegisterComponent_1.isComponentInstance)(o, 3)) && (o.ClearInput(), o.Actor.CharRenderingComponent?.SetDisableFightDither(false), o.Actor.Mesh.SetBoundsScale(1), i = o.Actor.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())) && (i = i.GetLinkedAnimGraphInstanceByTag(SequenceDefine_1.ABP_Base_Name))) {
            i.StopSlotAnimation(BindingActorAnimBlendOutTime, SequenceDefine_1.ABP_Seq_Slot_Name);
          }
          if (e.op_Equality(SequenceDefine_1.BOSS_TAG) && (i = t.Entity.GetComponent(186))?.Valid) {
            i.CancelForceDisableAnimOptimization(0);
            i.ConsumeRootMotion();
          }
          if (e !== SequenceDefine_1.HERO_TAG && (e = t.Entity.GetComponent(71))?.Valid && r.CacheMovementSync) {
            e.SetEnableMovementSync(true, "ActorAssistant");
            e.CollectSampleAndSend(true);
          }
          if (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(t.Entity.Id) === Protocol_1.Aki.Protocol.kks.Proto_Npc && (e = Protocol_1.Aki.Protocol.ecs.create(), (s = Protocol_1.Aki.Protocol.Zks.create()).F4n = MathUtils_1.MathUtils.NumberToLong(o.CreatureData.GetCreatureDataId()), s.P5n = o.ActorLocationProxy, s.g8n = o.ActorRotationProxy, e.iVn = [s], Net_1.Net.Send(27928, e), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("AI", 42, "向服务器同步NPC位置", ["实体ID", s.F4n], ["X", s.P5n.X], ["Y", s.P5n.Y], ["Z", s.P5n.Z]);
          }
          if ((o = t.Entity.GetComponent(46))?.Valid) {
            o.StopMove(false);
            o.Enable(r.MoveCompDisableHandle, "[ActorAssistant.ReleaseBindingEntity] moveComp.Valid=true");
          }
          if ((e = t.Entity.GetComponent(122))?.Valid) {
            e.Enable(r.UeMoveCompDisableHandle, "[ActorAssistant.ReleaseBindingEntity] ueMoveComp.Valid=true");
          }
          if ((s = t.Entity.GetComponent(183))?.Valid) {
            s.RemoveBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, -1, "ActorAssistant.ReleaseBindingEntity");
          }
          t.Entity.GetComponent(48)?.EnableAi("Plot Sequence Binding");
        }
      }
      this.Model.BindingEntityMap.clear();
    }
  }
  tio(t) {
    var e;
    this.Model.MainSeqCharacterMesh = undefined;
    if (this.Model.SequenceData.NeedSwitchMainCharacter) {
      if ((e = this.Model.SeqMainCharacterModelConfig.网格体?.ToAssetPathName()) && e.length && e !== "None") {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角-开始");
        }
        this.Qto = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.GetAsset(e, UE.SkeletalMesh, e => {
          this.Qto = ResourceSystem_1.ResourceSystem.InvalidId;
          if (e) {
            this.Model.MainSeqCharacterMesh = e;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角-完成");
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角-失败");
          }
          t(true);
        });
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("Seq主角的ModelConfig网格体为空", ["ID", this.Model.SeqMainCharacterModelConfig?.ID]);
        t(true);
      }
    } else {
      t(true);
    }
  }
  iio(i) {
    var e;
    if (this.Model.SequenceData.NeedSwitchMainCharacter) {
      if ((e = this.Model.SeqMainCharacterModelConfig.蓝图?.ToAssetPathName()) && e.length && e !== "None") {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角BP-开始");
        }
        this.Kto = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.GetAsset(e, UE.Class, e => {
          this.Kto = ResourceSystem_1.ResourceSystem.InvalidId;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角BP-完成");
          }
          this.Model.SeqMainCharacter = UE.KuroActorManager.D_SpawnActor(Info_1.Info.World, e, Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform, 1, undefined);
          var e = this.Model.SeqMainCharacter.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
          if (e) {
            e.SetSkeletalMesh(this.Model.MainSeqCharacterMesh);
            if (this.Model.GetType() === 0 || this.Model.GetType() === 2) {
              t = e.D_GetRelativeTransform();
              this.Model.SeqMainCharacter.D_K2_AddActorWorldTransform(t, false, undefined, false);
              e.D_K2_SetRelativeLocationAndRotation(Vector_1.Vector.ZeroVectorDouble, Rotator_1.Rotator.ZeroRotator, false, undefined, false);
            }
          } else {
            ControllerHolder_1.ControllerHolder.FlowController.LogError("网格体类型错误");
          }
          var t = this.Model.SeqMainCharacter;
          if (t && (e = this.Model.SequenceData.葫芦状态) > 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 38, "葫芦状态", ["HuluState", e]);
            }
            t.ChangeHuluState(e);
          }
          this.Model.SeqMainCharacter.D_K2_SetActorLocation(HidePos, false, undefined, true);
          this.Model.BindingActorMap.set(SequenceDefine_1.HERO_TAG, this.Model.SeqMainCharacter);
          i();
        });
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("Seq主角的ModelConfig蓝图为空", ["ID", this.Model.SeqMainCharacterModelConfig?.ID]);
      }
    } else {
      i();
    }
  }
  sio() {
    if (this.CurLoadMouthIndex >= this.PreLoadMouthAssetName.length) {
      this.Yto.SetResult(true);
    } else {
      const t = this.PreLoadMouthAssetName[this.CurLoadMouthIndex];
      this.CurLoadMouthIndex++;
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 38, "预加载口型资源跳过，textKey 为空");
        }
        this.sio();
      } else {
        var e = PlotAudioById_1.configPlotAudioById.GetConfig(t);
        if (e) {
          const i = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName(e);
          if (e.GenLipSync) {
            ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.GetAsset(i, UE.AnimSequence, e => {
              if (e) {
                this.PreLoadMouthAssetMap.set(t, e);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Plot", 38, "预加载口型资源", ["assetPath", i]);
                }
              } else if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Plot", 38, "预加载口型资源错误：有语音没口型", ["textKey", t], ["assetPath", i]);
              }
              this.sio();
            });
          } else {
            this.sio();
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 38, "预加载口型资源跳过，没有语音配置", ["textKey", t]);
          }
          this.sio();
        }
      }
    }
  }
  async BeginLoadMouthAssetPromise() {
    this.Yto = new CustomPromise_1.CustomPromise();
    this.CurLoadMouthIndex = 0;
    this.PreLoadMouthAssetMap.clear();
    return this.PreLoadMouthAssetName === undefined || this.PreLoadMouthAssetName.length === 0 || (this.sio(), this.Yto.Promise);
  }
  TryApplyMouthAnim(e, t) {
    this.Model.TalkNpcList = this.Model.CurLevelSeqActor?.GetBindingByTag(SequenceDefine_1.TALK_NPC_TAG, true);
    this.StopMouthAnim();
    this.Xto = undefined;
    this.$to = undefined;
    if (this.Model.GetType() === 1) {
      this.Xto = this.PreLoadMouthAssetMap.get(e);
      if (this.Xto) {
        this.FindApplyMouthAnim(t);
        if (this.$to) {
          this.$to.PlaySlotAnimationAsDynamicMontage(this.Xto, SequenceDefine_1.ABP_Mouth_Slot_Name, 0, 0, 1, 1, -1, 0, true);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 38, "MouthAnim 播放口型", ["Key", e], ["Asset", this.Xto.GetName()], ["ABP", this.$to.GetName()]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 38, "MouthAnim 没有找到口型ABP", ["whoID", t]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 38, "MouthAnim 没有口型资源", ["TextKey", e]);
      }
    }
  }
  FindApplyMouthAnim(t) {
    let i = false;
    this.Model.BindingActorMap.forEach(e => {
      if (!!e?.IsValid() && (e.TalkID === t || e.TalkID_SP === t)) {
        this.$to = e.SkeletalMeshComponent0?.GetLinkedAnimGraphInstanceByTag(SequenceDefine_1.ABP_Base_Name);
        i = true;
      }
    });
    if (!i && this.Model.TalkNpcList !== undefined) {
      var o = this.Model.TalkNpcList.Num();
      for (let e = 0; e < o; e++) {
        var s = this.Model.TalkNpcList.Get(e);
        var r = s;
        if (r?.IsValid() && (r.TalkID === t || r.TalkID_SP === t) && (this.$to = r.SkeletalMeshComponent0?.GetLinkedAnimGraphInstanceByTag(SequenceDefine_1.ABP_Base_Name), this.$to)) {
          return;
        }
        r = s;
        if (r?.IsValid() && (r.TalkID === t || r.TalkID_SP === t) && (this.$to = r.Skel_Main?.GetAnimInstance(), this.$to)) {
          return;
        }
        r = s;
        if (r?.IsValid() && (r.TalkID === t || r.TalkID_SP === t) && (this.$to = r.SkeletalMesh?.GetAnimInstance(), this.$to)) {
          return;
        }
        r = s;
        if (r?.IsValid() && (r.TalkID === t || r.TalkID_SP === t) && (this.$to = r.SkeletalMesh?.GetAnimInstance(), this.$to)) {
          return;
        }
      }
    }
  }
  StopMouthAnim() {
    if (this.$to) {
      this.$to.StopSlotAnimation(0, SequenceDefine_1.ABP_Mouth_Slot_Name);
      this.$to = undefined;
    }
  }
  CheckHideBattleCharacter() {
    if (this.Model.SequenceData.HidePlayer || this.Model.SequenceData.NeedSwitchMainCharacter) {
      this.jaa(true);
    }
    for (const e of ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e, false, "隐藏NPC", false);
    }
  }
  PlayerHide() {
    if (this.Model.BindingActorMap.get(SequenceDefine_1.HERO_TAG) && (this.Model.BindingActorMap.get(SequenceDefine_1.HERO_TAG).D_K2_SetActorLocation(HidePos, false, undefined, true), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Plot", 45, "过场seq内不存在男女主，开始尝试隐藏");
    }
  }
}
exports.ActorAssistant = ActorAssistant;
//# sourceMappingURL=ActorAssistant.js.map
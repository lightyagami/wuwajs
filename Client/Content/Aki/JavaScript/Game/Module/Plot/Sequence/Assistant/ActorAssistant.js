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
  Load(e) {
    this.Jto();
    this.sjc();
    this.zto(t => {
      this.Zto(t);
      this.tio(e);
    });
  }
  PreAllPlay(i) {
    if ((this.Model.SequenceData.SaveFinalTransform && Global_1.Global.BaseCharacter.KuroSetMovementMode({
      Mode: Global_1.Global.BaseCharacter.CharacterMovement.DefaultLandMovementMode,
      Context: "[Plot Sequence: ActorAssistant.PreAllPlay]"
    }), this.PreLoadNpcMap && this.PreLoadNpcMap.size > 0) && this.Model.BlendInCharacters) {
      for (const s of this.PreLoadNpcMap.keys()) {
        var e = this.PreLoadNpcMap.get(s);
        if (e) {
          let t = undefined;
          if (this.Model.BlendInCharacters) {
            for (const r of this.Model.BlendInCharacters) {
              if (r?.IsA(UE.BP_BaseRole_Seq_V2_C.StaticClass())) {
                var o = r;
                if (o && o.SkeletalMeshComponent0?.SkeletalMesh === e.Mesh?.SkeletalMesh) {
                  t = o;
                  break;
                }
              }
            }
            if (e && t) {
              if (t.SkeletalMeshComponent0?.SkeletalMesh === e.Mesh?.SkeletalMesh) {
                t.BeginSwitchPose(e, t, this.Model.SequenceData.AnimationBlendInTime, true);
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Plot", 45, "[NPC Blend]BeginSwitchPose 开始", ["Actor", t.GetName()]);
                }
                TimerSystem_1.TimerSystem.Next(() => {
                  t.EndSwitchPose(t, true);
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("Plot", 45, "[NPC Blend]EndSwitchPose 结束", ["Actor", t.GetName()]);
                  }
                });
                if (this.NpcEntityMap.has(s)) {
                  ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet.add(this.NpcEntityMap.get(s));
                }
              } else if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Plot", 45, "[NPC Blend]SkeletalMesh不相等", ["Actor", t.GetName()]);
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
        let t = this.Model.BlendInCharacter;
        if (t = t === undefined ? this.Model.SeqMainCharacter : t) {
          const e = t;
          if (e.SkeletalMeshComponent0.SkeletalMesh === Global_1.Global.BaseCharacter.Mesh.SkeletalMesh) {
            e.BeginSwitchPose(Global_1.Global.BaseCharacter, e, this.Model.SequenceData.AnimationBlendInTime, true);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 38, "BeginSwitchPose 开始", ["Actor", Global_1.Global.BaseCharacter?.GetName()]);
            }
            this.Model.PoseSwitched = true;
            TimerSystem_1.TimerSystem.Next(() => {
              e.EndSwitchPose(e, true);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Plot", 38, "EndSwitchPose 结束", ["Actor", e]);
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
    this.Model.BindingActorMap.forEach((t, e) => {
      t.D_K2_SetActorLocation(HidePos, false, undefined, true);
      o.Empty();
      o.Add(t);
      if (e.op_Equality(SequenceDefine_1.HERO_TAG)) {
        (i = UE.NewArray(UE.BuiltinName)).Add(SequenceDefine_1.HERO_TAG);
        i.Add(ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1 ? SequenceDefine_1.MALE_TAG : SequenceDefine_1.FEMALE_TAG);
        i = UE.KuroSequenceRuntimeFunctionLibrary.FindMatchAllTagsBinding(i, this.Model.GetCurrentSequence());
        UE.KuroSequenceRuntimeFunctionLibrary.SetBindings(this.Model.CurLevelSeqActor, i, o);
      } else {
        this.Model.CurLevelSeqActor.SetBindingByTag(e, o, false, true);
      }
      var i = t.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      if (i && (e = i.GetLinkedAnimGraphInstanceByTag(SequenceDefine_1.ABP_Base_Name))) {
        e.Montage_MuteAllMontage();
      }
    });
    this.Model.BindingEntityMap.forEach((t, e) => {
      o.Empty();
      t = t.Entity?.GetComponent(1)?.Owner;
      if (t) {
        o.Add(t);
        this.Model.CurLevelSeqActor.SetBindingByTag(e, o, false, true);
      }
    });
  }
  EachStop() {
    this.Model.BindingActorMap.forEach((t, e) => {
      t.D_K2_SetActorLocation(HidePos, false, undefined, true);
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
    let e = false;
    for (const n of ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n, true, "显示NPC", false);
    }
    if (this.PreLoadNpcMap && this.PreLoadNpcMap.size > 0 && this.Model.BlendOutCharacters) {
      for (const l of this.PreLoadNpcMap.keys()) {
        var i = this.PreLoadNpcMap.get(l);
        if (i) {
          let t = undefined;
          if (this.Model.BlendOutCharacters) {
            for (const h of this.Model.BlendOutCharacters) {
              if (h?.IsA(UE.BP_BaseRole_Seq_V2_C.StaticClass())) {
                var o = h;
                if (o && o.SkeletalMeshComponent0?.SkeletalMesh === i.Mesh?.SkeletalMesh) {
                  t = o;
                  break;
                }
              }
            }
            if (i && t) {
              if (t.SkeletalMeshComponent0?.SkeletalMesh === i.Mesh?.SkeletalMesh) {
                e = true;
                t.BeginSwitchPose(t, i, this.Model.SequenceData.AnimationBlendOutTime, true);
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
    let t = this.Model.BlendOutCharacter;
    if (!(t = t === undefined ? this.Model.SeqMainCharacter : t)) {
      if (e) {
        this.Model.BeginSwitchFrame = 2;
        const r = await this.Promise.Promise;
        return r;
      }
      return !(this.Promise = undefined);
    }
    this.jaa(false);
    var s = t;
    if (s.SkeletalMeshComponent0.SkeletalMesh !== Global_1.Global.BaseCharacter.Mesh.SkeletalMesh) {
      if (e) {
        this.Model.BeginSwitchFrame = 2;
        const r = await this.Promise.Promise;
        return r;
      }
      this.nio();
      return !(this.Promise = undefined);
    }
    e = true;
    s.BeginSwitchPose(s, Global_1.Global.BaseCharacter, this.Model.SequenceData.AnimationBlendOutTime, true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "BeginSwitchPose 开始", ["Actor", Global_1.Global.BaseCharacter?.GetName()]);
    }
    if (e) {
      this.Model.BeginSwitchFrame = 2;
    }
    const r = await this.Promise.Promise;
    return r;
  }
  EndSwitchPose() {
    let t = this.Model.BlendOutCharacter;
    (t = t === undefined ? this.Model.SeqMainCharacter : t)?.EndSwitchPose(Global_1.Global.BaseCharacter, true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "EndSwitchPose结束", ["Actor", Global_1.Global.BaseCharacter?.GetName()]);
    }
    for (const o of this.PreLoadNpcMap.keys()) {
      var e = this.PreLoadNpcMap.get(o);
      if (e) {
        let t = undefined;
        if (this.Model.BlendOutCharacters) {
          for (const s of this.Model.BlendOutCharacters) {
            if (s?.IsA(UE.BP_BaseRole_Seq_V2_C.StaticClass())) {
              var i = s;
              if (i && i.SkeletalMeshComponent0?.SkeletalMesh === e.Mesh?.SkeletalMesh) {
                t = i;
                break;
              }
            }
          }
          if (e && t) {
            if (t.SkeletalMeshComponent0?.SkeletalMesh === e.Mesh?.SkeletalMesh) {
              t.EndSwitchPose(e, true);
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Plot", 45, "[NPC Blend]EndSwitchPose 结束", ["Actor", e.GetName()]);
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Plot", 45, "[NPC Blend]SkeletalMesh不相等", ["Actor", e.GetName()]);
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
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (t?.Valid && this.Model.SequenceData.SaveFinalTransform) {
      var e = this.Model.GetLastTransform();
      if (e) {
        if (!t.FixBornLocation("Sequence最终位置同步", true, e.GetLocation(), false) && this.Model.SequenceData.bIsForceFinalTrans) {
          t.SetActorLocation(e.GetLocation().ToUeVector(), "Sequence最终位置同步", false);
        }
        t.SetActorRotation(e.GetRotation().Rotator().ToUeRotator(), "Sequence最终位置同步");
        t.ClearInput();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "SaveFinalPos", ["transform", e]);
        }
        ControllerHolder_1.ControllerHolder.FlowController.RequestPosition(e.GetLocation(), e.GetRotation().Rotator());
        t = this.Model.NpcGroupPerform;
        for (const r of t) {
          var i;
          var o;
          var s = ModelManager_1.ModelManager.SequenceModel.NpcRelationMap.get(r);
          if (s) {
            i = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(s.Leader?.Entity);
            o = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(s.Follower?.Entity);
            if (i && o) {
              HoldingHandsController_1.HoldingHandsController.RequestHoldHands(s.Key, i, o, s.LeaderHandType, false, false, "Sequence结束");
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Plot", 45, "牵手者获取失败", ["leaderHandle", i], ["followerHandle", o]);
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Plot", 45, "Relation获取失败");
          }
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "SequenceData内缺失FinalPos，联系演出进行后处理");
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
    if (!this.Model.IsSeamless) {
      this.Model.PoseSwitched = false;
    }
  }
  sjc() {
    this.PreLoadNpcMap.clear();
    ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet.clear();
    this.NpcEntityMap.clear();
    var e = this.Model.SequenceData.绑定角色标签;
    var i = e.Num();
    if (i !== 0) {
      for (let t = 0; t < i; t++) {
        var o;
        var s;
        var r;
        var n = e.Get(t);
        if (n.toString().includes("Perform_NPC")) {
          o = new Array();
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(n.toString(), o);
          if (o.length !== 1) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "[NPC Blend]tag获取的Entity数量并非唯一", ["Tag", n.toString()], ["num", o.length]);
            }
          } else if (s = (r = o[0]).Entity?.GetComponent(0)) {
            if ((r = r.Entity?.EntityData?.GetActor())?.IsValid()) {
              if (r.IsA(UE.BP_BaseNPC_C.StaticClass())) {
                r = r;
                this.PreLoadNpcMap.set(s.GetPbDataId(), r);
                r = s.GetCreatureDataId();
                r = ModelManager_1.ModelManager.CreatureModel.GetEntityId(r);
                if (r = EntitySystem_1.EntitySystem.Get(r)) {
                  this.NpcEntityMap.set(s.GetPbDataId(), r);
                }
              } else if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Plot", 45, "[NPC Blend]非BP_BaseNPC_C", ["Tag", n.toString()], ["num", o.length]);
              }
            } else if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "[NPC Blend]不存在的Entity actor", ["Tag", n.toString()], ["num", o.length]);
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 45, "[NPC Blend]不存在的Entity", ["Tag", n.toString()], ["num", o.length]);
          }
        }
      }
    }
  }
  Jto() {
    this.Model.BlendInCharacter = undefined;
    this.Model.BlendOutCharacter = undefined;
    var e = this.Model.SequenceData.GeneratedData?.BindingBP;
    if (e) {
      var i = this.Model.SequenceData.GeneratedData?.BlendInTag;
      var o = this.Model.SequenceData.GeneratedData?.BlendInTags;
      var s = this.Model.SequenceData.GeneratedData?.BlendOutTag;
      var r = this.Model.SequenceData.GeneratedData?.BlendOutTags;
      var n = this.Model.SequenceData.葫芦状态;
      var l = e.Num();
      for (let t = 0; t < l; t++) {
        var h = e.Get(t);
        var a = UE.KuroActorManager.D_SpawnActor(Info_1.Info.World, h, MathUtils_1.MathUtils.DefaultTransformDouble, 1, undefined);
        if (ObjectUtils_1.ObjectUtils.IsValid(a)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "生成Seq绑定蓝图的Actor", ["Class", a.GetName()]);
          }
          var _ = a;
          if (_) {
            this.Model.BindingActorMap.set(_.BindingTag, a);
            a.D_K2_SetActorLocation(HidePos, false, undefined, true);
            if (n > 0) {
              _.ChangeHuluState(n);
            }
            if (i && i.op_Equality(_.BindingTag) && !FNameUtil_1.FNameUtil.IsNothing(i)) {
              this.Model.BlendInCharacter = _;
            }
            if (o) {
              for (let t = 0; t < o.Num(); t++) {
                var d = o.Get(t);
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
              for (let t = 0; t < r.Num(); t++) {
                var g = r.Get(t);
                if (g && g.op_Equality(_.BindingTag) && !FNameUtil_1.FNameUtil.IsNothing(g)) {
                  this.Model.BlendOutCharacters?.push(_);
                  break;
                }
              }
            }
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "Seq绑定蓝图生成Actor失败", ["Class", h.GetName()]);
        }
      }
    }
  }
  nio() {
    if (this.Model.BindingActorMap && this.Model.BindingActorMap.size !== 0) {
      this.Model.BindingActorMap.forEach(t => {
        t.D_K2_SetActorLocation(HidePos, false, undefined, true);
        if (t) {
          t.CleanHuluState();
        }
        UE.KuroActorManager.DestroyActor(t);
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
  jaa(t) {
    var e;
    var i = this.Model.HidePlayerEntityHandle;
    if (t) {
      e = (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Entity;
      if (!i && e) {
        this.Model.HidePlayerEntityHandle = t;
        e.DisableByKey(7);
        ControllerHolder_1.ControllerHolder.PlotController.HideSummonedEntity();
      }
    } else if (i) {
      if (t = i.Entity) {
        t.EnableByKey(7);
      }
      this.Model.HidePlayerEntityHandle = undefined;
    }
  }
  zto(e) {
    const i = new Map();
    var o = this.Model.SequenceData.绑定角色标签;
    var s = o.Num();
    if (s === 0) {
      e(undefined);
    } else {
      var r = new Array();
      for (let t = 0; t < s; t++) {
        var n = new Array();
        var l = o.Get(t);
        if (!SequenceDefine_1.HERO_TAG.op_Equality(l) && !l.toString().includes("Perform_NPC") && (n.length = 0, ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(l.toString(), n), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "Sequence绑定找到实体", ["Tag", l.toString()], ["num", n.length]), n.length !== 0)) {
          i.set(l, n);
          for (const a of n) {
            var h = a.Entity.GetComponent(0);
            r.push(h.GetCreatureDataId());
          }
        }
      }
      if (r.length === 0) {
        e(undefined);
      } else {
        this.jto = WaitEntityTask_1.WaitEntityTask.Create("ActorAssistant.WaitBindingEntities", r, t => {
          if (!t) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 26, "有需要绑定的实体，但实体创建失败了");
            }
          }
          this.jto = undefined;
          e(i);
        });
      }
    }
  }
  Zto(e) {
    if (e) {
      var i;
      var o = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
      if (o) {
        let t = undefined;
        for (var [s, r] of e) {
          t = undefined;
          if (r && r.length !== 0) {
            for (const n of r) {
              if (n?.IsInit && n?.Valid && (i = n.Entity.GetComponent(1).ActorLocationProxy, i = Vector_1.Vector.DistSquared(i, o), t === undefined || t > i)) {
                this.Model.BindingEntityMap.set(s, n);
                t = i;
              }
            }
          }
        }
        this.Model.BindingEntityMap.forEach((t, e) => {
          t = t.Entity.GetComponent(0)?.GetCreatureDataId();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "实体被绑定入Sequence：", ["Tag", e.toString()], ["PbDataId", t]);
          }
        });
      }
    }
  }
  eio() {
    for (var [t, e] of this.Model.BindingEntityMap) {
      var i;
      var o;
      if (e.Valid) {
        i = new SequenceDefine_1.SequenceEntityInfo();
        this.Model.ControlEntityMap.set(e.Id, i);
        if ((o = e.Entity.GetComponent(40))?.Valid) {
          o.StopAllSkills("ActorAssistant.ControlBindingEntity");
        }
        if ((o = e.Entity.GetComponent(1))?.Valid && (o.SetCollisionEnable(false, "Plot Sequence Binding"), o.SetSequenceBinding(true), (0, RegisterComponent_1.isComponentInstance)(o, 3))) {
          o.Actor.CharRenderingComponent?.SetDisableFightDither(true);
        }
        if ((o = e.Entity.GetComponent(68))?.Valid) {
          i.CacheMovementSync = o.GetEnableMovementSync();
          o.SetEnableMovementSync(false, "ActorAssistant");
        }
        if (t.op_Equality(SequenceDefine_1.BOSS_TAG) && (o = e.Entity.GetComponent(178))?.Valid) {
          o.MainAnimInstance.Montage_Stop(0);
          o.StartForceDisableAnimOptimization(0, false);
        }
        if ((t = e.Entity.GetComponent(45))?.Valid) {
          t.StopMove(true);
          i.MoveCompDisableHandle = t.Disable("Plot Sequence Binding");
        }
        if ((o = e.Entity.GetComponent(114))?.Valid) {
          i.UeMoveCompDisableHandle = o.Disable("Plot Sequence Binding");
        }
        if ((t = e.Entity.GetComponent(175))?.Valid) {
          t.AddBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, {
            InstigatorId: t.CreatureDataId,
            Reason: "ActorAssistant.ControlBindingEntity"
          });
        }
        e.Entity.GetComponent(47)?.DisableAi("Plot Sequence Binding");
      }
    }
  }
  rio() {
    this.Haa = false;
    if (this.Model.BindingEntityMap && this.Model.BindingEntityMap.size !== 0) {
      for (var [t, e] of this.Model.BindingEntityMap) {
        var i;
        var o;
        var s;
        var r = this.Model.ControlEntityMap.get(e.Id);
        if (e?.Valid) {
          if ((o = e.Entity.GetComponent(1))?.Valid && (o.SetCollisionEnable(true, "Plot Sequence Binding"), o.SetSequenceBinding(false), (0, RegisterComponent_1.isComponentInstance)(o, 3)) && (o.ClearInput(), o.Actor.CharRenderingComponent?.SetDisableFightDither(false), o.Actor.Mesh.SetBoundsScale(1), i = o.Actor.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())) && (i = i.GetLinkedAnimGraphInstanceByTag(SequenceDefine_1.ABP_Base_Name))) {
            i.StopSlotAnimation(BindingActorAnimBlendOutTime, SequenceDefine_1.ABP_Seq_Slot_Name);
          }
          if (t.op_Equality(SequenceDefine_1.BOSS_TAG) && (i = e.Entity.GetComponent(178))?.Valid) {
            i.CancelForceDisableAnimOptimization(0);
            i.ConsumeRootMotion();
          }
          if (t !== SequenceDefine_1.HERO_TAG && (t = e.Entity.GetComponent(68))?.Valid && r.CacheMovementSync) {
            t.SetEnableMovementSync(true, "ActorAssistant");
            t.CollectSampleAndSend(true);
          }
          if (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(e.Entity.Id) === Protocol_1.Aki.Protocol.kks.Proto_Npc && (t = Protocol_1.Aki.Protocol.ecs.create(), (s = Protocol_1.Aki.Protocol.Zks.create()).F4n = MathUtils_1.MathUtils.NumberToLong(o.CreatureData.GetCreatureDataId()), s.P5n = o.ActorLocationProxy, s.g8n = o.ActorRotationProxy, t.iVn = [s], Net_1.Net.Send(18020, t), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("AI", 42, "向服务器同步NPC位置", ["实体ID", s.F4n], ["X", s.P5n.X], ["Y", s.P5n.Y], ["Z", s.P5n.Z]);
          }
          if ((o = e.Entity.GetComponent(45))?.Valid) {
            o.StopMove(false);
            o.Enable(r.MoveCompDisableHandle, "[ActorAssistant.ReleaseBindingEntity] moveComp.Valid=true");
          }
          if ((t = e.Entity.GetComponent(114))?.Valid) {
            t.Enable(r.UeMoveCompDisableHandle, "[ActorAssistant.ReleaseBindingEntity] ueMoveComp.Valid=true");
          }
          if ((s = e.Entity.GetComponent(175))?.Valid) {
            s.RemoveBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, -1, "ActorAssistant.ReleaseBindingEntity");
          }
          e.Entity.GetComponent(47)?.EnableAi("Plot Sequence Binding");
        }
      }
      this.Model.BindingEntityMap.clear();
    }
  }
  tio(e) {
    var t;
    this.Model.MainSeqCharacterMesh = undefined;
    if (this.Model.SequenceData.NeedSwitchMainCharacter) {
      if ((t = this.Model.SeqMainCharacterModelConfig.网格体?.ToAssetPathName()) && t.length && t !== "None") {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角-开始");
        }
        this.Qto = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.GetAsset(t, UE.SkeletalMesh, t => {
          this.Qto = ResourceSystem_1.ResourceSystem.InvalidId;
          if (t) {
            this.Model.MainSeqCharacterMesh = t;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角-完成");
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角-失败");
          }
          e(true);
        });
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("Seq主角的ModelConfig网格体为空", ["ID", this.Model.SeqMainCharacterModelConfig?.ID]);
        e(true);
      }
    } else {
      e(true);
    }
  }
  iio(i) {
    var t;
    if (this.Model.SequenceData.NeedSwitchMainCharacter) {
      if ((t = this.Model.SeqMainCharacterModelConfig.蓝图?.ToAssetPathName()) && t.length && t !== "None") {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角BP-开始");
        }
        this.Kto = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.GetAsset(t, UE.Class, t => {
          this.Kto = ResourceSystem_1.ResourceSystem.InvalidId;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 17, "剧情加载等待-Seq主角BP-完成");
          }
          this.Model.SeqMainCharacter = UE.KuroActorManager.D_SpawnActor(Info_1.Info.World, t, Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform, 1, undefined);
          var t = this.Model.SeqMainCharacter.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
          if (t) {
            t.SetSkeletalMesh(this.Model.MainSeqCharacterMesh);
            if (this.Model.GetType() === 0 || this.Model.GetType() === 2) {
              e = t.D_GetRelativeTransform();
              this.Model.SeqMainCharacter.D_K2_AddActorWorldTransform(e, false, undefined, false);
              t.D_K2_SetRelativeLocationAndRotation(Vector_1.Vector.ZeroVectorDouble, Rotator_1.Rotator.ZeroRotator, false, undefined, false);
            }
          } else {
            ControllerHolder_1.ControllerHolder.FlowController.LogError("网格体类型错误");
          }
          var e = this.Model.SeqMainCharacter;
          if (e && (t = this.Model.SequenceData.葫芦状态) > 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 38, "葫芦状态", ["HuluState", t]);
            }
            e.ChangeHuluState(t);
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
      const e = this.PreLoadMouthAssetName[this.CurLoadMouthIndex];
      this.CurLoadMouthIndex++;
      if (StringUtils_1.StringUtils.IsEmpty(e)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 38, "预加载口型资源跳过，textKey 为空");
        }
        this.sio();
      } else {
        var t = PlotAudioById_1.configPlotAudioById.GetConfig(e);
        if (t) {
          const i = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName(t);
          if (t.GenLipSync) {
            ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.GetAsset(i, UE.AnimSequence, t => {
              if (t) {
                this.PreLoadMouthAssetMap.set(e, t);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Plot", 38, "预加载口型资源", ["assetPath", i]);
                }
              } else if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Plot", 38, "预加载口型资源错误：有语音没口型", ["textKey", e], ["assetPath", i]);
              }
              this.sio();
            });
          } else {
            this.sio();
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 38, "预加载口型资源跳过，没有语音配置", ["textKey", e]);
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
  TryApplyMouthAnim(t, e) {
    this.Model.TalkNpcList = this.Model.CurLevelSeqActor?.GetBindingByTag(SequenceDefine_1.TALK_NPC_TAG, true);
    this.StopMouthAnim();
    this.Xto = undefined;
    this.$to = undefined;
    if (this.Model.GetType() === 1) {
      this.Xto = this.PreLoadMouthAssetMap.get(t);
      if (this.Xto) {
        this.FindApplyMouthAnim(e);
        if (this.$to) {
          this.$to.PlaySlotAnimationAsDynamicMontage(this.Xto, SequenceDefine_1.ABP_Mouth_Slot_Name, 0, 0, 1, 1, -1, 0, true);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 38, "MouthAnim 播放口型", ["Key", t], ["Asset", this.Xto.GetName()], ["ABP", this.$to.GetName()]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 38, "MouthAnim 没有找到口型ABP", ["whoID", e]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 38, "MouthAnim 没有口型资源", ["TextKey", t]);
      }
    }
  }
  FindApplyMouthAnim(e) {
    let i = false;
    this.Model.BindingActorMap.forEach(t => {
      if (!!t?.IsValid() && (t.TalkID === e || t.TalkID_SP === e)) {
        this.$to = t.SkeletalMeshComponent0?.GetLinkedAnimGraphInstanceByTag(SequenceDefine_1.ABP_Base_Name);
        i = true;
      }
    });
    if (!i && this.Model.TalkNpcList !== undefined) {
      var o = this.Model.TalkNpcList.Num();
      for (let t = 0; t < o; t++) {
        var s = this.Model.TalkNpcList.Get(t);
        var r = s;
        if (r?.IsValid() && (r.TalkID === e || r.TalkID_SP === e) && (this.$to = r.SkeletalMeshComponent0?.GetLinkedAnimGraphInstanceByTag(SequenceDefine_1.ABP_Base_Name), this.$to)) {
          return;
        }
        r = s;
        if (r?.IsValid() && (r.TalkID === e || r.TalkID_SP === e) && (this.$to = r.Skel_Main?.GetAnimInstance(), this.$to)) {
          return;
        }
        r = s;
        if (r?.IsValid() && (r.TalkID === e || r.TalkID_SP === e) && (this.$to = r.SkeletalMesh?.GetAnimInstance(), this.$to)) {
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
    for (const t of ModelManager_1.ModelManager.SequenceModel.NeedHideNpcSet) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t, false, "隐藏NPC", false);
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
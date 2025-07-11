"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorAssistant = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const WorldFunctionLibrary_1 = require("../../../../World/Bridge/WorldFunctionLibrary");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
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
    this.X61 = new Map([["剧情_2_0_黎那汐塔主线_序幕,1,1", ["Shouanren"]], ["剧情_2_2_阿维纽林主线,3,11", ["Kanteleila"]], ["剧情_2_2_阿维纽林主线,7,16", ["Katixiya"]]]);
    this.aK1 = [];
    this.hK1 = (e, t, i) => {
      e = {
        SeqName: e?.GetName(),
        Guid: t?.ToString(),
        ObjectName: i?.GetName()
      };
      this.aK1.push(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[Shouanren] spawn Object:", ["obj", e]);
      }
    };
  }
  Load(t) {
    this.Jto();
    this.zto(e => {
      this.Zto(e);
      this.tio(t);
    });
  }
  PreAllPlay(i) {
    if (this.Model.SequenceData.SaveFinalTransform) {
      Global_1.Global.BaseCharacter.KuroSetMovementMode({
        Mode: Global_1.Global.BaseCharacter.CharacterMovement.DefaultLandMovementMode,
        Context: "[Plot Sequence: ActorAssistant.PreAllPlay]"
      });
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
    const i = UE.NewArray(UE.Actor);
    this.Model.BindingActorMap.forEach((e, t) => {
      e.D_K2_SetActorLocation(HidePos, false, undefined, true);
      i.Empty();
      i.Add(e);
      this.Model.CurLevelSeqActor.SetBindingByTag(t, i, false, true);
      t = e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      if (t && (e = t.GetLinkedAnimGraphInstanceByTag(SequenceDefine_1.ABP_Base_Name))) {
        e.Montage_MuteAllMontage();
      }
    });
    this.Model.BindingEntityMap.forEach((e, t) => {
      i.Empty();
      e = e.Entity?.GetComponent(1)?.Owner;
      if (e) {
        i.Add(e);
        this.Model.CurLevelSeqActor.SetBindingByTag(t, i, false, true);
      }
    });
    this.TempRegisterSpawnedEvent();
  }
  EachStop() {
    this.Model.BindingActorMap.forEach((e, t) => {
      e.D_K2_SetActorLocation(HidePos, false, undefined, true);
    });
    this.TempUnRegisterSpawnedEvent();
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
    let e = this.Model.BlendOutCharacter;
    var t;
    if (e = e === undefined ? this.Model.SeqMainCharacter : e) {
      t = e;
      this.jaa(false);
      if (t.SkeletalMeshComponent0.SkeletalMesh !== Global_1.Global.BaseCharacter.Mesh.SkeletalMesh) {
        this.nio();
        return !(this.Promise = undefined);
      } else {
        this.Model.BeginSwitchFrame = 2;
        t.BeginSwitchPose(t, Global_1.Global.BaseCharacter, this.Model.SequenceData.AnimationBlendOutTime, true);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 38, "BeginSwitchPose 开始", ["Actor", Global_1.Global.BaseCharacter?.GetName()]);
        }
        return await this.Promise.Promise;
      }
    } else {
      return !(this.Promise = undefined);
    }
  }
  EndSwitchPose() {
    let e = this.Model.BlendOutCharacter;
    (e = e === undefined ? this.Model.SeqMainCharacter : e)?.EndSwitchPose(Global_1.Global.BaseCharacter, true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 38, "EndSwitchPose结束", ["Actor", Global_1.Global.BaseCharacter?.GetName()]);
    }
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
        if (!t.FixBornLocation("Sequence最终位置同步", true, e.GetLocation(), true) && this.Model.SequenceData.bIsForceFinalTrans) {
          t.SetActorLocation(e.GetLocation().ToUeVector(), "Sequence最终位置同步", false);
        }
        t.SetActorRotation(e.GetRotation().Rotator().ToUeRotator(), "Sequence最终位置同步");
        t.ClearInput();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "SaveFinalPos", ["transform", e]);
        }
        ControllerHolder_1.ControllerHolder.FlowController.RequestPosition(e.GetLocation(), e.GetRotation().Rotator());
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
    if (!this.Model.IsSeamless) {
      this.Model.PoseSwitched = false;
    }
  }
  Jto() {
    this.Model.BlendInCharacter = undefined;
    this.Model.BlendOutCharacter = undefined;
    var t = this.Model.SequenceData.GeneratedData?.BindingBP;
    if (t) {
      var i = this.Model.SequenceData.GeneratedData?.BlendInTag;
      var o = this.Model.SequenceData.GeneratedData?.BlendOutTag;
      var s = this.Model.SequenceData.葫芦状态;
      var r = t.Num();
      for (let e = 0; e < r; e++) {
        var n;
        var h = t.Get(e);
        var l = UE.KuroActorManager.D_SpawnActor(Info_1.Info.World, h, MathUtils_1.MathUtils.DefaultTransformDouble, 1, undefined);
        if (ObjectUtils_1.ObjectUtils.IsValid(l)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "生成Seq绑定蓝图的Actor", ["Class", l.GetName()]);
          }
          if ((n = l) && (this.Model.BindingActorMap.set(n.BindingTag, l), l.D_K2_SetActorLocation(HidePos, false, undefined, true), s > 0 && n.ChangeHuluState(s), i && i.op_Equality(n.BindingTag) && !FNameUtil_1.FNameUtil.IsNothing(i) && (this.Model.BlendInCharacter = n), o) && o.op_Equality(n.BindingTag) && !FNameUtil_1.FNameUtil.IsNothing(o)) {
            this.Model.BlendOutCharacter = n;
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "Seq绑定蓝图生成Actor失败", ["Class", h.GetName()]);
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
    }
  }
  jaa(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    if (e) {
      if (!this.Model.HidePlayer) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t, false, "剧情播放Sequence隐藏主角", false);
        ControllerHolder_1.ControllerHolder.PlotController.HideSummonedEntity();
        this.Model.HidePlayer = true;
      }
    } else if (this.Model.HidePlayer) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t, true, "剧情播放Sequence隐藏主角", false);
      this.Model.HidePlayer = false;
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
        var h = o.Get(e);
        if (!SequenceDefine_1.HERO_TAG.op_Equality(h) && (n.length = 0, ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithTag(h.toString(), n), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "Sequence绑定找到实体", ["Tag", h.toString()], ["num", n.length]), n.length !== 0)) {
          i.set(h, n);
          for (const a of n) {
            var l = a.Entity.GetComponent(0);
            r.push(l.GetCreatureDataId());
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
        if ((o = t.Entity.GetComponent(40))?.Valid) {
          o.StopAllSkills("ActorAssistant.ControlBindingEntity");
        }
        if ((o = t.Entity.GetComponent(1))?.Valid && (o.SetCollisionEnable(false, "Plot Sequence Binding"), o.SetSequenceBinding(true), (0, RegisterComponent_1.isComponentInstance)(o, 3))) {
          o.Actor.CharRenderingComponent?.SetDisableFightDither(true);
        }
        if ((o = t.Entity.GetComponent(68))?.Valid) {
          i.CacheMovementSync = o.GetEnableMovementSync();
          o.SetEnableMovementSync(false, "ActorAssistant");
        }
        if (e.op_Equality(SequenceDefine_1.BOSS_TAG) && (o = t.Entity.GetComponent(177))?.Valid) {
          o.MainAnimInstance.Montage_Stop(0);
          o.StartForceDisableAnimOptimization(0, false);
        }
        if ((e = t.Entity.GetComponent(45))?.Valid) {
          e.StopMove(true);
          i.MoveCompDisableHandle = e.Disable("Plot Sequence Binding");
        }
        if ((o = t.Entity.GetComponent(113))?.Valid) {
          i.UeMoveCompDisableHandle = o.Disable("Plot Sequence Binding");
        }
        if ((e = t.Entity.GetComponent(174))?.Valid) {
          e.AddBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, {
            InstigatorId: e.CreatureDataId,
            Reason: "ActorAssistant.ControlBindingEntity"
          });
        }
        t.Entity.GetComponent(47)?.DisableAi("Plot Sequence Binding");
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
          if (e.op_Equality(SequenceDefine_1.BOSS_TAG) && (i = t.Entity.GetComponent(177))?.Valid) {
            i.CancelForceDisableAnimOptimization(0);
            i.ConsumeRootMotion();
          }
          if (e !== SequenceDefine_1.HERO_TAG && (e = t.Entity.GetComponent(68))?.Valid && r.CacheMovementSync) {
            e.SetEnableMovementSync(true, "ActorAssistant");
            e.CollectSampleAndSend(true);
          }
          if (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(t.Entity.Id) === Protocol_1.Aki.Protocol.kks.Proto_Npc && (e = Protocol_1.Aki.Protocol.ecs.create(), (s = Protocol_1.Aki.Protocol.Zks.create()).F4n = MathUtils_1.MathUtils.NumberToLong(o.CreatureData.GetCreatureDataId()), s.P5n = o.ActorLocationProxy, s.g8n = o.ActorRotationProxy, e.iVn = [s], Net_1.Net.Send(27183, e), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("AI", 42, "向服务器同步NPC位置", ["实体ID", s.F4n], ["X", s.P5n.X], ["Y", s.P5n.Y], ["Z", s.P5n.Z]);
          }
          if ((o = t.Entity.GetComponent(45))?.Valid) {
            o.StopMove(false);
            o.Enable(r.MoveCompDisableHandle, "[ActorAssistant.ReleaseBindingEntity] moveComp.Valid=true");
          }
          if ((e = t.Entity.GetComponent(113))?.Valid) {
            e.Enable(r.UeMoveCompDisableHandle, "[ActorAssistant.ReleaseBindingEntity] ueMoveComp.Valid=true");
          }
          if ((s = t.Entity.GetComponent(174))?.Valid) {
            s.RemoveBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, -1, "ActorAssistant.ReleaseBindingEntity");
          }
          t.Entity.GetComponent(47)?.EnableAi("Plot Sequence Binding");
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
  }
  PlayerHide() {
    if (this.Model.BindingActorMap.get(SequenceDefine_1.HERO_TAG) && (this.Model.BindingActorMap.get(SequenceDefine_1.HERO_TAG).D_K2_SetActorLocation(HidePos, false, undefined, true), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Plot", 45, "过场seq内不存在男女主，开始尝试隐藏");
    }
  }
  TempHideAllShouanren() {
    if (this.X61.has(ControllerHolder_1.ControllerHolder.FlowController.GetFlowName()) && this.Model?.CurLevelSeqActor?.SequencePlayer?.IsValid()) {
      for (const f of this.X61.get(ControllerHolder_1.ControllerHolder.FlowController.GetFlowName())) {
        var e = this.Model.CurLevelSeqActor.GetBindingByTag(new UE.FName(f), true);
        var t = e.Num();
        if (t !== 1 && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Plot", 26, "[Shouanren] Spawnable数量异常", ["seq", this.Model?.GetCurrentSequence().GetName()], ["name", f], ["num", t]);
        }
        var i = t > 0 ? e.Get(0) : undefined;
        var t = (0, puerts_1.$ref)(UE.NewArray(UE.BP_BaseRole_Seq_V2_C));
        UE.GameplayStatics.GetAllActorsOfClass(GlobalData_1.GlobalData.World, UE.BP_BaseRole_Seq_V2_C.StaticClass(), t);
        var o = (0, puerts_1.$unref)(t);
        var s = new RegExp(f, "i");
        var r = o.Num();
        const m = new StringBuilder_1.StringBuilder();
        this.Model.BindingActorMap.forEach((e, t) => {
          m.Append("{");
          m.Append(t.toString());
          m.Append(":");
          m.Append(e.GetName().toString());
          m.Append("},");
        });
        var e = this.Model.GetCurrentSequence();
        var n = (0, ObjectUtils_1.ueArrayToArray)(e.MovieScene.Spawnables);
        var h = e.MovieScene.MasterTracks;
        for (let e = 0; e < h.Num(); e++) {
          var l = h.Get(e);
          if (l instanceof UE.MovieSceneSubTrack) {
            var a = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(l);
            for (let e = 0; e < a.Num(); e++) {
              var _ = a.Get(e).GetSequence();
              n.push(...(0, ObjectUtils_1.ueArrayToArray)(_.MovieScene.Spawnables));
            }
          }
        }
        var d = new StringBuilder_1.StringBuilder();
        for (const C of n) {
          var u = this.Model.CurLevelSeqActor.SequencePlayer.GetSpawnedActorByGuid(C.Guid, true);
          d.Append("{");
          d.Append(C.Name);
          d.Append("_");
          d.Append(C.Guid.ToString());
          d.Append(":");
          d.Append(u?.GetName().toString() ?? "Null");
          if (!!u?.IsValid() && (!(u = this.Model.CurLevelSeqActor.SequencePlayer.GetObjectBindings(u)) || u.Num() === 0)) {
            d.Append("(未绑定的生成)");
          }
          d.Append("},");
        }
        for (let e = 0; e < r; e++) {
          var c = o.Get(e);
          if (c.IsValid() && !c.bHidden && c !== i && s.test(c.GetClass().GetName())) {
            c.SetActorHiddenInGame(true);
            let t = undefined;
            var g = (0, puerts_1.$ref)(UE.NewArray(UE.LevelSequenceActor));
            UE.GameplayStatics.GetAllActorsOfClass(GlobalData_1.GlobalData.World, UE.LevelSequenceActor.StaticClass(), g);
            var S = (0, puerts_1.$unref)(g);
            var v = S.Num();
            for (let e = 0; e < v; e++) {
              var P = S.Get(e);
              var q = P.SequencePlayer?.GetObjectBindings(c);
              if (q && q.Num() > 0) {
                t = P.GetSequence()?.GetName();
                break;
              }
            }
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Plot", 26, "[Shouanren] 存在未知的BP_BaseRole_Seq_V2_C", ["name", c.GetName()], ["outer name", c.GetOuter()?.IsValid() ? c.GetOuter().GetName() : "no outer"], ["tag", (0, ObjectUtils_1.ueArrayToArray)(c.Tags)], ["seq", this.Model.GetCurrentSequence()?.GetName()], ["curTsSpawn", m.ToString()], ["curSpawnObject", d.ToString()], ["ownerSeqName", t], ["SpawnRecord", this.aK1]);
            }
          }
        }
      }
      this.Model.CurLevelSeqActor.SequencePlayer.CleanUnboundSpawnable();
    }
  }
  TempRegisterSpawnedEvent() {
    if (this.X61.has(ControllerHolder_1.ControllerHolder.FlowController.GetFlowName())) {
      this.aK1.length = 0;
      this.Model.CurLevelSeqActor.SequencePlayer?.OnSequenceObjectSpawned.Add(this.hK1);
    }
  }
  TempUnRegisterSpawnedEvent() {
    if (this.X61.has(ControllerHolder_1.ControllerHolder.FlowController.GetFlowName())) {
      this.aK1.length = 0;
      this.Model.CurLevelSeqActor.SequencePlayer?.OnSequenceObjectSpawned.Clear();
    }
  }
}
exports.ActorAssistant = ActorAssistant;
//# sourceMappingURL=ActorAssistant.js.map
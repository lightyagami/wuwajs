"use strict";

var SceneItemGravityFlipComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var o = arguments.length;
  var r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (n = t[a]) {
        r = (o < 3 ? n(r) : o > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemGravityFlipComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const CodeDefineLevelConditionInfo_1 = require("../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo");
const LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const FlowController_1 = require("../../Module/Plot/Flow/FlowController");
const BINDING_TAG = new UE.FName("Obj");
const POINT_LIGHT_DOWN = "HaloYellow";
const POINT_LIGHT_UP = "HaloBlue";
const POINT_LIGHT_LEFT_RIGHT = "HaloGreen";
const SEQ_ROTATE_LEFT_90 = "/Game/Aki/Scene/InteractionLevel/Animation/2_2/GravitySwitch/Gravity_L_90.Gravity_L_90";
const SEQ_ROTATE_RIGHT_90 = "/Game/Aki/Scene/InteractionLevel/Animation/2_2/GravitySwitch/Gravity_R_90.Gravity_R_90";
const SEQ_ROTATE_LEFT_180 = "/Game/Aki/Scene/InteractionLevel/Animation/2_2/GravitySwitch/Gravity_L_180.Gravity_L_180";
const interactEffectTagMap = new Map([[0, 122403501], [180, -1277883221], [90, 1745511332], [270, -1597014724]]);
const enterEffectTagMap = new Map([[0, -1768442878], [180, -1745523076], [90, -355027021], [270, 504823315]]);
const notInteractEffectTagMap = new Map([[0, -1112012100], [180, 414541970], [90, 539102901], [270, -2085310779]]);
const notInteractStateMap = new Map([[0, 4], [180, 5], [90, 6], [270, 7]]);
const interactingStateMap = new Map([[0, 0], [180, 1], [90, 2], [270, 3]]);
const lockStateMap = 8;
let SceneItemGravityFlipComponent = SceneItemGravityFlipComponent_1 = class SceneItemGravityFlipComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.EIe = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this._un = undefined;
    this.JK_ = false;
    this.CurGravityDirection = 0;
    this.upn = undefined;
    this.qZ_ = -1;
    this.IsInteracting = false;
    this.i1c = false;
    this.Rjt = false;
    this.Tqc = false;
    this.bFc = undefined;
    this.LFc = undefined;
    this.wFc = undefined;
    this.Rnn = () => {
      this.Rtn();
      this.RemoveInteractTag();
      this.UpdatePrefabState(true);
    };
    this.F0n = t => {
      this.Rjt = t;
      if (this.Rjt) {
        this.Lie?.RemoveTag(-674731505);
        this.Lie?.RemoveTag(1272257853);
      } else {
        this.Lie?.AddTag(notInteractEffectTagMap.get(this.CurGravityDirection));
        this._Ac();
        if (this.Tqc) {
          this.bqc();
        }
      }
      this.UpdatePrefabState(true);
    };
    this.Etn = t => {
      this.Tqc = t;
      if (!this.Rjt && !this.i1c) {
        if (t) {
          this.bqc();
        } else {
          this.Lie?.RemoveTag(this.qZ_);
        }
      }
    };
    this.RFc = (t, e) => {
      if (e) {
        switch (t) {
          case 1586172671:
            this.PlayRotateSequence(90);
            break;
          case 887665186:
            this.PlayRotateSequence(270);
            break;
          case -1670724542:
            this.PlayRotateSequence(180);
        }
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemGravityFlipComponent_1)[0];
    this.Lo = t;
    return true;
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    this.Hte = this.Entity.GetComponent(206);
    this.Lie = this.Entity.GetComponent(200);
    this._un = this.Entity.GetComponent(134);
    var t = this.EIe?.PbGravityFlipDirection;
    if (!this.SetGravityDirection(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SceneItemGravityFlipComponent] InitGravityDirection Failed", ["Id", this.EIe?.GetPbDataId()], ["index", this.EIe?.PbGravityFlipDirection]);
      }
      this.CurGravityDirection = 0;
    }
    this.Rjt = this._un?.IsLocked ?? false;
    this.AFc();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.F0n);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
    this.Lie?.AddTagAddOrRemoveListener(1586172671, this.RFc);
    this.Lie?.AddTagAddOrRemoveListener(887665186, this.RFc);
    this.Lie?.AddTagAddOrRemoveListener(-1670724542, this.RFc);
    return true;
  }
  OnEnd() {
    if (this.upn) {
      const t = this.upn;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("SceneItemGravityFlipComponent.OnEnd", t);
      });
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.F0n);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
    this.Lie?.RemoveTagAddOrRemoveListener(1586172671, this.RFc);
    this.Lie?.RemoveTagAddOrRemoveListener(887665186, this.RFc);
    this.Lie?.RemoveTagAddOrRemoveListener(-1670724542, this.RFc);
    return true;
  }
  SetGravityDirection(t) {
    return t !== undefined && (this.CurGravityDirection = this.FZ_(t), this.UpdatePrefabState(true), true);
  }
  AFc() {
    ResourceSystem_1.ResourceSystem.LoadAsync(SEQ_ROTATE_LEFT_90, UE.LevelSequence, t => {
      if (t) {
        this.bFc = t;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SceneItemGravityFlipComponent] LoadRotateSequence Failed", ["path", SEQ_ROTATE_LEFT_90]);
      }
    });
    ResourceSystem_1.ResourceSystem.LoadAsync(SEQ_ROTATE_RIGHT_90, UE.LevelSequence, t => {
      if (t) {
        this.LFc = t;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SceneItemGravityFlipComponent] LoadRotateSequence Failed", ["path", SEQ_ROTATE_RIGHT_90]);
      }
    });
    ResourceSystem_1.ResourceSystem.LoadAsync(SEQ_ROTATE_LEFT_180, UE.LevelSequence, t => {
      if (t) {
        this.wFc = t;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SceneItemGravityFlipComponent] LoadRotateSequence Failed", ["path", SEQ_ROTATE_LEFT_180]);
      }
    });
  }
  Rtn() {
    var t;
    var e;
    var i;
    var s;
    if (!this.JK_) {
      t = this.EIe?.GetPbDataId();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 31, "[SceneItemGravityFlipComponent] CreateInteractOption", ["PbDataId", t]);
      }
      if (e = this.Entity.GetComponent(201)) {
        if (!(e = e.GetInteractController())) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneItem", 31, "[SceneItemGravityFlipComponent]CreateInteractOption Failed_1", ["EntityId", t]);
          }
        }
        i = new CodeDefineLevelConditionInfo_1.LevelConditionGroup();
        (s = new CodeDefineLevelConditionInfo_1.LevelConditionCheckGravityFlipEntityDirectionSameAsPlayerInfo()).EntityId = this.Entity.Id;
        i.Conditions?.push(s);
        (s = new LevelGameplayActionsDefine_1.ActionInteractGravityFlip()).EntityId = this.Entity.Id;
        e.AddClientInteractOption(s, i, "Direct");
        this.JK_ = true;
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 31, "[SceneItemGravityFlipComponent]CreateInteractOption Failed_0", ["pbDataId", t]);
      }
    }
  }
  ExecuteInteract() {
    ModelManager_1.ModelManager.GravityFlipModel.InitGravityFlipParams(this);
    FlowController_1.FlowController.StartFlowForView("剧情_2_2_重力机关交互表现", 1, 1, {
      HideAllUi: true
    });
  }
  GetGravityFlipDirection() {
    return this.Lo?.Config;
  }
  Qpn() {
    if (this.upn === undefined) {
      this.upn = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined, false);
      this.upn.bOverrideInstanceData = true;
    }
  }
  PlayRotateSequence(t, e) {
    let i = "";
    let s = undefined;
    switch (t) {
      case 90:
        i = SEQ_ROTATE_LEFT_90;
        s = this.bFc;
        break;
      case 270:
        i = SEQ_ROTATE_RIGHT_90;
        s = this.LFc;
        break;
      case 180:
        i = SEQ_ROTATE_LEFT_180;
        s = this.wFc;
    }
    var n;
    var o;
    if (s || (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 31, "[GravityFlipModel] 未找到对应的Sequence", ["path", i]), s = ResourceSystem_1.ResourceSystem.Load(i, UE.LevelSequence))) {
      if (this.upn === undefined) {
        this.Qpn();
      }
      t = this.upn.DefaultInstanceData;
      n = this.Hte.ActorLocationProxy;
      o = this.Hte.ActorRotationProxy;
      o = Transform_1.Transform.Create(o.Quaternion(undefined), n, Vector_1.Vector.OneVectorProxy);
      t.TransformOrigin = o.ToUeTransformOld();
      t.TransformOriginActor = this.Hte.Owner;
      if (this.upn && (this.upn.SetActorTickEnabled(true), this.upn.SetSequence(s), this.upn.SequencePlayer.OnFinished.Clear(), this.upn.AddBindingByTag(BINDING_TAG, this.Hte.Owner), this.upn.SequencePlayer.IsValid())) {
        this.upn.SequencePlayer.SetPlayRate(1);
        this.upn.SequencePlayer.Play();
        this.upn.SequencePlayer.OnFinished.Add(() => {
          this.upn.RemoveBindingByTag(BINDING_TAG, this.Hte.Owner);
          e?.();
        });
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 31, "[GravityFlipModel] 尝试重新同步加载后仍未找到Sequence", ["path", i]);
    }
  }
  CheckPlayerGravityDirectionAsSelf() {
    var t;
    var e;
    return !!this.bFc && !!this.LFc && !!this.wFc && ((t = Vector_1.Vector.Create(this.Hte?.ActorUp)).MultiplyEqual(-1), (e = Global_1.Global.BaseCharacter?.CharacterActorComponent) ? Vector_1.Vector.Create(e.ActorGravityDirectProxy).DotProduct(t) > 0.99 : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 31, "[GravityFlipModel] 未找到角色"), false));
  }
  OnNotifyUpdateGravityDirection(t) {
    this.i1c = true;
    this.Lie?.RemoveTag(this.qZ_);
    this.Lie?.RemoveTag(notInteractEffectTagMap.get(this.CurGravityDirection));
    var t = this.FZ_(t);
    var e = (e = t - this.CurGravityDirection) < 0 ? 360 + e : e;
    this.CurGravityDirection = t;
    var i = () => {
      this.OnExitInteract(true);
      this.RemoveInteractTag();
      this.i1c = false;
    };
    switch (e) {
      case 90:
        this.PlayRotateSequence(90, i);
        break;
      case 180:
        this.PlayRotateSequence(180, i);
        break;
      case 270:
        this.PlayRotateSequence(270, i);
    }
    this.Lie?.RemoveTag(this.qZ_);
    e = notInteractStateMap.get(t);
    this.Hte.SwitchToState(e, true, false);
  }
  FZ_(t) {
    switch (t) {
      case Protocol_1.Aki.Protocol.AY_.Proto_GravityLeft:
        return 90;
      case Protocol_1.Aki.Protocol.AY_.Proto_GravityRight:
        return 270;
      case Protocol_1.Aki.Protocol.AY_.Proto_GravityUp:
        return 180;
      case Protocol_1.Aki.Protocol.AY_.Proto_GravityDown:
        return 0;
    }
    return 0;
  }
  AddInteractTag() {
    var t = interactEffectTagMap.get(this.CurGravityDirection);
    if (!this.Lie?.HasTag(t)) {
      this.Lie?.AddTag(t);
    }
    this.Lie?.RemoveTag(-674731505);
    this.UpdatePrefabState();
  }
  RemoveInteractTag() {
    this.Lie?.RemoveTag(589539912);
    var t = notInteractEffectTagMap.get(this.CurGravityDirection);
    if (!this.Lie?.HasTag(t) && !this.Rjt) {
      this.Lie?.AddTag(t);
    }
  }
  OnEnterInteract() {
    this.Lie?.RemoveTag(this.qZ_);
    this.IsInteracting = true;
  }
  OnExitInteract(t = false) {
    var e = t ? this.CurGravityDirection : ModelManager_1.ModelManager.GravityFlipModel.CurrentGravityDirection;
    if (this.Tqc) {
      e = enterEffectTagMap.get(e);
      if (!this.Lie?.HasTag(e)) {
        this.Lie?.AddTag(e);
      }
      this.qZ_ = e;
    }
    this.IsInteracting = false;
    this.UpdatePrefabState(t);
  }
  UpdatePrefabState(t = false) {
    if (this.Rjt) {
      this.Hte.SwitchToState(lockStateMap, true, false);
      this.Lie?.RemoveTag(this.qZ_);
      this.cAc();
    } else {
      t = t ? this.CurGravityDirection : ModelManager_1.ModelManager.GravityFlipModel.CurrentGravityDirection;
      t = (this.IsInteracting ? interactingStateMap : notInteractStateMap).get(t);
      this.Hte.SwitchToState(t, true, false);
    }
  }
  cAc() {
    var t = this.Hte?.GetInteractionMainActor();
    if (t) {
      t.GetActorByKey(POINT_LIGHT_DOWN)?.SetActorHiddenInGame(true);
      t.GetActorByKey(POINT_LIGHT_UP)?.SetActorHiddenInGame(true);
      t.GetActorByKey(POINT_LIGHT_LEFT_RIGHT)?.SetActorHiddenInGame(true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 31, "[HideAllHalo] 找不到sceneInteractionActor");
    }
  }
  _Ac() {
    let t = "";
    switch (this.CurGravityDirection) {
      case 0:
        t = POINT_LIGHT_DOWN;
        break;
      case 180:
        t = POINT_LIGHT_UP;
        break;
      case 90:
      case 270:
        t = POINT_LIGHT_LEFT_RIGHT;
    }
    var e = this.Hte?.GetInteractionMainActor();
    if (e) {
      e.GetActorByKey(t)?.SetActorHiddenInGame(false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 31, "[ShowDirectionHalo] 找不到sceneInteractionActor");
    }
  }
  bqc() {
    var t = enterEffectTagMap.get(this.CurGravityDirection);
    if (!this.Lie?.HasTag(t)) {
      this.Lie?.AddTag(t);
    }
    this.qZ_ = t;
  }
};
SceneItemGravityFlipComponent = SceneItemGravityFlipComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(289)], SceneItemGravityFlipComponent);
exports.SceneItemGravityFlipComponent = SceneItemGravityFlipComponent; //# sourceMappingURL=SceneItemGravityFlipComponent.js.map
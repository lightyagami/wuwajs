"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformSequence = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const CameraController_1 = require("../../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const sequenceCameraTag = new UE.FName("SequenceCamera");
class NpcPerformSequence {
  constructor() {
    this.ktr = "";
    this.Fbi = undefined;
    this.SPe = undefined;
    this.Ntr = undefined;
    this.PUo = undefined;
    this.Otr = undefined;
    this.lGn = () => {
      this.$ne();
      this._Gn();
    };
    this.pLo = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]Npc表现Sequence播放完成", ["SequenceName", this.SPe?.Sequence?.GetName()]);
      }
      this.$ne();
    };
  }
  Destroy() {
    if (this.SPe?.IsValid() && this.SPe.IsPlaying()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]开始销毁Npc表现Sequence时，Sequence仍在播放，等播放完成后销毁");
      }
      this.SPe.OnFinished.Clear();
      this.SPe.OnFinished.Add(this.lGn);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]开始销毁Npc表现Sequence");
      }
      this._Gn();
    }
  }
  _Gn() {
    if (this.Fbi) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Fbi);
      this.Fbi = undefined;
    }
    if (this.SPe?.IsValid()) {
      this.SPe.Stop();
      this.SPe.OnFinished.Clear();
      this.SPe = undefined;
    }
    if (this.Ntr?.IsValid()) {
      const e = this.Ntr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("NpcPerformSequence.DestroyInternal", e);
      });
      this.Ntr = undefined;
    }
    this.PUo = undefined;
    this.Otr = undefined;
    CameraController_1.CameraController.ExitCameraMode(1, 0);
  }
  SetTransformOriginEntity(e) {
    e = e.GetComponent(1).Owner;
    this.SetTransformOriginActor(e);
  }
  SetTransformOriginActor(e) {
    if (this.PUo) {
      this.Ntr.bOverrideInstanceData = true;
      this.PUo.TransformOriginActor = e;
    }
  }
  Load(e, t) {
    if (this.ktr === e && this.IsValid()) {
      if (t) {
        t();
      }
    } else {
      this.ktr = e;
      this.Fbi = ResourceSystem_1.ResourceSystem.LoadAsync(this.ktr, UE.LevelSequence, e => {
        this.Ftr(e);
        if (t) {
          t();
        }
      });
    }
  }
  Play(e) {
    var t;
    if (this.IsValid()) {
      if (this.IsPlaying()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]尝试播放Npc表现Sequence时，Sequence正在播放中,停止后重新播放");
        }
        this.Oot();
      }
      (t = CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera).ResetSeqCineCamSetting();
      this.AddBindingByTag(sequenceCameraTag, t);
      CameraController_1.CameraController.EnterCameraMode(1, 0);
      this.Vtr(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayNpcPerformSequence);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]尝试播放Npc表现Sequence时，LevelSequencePlayer为空或不可用");
    }
  }
  AddBindingByTag(e, t) {
    this.Ntr.AddBindingByTag(e, t, false, true);
  }
  Ftr(e) {
    this.Ntr = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined, false);
    this.Ntr.SetSequence(e);
    this.SPe = this.Ntr.SequencePlayer;
    this.PUo = this.Ntr.DefaultInstanceData;
    this.Ntr.bOverrideInstanceData = true;
    var t = new UE.Vector(0);
    var t = (0, puerts_1.$ref)(t);
    if (e.GetCenterOffset(t)) {
      this.PUo.TransformOrigin = new UE.Transform((0, puerts_1.$unref)(t));
    } else {
      this.PUo.TransformOrigin = new UE.Transform();
    }
  }
  Vtr(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]开始播放Npc表现Sequence", ["SequenceName", this.SPe?.Sequence?.GetName()]);
    }
    this.Otr = e;
    this.SPe.OnFinished.Add(this.pLo);
    this.SPe.Play();
  }
  Stop() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]Npc表现Sequence被停止");
    }
    this.Oot();
  }
  Oot() {
    CameraController_1.CameraController.ExitCameraMode(1, 0);
    if (this.SPe?.IsValid()) {
      this.SPe.Stop();
    }
  }
  Pause() {
    if (this.SPe?.IsValid()) {
      this.SPe.Pause();
    }
  }
  Continue() {
    if (this.SPe?.IsValid()) {
      this.SPe.Play();
    }
  }
  IsPlaying() {
    return !!this.SPe?.IsValid() && this.SPe.IsPlaying();
  }
  IsValid() {
    return this.SPe?.IsValid() ?? false;
  }
  $ne() {
    CameraController_1.CameraController.ExitCameraMode(1, 0);
    if (this.Otr) {
      this.Otr();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNpcPerformSequenceFinished);
  }
}
exports.NpcPerformSequence = NpcPerformSequence;
//# sourceMappingURL=NpcPerformSequence.js.map
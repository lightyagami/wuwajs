"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoleySynthHandlerBase = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const CharacterNameDefines_1 = require("../../../CharacterNameDefines");
class FoleySynthRecord {
  constructor() {
    this.Speed = 0;
    this.BoneSpeed = 0;
    this.Acceleration = 0;
  }
}
class FoleySynthDynamicConfig {
  constructor() {
    this.State = -1;
  }
}
class FoleySynthHandlerBase {
  constructor(t, i, s) {
    this.ActorComp = t;
    this.AkComp = i;
    this.RecordCount = s;
    this.UeAkComp = undefined;
    this.FoleySynthRecordsModel = new Array();
    this.FoleySynthModelConfigs = new Array();
    this.FoleySynthModelDynamicConfigs = new Array();
    this.PreModelBoneComponentLocations = new Array();
    this.RecordIndex = 0;
    this.RecordTickCount = 0;
    this.RecordErrorFlag = 0;
    this.TempVector = Vector_1.Vector.Create();
    this.TempBoneLocation = Vector_1.Vector.Create();
    this.IsActive = false;
    this.SavedRecords = "";
    this.IsDebug = false;
    this.SavedPath = "";
    this.DebugTime = -0;
  }
  Init(t) {
    this.OnInit(t);
    this.RecordIndex = 0;
    this.RecordErrorFlag = 0;
    this.RecordTickCount = 0;
    this.UeAkComp = this.AkComp.GetAkComponentBySocketName(CharacterNameDefines_1.CharacterNameDefines.HIT_CASE_NAME);
    this.IsActive = true;
    for (let t = 0; t < this.RecordCount; ++t) {
      var i = new Array();
      for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t) {
        i.push(new FoleySynthRecord());
      }
      this.FoleySynthRecordsModel.push(i);
    }
    for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t) {
      this.PreModelBoneComponentLocations.push(Vector_1.Vector.Create());
      this.FoleySynthModelDynamicConfigs.push(new FoleySynthDynamicConfig());
    }
  }
  OnInit(t) {}
  Tick(t) {
    if (this.IsActive) {
      this.EYo(t);
    }
  }
  SetActive(t) {
    this.IsActive = t;
  }
  Clear() {
    this.ActorComp = undefined;
    this.AkComp = undefined;
    this.UeAkComp = undefined;
  }
  EYo(t) {
    t *= MathUtils_1.MathUtils.MillisecondToSecond;
    if (this.IsDebug) {
      this.DebugTime += t;
    }
    if (this.RecordTickCount === 0) {
      this.SYo();
      ++this.RecordTickCount;
    } else {
      this.yYo(t);
      if (this.RecordTickCount > this.RecordCount + this.RecordErrorFlag) {
        this.OnParseBoneSpeedForAudio();
      }
      ++this.RecordTickCount;
      if (this.RecordTickCount === Number.MAX_VALUE) {
        this.RecordTickCount = this.RecordCount;
        this.RecordErrorFlag = 0;
      }
    }
  }
  SYo() {
    for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t) {
      var i = this.FoleySynthModelConfigs[t];
      var i = this.ActorComp.Actor.Mesh.D_GetSocketTransform(i.BoneName, 2);
      this.PreModelBoneComponentLocations[t].DeepCopy(i.GetTranslation());
    }
  }
  yYo(i) {
    this.RecordIndex = (this.RecordIndex + 1) % this.RecordCount;
    var s = this.GetPreRecordIndex(1);
    for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t) {
      var h = this.FoleySynthModelConfigs[t];
      var e = this.ActorComp.Actor.Mesh.D_GetSocketLocation(h.BoneName);
      this.TempBoneLocation.DeepCopy(e);
      this.TempBoneLocation.SubtractionEqual(this.ActorComp.ActorLocationProxy);
      var e = this.IYo(this.TempBoneLocation, this.PreModelBoneComponentLocations[t], i);
      var r = e[0];
      var e = e[1];
      this.FoleySynthRecordsModel[this.RecordIndex][t].Speed = r;
      this.FoleySynthRecordsModel[this.RecordIndex][t].BoneSpeed = e;
      var o = this.FoleySynthRecordsModel[s][t].Speed;
      var o = (r - o) / i;
      this.FoleySynthRecordsModel[this.RecordIndex][t].Acceleration = o;
      this.PreModelBoneComponentLocations[t].DeepCopy(this.TempBoneLocation);
      if (this.IsDebug) {
        this.SaveDebugInfo(h.BoneName, r, o, e);
      }
    }
  }
  OnParseBoneSpeedForAudio() {}
  IYo(t, i, s) {
    this.TempVector.DeepCopy(t);
    this.TempVector.SubtractionEqual(i);
    this.TempVector.DivisionEqual(s);
    t = this.TempVector.Size();
    this.TempVector.AdditionEqual(this.ActorComp.ActorVelocityProxy);
    return [this.TempVector.Size(), t];
  }
  GetPreRecordIndex(t) {
    return (this.RecordIndex + this.RecordCount - t) % this.RecordCount;
  }
  GetCurrentRecord(t) {
    return this.FoleySynthRecordsModel[this.RecordIndex][t];
  }
  SetDebug(t) {
    if (t) {
      this.SavedPath = UE.KismetSystemLibrary.GetProjectDirectory() + "/Saved/FoleySynth/FoleySynthRecord_" + this.constructor?.name + "_" + this.ActorComp.Actor.GetName() + ".txt";
      if (!UE.FileSystemOperation.FileExists(this.SavedPath)) {
        UE.FileSystemOperation.WriteFile(this.SavedPath, "Test........");
      }
      this.SavedRecords = "";
      this.IsDebug = true;
      this.DebugTime = 0;
    } else {
      UE.FileSystemOperation.WriteFile(this.SavedPath, this.SavedRecords);
      this.SavedRecords = "";
      this.IsDebug = false;
    }
  }
  SaveDebugInfo(t, i, s, h) {
    if (this.IsDebug && (t = t?.toString() + ",speed:" + i.toString() + ",acceleration:" + s.toString() + ",boneSpeed:" + h.toString() + ",debugTime:" + this.DebugTime.toString(), this.SavedRecords = this.SavedRecords + "\n" + t, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Audio", 57, "-------------Ak[FoleySynth] Debug信息", ["Actor", this.ActorComp.Actor.GetName()], ["Info", t]);
    }
  }
}
exports.FoleySynthHandlerBase = FoleySynthHandlerBase;
//# sourceMappingURL=FoleySynthHandlerBase.js.map
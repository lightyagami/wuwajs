"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubLevel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const GlobalData_1 = require("../../../GlobalData");
const GameModePromise_1 = require("../../Define/GameModePromise");
const LoadLevelDefine_1 = require("../../Define/LoadLevelDefine");
class SubLevel {
  constructor(e, i) {
    this.Path = e;
    this.VisibleAfterLoad = i;
    this.LoadState = 0;
    this.Level = undefined;
    this.LinkId = 0;
    this.UnLoadLinkId = 0;
    this.DependOnBeginPlayLogic = false;
    this.LoadPromise = new GameModePromise_1.GameModePromise();
    this.UnLoadPromise = new GameModePromise_1.GameModePromise();
    this.Mz1 = false;
    this.Pd1 = undefined;
    this.xd1 = undefined;
    this.Ud1 = e => {
      if (e === this.LinkId) {
        this.Pd1?.SetResult(true);
      }
    };
    this.xd1 = (0, puerts_1.toManualReleaseDelegate)(this.Ud1);
    if (this.Path.includes("_Audio")) {
      this.DependOnBeginPlayLogic = true;
    }
  }
  get LoadVisibleParam() {
    return !this.DependOnBeginPlayLogic || this.VisibleAfterLoad;
  }
  get IsVisible() {
    if (this.DependOnBeginPlayLogic) {
      return this.Level?.IsLevelVisible() ?? false;
    } else {
      return this.Mz1;
    }
  }
  Dispose() {
    if (this.Pd1?.IsPending()) {
      this.Pd1?.SetResult(false);
    }
    this.Pd1 = undefined;
    UE.KuroSubLevelVisibleSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance).RemoveLevel(this.LinkId);
    (this.Level = undefined, puerts_1.releaseManualReleaseDelegate)(this.Ud1);
  }
  async OnLevelLoad(e) {
    var i;
    if (e) {
      this.Level = e;
      this.Mz1 = this.LoadVisibleParam;
      if (!this.DependOnBeginPlayLogic) {
        e = e.GetLoadedLevel();
        (i = UE.KuroSubLevelVisibleSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance)).AddLevel(this.LinkId, e);
        i.SetOneFrameExecuteCount(Platform_1.Platform.IsPcPlatform() ? LoadLevelDefine_1.PC_ONEFRAME_MAXSET_COUNT : LoadLevelDefine_1.MOBILE_ONEFRAME_MAXSET_COUNT);
        await this.SetLevelVisible(this.VisibleAfterLoad, "OnLevelLoad");
      }
      this.LoadState = 2;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameMode", 3, "SubLevelController:加载的子关卡不存在", ["LinkId", this.LinkId], ["Level", this.Path]);
    }
    this.LoadPromise.SetResult(true);
  }
  async SetLevelVisible(e, i) {
    if (this.Level && this.Level.IsLevelLoaded()) {
      if (this.DependOnBeginPlayLogic) {
        await this.Ez1(this.Level, e, i);
      } else {
        await this.Iz1(e, i);
      }
      this.Mz1 = e;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameMode", 18, "SetLevelVisible:失败,Level未加载完毕", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]);
    }
  }
  async Ez1(e, i, s) {
    var t;
    var o;
    if (e.IsLevelVisible() !== i && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleWithBeginPlay:开始", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", i], ["reason", s]), this.Pd1 = new CustomPromise_1.CustomPromise(), (o = i ? e.OnLevelShown : e.OnLevelHidden).Add(t = () => {
      this.Pd1.SetResult(true);
    }), e.SetShouldBeVisible(i), await this.Pd1.Promise, o.Remove(t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleWithBeginPlay:结束", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", i], ["reason", s]);
    }
  }
  async Iz1(e, i) {
    var s;
    if (this.Mz1 !== e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleNoBeginPlay:开始", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]), s = UE.KuroSubLevelVisibleSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance), this.Pd1 = new CustomPromise_1.CustomPromise(), s = s.SetLevelActorsVisible(this.LinkId, e, this.xd1), await this.Pd1.Promise, s || Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 18, "SetLevelVisibleNoBeginPlay:失败,Actors为空", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleNoBeginPlay:结束", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]);
    }
  }
}
exports.SubLevel = SubLevel;
//# sourceMappingURL=SubLevel.js.map
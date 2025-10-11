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
    this.Yz1 = false;
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
      return this.Yz1;
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
      this.Yz1 = this.LoadVisibleParam;
      if (!this.DependOnBeginPlayLogic) {
        e = e.GetLoadedLevel();
        (i = UE.KuroSubLevelVisibleSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance)).AddLevel(this.LinkId, e);
        i.SetOneFrameExecuteCount(Platform_1.Platform.IsPcPlatform() ? LoadLevelDefine_1.PC_ONEFRAME_MAXSET_COUNT : LoadLevelDefine_1.MOBILE_ONEFRAME_MAXSET_COUNT);
        await this.SetLevelVisible(this.VisibleAfterLoad, "OnLevelLoad", false);
      }
      this.LoadState = 2;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameMode", 3, "SubLevelController:加载的子关卡不存在", ["LinkId", this.LinkId], ["Level", this.Path]);
    }
    this.LoadPromise.SetResult(true);
  }
  async SetLevelVisible(e, i, t = true) {
    if (this.Level && this.Level.IsLevelLoaded()) {
      if (t && this.LoadState === 1) {
        await this.LoadPromise.Promise;
      }
      if (this.DependOnBeginPlayLogic) {
        await this.zz1(this.Level, e, i);
      } else {
        await this.Jz1(e, i);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameMode", 18, "SetLevelVisible:失败,Level未加载完毕", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]);
    }
  }
  async zz1(e, i, t) {
    var s = e.IsLevelVisible();
    if (s !== i) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleWithBeginPlay:开始", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", i], ["reason", t]);
      }
      const a = new CustomPromise_1.CustomPromise();
      var s = () => {
        a.SetResult(true);
      };
      var o = i ? e.OnLevelShown : e.OnLevelHidden;
      o.Add(s);
      e.SetShouldBeVisible(i);
      await a.Promise;
      o.Remove(s);
      this.Yz1 = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleWithBeginPlay:结束", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", i], ["reason", t]);
      }
    }
  }
  async Jz1(e, i) {
    var t;
    if (this.Yz1 !== e && (this.Yz1 = e, Log_1.Log.CheckDebug() && Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleNoBeginPlay:开始", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]), t = UE.KuroSubLevelVisibleSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance), this.Pd1 = new CustomPromise_1.CustomPromise(), t = t.SetLevelActorsVisible(this.LinkId, e, this.xd1), await this.Pd1.Promise, t || Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 18, "SetLevelVisibleNoBeginPlay:失败,Actors为空", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleNoBeginPlay:结束", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]);
    }
  }
}
exports.SubLevel = SubLevel;
//# sourceMappingURL=SubLevel.js.map
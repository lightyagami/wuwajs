"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SubLevel = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Platform_1 = require("../../../../Launcher/Platform/Platform"),
  GlobalData_1 = require("../../../GlobalData"),
  GameModePromise_1 = require("../../Define/GameModePromise"),
  LoadLevelDefine_1 = require("../../Define/LoadLevelDefine");
class SubLevel {
  constructor(e, i) {
    this.Path = e, this.VisibleAfterLoad = i, this.LoadState = 0, this.Level = void 0, this.LinkId = 0, this.UnLoadLinkId = 0, this.DependOnBeginPlayLogic = !1, this.LoadPromise = new GameModePromise_1.GameModePromise, this.UnLoadPromise = new GameModePromise_1.GameModePromise, this.wY1 = !1, this.hd1 = void 0, this.ld1 = void 0, this._d1 = e => {
      e === this.LinkId && this.hd1?.SetResult(!0)
    }, this.ld1 = (0, puerts_1.toManualReleaseDelegate)(this._d1), this.Path.includes("_Audio") && (this.DependOnBeginPlayLogic = !0)
  }
  get LoadVisibleParam() {
    return !this.DependOnBeginPlayLogic || this.VisibleAfterLoad
  }
  get IsVisible() {
    return this.DependOnBeginPlayLogic ? this.Level?.IsLevelVisible() ?? !1 : this.wY1
  }
  Dispose() {
    this.hd1?.IsPending() && this.hd1?.SetResult(!1), this.hd1 = void 0, UE.KuroSubLevelVisibleSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance).RemoveLevel(this.LinkId), (this.Level = void 0, puerts_1.releaseManualReleaseDelegate)(this._d1)
  }
  async OnLevelLoad(e) {
    var i;
    e ? (this.LoadState = 2, this.Level = e, this.wY1 = this.LoadVisibleParam, this.DependOnBeginPlayLogic || (e = e.GetLoadedLevel(), (i = UE.KuroSubLevelVisibleSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance)).AddLevel(this.LinkId, e), i.SetOneFrameExecuteCount(Platform_1.Platform.IsPcPlatform() ? LoadLevelDefine_1.PC_ONEFRAME_MAXSET_COUNT : LoadLevelDefine_1.MOBILE_ONEFRAME_MAXSET_COUNT), await this.SetLevelVisible(this.VisibleAfterLoad, "OnLevelLoad"))) : Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 3, "SubLevelController:加载的子关卡不存在", ["LinkId", this.LinkId], ["Level", this.Path]), this.LoadPromise.SetResult(!0)
  }
  async SetLevelVisible(e, i) {
    this.Level && this.Level.IsLevelLoaded() ? (this.DependOnBeginPlayLogic ? await this.AY1(this.Level, e, i) : await this.PY1(e, i), this.wY1 = e) : Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 18, "SetLevelVisible:失败,Level未加载完毕", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i])
  }
  async AY1(e, i, s) {
    var t, o;
    e.IsLevelVisible() !== i && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleWithBeginPlay:开始", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", i], ["reason", s]), this.hd1 = new CustomPromise_1.CustomPromise, (o = i ? e.OnLevelShown : e.OnLevelHidden).Add(t = () => {
      this.hd1.SetResult(!0)
    }), e.SetShouldBeVisible(i), await this.hd1.Promise, o.Remove(t), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleWithBeginPlay:结束", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", i], ["reason", s])
  }
  async PY1(e, i) {
    var s;
    this.wY1 !== e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleNoBeginPlay:开始", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]), s = UE.KuroSubLevelVisibleSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance), this.hd1 = new CustomPromise_1.CustomPromise, s = s.SetLevelActorsVisible(this.LinkId, e, this.ld1), await this.hd1.Promise, s || Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 18, "SetLevelVisibleNoBeginPlay:失败,Actors为空", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i]), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("GameMode", 18, "SetLevelVisibleNoBeginPlay:结束", ["path", this.Path], ["LinkId", this.LinkId], ["bVisible", e], ["reason", i])
  }
}
exports.SubLevel = SubLevel;
//# sourceMappingURL=SubLevel.js.map
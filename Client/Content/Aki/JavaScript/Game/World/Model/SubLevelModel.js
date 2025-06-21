"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SubLevelModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  GlobalData_1 = require("../../GlobalData"),
  SubLevel_1 = require("../Controller/SubLevelAssistant/SubLevel");
class SubLevelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.SW_ = new Map, this.da = new Map, this.MW_ = new Map
  }
  OnLeaveLevel() {
    var e, t, l = new Array;
    for ([e] of this.SW_) l.push(e);
    for ([t] of this.da) l.push(t);
    for (const o of l) this.RemoveSubLevel(o, !0);
    return !(l.length = 0)
  }
  GetAllPreloadSubLevels() {
    return this.SW_
  }
  GetAllSubLevels() {
    return this.da
  }
  GetAllUnloadSubLevels() {
    return this.MW_
  }
  AddPreloadSubLevel(e) {
    if (this.SW_.has(e)) Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[GameModeModel.AddPreloadSubLevel] 重复添加预加载的Level，因为存在于this.PreloadLevelMap中", ["Path", e]);
    else {
      var t;
      if (!this.da.has(e)) return t = new SubLevel_1.SubLevel(e, !1), this.SW_.set(e, t), t;
      Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[GameModeModel.AddPreloadSubLevel] 重复添加预加载Level，因为存在于SubLevelMap中", ["Path", e])
    }
  }
  RemovePreloadSubLevel(e) {
    return this.SW_.delete(e)
  }
  GetPreloadSubLevel(e) {
    return this.SW_.get(e)
  }
  GetPreloadOrLoadedSubLevel(e) {
    var t = this.SW_.get(e);
    return t || this.da.get(e)
  }
  GetSubLevel(e) {
    return this.da.get(e)
  }
  AddSubLevel(e, t) {
    if (!this.da.has(e)) return t = new SubLevel_1.SubLevel(e, t), this.da.set(e, t), t;
    Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[GameModeModel.AddSubLevel] 重复添加子关卡。", ["Path", e])
  }
  async RemoveSubLevel(e, t = !1) {
    let l = void 0;
    if (this.da.has(e) ? (l = this.da.get(e), this.da.delete(e)) : this.SW_.has(e) && (l = this.SW_.get(e), this.SW_.delete(e)), !l) return Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[GameModeModel.RemoveSubLevel]不存在子关卡，删除子关卡失败。", ["Path", e]), !1;
    if (3 === l.LoadState) return !1;
    let o = 0;
    var r = FNameUtil_1.FNameUtil.GetDynamicFName(e),
      s = this.MW_.size;
    let a = !1;
    var i, d = l.LoadState;
    return t ? 1 === l.LoadState ? l.UnLoadPromise.SetResult(!0) : 2 === l.LoadState ? (o = GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(r, !0), l.UnLoadLinkId = o, this.AddUnloadSubLevel(e, l)) : (l.LoadPromise.SetResult(!1), l.UnLoadPromise.SetResult(!0)) : 1 === l.LoadState ? ((i = this.GetUnloadSubLevel(e)) && (i.UnLoadPromise?.SetResult(!0), a = !0), this.AddUnloadSubLevel(e, l)) : 2 === l.LoadState ? (o = GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(r, !0), l.UnLoadLinkId = o, this.AddUnloadSubLevel(e, l)) : (l.LoadPromise.SetResult(!1), l.UnLoadPromise.SetResult(!0)), l.LoadState = 3, l.Dispose(), Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 3, "切换子关卡:卸载子关卡。", ["Path", e], ["LinkId", o], ["需要释放数量(前)", s], ["需要释放数量(后)", this.MW_.size], ["loadType", d], ["foreceRemove", t], ["isInUnloadLevel", a]), l.UnLoadPromise.Promise
  }
  MovePreloadSubLevelToSubLevel(e) {
    var t = this.GetPreloadSubLevel(e);
    t && (this.RemovePreloadSubLevel(e), this.Rnc(t))
  }
  Rnc(e) {
    return this.da.has(e.Path) ? (Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, "[GameModeModel.AddSubLevelInstance] 重复添加子关卡。", ["Path", e.Path]), !1) : (this.da.set(e.Path, e), !0)
  }
  GetUnloadSubLevel(e) {
    return this.MW_.get(e)
  }
  AddUnloadSubLevel(e, t) {
    this.MW_.set(e, t)
  }
  RemoveUnloadSubLevel(e) {
    return this.MW_.delete(e)
  }
}
exports.SubLevelModel = SubLevelModel;
//# sourceMappingURL=SubLevelModel.js.map
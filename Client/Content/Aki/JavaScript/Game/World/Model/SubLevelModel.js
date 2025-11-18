"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubLevelModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GlobalData_1 = require("../../GlobalData");
const SubLevel_1 = require("../Controller/SubLevelAssistant/SubLevel");
class SubLevelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.SW_ = new Map();
    this.da = new Map();
    this.MW_ = new Map();
    this.Ogm = false;
    this.Ggm = false;
  }
  OnLeaveLevel() {
    var e;
    var t;
    var l = new Array();
    for ([e] of this.SW_) {
      l.push(e);
    }
    for ([t] of this.da) {
      l.push(t);
    }
    for (const r of l) {
      this.RemoveSubLevel(r, true);
    }
    l.length = 0;
    this.Ogm = false;
    return !(this.Ggm = false);
  }
  SetSubLevelSwitching(e) {
    this.Ogm = true;
    this.Ggm = e;
  }
  UnsetSubLevelSwitching() {
    this.Ogm = false;
    this.Ggm = false;
  }
  IsInSubLevelSwitching() {
    return this.Ogm;
  }
  IsInSubLevelSwitchingAndBlockingInput() {
    return this.Ogm && this.Ggm;
  }
  GetAllPreloadSubLevels() {
    return this.SW_;
  }
  GetAllSubLevels() {
    return this.da;
  }
  GetAllUnloadSubLevels() {
    return this.MW_;
  }
  AddPreloadSubLevel(e) {
    if (this.SW_.has(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[GameModeModel.AddPreloadSubLevel] 重复添加预加载的Level，因为存在于this.PreloadLevelMap中", ["Path", e]);
      }
    } else {
      var t;
      if (!this.da.has(e)) {
        t = new SubLevel_1.SubLevel(e, false);
        this.SW_.set(e, t);
        return t;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[GameModeModel.AddPreloadSubLevel] 重复添加预加载Level，因为存在于SubLevelMap中", ["Path", e]);
      }
    }
  }
  RemovePreloadSubLevel(e) {
    return this.SW_.delete(e);
  }
  GetPreloadSubLevel(e) {
    return this.SW_.get(e);
  }
  GetPreloadOrLoadedSubLevel(e) {
    var t = this.SW_.get(e);
    return t || this.da.get(e);
  }
  GetSubLevel(e) {
    return this.da.get(e);
  }
  AddSubLevel(e, t) {
    if (!this.da.has(e)) {
      t = new SubLevel_1.SubLevel(e, t);
      this.da.set(e, t);
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[GameModeModel.AddSubLevel] 重复添加子关卡。", ["Path", e]);
    }
  }
  async RemoveSubLevel(e, t = false) {
    let l = undefined;
    if (this.da.has(e)) {
      l = this.da.get(e);
      this.da.delete(e);
    } else if (this.SW_.has(e)) {
      l = this.SW_.get(e);
      this.SW_.delete(e);
    }
    if (!l) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[GameModeModel.RemoveSubLevel]不存在子关卡，删除子关卡失败。", ["Path", e]);
      }
      return false;
    }
    if (l.LoadState === 3) {
      return false;
    }
    let r = 0;
    var o = FNameUtil_1.FNameUtil.GetDynamicFName(e);
    var s = this.MW_.size;
    let i = false;
    var a;
    var u = l.LoadState;
    if (t) {
      if (l.LoadState === 1) {
        l.UnLoadPromise.SetResult(true);
      } else if (l.LoadState === 2) {
        r = GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(o, true);
        l.UnLoadLinkId = r;
        this.AddUnloadSubLevel(e, l);
      } else {
        l.LoadPromise.SetResult(false);
        l.UnLoadPromise.SetResult(true);
      }
    } else if (l.LoadState === 1) {
      if (a = this.GetUnloadSubLevel(e)) {
        a.UnLoadPromise?.SetResult(true);
        i = true;
      }
      this.AddUnloadSubLevel(e, l);
    } else if (l.LoadState === 2) {
      r = GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(o, true);
      l.UnLoadLinkId = r;
      this.AddUnloadSubLevel(e, l);
    } else {
      l.LoadPromise.SetResult(false);
      l.UnLoadPromise.SetResult(true);
    }
    l.LoadState = 3;
    l.Dispose();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "切换子关卡:卸载子关卡。", ["Path", e], ["LinkId", r], ["需要释放数量(前)", s], ["需要释放数量(后)", this.MW_.size], ["loadType", u], ["foreceRemove", t], ["isInUnloadLevel", i]);
    }
    return l.UnLoadPromise.Promise;
  }
  MovePreloadSubLevelToSubLevel(e) {
    var t = this.GetPreloadSubLevel(e);
    if (t) {
      this.RemovePreloadSubLevel(e);
      this.Rnc(t);
    }
  }
  Rnc(e) {
    if (this.da.has(e.Path)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[GameModeModel.AddSubLevelInstance] 重复添加子关卡。", ["Path", e.Path]);
      }
      return false;
    } else {
      this.da.set(e.Path, e);
      return true;
    }
  }
  GetUnloadSubLevel(e) {
    return this.MW_.get(e);
  }
  AddUnloadSubLevel(e, t) {
    this.MW_.set(e, t);
  }
  RemoveUnloadSubLevel(e) {
    return this.MW_.delete(e);
  }
}
exports.SubLevelModel = SubLevelModel;
//# sourceMappingURL=SubLevelModel.js.map
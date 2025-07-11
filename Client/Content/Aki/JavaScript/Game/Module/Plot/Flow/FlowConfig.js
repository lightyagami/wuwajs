"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowConfig = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const FlowById_1 = require("../../../../Core/Define/ConfigQuery/FlowById");
const FlowStateByStateKey_1 = require("../../../../Core/Define/ConfigQuery/FlowStateByStateKey");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const GlobalData_1 = require("../../../GlobalData");
class FlowConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.$Xi = undefined;
  }
  OnInit() {
    this.$Xi = new Map();
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      FlowListData.AudioCache = new Set();
      this.lte();
    }
    return true;
  }
  OnClear() {
    this.$Xi = undefined;
    return !(FlowListData.AudioCache = undefined);
  }
  GetRandomFlow(t, e, o, i) {
    let l = undefined;
    if (l = (l = i ? this.GetFlowStateActions(t, e, i) : l) || this.YXi(t, e, o)) {
      return l.find(t => t.Name === "ShowTalk")?.Params;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 18, "找不到剧情配置", ["flowListName", t], ["flowId", e]);
    }
  }
  GetFlowStateActions(t, e, o) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      const i = this.JXi(t, e, o);
      if (i) {
        return JSON.parse(i.Actions);
      } else {
        return undefined;
      }
    }
    const i = this.zXi(t, e, o);
    if (i) {
      return i.Actions;
    }
  }
  GetFlowNeedLoad(t, e, o) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      const i = this.JXi(t, e, o);
      return i.IsPreloadFlow;
    }
    const i = this.zXi(t, e, o);
    return i?.IsPreloadFlow;
  }
  GetFlowStateKeepMusic(t, e, o) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      const i = this.JXi(t, e, o);
      return i?.KeepBgm;
    }
    const i = this.zXi(t, e, o);
    return i?.KeepBgm;
  }
  JXi(t, e, o) {
    t = `${t}_${e}_${o}`;
    e = FlowStateByStateKey_1.configFlowStateByStateKey.GetConfig(t);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 18, "无法找到对应剧情配置", ["stateKey", t]);
      }
    }
    return e;
  }
  YXi(t, e, o) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var i = t + "_" + e;
      const l = FlowById_1.configFlowById.GetConfig(i);
      if (l) {
        i = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(l.States);
        return this.GetFlowStateActions(t, e, i);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Plot", 18, "找不到剧情配置", ["flowListName", t], ["flowId", e]);
        }
        return;
      }
    }
    const l = this.ZXi(t, e, o);
    if (l && l.States && l.States.length !== 0) {
      i = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(l.States);
      if (i) {
        return i.Actions;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 18, "剧情状态为空", ["flowListName", t], ["flowId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 29, "找不到剧情配置", ["flowListName", t], ["flowId", e]);
    }
  }
  zXi(t, e, o, i) {
    t = this.ZXi(t, e, i);
    if (t) {
      if (!(i = t.States.find(t => t.Id === o))) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 18, "[StartFlow] 无法找到对应剧情的状态", ["FlowId", e], ["StateId", o]);
        }
      }
      return i;
    }
  }
  e$i(t, e) {
    this.$Xi ||= new Map();
    let o = this.$Xi.get(t);
    if (!o) {
      var i = PublicUtil_1.PublicUtil.GetFlowListInfo(t);
      if (!i || !i.Flows || i.Flows.length === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 29, "FlowListName配置错误", ["Value", t], ["Name", e]);
        }
        return;
      }
      (o = new FlowListData()).Init(i);
      this.$Xi.set(t, o);
      PublicUtil_1.PublicUtil.RegisterFlowTextLocalConfig(t);
    }
    o.UpdateTime();
    return o;
  }
  ZXi(t, e, o) {
    t = this.e$i(t, o);
    if (t) {
      if (!(o = t.GetFlowInfo(e))) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 7, "[PlotController.StartPlotNetwork] 无法找到对应剧情", ["PlotName", e]);
        }
      }
      return o;
    }
  }
  lte() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "加载音频资源表");
      }
      var t = UE.BlueprintPathsLibrary.ProjectContentDir() + "../../..";
      var t = UE.MyFileHelper.GetAbsolutePath(t + "/Source/Config/Raw/BaseTables/j.剧情语音.xlsx");
      var e = UE.KuroConfigEdLibrary.CreateOrLoadExcel(t, true);
      FlowListData.AudioCache.clear();
      var o = e.mSheets.Num();
      for (let t = 0; t < o; t++) {
        var i = e.mSheets.Get(t);
        if (i.GetName().endsWith("|PlotAudio")) {
          var l = i.RowCount();
          for (let t = 6; t < l; t++) {
            var r = i.ReadStr(t, 0)?.startsWith("#");
            var a = i.ReadStr(t, 4);
            if (!StringUtils_1.StringUtils.IsEmpty(a) && !r) {
              FlowListData.AudioCache.add(a);
            }
          }
        }
      }
      e.Dispose();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "检索到条音频", ["FlowListData.AudioCache!.size", FlowListData.AudioCache.size]);
      }
    }
  }
  ResetLocalFlowConfig() {
    this.$Xi?.clear();
  }
}
exports.FlowConfig = FlowConfig;
class FlowListData {
  constructor() {
    this.IdsMap = undefined;
  }
  Init(t) {
    this.IdsMap = new Map();
    for (const o of t.Flows) {
      var e = Object.assign({}, o);
      e.States.forEach(t => {
        t.Actions.forEach(t => {
          if (t.Name === "ShowTalk") {
            t.Params.TalkItems?.forEach(t => {
              if (FlowListData.AudioCache.has(t.TidTalk)) {
                t.PlayVoice = true;
              }
            });
          }
        });
      });
      this.IdsMap.set(e.Id, e);
    }
  }
  GetFlowInfo(t) {
    return this.IdsMap.get(t);
  }
  UpdateTime() {}
}
FlowListData.AudioCache = undefined;
//# sourceMappingURL=FlowConfig.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiTimeDilation = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Net_1 = require("../../../Core/Net/Net");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Game/Manager/ModelManager");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiManager_1 = require("../UiManager");
class SnapshotData {
  constructor() {
    this.InTimeFlowViewId = undefined;
    this.CacheTimeDilationData = undefined;
    this.TimeDilationData = undefined;
    this.CacheTimeDilationTagSet = new Set();
    this.WaitSetTimeDilationTagSet = new Set();
    this.ViewIdList = [];
    this.TimeDilationMap = new Map();
  }
}
class UiTimeDilation {
  static set GmSwitch(i) {
    UiTimeDilation.sjs = i;
  }
  static get GmSwitch() {
    return UiTimeDilation.sjs;
  }
  static get s1t() {
    return UiTimeDilation.ajs?.TimeDilation ?? 1;
  }
  static get hjs() {
    return UiTimeDilation.ajs?.ViewId ?? 0;
  }
  static get ljs() {
    return UiTimeDilation.ajs?.DebugName;
  }
  static get pLe() {
    return UiTimeDilation.ajs?.Reason ?? "UiTimeDilation";
  }
  static GetTimeDilationDataCopy() {
    if (UiTimeDilation.ajs) {
      return {
        TimeDilation: UiTimeDilation.ajs.TimeDilation,
        ViewId: UiTimeDilation.ajs.ViewId,
        DebugName: UiTimeDilation.ajs.DebugName,
        Reason: UiTimeDilation.ajs.Reason
      };
    }
  }
  static Init() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, UiTimeDilation.Sur);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, UiTimeDilation.yur);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetModuleAfterResetToBattleView, UiTimeDilation.Iur);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, UiTimeDilation.Iur);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeMode, UiTimeDilation.Tur);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation, UiTimeDilation.Lur);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReConnectSuccess, UiTimeDilation.Dur);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSequenceCameraStatus, UiTimeDilation.Rur);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterGameSuccess, UiTimeDilation.Dur);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartLoadingState, UiTimeDilation.NBn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFinishLoadingState, UiTimeDilation.kBn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddLevelLoadingTimeDilationTag, UiTimeDilation._js);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveLevelLoadingTimeDilationTag, UiTimeDilation.ujs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueLevelLoadingLockTimeDilation, UiTimeDilation.XO1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueLevelLoadingUnlockTimeDilation, UiTimeDilation.YO1);
  }
  static Destroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, UiTimeDilation.Sur);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, UiTimeDilation.yur);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetModuleAfterResetToBattleView, UiTimeDilation.Iur);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, UiTimeDilation.Iur);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMode, UiTimeDilation.Tur);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation, UiTimeDilation.Lur);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReConnectSuccess, UiTimeDilation.Dur);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSequenceCameraStatus, UiTimeDilation.Rur);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterGameSuccess, UiTimeDilation.Dur);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartLoadingState, UiTimeDilation.NBn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFinishLoadingState, UiTimeDilation.kBn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddLevelLoadingTimeDilationTag, UiTimeDilation._js);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveLevelLoadingTimeDilationTag, UiTimeDilation.ujs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueLevelLoadingLockTimeDilation, UiTimeDilation.XO1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueLevelLoadingUnlockTimeDilation, UiTimeDilation.YO1);
  }
  static Aur(i, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiTimeDilation", 10, "输出外部调用时停原因", ["原因", e], ["是否触发真时停", i < MathUtils_1.MathUtils.KindaSmallNumber]);
    }
  }
  static cjs(i) {
    if (!UiTimeDilation.Nur || UiTimeDilation.Nur.TimeDilation === 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "缓存数据添加", ["触发界面", i.DebugName], ["界面Id", i.ViewId]);
      }
      UiTimeDilation.Nur = i;
    }
  }
  static mjs(i) {
    if (ModelManager_1.ModelManager.GameModeModel) {
      if (UiTimeDilation.qur()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiTimeDilation", 10, "联机状态,不允许设置界面时停", ["触发界面", i.DebugName], ["界面Id", i.ViewId]);
        }
        return false;
      } else {
        UiTimeDilation.Pur(i);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiTimeDilation", 10, "界面时停设置", ["触发界面", i.DebugName], ["设置流速", i.TimeDilation], ["界面Id", i.ViewId]);
        }
        return true;
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "GameModeModel不存在,不允许设置界面时停", ["触发界面", i.DebugName], ["界面Id", i.ViewId]);
      }
      return false;
    }
  }
  static Pur(i) {
    var e = i.TimeDilation;
    UiTimeDilation.ajs = e !== 1 ? i : undefined;
    UiTimeDilation.Aur(e, i.Reason);
    if (UiTimeDilation.wur) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "界面时停被更高级别时停影响，实际未生效");
      }
    } else if (UiTimeDilation.GmSwitch) {
      ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(e * UiTimeDilation.djs);
    } else if (e < MathUtils_1.MathUtils.KindaSmallNumber) {
      ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(true, "UiTimeDilation");
    } else {
      ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(false, "UiTimeDilation", e * UiTimeDilation.djs);
    }
  }
  static SetGameTimeDilation(i) {
    if (!Net_1.Net.IsServerConnected()) {
      UiTimeDilation.AddWaitSetTimeDilationTag("ServerConnect");
    }
    if (UiTimeDilation.KWf()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "指定Plot层级,有需要等待设置时停的tag,不允许设置界面时停", ["触发界面", i.DebugName], ["界面Id", i.ViewId], ["Tag", UiTimeDilation.vur]);
      }
      UiTimeDilation.XWf(i);
      return false;
    } else if (UiTimeDilation.Gur()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "有需要等待设置时停的tag,不允许设置界面时停", ["触发界面", i.DebugName], ["界面Id", i.ViewId], ["Tag", UiTimeDilation.vur]);
      }
      UiTimeDilation.cjs(i);
      return false;
    } else {
      return UiTimeDilation.mjs(i);
    }
  }
  static qur() {
    return ModelManager_1.ModelManager.GameModeModel.IsMulti;
  }
  static SetTimeDilationHighLevel(i, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiTimeDilation", 10, "设置高级别时停", ["时停参数", i], ["Reason", e]);
    }
    UiTimeDilation.wur = true;
    if (UiTimeDilation.GmSwitch) {
      ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(i);
    } else if (i < MathUtils_1.MathUtils.KindaSmallNumber) {
      ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(true, e);
    } else {
      ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(false, "UiTimeDilation", i);
    }
  }
  static get Bur() {
    return !!UiTimeDilation.ajs && UiTimeDilation.ajs.TimeDilation < MathUtils_1.MathUtils.KindaSmallNumber;
  }
  static get IsUiTimeDilated() {
    return UiTimeDilation.ajs !== undefined && UiTimeDilation.ajs.TimeDilation < 1;
  }
  static ResetTimeDilationHighLevel(i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiTimeDilation", 10, "恢复高级别时停");
    }
    UiTimeDilation.wur = false;
    ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(UiTimeDilation.Bur, "UiTimeDilation");
    var e = UiTimeDilation.s1t;
    if (UiTimeDilation.GmSwitch) {
      ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(e);
    } else if (e < MathUtils_1.MathUtils.KindaSmallNumber) {
      ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(false, i);
    } else {
      ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(false, i, e);
    }
  }
  static Our() {
    var i;
    if (UiTimeDilation.Nur) {
      if (UiTimeDilation.kur && UiTimeDilation.kur !== UiTimeDilation.Nur.ViewId) {
        UiTimeDilation.Nur = undefined;
      } else if (UiTimeDilation.SetGameTimeDilation(UiTimeDilation.Nur) && (UiTimeDilation.kur = UiTimeDilation.Nur.ViewId, i = UiTimeDilation.Nur.DebugName, UiTimeDilation.Nur = undefined, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("UiTimeDilation", 10, "缓存数据设置成功", ["界面", i], ["界面Id", UiTimeDilation.kur]);
      }
    }
  }
  static AddViewData(i, e, t) {
    if (t < 1) {
      UiTimeDilation.Fur.push(e);
      UiTimeDilation.Vur.set(e, {
        ViewId: e,
        TimeDilation: t,
        DebugName: i,
        Reason: "UiTimeDilation"
      });
    }
  }
  static RemoveViewData(i) {
    if (UiTimeDilation.Vur.delete(i) && (i = UiTimeDilation.Fur.indexOf(i)) >= 0) {
      UiTimeDilation.Fur.splice(i, 1);
    }
  }
  static SetNextViewTimeDilation() {
    var i;
    var e = UiTimeDilation.Fur.shift();
    if (e && (i = UiTimeDilation.Vur.get(e), UiTimeDilation.SetGameTimeDilation(i)) && (UiTimeDilation.kur = e, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("UiTimeDilation", 10, "界面时停设置下个数据", ["界面", i?.DebugName], ["界面Id", e]);
    }
  }
  static AddWaitSetTimeDilationTag(i) {
    if (UiTimeDilation.mF_) {
      UiTimeDilation.mF_.WaitSetTimeDilationTagSet.add(i);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "指定Plot层级,添加等待设置时停的tag", ["Tag", i]);
      }
    } else {
      UiTimeDilation.vur.add(i);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "添加等待设置时停的tag", ["Tag", i]);
      }
    }
    if (UiTimeDilation.ajs) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "目前存在界面正在时停中,缓存并且临时恢复", ["Tag", i]);
      }
      UiTimeDilation.cjs(UiTimeDilation.ajs);
      UiTimeDilation.mjs({
        ViewId: UiTimeDilation.ajs.ViewId,
        TimeDilation: 1,
        DebugName: UiTimeDilation.ajs.DebugName,
        Reason: UiTimeDilation.ajs.Reason
      });
    }
  }
  static DeleteWaitSetTimeDilationTag(i) {
    let e = false;
    if (UiTimeDilation.mF_) {
      if (UiTimeDilation.mF_.CacheTimeDilationTagSet.has(i)) {
        if ((e = UiTimeDilation.mF_.CacheTimeDilationTagSet.delete(i)) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiTimeDilation", 10, "指定Plot层级,缓存数据中删除等待设置时停的tag", ["Tag", i]);
        }
      } else if ((e = UiTimeDilation.mF_.WaitSetTimeDilationTagSet.delete(i)) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "指定Plot层级,删除等待设置时停的tag", ["Tag", i]);
      }
    } else if ((e = UiTimeDilation.vur.delete(i)) && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiTimeDilation", 10, "删除等待设置时停的tag", ["Tag", i]);
    }
    UiTimeDilation.Our();
  }
  static Gur() {
    return UiTimeDilation.vur.size > 0;
  }
  static uF_() {
    UiTimeDilation.kur = undefined;
    UiTimeDilation.Nur = undefined;
    UiTimeDilation.ajs = undefined;
    UiTimeDilation.Vur = new Map();
    UiTimeDilation.Fur = [];
    UiTimeDilation.vur = new Set();
  }
  static dF_() {
    if (!UiTimeDilation.mF_) {
      UiTimeDilation.mF_ = new SnapshotData();
      UiTimeDilation.mF_.InTimeFlowViewId = UiTimeDilation.kur;
      UiTimeDilation.mF_.CacheTimeDilationData = UiTimeDilation.Nur;
      UiTimeDilation.mF_.TimeDilationData = UiTimeDilation.ajs;
      UiTimeDilation.mF_.TimeDilationMap = UiTimeDilation.Vur;
      UiTimeDilation.mF_.ViewIdList = UiTimeDilation.Fur;
      UiTimeDilation.mF_.CacheTimeDilationTagSet = UiTimeDilation.vur;
    }
  }
  static fF_() {
    if (UiTimeDilation.mF_) {
      if (UiTimeDilation.mF_.InTimeFlowViewId) {
        UiTimeDilation.kur = UiTimeDilation.mF_.InTimeFlowViewId;
      }
      UiTimeDilation.Nur = UiTimeDilation.mF_.CacheTimeDilationData;
      UiTimeDilation.ajs = UiTimeDilation.mF_.TimeDilationData;
      UiTimeDilation.Vur = UiTimeDilation.mF_.TimeDilationMap;
      UiTimeDilation.Fur = UiTimeDilation.mF_.ViewIdList;
      UiTimeDilation.vur = UiTimeDilation.mF_.CacheTimeDilationTagSet;
      UiTimeDilation.mF_ = undefined;
    }
  }
  static Hcc(i) {
    var e;
    if (UiTimeDilation.mF_ && (UiTimeDilation.mF_.TimeDilationMap.delete(i) && (e = UiTimeDilation.mF_.ViewIdList.indexOf(i)) >= 0 && (UiTimeDilation.mF_.ViewIdList.splice(e, 1), Log_1.Log.CheckInfo()) && Log_1.Log.Info("UiTimeDilation", 10, "时停数据快照期间时停集合数据被删除"), UiTimeDilation.mF_.CacheTimeDilationData?.ViewId === i && (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiTimeDilation", 10, "时停数据快照期间时停缓存时停数据被删除"), UiTimeDilation.mF_.CacheTimeDilationData = undefined), UiTimeDilation.mF_.InTimeFlowViewId === i)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "时停数据快照期间第一个触发时停界面数据被删除");
      }
      UiTimeDilation.mF_.TimeDilationData = undefined;
      UiTimeDilation.mF_.InTimeFlowViewId = undefined;
    }
  }
  static TemporarySaveData() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiTimeDilation", 10, "[OpenView]指定Plot层级打开界面,临时进行数据快照,重置时停表现");
    }
    UiTimeDilation.dF_();
    UiTimeDilation.uF_();
    ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(false, "UiTimeDilation", 1);
  }
  static RestoreSaveData() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiTimeDilation", 10, "[CloseView]指定Plot层级关闭界面,还原数据快照,设置时停表现");
    }
    UiTimeDilation.fF_();
    if (UiTimeDilation.ajs) {
      UiTimeDilation.SetGameTimeDilation(UiTimeDilation.ajs);
    }
  }
  static KWf() {
    return !!UiTimeDilation.mF_ && UiTimeDilation.mF_.WaitSetTimeDilationTagSet.size > 0;
  }
  static XWf(i) {
    if (!!UiTimeDilation.mF_ && (!UiTimeDilation.mF_.CacheTimeDilationData || UiTimeDilation.mF_.CacheTimeDilationData.TimeDilation === 1)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiTimeDilation", 10, "指定Plot层级,缓存数据添加", ["触发界面", i.DebugName], ["界面Id", i.ViewId]);
      }
      UiTimeDilation.Nur = i;
    }
  }
}
(exports.UiTimeDilation = UiTimeDilation).Enable = true;
UiTimeDilation.sjs = false;
UiTimeDilation.kur = undefined;
UiTimeDilation.wur = false;
UiTimeDilation.Nur = undefined;
UiTimeDilation.ajs = undefined;
UiTimeDilation.Sur = (i, e) => {
  var t;
  if (i) {
    t = UiManager_1.UiManager.GetView(e).GetTimeDilation();
    UiTimeDilation.AddViewData(i, e, t);
    if (!UiTimeDilation.kur) {
      if (t !== 1 && UiTimeDilation.SetGameTimeDilation({
        ViewId: e,
        TimeDilation: t,
        DebugName: i,
        Reason: "UiTimeDilation"
      })) {
        UiTimeDilation.kur = e;
      }
    }
  }
};
UiTimeDilation.yur = (i, e) => {
  UiTimeDilation.Hcc(e);
  UiTimeDilation.RemoveViewData(e);
  if (UiTimeDilation.Nur?.ViewId === e) {
    UiTimeDilation.Nur = undefined;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiTimeDilation", 10, "缓存的数据清除", ["恢复界面", i], ["界面Id", e]);
    }
    if (UiTimeDilation.kur === e) {
      UiTimeDilation.kur = undefined;
    }
  } else if (e === UiTimeDilation.kur && UiTimeDilation.SetGameTimeDilation({
    ViewId: e,
    TimeDilation: 1,
    DebugName: i,
    Reason: "UiTimeDilation"
  })) {
    UiTimeDilation.kur = undefined;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiTimeDilation", 10, "界面时停恢复", ["恢复界面", i], ["界面Id", e]);
    }
    UiTimeDilation.SetNextViewTimeDilation();
  }
};
UiTimeDilation.Iur = () => {
  if (!!ModelManager_1.ModelManager.GameModeModel && !UiTimeDilation.qur()) {
    if (Net_1.Net.IsServerConnected()) {
      UiTimeDilation.Tur();
    }
  }
};
UiTimeDilation.Tur = () => {
  UiTimeDilation.ajs = undefined;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("UiTimeDilation", 10, "时停强制重置为1");
  }
  if (UiTimeDilation.GmSwitch) {
    ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(1);
  } else {
    ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(false, "UiTimeDilation", 1);
  }
  UiTimeDilation.Nur = undefined;
  UiTimeDilation.kur = undefined;
  UiTimeDilation.mF_ = undefined;
};
UiTimeDilation.djs = 1;
UiTimeDilation.Lur = i => {
  if (UiTimeDilation.djs !== i && (UiTimeDilation.djs = i, UiTimeDilation.s1t !== 0)) {
    i = UiTimeDilation.ajs ?? {
      ViewId: UiTimeDilation.hjs,
      TimeDilation: UiTimeDilation.s1t,
      DebugName: UiTimeDilation.ljs,
      Reason: UiTimeDilation.pLe
    };
    UiTimeDilation.Pur(i);
  }
};
UiTimeDilation.Dur = () => {
  UiTimeDilation.DeleteWaitSetTimeDilationTag("ServerConnect");
};
UiTimeDilation.Rur = i => {
  if (i) {
    UiTimeDilation.AddWaitSetTimeDilationTag("CameraSequence");
  } else {
    UiTimeDilation.DeleteWaitSetTimeDilationTag("CameraSequence");
  }
};
UiTimeDilation.NBn = () => {
  UiTimeDilation.AddWaitSetTimeDilationTag("Loading");
};
UiTimeDilation.kBn = () => {
  UiTimeDilation.DeleteWaitSetTimeDilationTag("Loading");
};
UiTimeDilation._js = () => {
  UiTimeDilation.AddWaitSetTimeDilationTag("LevelLoading");
};
UiTimeDilation.ujs = () => {
  UiTimeDilation.DeleteWaitSetTimeDilationTag("LevelLoading");
};
UiTimeDilation.XO1 = () => {
  UiTimeDilation.AddWaitSetTimeDilationTag("RogueLevelLoading");
};
UiTimeDilation.YO1 = () => {
  UiTimeDilation.DeleteWaitSetTimeDilationTag("RogueLevelLoading");
};
UiTimeDilation.Fur = [];
UiTimeDilation.Vur = new Map();
UiTimeDilation.vur = new Set();
UiTimeDilation.mF_ = undefined; //# sourceMappingURL=UiTimeDilation.js.map
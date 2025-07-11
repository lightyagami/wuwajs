"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingModel = undefined;
const Queue_1 = require("../../../Core/Container/Queue");
const CharacterDisplayStyleById_1 = require("../../../Core/Define/ConfigQuery/CharacterDisplayStyleById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LoadingController_1 = require("./LoadingController");
const LoadingDefine_1 = require("./LoadingDefine");
class LoadingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ScreenEffect = undefined;
    this.TargetTeleportId = 0;
    this.Tvi = 0;
    this.Ohi = 0;
    this.Lvi = true;
    this.ypi = false;
    this.Speed = 0;
    this.SpeedRate = 1;
    this.ReachHandleQueue = new Queue_1.Queue();
    this.CurrentProgress = 0;
    this.NextProgress = 0;
    this.Dvi = false;
    this.Rvi = false;
    this.dla = undefined;
    this.LoadingTexturePathOverride = undefined;
    this.Cla = undefined;
    this.gla = undefined;
    this.BGc = undefined;
    this.Fu1 = undefined;
  }
  get TipTime() {
    this.Tvi ||= ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTime();
    return this.Tvi;
  }
  get IsShowUidView() {
    return this.Lvi;
  }
  set IsShowUidView(e) {
    if (e !== this.Lvi) {
      this.Lvi = e;
      LoadingController_1.LoadingController.UpdateUidViewShow();
    }
  }
  set LastInstanceId(e) {
    this.Ohi = e;
  }
  get LastInstanceId() {
    return this.Ohi;
  }
  get IsLoading() {
    return this.ypi;
  }
  SetIsLoading(e) {
    if (this.ypi !== e) {
      if (this.ypi = e) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStartLoadingState);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFinishLoadingState);
      }
    }
  }
  get IsLoadingView() {
    return this.Dvi;
  }
  SetIsLoadingView(e) {
    if (this.Dvi !== e) {
      if (this.Dvi = e) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenLoadingView);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCloseLoadingView);
      }
    }
  }
  SetIsLoginToWorld(e) {
    this.Rvi = e;
  }
  GetIsLoginToWorld() {
    var e = this.Rvi;
    this.Rvi = false;
    return e;
  }
  SetLoadingTexturePath(e) {
    this.dla = e;
  }
  GetLoadingTexturePath() {
    return this.dla;
  }
  SetLoadingTitle(e) {
    this.Cla = e;
  }
  GetLoadingTitle() {
    return this.Cla;
  }
  SetLoadingTips(e) {
    this.gla = e;
  }
  GetLoadingTips() {
    return this.gla;
  }
  GetOpenLoadingViewName() {
    var e;
    if (this.Fu1) {
      return "RoleLoadingView";
    } else {
      e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      return this.Dd1(e, true) || this.Dd1(this.LastInstanceId, false) || "LoadingView";
    }
  }
  Dd1(e, i) {
    if (!(e <= 0)) {
      var t;
      var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (e) {
        t = e.InstSubType;
        if ((t = LoadingDefine_1.dungeonToLoadingViewMap.get(t)) && (i || !t.IgnoreExitLoading) && (!t.WorldSubType || t.WorldSubType === e.WorldDungeonSubType)) {
          return t.View;
        } else {
          return undefined;
        }
      }
    }
  }
  SetLoadingConfig(e) {
    this.BGc = e;
  }
  GetLoadingConfigId() {
    if (this.BGc) {
      if (this.BGc.length <= 0) {
        this.BGc = undefined;
        return;
      }
      var e = [];
      for (const o of this.BGc) {
        var i = new Protocol_1.Aki.Protocol.aqc(o);
        var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
        var n = Number(MathUtils_1.MathUtils.LongToBigInt(i.cps));
        var r = Number(MathUtils_1.MathUtils.LongToBigInt(i.dps));
        if (n <= t && t <= r) {
          e.push(i.s5n);
        }
      }
      this.BGc = undefined;
      return e;
    }
  }
  SetRoleLoadingConfig(e) {
    if (e) {
      this.Fu1 = CharacterDisplayStyleById_1.configCharacterDisplayStyleById.GetConfig(e);
    }
  }
  get RoleLoading() {
    return this.Fu1;
  }
  ClearRoleLoadingInfo() {
    this.Fu1 = undefined;
  }
  OnClear() {
    this.ypi = false;
    this.Dvi = false;
    this.ReachHandleQueue.Clear();
    return true;
  }
}
exports.LoadingModel = LoadingModel;
//# sourceMappingURL=LoadingModel.js.map
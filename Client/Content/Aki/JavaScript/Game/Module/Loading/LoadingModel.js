"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LoadingModel = void 0;
const Queue_1 = require("../../../Core/Container/Queue"),
  CharacterDisplayStyleById_1 = require("../../../Core/Define/ConfigQuery/CharacterDisplayStyleById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LoadingController_1 = require("./LoadingController"),
  LoadingDefine_1 = require("./LoadingDefine");
class LoadingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.ScreenEffect = void 0, this.TargetTeleportId = 0, this.Tvi = 0, this.Ohi = 0, this.Lvi = !0, this.ypi = !1, this.Speed = 0, this.SpeedRate = 1, this.ReachHandleQueue = new Queue_1.Queue, this.CurrentProgress = 0, this.NextProgress = 0, this.Dvi = !1, this.Rvi = !1, this.dla = void 0, this.LoadingTexturePathOverride = void 0, this.Cla = void 0, this.gla = void 0, this.BGc = void 0, this.Cu1 = void 0
  }
  get TipTime() {
    return this.Tvi || (this.Tvi = ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTime()), this.Tvi
  }
  get IsShowUidView() {
    return this.Lvi
  }
  set IsShowUidView(e) {
    e !== this.Lvi && (this.Lvi = e, LoadingController_1.LoadingController.UpdateUidViewShow())
  }
  set LastInstanceId(e) {
    this.Ohi = e
  }
  get LastInstanceId() {
    return this.Ohi
  }
  get IsLoading() {
    return this.ypi
  }
  SetIsLoading(e) {
    this.ypi !== e && ((this.ypi = e) ? EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStartLoadingState) : EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFinishLoadingState))
  }
  get IsLoadingView() {
    return this.Dvi
  }
  SetIsLoadingView(e) {
    this.Dvi !== e && ((this.Dvi = e) ? EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenLoadingView) : EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCloseLoadingView))
  }
  SetIsLoginToWorld(e) {
    this.Rvi = e
  }
  GetIsLoginToWorld() {
    var e = this.Rvi;
    return this.Rvi = !1, e
  }
  SetLoadingTexturePath(e) {
    this.dla = e
  }
  GetLoadingTexturePath() {
    return this.dla
  }
  SetLoadingTitle(e) {
    this.Cla = e
  }
  GetLoadingTitle() {
    return this.Cla
  }
  SetLoadingTips(e) {
    this.gla = e
  }
  GetLoadingTips() {
    return this.gla
  }
  GetOpenLoadingViewName() {
    var e;
    return this.Cu1 ? "RoleLoadingView" : (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), this.cd1(e, !0) || this.cd1(this.LastInstanceId, !1) || "LoadingView")
  }
  cd1(e, i) {
    if (!(e <= 0)) {
      var t, e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (e) return t = e.InstSubType, (t = LoadingDefine_1.dungeonToLoadingViewMap.get(t)) && (i || !t.IgnoreExitLoading) && (!t.WorldSubType || t.WorldSubType === e.WorldDungeonSubType) ? t.View : void 0
    }
  }
  SetLoadingConfig(e) {
    this.BGc = e
  }
  GetLoadingConfigId() {
    if (this.BGc) {
      if (this.BGc.length <= 0) return void(this.BGc = void 0);
      var e = [];
      for (const o of this.BGc) {
        var i = new Protocol_1.Aki.Protocol.aqc(o),
          t = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
          n = Number(MathUtils_1.MathUtils.LongToBigInt(i.cps)),
          r = Number(MathUtils_1.MathUtils.LongToBigInt(i.dps));
        n <= t && t <= r && e.push(i.s5n)
      }
      return this.BGc = void 0, e
    }
  }
  SetRoleLoadingConfig(e) {
    e && (this.Cu1 = CharacterDisplayStyleById_1.configCharacterDisplayStyleById.GetConfig(e))
  }
  get RoleLoading() {
    return this.Cu1
  }
  ClearRoleLoadingInfo() {
    this.Cu1 = void 0
  }
  OnClear() {
    return this.ypi = !1, this.Dvi = !1, this.ReachHandleQueue.Clear(), !0
  }
}
exports.LoadingModel = LoadingModel;
//# sourceMappingURL=LoadingModel.js.map
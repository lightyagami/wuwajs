"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController");
const ItemRewardController_1 = require("../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine");
const RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
class LordGymController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnRegisterNetEvent();
    this.OnAddEvents();
    return true;
  }
  static OnClear() {
    this.OnUnRegisterNetEvent();
    this.OnRemoveEvents();
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25655, this.PSi);
    Net_1.Net.Register(28356, this.xSi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25655);
    Net_1.Net.UnRegister(28356);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.$5e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.$5e);
  }
  static async LordGymInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Ass.create({});
    var e = await Net_1.Net.CallAsync(20825, e);
    if (e.jxs?.length > 0) {
      ModelManager_1.ModelManager.LordGymModel.UnLockLordGym = e.jxs;
      ModelManager_1.ModelManager.LordGymModel.UnLockLordGym.sort((e, r) => e - r);
    }
    if (e.Wxs?.length) {
      ModelManager_1.ModelManager.LordGymModel.ReadLoadGymIds = e.Wxs;
    }
    if (e.Kxs?.length > 0) {
      for (const r of e.Kxs) {
        ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(r.y7n, r);
      }
    }
  }
  static async LordGymBeginRequest(e) {
    var r = Protocol_1.Aki.Protocol.wss.create();
    r.y7n = e;
    var r = await Net_1.Net.CallAsync(17933, r);
    return !!r && (r.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(r.Q4n, 17933), false) : (ModelManager_1.ModelManager.LordGymModel.CurrentChallengeLordGymId = e, ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(e) || LordGymController.ReadLordGym(e), true));
  }
  static async OpenLordGymEntrance(e, r = 0) {
    await this.LordGymInfoRequest();
    ModelManager_1.ModelManager.LordGymModel.EntranceEntityId = r;
    return (await UiManager_1.UiManager.OpenViewAsync("LordGymEntranceView", e)) !== undefined;
  }
  static async OpenLordGymLordEntranceSelectView(e, r = 0) {
    ModelManager_1.ModelManager.LordGymModel.EntranceEntityId = r;
    ModelManager_1.ModelManager.LordGymModel.EntranceSetId = e;
    return (await UiManager_1.UiManager.OpenViewAsync("LordGymLordEntranceSelectView", e)) !== undefined;
  }
  static OpenGymUnlockTipView(e) {
    UiManager_1.UiManager.OpenView("LordGymUnlockTipView", e);
    ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = [];
  }
  static async ReadLordGym(e) {
    ModelManager_1.ModelManager.LordGymModel.ReadLordGym(e);
    var r = Protocol_1.Aki.Protocol.bss.create();
    r.y7n = e;
    await Net_1.Net.CallAsync(15136, r);
  }
  static IsInEntranceEntity() {
    var e = ModelManager_1.ModelManager.LordGymModel.EntranceEntityId;
    return !e || !(e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))?.IsInit || (e.Entity?.GetComponent(119)?.IsInInteractRange ?? false);
  }
  static CreateLordModelByEntranceId(e) {
    UiSceneManager_1.UiSceneManager.InitLordSkeletalHandle();
    var r = UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle();
    UiModelUtil_1.UiModelUtil.SetTransformByTag(r.Model, "MonsterCase");
    this.LoadLordModelByEntranceId(e);
  }
  static LoadLordModelByEntranceId(e) {
    if (UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle()) {
      const i = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceConfig(e);
      e = i.MeshId;
      const l = UiSceneManager_1.UiSceneManager.GetLordSkeletalHandle().Model;
      var r = l.CheckGetComponent(0).ModelConfigId;
      if (r !== e) {
        const d = l.CheckGetComponent(10);
        const s = l.CheckGetComponent(2);
        const _ = l.CheckGetComponent(1);
        const M = i.StandAnim;
        const c = i.LordChangeMaterialController;
        const g = i.LordChangeMaterialController;
        r = [M];
        if (!StringUtils_1.StringUtils.IsBlank(c)) {
          r.push(c);
        }
        if (!StringUtils_1.StringUtils.IsBlank(g)) {
          r.push(g);
        }
        s?.LoadModelByModelId(e, true, () => {
          var e = ModelManager_1.ModelManager.LordGymModel;
          let r = e.CacheLocation;
          let t = e.CacheRotator;
          let o = e.CacheScale;
          let n = e.CacheTransform;
          var a = i.Location;
          if (r) {
            r.Set(a[0], a[1], a[2]);
          } else {
            r = new UE.Vector(a[0], a[1], a[2]);
            e.CacheLocation = r;
          }
          var a = i.Rotator;
          if (t) {
            t.Pitch = a[0];
            t.Yaw = a[1];
            t.Roll = a[2];
          } else {
            t = new UE.Rotator(a[0], a[1], a[2]);
            e.CacheRotator = t;
          }
          var a = i.Zoom;
          if (o) {
            o.Set(a[0], a[1], a[2]);
          } else {
            o = new UE.Vector(a[0], a[1], a[2]);
            e.CacheScale = o;
          }
          if (n) {
            n.SetLocation(r);
            n.SetRotation(t.Quaternion());
            n.SetScale3D(o);
          } else {
            n = new UE.Transform(t, r, o);
            e.CacheTransform = n;
          }
          _.SetAllMeshComponentRelativeTransform(n, false, undefined, false);
          var a = s?.GetLoadedResource(M);
          if (!a) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiCommon", 43, "[LordGym] 道馆界面待机动画预加载失败");
            }
          }
          d.PlayAnimation(a, true);
          var e = l.CheckGetComponent(5);
          if (!StringUtils_1.StringUtils.IsBlank(c)) {
            if (a = s.GetLoadedResource(c)) {
              e?.AddRenderingMaterialByData(a);
            }
          }
          if (!StringUtils_1.StringUtils.IsBlank(g)) {
            if (a = s.GetLoadedResource(g)) {
              e?.AddRenderingMaterialByData(a);
            }
          }
        }, r);
      }
    }
  }
}
exports.LordGymController = LordGymController;
(_a = LordGymController).$5e = () => {
  ModelManager_1.ModelManager.LordGymModel?.InitNewLordGymEntranceIdRecord();
  _a.LordGymInfoRequest();
};
LordGymController.PSi = e => {
  ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = e.jxs;
};
LordGymController.xSi = r => {
  var t = ModelManager_1.ModelManager.LordGymModel;
  var e = t.IsDeadInChallenge;
  t.IsDeadInChallenge = false;
  var o = r.Jxs.y7n;
  t.LordGymRecord.set(o, r.Jxs);
  if (r.Mws) {
    var n = [];
    for (const d of r.zxs) {
      var a = new RewardItemData_1.RewardItemData(d.L8n, d.m9n, d.Xxs !== 0 ? d.Xxs : undefined);
      n.push(a);
    }
    let e = undefined;
    var t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(o);
    const i = ModelManager_1.ModelManager.LordGymModel.GetNextGymId(o);
    e = t.IsNew ? (o = {
      ButtonTextId: "Text_GymReturnToWorld_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true
    }, i && ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(i) ? [o, {
      ButtonTextId: "Text_GymContinueChallenge_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: () => {
        LordGymController.LordGymBeginRequest(i);
      }
    }] : [o, {
      ButtonTextId: "Text_GymReturnToLordGym_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: () => {
        var e = ModelManager_1.ModelManager.LordGymModel.EntranceSetId;
        if (e > 0) {
          UiManager_1.UiManager.OpenView("LordGymLordEntranceSelectView", e);
        }
      }
    }]) : [{
      ButtonTextId: "ConfirmBox_45_ButtonText_1",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true
    }];
    t = {
      TitleTextId: "LordGym_TimeTitle",
      Record: TimeUtil_1.TimeUtil.GetTimeString(r.Jxs.Qxs),
      IsNewRecord: r.Yxs
    };
    const l = i && !ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(i) && ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(i);
    var o = {
      ConfigId: ItemRewardDefine_1.LORD_GYM_RESULT,
      IsSuccess: true,
      RewardItemDataList: n,
      ExploreRecordInfo: t,
      ButtonInfoList: e,
      OnCloseCallback: () => {
        if (l) {
          UiManager_1.UiManager.OpenView("LordGymUnlockTipView", i);
        }
      },
      IsBagFull: r.vlc
    };
    ItemRewardController_1.ItemRewardController.OpenExploreRewardViewNew(o);
  } else {
    t = r.E7_;
    if (ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(t).IsNew && !e) {
      o = {
        LordId: t
      };
      UiManager_1.UiManager.OpenView("LordGymChallengeFailView", o);
    }
  }
}; //# sourceMappingURL=LordGymController.js.map
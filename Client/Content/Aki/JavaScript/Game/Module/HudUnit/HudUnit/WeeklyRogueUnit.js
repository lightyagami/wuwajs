"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueUnit = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 550;
class WeeklyRogueUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.x8c = undefined;
    this.S2u = undefined;
    this.edt = undefined;
    this.Nll = undefined;
    this.m1t = undefined;
    this.eHr = 0;
    this.bst = undefined;
    this.p2a = 0;
    this.E2u = 0;
    this.I2u = undefined;
    this.Uqu = undefined;
    this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
    this.uat = undefined;
    this.j3 = undefined;
    this.Nml = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([6, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var e;
    if (!Info_1.Info.IsInTouch()) {
      e = this.GetItem(6);
      this.x8c = new CombineKeyItem_1.CombineKeyItem();
      await this.x8c.CreateByActorAsync(e.GetOwner());
      this.x8c.SetUiActive(false);
    }
  }
  OnStart() {
    super.OnStart();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.InitTweenAnim(5);
    this.GetItem(4)?.SetAlpha(1);
    this.E2u = ModelManager_1.ModelManager.WeeklyRogueModel.GetArtifactBuffId();
    if (this.E2u !== 0) {
      this.I2u = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(this.E2u);
    }
    var i = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleConfig()?.BattleBuffIdMap;
    if (i) {
      let e = i.get(this.E2u);
      e = e || i.get(0);
      this.eHr = e ?? 0;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("WeeklyRogue", 17, "link进度监听的buff", ["BuffId", this.eHr]);
    }
    this.S2u = this.GetTexture(0);
    this.edt = this.GetItem(1);
    this.Nll = new UE.Rotator(0, 0, 0);
    if (!Info_1.Info.IsInTouch()) {
      this.x8c?.SetUiActive(true);
    }
    this.Kbe();
    i = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (i) {
      this.m1t = i.BuffComponent;
    }
  }
  Kbe() {
    const i = this.GetTexture(2);
    i.SetUIActive(false);
    var e = this.I2u?.ButtonIcon;
    if (e) {
      this.Cdt = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture2D, e => {
        this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
        if (e) {
          i.SetUIActive(true);
          i.SetTexture(e);
        }
      }, 103);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WeeklyRogue", 17, "神器图标路径为空", ["神器Id", this.E2u]);
    }
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    this.SPe.PlaySequencePurely("Start");
    this.Bqu();
    var e;
    var i;
    var t = this.Uqu?.BuffTriggerActionName;
    if (t) {
      this.x8c?.RefreshAction(t);
      this.x8c?.SetUiActive(true);
    } else {
      this.x8c?.SetUiActive(false);
    }
    var t = this.Uqu?.BuffTriggerTagId;
    if (t) {
      if (e = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeekTagConfig(t)) {
        e = e.Name;
        i = this.GetText(3);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, e);
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? e;
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("WeeklyRogueUseArtifact", [i]);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("WeeklyRogue", 17, "神器触发", ["神器Id", this.E2u], ["triggerTag", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("WeeklyRogue", 17, "神器触发tag缺少配置", ["BuffTriggerTagId", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WeeklyRogue", 17, "神器触发tag为空", ["神器Id", this.E2u]);
    }
  }
  OnBeforeDestroy() {
    this.StopTweenAnim(5);
    super.OnBeforeDestroy();
    this.SPe?.Clear();
    this.SPe = undefined;
    if (this.Cdt !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Cdt);
      this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    this.Ezu();
    this.BCe();
  }
  async OnBeforeHideAsync() {
    this.SPe.StopCurrentSequence();
    this.SPe.PlaySequencePurely("Close");
    this.Ezu();
    this.BCe();
    this.uat = new CustomPromise_1.CustomPromise();
    this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      this.j3 = undefined;
      this.Ezu();
    }, CLOSE_ANIM_TIME);
    await this.uat.Promise;
  }
  Ezu() {
    if (this.uat) {
      this.uat.SetResult();
      this.uat = undefined;
    }
  }
  BCe() {
    if (this.j3) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
  }
  Bqu() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.GetBuffIdListByType(4);
    if (e.length > 0) {
      this.Uqu = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e[0]);
    } else {
      this.Uqu = this.I2u;
    }
  }
  Tick(e) {
    super.Tick(e);
    if (this.IsShowOrShowing) {
      if (!this.bst || !this.m1t?.GetBuffByHandle(this.p2a)) {
        this.bst = this.m1t?.GetBuffById(this.eHr);
        this.p2a = this.bst?.Handle ?? 0;
      }
      if (this.bst) {
        e = this.bst.GetRemainDuration();
        this.x_t(e / this.bst.Duration);
        this.bMc(e < 1);
      } else {
        this.x_t(0);
      }
    }
  }
  x_t(e) {
    this.Nll.Yaw = e * -360;
    this.edt?.SetUIRelativeRotation(this.Nll);
    this.S2u?.SetFillAmount(e);
  }
  bMc(e) {
    if (this.Nml !== e) {
      if (this.Nml = e) {
        this.PlayTweenAnim(5);
      } else {
        this.StopTweenAnim(5);
        this.GetItem(4)?.SetAlpha(1);
      }
    }
  }
}
exports.WeeklyRogueUnit = WeeklyRogueUnit;
//# sourceMappingURL=WeeklyRogueUnit.js.map
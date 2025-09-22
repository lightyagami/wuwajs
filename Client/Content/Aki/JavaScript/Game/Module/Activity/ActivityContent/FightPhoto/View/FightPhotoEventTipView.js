"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoEventTipView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const FightPhotoController_1 = require("../FightPhotoController");
const patternTextureList = ["/Game/Aki/UI/UIResources/Common/Image/Com/Photo/T_BattlePhotoPatternNum01.T_BattlePhotoPatternNum01", "/Game/Aki/UI/UIResources/Common/Image/Com/Photo/T_BattlePhotoPatternNum02.T_BattlePhotoPatternNum02", "/Game/Aki/UI/UIResources/Common/Image/Com/Photo/T_BattlePhotoPatternNum03.T_BattlePhotoPatternNum03"];
const numberTextureList = ["/Game/Aki/UI/UIResources/Common/Image/Com/Photo/T_BattlePhotoNum01.T_BattlePhotoNum01", "/Game/Aki/UI/UIResources/Common/Image/Com/Photo/T_BattlePhotoNum02.T_BattlePhotoNum02", "/Game/Aki/UI/UIResources/Common/Image/Com/Photo/T_BattlePhotoNum03.T_BattlePhotoNum03"];
const DEFAULT_TIP_DURATION = 3;
class FightPhotoEventTipView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.CUd = new Map();
    this.pUd = new Map();
    this.r1t = 0;
    this.e8 = 0;
    this.vUd = false;
    this.OnPreparePhotoScreenShot = t => {
      if (this.IsShowOrShowing) {
        this.GetRootItem()?.SetUIActive(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (let t = 0; t < patternTextureList.length; t++) {
      e.push(this.$In(patternTextureList[t], this.CUd, t));
    }
    for (let t = 0; t < patternTextureList.length; t++) {
      e.push(this.$In(numberTextureList[t], this.pUd, t));
    }
    await Promise.all(e);
  }
  OnStart() {
    var t = this.OpenParam;
    var e = t.MainTextObj?.TextKey ?? "";
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
    }
    var e = FightPhotoController_1.stepTextIdList.indexOf(e);
    this.hVu(e);
    let o = DEFAULT_TIP_DURATION;
    if (t.Duration) {
      o = t.Duration;
    } else if (t.TypeId && (e = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(t.TypeId))) {
      o = e.Duration;
    }
    this.r1t = o * TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPreparePhotoScreenShot, this.OnPreparePhotoScreenShot);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPreparePhotoScreenShot, this.OnPreparePhotoScreenShot);
  }
  OnBeforeDestroy() {
    this.CUd.clear();
    this.pUd.clear();
  }
  OnTick(t) {
    if (!this.vUd) {
      this.e8 += t;
      if (this.e8 > this.r1t) {
        this.vUd = true;
        this.CloseMe();
      }
    }
  }
  hVu(t) {
    var e = this.CUd.get(t);
    if (e) {
      this.GetTexture(0)?.SetTexture(e);
      this.GetTexture(0)?.SetUIActive(true);
    } else {
      this.GetTexture(0)?.SetUIActive(false);
    }
    var e = this.pUd.get(t);
    if (e) {
      this.GetTexture(1)?.SetTexture(e);
      this.GetTexture(1)?.SetUIActive(true);
    } else {
      this.GetTexture(1)?.SetUIActive(false);
    }
  }
  async $In(t, e, o) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, t => {
      if (t) {
        e.set(o, t);
      }
      i.SetResult();
    }, 100);
    return i.Promise;
  }
}
exports.FightPhotoEventTipView = FightPhotoEventTipView;
//# sourceMappingURL=FightPhotoEventTipView.js.map
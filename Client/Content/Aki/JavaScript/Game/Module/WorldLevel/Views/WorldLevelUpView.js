"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldLevelUpView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WorldLevelUpView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.rvi = 0;
    this.Ql = 0;
    this.tEt = CommonParamById_1.configCommonParamById.GetIntConfig("WorldLevelDisplayTime");
    this.s2o = () => {
      this.eCo();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnStart() {
    this.eCo();
    this.a2o();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldLevelUpViewRefresh, this.s2o);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldLevelUpViewRefresh, this.s2o);
  }
  eCo() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
    this.GetText(0).SetText(e.toString());
    var t = ConfigManager_1.ConfigManager.WorldLevelConfig.GetWorldLevelConfig(e - 1)?.PlayerLevelMax;
    var e = ConfigManager_1.ConfigManager.WorldLevelConfig.GetWorldLevelConfig(e)?.PlayerLevelMax;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "WorldLevelTips", t, e);
  }
  OnTick(e) {
    if (!(this.Ql < 0)) {
      this.Ql = this.Ql + e;
      if (this.Ql > this.tEt) {
        this.$Oe();
        this.Ql = CommonDefine_1.INVALID_VALUE;
      }
    }
  }
  $Oe() {
    this.CloseMe();
  }
  OnBeforeDestroy() {
    this._vi();
  }
  a2o() {
    var e;
    var t;
    var i;
    var r;
    if (Global_1.Global.BaseCharacter && (e = EffectUtil_1.EffectUtil.GetEffectPath("WorldLevelUpEffect")) && e.length !== 0) {
      t = (i = Global_1.Global.BaseCharacter).D_GetTransform();
      i = i.CapsuleComponent.CapsuleHalfHeight;
      (r = t.GetLocation()).Z -= i;
      t.SetLocation(r);
      this.rvi = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, t, e, "[WorldLevelUpView.PlayWorldLevelUpEffect]");
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, this.rvi, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
    }
  }
  _vi() {
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[WorldLevelUpView.RecycleEffect]", true);
      this.rvi = 0;
    }
  }
}
exports.WorldLevelUpView = WorldLevelUpView;
//# sourceMappingURL=WorldLevelUpView.js.map
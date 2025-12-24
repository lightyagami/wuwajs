"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleWeeklyRogueButton = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const WeeklyRogueController_1 = require("../../../WeeklyRogue/WeeklyRogueController");
const CombineKeyItem_1 = require("../KeyItem/CombineKeyItem");
const FormationExtraButton_1 = require("./FormationExtraButton");
const MAX_SMOOTH_TIME = 200;
const CLICK_CD = 500;
class BattleWeeklyRogueButton extends FormationExtraButton_1.FormationExtraButton {
  constructor() {
    super(...arguments);
    this.x8c = undefined;
    this.D8c = undefined;
    this.IsScoreEnable = false;
    this.Tr1 = 0;
    this.oNu = undefined;
    this.edt = undefined;
    this.Nll = undefined;
    this.nel = false;
    this.ael = 0;
    this.lel = 0;
    this.hel = 0;
    this.xte = 0;
    this._el = 0;
    this.yBn = undefined;
    this.SBn = undefined;
    this.IBn = undefined;
    this.TBn = undefined;
    this.nNu = false;
    this.DP_ = false;
    this.sNu = 0;
    this.aNu = undefined;
    this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
    this.pHu = 0;
    this.oEc = () => {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
      this.hNu();
      this.SetVisible(true);
    };
    this.Vmu = (t, e) => {
      if (this.IsScoreEnable && this.IBn && this.uNu(t)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("WeeklyRogue", 17, "周常肉鸽评分更新", ["scoreId", t], ["score", e]);
        }
        this.oTn(e);
      }
    };
    this.lqt = () => {
      this.cNu();
    };
    this.vHu = t => {
      this._Nu(t === Protocol_1.Aki.Protocol.qn1.Proto_Burst);
    };
    this.bMe = (t, e) => {
      if (this.GetActive() && e === 0) {
        this.B8c();
      }
    };
    this.jYe = () => {
      this.B8c();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UINiagara]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([8, UE.UIItem]);
      this.ComponentRegisterInfos.push([9, UE.UIItem]);
    }
    this.BtnBindInfo = [[0, this.jYe]];
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      t = this.GetItem(8);
      this.x8c = new CombineKeyItem_1.CombineKeyItem();
      await this.x8c.CreateByActorAsync(t.GetOwner());
      this.x8c.SetUiActive(false);
      t = this.GetItem(9);
      this.D8c = new CombineKeyItem_1.CombineKeyItem();
      await this.D8c.CreateByActorAsync(t.GetOwner());
      this.D8c.SetUiActive(false);
    }
  }
  OnStart() {
    var t;
    super.OnStart();
    if (!Info_1.Info.IsInTouch()) {
      this.x8c?.RefreshAction(InputMappingsDefine_1.actionMappings.Link大招);
      this.D8c?.RefreshAction(InputMappingsDefine_1.actionMappings.Link大招);
      this.cNu();
    }
    this.oNu = this.GetTexture(1);
    this.edt = this.GetItem(5);
    this.Nll = new UE.Rotator(0, 0, 0);
    if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
      t = ModelManager_1.ModelManager.WeeklyRogueModel.CurrentActivityId !== 0;
      if (this.IsScoreEnable = t) {
        this.hNu();
      } else {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
        this.SetVisible(false);
      }
    }
    this.mNu();
    this.uJu();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreChanged, this.Vmu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNewLinkStatusChanged, this.vHu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Link大招, this.bMe);
  }
  OnBeforeDestroy() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreChanged, this.Vmu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNewLinkStatusChanged, this.vHu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Link大招, this.bMe);
    if (this.Cdt !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Cdt);
      this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    super.OnBeforeDestroy();
  }
  hNu() {
    this.IsScoreEnable = true;
    this.sNu = ModelManager_1.ModelManager.WeeklyRogueModel.GetArtifactBuffId();
    if (this.sNu !== 0) {
      this.aNu = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(this.sNu);
    }
    var t;
    var e;
    var i = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.CycleId;
    var s = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleConfig()?.LinkId;
    if (s) {
      if (t = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkDataConfig(s)?.BattleScoreId) {
        this.Tr1 = t;
        if (e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t, true)?.LevelGroupId) {
          this.yBn = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(e);
          if (this.yBn && this.yBn.length > 0) {
            this.rTn();
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("WeeklyRogue", 17, "周常肉鸽获取不到战斗评分等级配置", ["groupId", e]);
          }
          this.fNu(0);
          this.Kbe();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("WeeklyRogue", 17, "周常肉鸽link按钮初始化成功", ["cycleId", i], ["linkId", s], ["scoreId", t], ["groupId", e], ["artifactId", this.sNu]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("WeeklyRogue", 17, "周常肉鸽获取不到战斗评分等级配置", ["cycleId", i], ["linkId", s], ["scoreId", t]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("WeeklyRogue", 17, "周常肉鸽获取不到战斗评分配置", ["cycleId", i], ["linkId", s]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WeeklyRogue", 17, "周常肉鸽获取不到link配置", ["cycleId", i]);
    }
  }
  Kbe() {
    const e = this.GetTexture(6);
    e.SetUIActive(false);
    var t = this.aNu?.ButtonIcon;
    if (t) {
      this.Cdt = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture2D, t => {
        this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
        if (t) {
          e.SetUIActive(true);
          e.SetTexture(t);
        }
      }, 103);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WeeklyRogue", 17, "[WeeklyRogue]神器图标路径为空", ["神器Id", this.sNu]);
    }
  }
  rTn() {
    this.IBn = undefined;
    this.TBn = undefined;
    let t = MathUtils_1.MathUtils.Int32Max;
    let e = 0;
    for (const s of this.yBn) {
      var i = s.Level;
      if (t > i) {
        t = i;
        this.IBn = s;
      }
      if (e < i) {
        e = i;
        this.TBn = s;
      }
    }
    this.xte = this.TBn?.LowerUpperLimits[0] ?? 0;
    if (this.xte <= 0 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("WeeklyRogue", 17, "周常肉鸽评分最大值不合法", ["MaxScore", this.xte]);
    }
  }
  uNu(t) {
    return this.Tr1 === t || ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t, true)?.Type === 7;
  }
  oTn(t) {
    if (t < this.IBn.LowerUpperLimits[0]) {
      this.SBn = undefined;
    } else if (t >= this.TBn.LowerUpperLimits[1]) {
      this.SBn = this.TBn;
    } else {
      this.SBn = this.IBn;
    }
    this.nel = !!this.SBn;
    this.uel(t);
  }
  Tick(t) {
    if (this.nel && this.hel !== this.lel && this.GetActive()) {
      this._el = Math.min(MAX_SMOOTH_TIME, this._el + t);
      t = this._el / MAX_SMOOTH_TIME;
      this.fNu(this.ael * (1 - t) + this.lel * t);
    }
  }
  fNu(t) {
    this.hel = t;
    if (this.xte > 0) {
      t = this.hel / this.xte;
      this.Nll.Yaw = t * -360;
      this.edt?.SetUIRelativeRotation(this.Nll);
      this.oNu?.SetFillAmount(t);
    }
    this.hB1(this.hel >= this.xte);
  }
  uel(t) {
    if (t > 0) {
      this.ael = this.hel;
      this.lel = t;
      this._el = 0;
    } else {
      this.ael = this.hel;
      this.lel = 0;
      this._el = MAX_SMOOTH_TIME;
    }
  }
  cNu() {
    this.x8c?.SetUiActive(Info_1.Info.IsInKeyBoard());
    this.D8c?.SetUiActive(Info_1.Info.IsInGamepad());
  }
  B8c() {
    if (!!this.DP_ && !this.nNu && !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("WeeklyRogue", 17, "周常肉鸽按下link,发送请求给服务端"), Time_1.Time.Now < this.pHu)) {
      if (WeeklyRogueController_1.WeeklyRogueController.Instance.RequestNewLinkBurst()) {
        this.pHu = Time_1.Time.Now + CLICK_CD;
      }
    }
  }
  hB1(t) {
    if (this.DP_ !== t) {
      this.DP_ = t;
      this.mNu();
      this.uJu();
    }
  }
  _Nu(t) {
    if (this.nNu !== t) {
      this.nNu = t;
      this.mNu();
      this.uJu();
      if (t) {
        ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(8);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueBurstEnableChange, this.nNu);
    }
  }
  mNu() {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      t = this.DP_ && !this.nNu;
      this.x8c.SetGray(!t);
      this.D8c.SetGray(!t);
    }
  }
  uJu() {
    if (this.nNu) {
      this.GetTexture(2)?.SetUIActive(true);
      this.GetTexture(3)?.SetUIActive(false);
      this.GetItem(4)?.SetUIActive(false);
      this.GetUiNiagara(7)?.SetUIActive(false);
      this.GetTexture(1)?.SetUIActive(false);
      this.GetItem(5)?.SetUIActive(false);
    } else if (this.DP_) {
      this.GetTexture(2)?.SetUIActive(false);
      this.GetTexture(3)?.SetUIActive(true);
      this.GetItem(4)?.SetUIActive(true);
      this.GetUiNiagara(7)?.SetUIActive(true);
      this.GetTexture(1)?.SetUIActive(true);
      this.GetItem(5)?.SetUIActive(false);
    } else {
      this.GetTexture(2)?.SetUIActive(true);
      this.GetTexture(3)?.SetUIActive(false);
      this.GetItem(4)?.SetUIActive(false);
      this.GetUiNiagara(7)?.SetUIActive(false);
      this.GetTexture(1)?.SetUIActive(true);
      this.GetItem(5)?.SetUIActive(true);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e = this.GetButton(0)?.GetRootComponent();
    if (e) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.BattleWeeklyRogueButton = BattleWeeklyRogueButton;
//# sourceMappingURL=BattleWeeklyRogueButton.js.map
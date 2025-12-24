"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockPredictedHandle = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LockPredictedUnit_1 = require("../HudUnit/LockPredictedUnit");
const HudUnitUtils_1 = require("../Utils/HudUnitUtils");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const HIT_CASE_SOCKET = new UE.FName("HitCase");
class LockPredictedHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.jma = new Vector2D_1.Vector2D();
    this.lga = undefined;
    this.v$e = false;
    this.dDr = false;
    this.rqo = undefined;
    this._ga = () => {
      this.yyo();
    };
    this.lne = (e, t) => {
      this.dDr = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "预测锁定Tag改变", ["HasTag", t]);
      }
      if (!this.dDr) {
        this.Deactivate();
      }
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.yyo();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this._ga);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this._ga);
  }
  yyo() {
    this.uga();
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (e && e.EntityHandle?.Valid && (e = e.GameplayTagComponent)) {
      this.dDr = e.HasTag(-126337119);
      this.rqo = e.ListenForTagAddOrRemove(-126337119, this.lne);
      if (!this.dDr) {
        this.Deactivate();
      }
    }
  }
  OnDestroyed() {
    this.lga = undefined;
    this.uga();
  }
  uga() {
    this.dDr = false;
    if (this.rqo) {
      this.rqo.EndTask();
      this.rqo = undefined;
    }
  }
  OnTick(e) {
    super.OnTick(e);
    if (!this.v$e && this.dDr) {
      if ((e = this.GetTargetInfo()) && e.EntityHandle?.Valid && (e = this.GetWorldLocation(e)) && HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(e, this.jma)) {
        this.Activate();
        if (this.lga) {
          this.lga.GetRootItem()?.SetAnchorOffset(this.jma.ToUeVector2D(true));
        }
      } else {
        this.Deactivate();
      }
    }
  }
  Activate() {
    if (this.lga) {
      this.lga.Activate();
    } else if (!this.v$e) {
      this.v$e = true;
      this.NewHudUnit(LockPredictedUnit_1.LockPredictedUnit, "UiItem_SuoDingArrow").then(e => {
        if (e) {
          this.v$e = false;
          this.lga = e;
        }
      }, () => {});
    }
  }
  Deactivate() {
    if (this.lga) {
      this.lga.Deactivate();
    }
  }
  GetTargetInfo() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e?.Valid) {
      return e.Entity.CheckGetComponent(33).GetPredictedLockOnTarget();
    }
  }
  GetWorldLocation(t) {
    var i = t.EntityHandle;
    if (i?.Valid) {
      i = i.Entity.GetComponent(1).Owner;
      if (i instanceof TsBaseCharacter_1.default) {
        i = i.Mesh;
        let e = FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName);
        if (!e || !i.DoesSocketExist(e)) {
          e = HIT_CASE_SOCKET;
        }
        return i.D_GetSocketLocation(e);
      }
    }
  }
}
exports.LockPredictedHandle = LockPredictedHandle;
//# sourceMappingURL=LockPredictedHandle.js.map
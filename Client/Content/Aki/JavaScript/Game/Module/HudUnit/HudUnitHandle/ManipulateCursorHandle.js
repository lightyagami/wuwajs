"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManipulateCursorHandle = undefined;
const puerts_1 = require("puerts");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager");
const PortalUtils_1 = require("../../../Utils/PortalUtils");
const ManipulateCursorUnit_1 = require("../HudUnit/ManipulateCursorUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const COMPLETE_ANIM_TIME = 500;
const INTERRUPT_ANIM_TIME = 200;
class ManipulateCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.ac = 0;
    this.hri = undefined;
    this.lri = undefined;
    this._ri = undefined;
    this.cri = undefined;
    this.mri = (0, puerts_1.$ref)(undefined);
    this.rii = false;
    this.X9e = undefined;
    this.dri = undefined;
    this.Cri = undefined;
    this.gri = undefined;
    this.fri = undefined;
    this.pri = [];
    this.vri = [];
    this.Mri = true;
    this.fHe = (t, i) => {
      this.X9e = t;
      this.dri = this.X9e.Entity.GetComponent(1);
      this.Cri = this.X9e.Entity.GetComponent(65);
      this.fri = t.Entity.GetComponent(205);
      this.Eri();
      for (const s of this.pri) {
        var e = this.fri.ListenForTagAddOrRemove(s, this.Sri, ManipulateCursorHandle.SYe);
        this.vri.push(e);
      }
    };
    this.Zoi = (t, i) => {
      this.Mri = !i || i.length === 0;
      this.yri(2);
      this.hri?.StartProcess(t);
    };
    this.Iri = () => {
      this.yri(0);
    };
    this.Tri = () => {
      this.yri(3);
    };
    this.rri = (t, i) => {
      if (t?.Valid) {
        this.rii = true;
        if (this.Mri) {
          this.foi(t);
        } else {
          this.yri(3);
        }
      } else {
        this.rii = false;
        this.yri(0);
      }
    };
    this.nri = () => {
      this.rii = false;
      this.yri(0);
    };
    this.sri = () => {
      this.yri(0);
    };
    this.zoi = (t, i, e) => {
      this.rii = e;
      if (t) {
        if (i?.Valid) {
          if (this.rii && !this.Mri) {
            this.yri(3);
          } else {
            this.foi(i);
          }
        } else if (e) {
          this.yri(3);
        } else {
          this.yri(0);
        }
      } else {
        this.yri(0);
      }
    };
    this.Sri = (t, i) => {
      if (i) {
        this.hri?.SetActive(false);
      } else {
        this.Lri();
      }
    };
  }
  OnInitialize() {
    this.InitCursorAxis();
    this.X9e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (this.X9e?.Valid) {
      this.fri = this.X9e.Entity.GetComponent(205);
      this.dri = this.X9e.Entity.GetComponent(1);
      this.Cri = this.X9e.Entity.GetComponent(65);
      this.gri = CameraController_1.CameraController.FightCamera.GetComponent(5);
      var t = CommonParamById_1.configCommonParamById.GetStringConfig("ManipulateAimVisibleTags");
      if (t) {
        for (const e of t.split(",")) {
          var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
          if (i) {
            this.pri.push(i);
          }
        }
      }
    }
  }
  OnDestroyed() {
    this.poi();
    this.Eri();
    this.mri = undefined;
    this.X9e = undefined;
    this.dri = undefined;
    this.Cri = undefined;
    this.fri = undefined;
    this.pri.length = 0;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.zoi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateStartChanting, this.Zoi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateCancelChanting, this.Iri);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateCompleteChanting, this.Tri);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ManipulateStartLockCastTarget, this.rri);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ManipulateEndLockCastTarget, this.nri);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HiddenManipulateUI, this.sri);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.zoi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateStartChanting, this.Zoi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateCancelChanting, this.Iri);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateCompleteChanting, this.Tri);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ManipulateStartLockCastTarget, this.rri);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ManipulateEndLockCastTarget, this.nri);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HiddenManipulateUI, this.sri);
  }
  OnInputControllerChanged(t, i) {
    if (!!this.hri && t !== i && (t === 5 || i === 5)) {
      this.DestroyHudUnit(this.hri);
      this.hri = undefined;
      this.Uri();
    }
  }
  OnAfterTick(t) {
    this.bl();
  }
  Lri() {
    var t;
    return !!this.hri && !this.hri.InAsyncLoading() && (t = !this.Dri(), this.hri.GetActive() !== t && this.hri.SetActive(t), t);
  }
  Dri() {
    if (this.pri.length !== 0) {
      for (const t of this.pri) {
        if (this.fri.HasTag(t)) {
          return true;
        }
      }
    }
    return false;
  }
  Rri() {
    this.hri?.PlayActivateEffect();
  }
  foi(t) {
    this.lri = t;
    this._ri = t.GetComponent(1);
    if (!(0, RegisterComponent_1.isComponentInstance)(this._ri, 202) || !(this.cri = SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this._ri.GetSceneInteractionLevelHandleId()), this.cri?.IsValid())) {
      this.cri = this._ri.Owner;
    }
    this.yri(1);
    if (this.hri) {
      if (!this.hri.InAsyncLoading()) {
        this.bl();
        this.Lri();
        this.Rri();
        this.H7l();
      }
    } else {
      this.Uri();
    }
  }
  H7l() {
    var t;
    if (Info_1.Info.IsInTouch()) {
      t = this.lri?.GetComponent(150)?.ExploreSkillUiResource;
      this.hri?.SetIconPath(t);
    }
  }
  poi() {
    this.DestroyHudUnit(this.hri);
    this.hri = undefined;
    this.lri = undefined;
    this._ri = undefined;
    this.cri = undefined;
  }
  Eri() {
    for (const t of this.vri) {
      t.EndTask();
    }
    this.vri.length = 0;
  }
  bl() {
    if (this.hri && !this.hri.InAsyncLoading() && this.hri.GetActive()) {
      var i = this.Ari();
      if (i) {
        var e = this.j$e();
        var [e, i] = this.GetInEllipsePosition(e, i.ToUeVector());
        let t = false;
        if (i) {
          t = this.gri.GetScreenPositionIsInRange(i, this.gri.CameraAdjustController.CheckInScreenMinX, this.gri.CameraAdjustController.CheckInScreenMaxX, this.gri.CameraAdjustController.CheckInScreenMinY, this.gri.CameraAdjustController.CheckInScreenMaxY);
        }
        this.hri.Refresh(t, e, this.rii);
      }
    }
  }
  j$e() {
    return this.dri.ActorLocationProxy;
  }
  Ari() {
    if (this.lri?.Valid && this.cri?.IsValid()) {
      this.cri.D_GetActorBounds(false, this.mri, undefined);
      let t = Vector_1.Vector.Create((0, puerts_1.$unref)(this.mri));
      var i = this.lri.GetComponent(156);
      if (i !== undefined && i.GetPassThroughPortalType() !== 0) {
        PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(t, i.GetPassThroughPortalId(), i.GetPassThroughPortalType() === 1, t);
      }
      var i = ModelManager_1.ModelManager.ManipulaterModel.GetTargetPartLocation();
      if (i !== Vector_1.Vector.ZeroVectorProxy) {
        t = i;
      }
      var i = this.lri.GetComponent(148);
      if (i !== undefined && this.rii) {
        t = i.GetHitPoint();
      }
      var i = this.lri.GetComponent(161);
      if (i !== undefined && this.rii) {
        t = i.GetSocketLocation(this.Cri.GetHoldingEntity());
      }
      var i = this.lri.GetComponent(140);
      if (i !== undefined && this.rii) {
        t = i.GetHitPoint();
      }
      var i = this.lri.GetComponent(150);
      return t = i !== undefined ? i.Location : t;
    }
  }
  Uri() {
    this.hri = this.NewHudUnitWithReturn(ManipulateCursorUnit_1.ManipulateCursorUnit, "UiItem_ObjControl", true, () => {
      if (this.ac === 0) {
        this.poi();
      } else {
        this.hri?.SetCloseAnimCallback(() => {
          this.poi();
        });
        this.bl();
        this.Lri();
        this.Rri();
        this.H7l();
      }
    });
  }
  yri(t) {
    if (this.ac !== t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "控物UI状态改变", ["", t]);
      }
      var i = this.ac;
      this.ac = t;
      if (this.hri) {
        switch (this.ac) {
          case 0:
            if (i === 1) {
              this.hri.EndProcess(true);
              this.hri.PlayCloseAnim(0);
            } else if (i === 2) {
              this.hri.EndProcess(true);
              this.hri.PlayInterruptedAnim();
              this.hri.PlayCloseAnim(INTERRUPT_ANIM_TIME);
            }
            break;
          case 1:
            this.hri.StopCloseAnim();
            this.hri.EndProcess(true);
            this.hri.Appear();
            break;
          case 2:
            this.hri.PlayStartAnim();
            this.hri.PlayProcessAnim();
            break;
          case 3:
            if (i === 2) {
              this.hri.EndProcess(false);
              this.hri.PlayCompleteAnim();
              this.hri.PlayCloseAnim(COMPLETE_ANIM_TIME);
            } else {
              this.hri.PlayCloseAnim(0);
            }
        }
      }
    }
  }
}
(exports.ManipulateCursorHandle = ManipulateCursorHandle).SYe = Stats_1.Stat.Create("[ManipulateCursorHandle]ListenTag");
//# sourceMappingURL=ManipulateCursorHandle.js.map
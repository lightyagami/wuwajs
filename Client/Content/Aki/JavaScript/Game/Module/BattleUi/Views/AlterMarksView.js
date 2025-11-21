"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterMarksView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const SneakController_1 = require("../../../World/Controller/SneakController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const AlterMark_1 = require("./AlterMark");
const AlterTime_1 = require("./AlterTime");
const AlterTipMark_1 = require("./AlterTipMark");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const EavesdropMark_1 = require("./EavesdropMark");
const StalkAlertMark_1 = require("./StalkAlertMark");
class AlterMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Q$e = new Map();
    this.X$e = new Map();
    this.$$e = new Map();
    this.E2n = new Map();
    this.Y$e = new Map();
    this.J$e = false;
    this.z$e = 0;
    this.Z$e = 0;
    this.eYe = 0;
    this.tYe = undefined;
    this.iYe = undefined;
    this.oYe = undefined;
    this.rYe = undefined;
    this.nYe = false;
    this.sYe = (t, e, i) => {
      if (!this.Q$e.has(t)) {
        if (this.Y$e.has(t)) {
          if (this.Y$e.get(t).Type === 1) {
            this.Y$e.delete(t);
          }
        } else {
          this.Y$e.set(t, {
            Type: 0,
            OriginPosition: e,
            TrackActor: i
          });
        }
      }
    };
    this.aYe = t => {
      var e = this.Q$e.get(t);
      var i = this.Y$e.has(t);
      if (e || i) {
        if (i) {
          this.Y$e.delete(t);
        } else if (e) {
          this.Y$e.set(t, {
            Type: 1,
            OriginPosition: undefined,
            TrackActor: undefined
          });
        }
      }
    };
    this.hYe = (t, e) => {
      if (!this.$$e.has(t)) {
        (e = new StalkAlertMark_1.StalkAlertMark(this.RootItem, e)).InitEntityId(t);
        if (this.$$e.size === 0) {
          this.SetActive(true);
        }
        this.$$e.set(t, e);
      }
    };
    this.lYe = t => {
      var e = this.$$e.get(t);
      if (e) {
        e.Destroy();
        this.$$e.delete(t);
        if (this.$$e.size === 0 && !SneakController_1.SneakController.IsSneaking) {
          this.SetActive(false);
        }
      }
    };
    this.y2n = (t, e, i) => {
      if (!this.E2n.has(t)) {
        (e = new EavesdropMark_1.EavesdropMark(e, t)).Initialize(UiLayer_1.UiLayer.WorldSpaceUiRootItem, i);
        this.E2n.set(t, e);
      }
    };
    this.I2n = t => {
      var e = this.E2n.get(t);
      if (e) {
        e.Destroy();
        this.E2n.delete(t);
      }
    };
    this.T2n = t => {
      for (var [e, i] of this.E2n) {
        if (e === t) {
          i.PlayFoundSeq();
        } else {
          i.PlayEndSeq();
        }
      }
    };
    this._Ye = (t, e) => {
      if (t) {
        if (!this.J$e) {
          this.uYe();
        }
        for (var [, i] of this.Q$e) {
          i.Destroy();
        }
        for (var [, s] of this.$$e) {
          s.Destroy();
        }
        this.Q$e.clear();
        this.$$e.clear();
        this.J$e = true;
        this.z$e = e;
        if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChildQuestNodeFinish, this.Uxe)) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChildQuestNodeFinish, this.Uxe);
        }
      } else {
        if (!this.nYe) {
          this.cYe();
        }
        this.J$e = false;
      }
      this.iYe.SetUiActive(this.J$e);
      this.Zpe(t);
    };
    this.Uxe = () => {
      this.mYe();
    };
    this.lne = (t, e) => {
      this.tYe?.SetUIActive(e);
    };
    this.xie = () => {
      var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      this.dYe(t);
      if (this.rYe) {
        this.CYe(t.EntityHandle);
      }
    };
    this.gYe = () => {
      this.SetActive(true);
    };
    this.fYe = () => {
      if (this.$$e.size === 0) {
        this.SetActive(false);
      }
    };
    this.Zpe = t => {
      for (var [, e] of this.X$e) {
        e.Destroy();
      }
      this.X$e.clear();
      if (t) {
        if (this.J$e) {
          if (this.rYe) {
            if ((t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) !== this.rYe) {
              this.CYe(t);
            }
          } else {
            this.rYe = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
            EventSystem_1.EventSystem.AddWithTarget(this.rYe.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.pYe);
          }
          for (const s of this.rYe.Entity.CheckGetComponent(179).GetAggroSet()) {
            var i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(s).Entity.CheckGetComponent(1).Owner;
            if (!this.X$e.has(s)) {
              i = new AlterTipMark_1.AlterTipMark(this.RootItem, i, true);
              this.X$e.set(s, i);
              i.ChangeToError();
            }
          }
        }
      } else if (this.rYe) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.rYe.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.pYe);
        this.rYe = undefined;
      }
    };
    this.pYe = (t, e) => {
      var i = e.CharActorComp.Owner;
      var e = e.CharActorComp.Entity.Id;
      if (!this.X$e.has(e) && t && this.J$e) {
        t = new AlterTipMark_1.AlterTipMark(this.RootItem, i, true);
        this.X$e.set(e, t);
        t.ChangeToError();
      }
    };
    this.vYe = t => {
      t = this.$$e.get(t);
      if (t) {
        t.SetAlertIcon("/Game/Aki/UI/UIResources/Common/Atlas/SP_ComIconSign.SP_ComIconSign");
        t.StopUpdateAlertValue();
        t.ActivateAlertEffect();
      }
    };
    this.MYe = () => {
      for (var [, t] of this.$$e) {
        t.Destroy();
      }
      this.$$e.clear();
    };
  }
  Initialize(t, e) {
    super.Initialize(t);
    this.cYe();
    this.EYe();
    this.L2n();
    this.ProcessPendingMarkInfo();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSneakFoundChange, this._Ye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SneakStart, this.gYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SneakEnd, this.fYe);
    ModelManager_1.ModelManager.AlertMarkModel.AlertMarkInit = true;
    if (CommonParamById_1.configCommonParamById.GetBoolConfig("ShowSneakMask")) {
      t = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD);
      LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_Sneakzhezhao", t).then(t => {
        this.tYe = t.GetComponentByClass(UE.UIItem.StaticClass());
        this.tYe.SetHierarchyIndex(0);
        this.tYe.SetUIActive(false);
      }, () => {});
    }
    this.iYe = new AlterTime_1.AlterTime();
    this.iYe.CreateByResourceIdAsync("UiItem_Sneakshijian", this.RootItem);
    t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    this.dYe(t);
    this.SetActive(false);
  }
  dYe(t) {
    if (this.oYe) {
      this.oYe.EndTask();
    }
    t = t?.GameplayTagComponent;
    if (t) {
      this.oYe = t.ListenForTagAddOrRemove(2019420593, this.lne, AlterMarksView.SYe);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 31, "获取当前角色BaseTagComponent失败");
    }
  }
  Reset() {
    super.Reset();
    this.uYe();
    this.yYe();
    this.D2n();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSneakFoundChange, this._Ye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SneakStart, this.gYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SneakEnd, this.fYe);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChildQuestNodeFinish, this.Uxe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChildQuestNodeFinish, this.Uxe);
    }
    if (this.rYe) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.rYe.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.pYe);
      this.rYe = undefined;
    }
    for (var [, t] of this.Q$e) {
      t.Destroy();
    }
    this.Q$e.clear();
    for (var [, e] of this.$$e) {
      e.Destroy();
    }
    this.$$e.clear();
  }
  Update(t) {
    this.IYe();
    for (var [, e] of this.Q$e) {
      e.Update();
    }
    for (var [, i] of this.X$e) {
      i.Update();
    }
    for (var [, s] of this.E2n) {
      s.Update();
    }
    for (var [, h] of this.$$e) {
      if (h.CheckShowUiCondition()) {
        h.Update();
      }
    }
    if (this.J$e) {
      this.eYe = TimeUtil_1.TimeUtil.GetServerTimeStamp() / TimeUtil_1.TimeUtil.InverseMillisecond;
      this.Z$e = (this.z$e - this.eYe) * TimeUtil_1.TimeUtil.InverseMillisecond;
      if (this.Z$e < 0) {
        this.mYe();
      } else {
        this.iYe.SetCountdownText(this.Z$e);
      }
    }
  }
  IYe() {
    for (var [t, e] of this.Y$e) {
      var i;
      if (e.Type === 0) {
        i = new AlterMark_1.AlterMark(this.RootItem, e.OriginPosition || Vector_1.Vector.Create(), e.TrackActor);
        this.Q$e.set(t, i);
        this.hYe(t, e.TrackActor);
      } else {
        if (i = this.Q$e.get(t)) {
          i.Destroy();
          this.Q$e.delete(t);
        }
        this.lYe(t);
      }
    }
    this.Y$e.clear();
  }
  mYe() {
    if (this.J$e) {
      this.J$e = false;
      this.iYe.SetUiActive(this.J$e);
    }
  }
  L2n() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEavesdropMark, this.y2n);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEavesdropMark, this.I2n);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEavesdropFound, this.T2n);
  }
  D2n() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEavesdropMark, this.y2n);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEavesdropMark, this.I2n);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEavesdropFound, this.T2n);
  }
  EYe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddStalkAlertMark, this.hYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveStalkAlertMark, this.lYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStalkFound, this.vYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStalkFailed, this.MYe);
  }
  yYe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddStalkAlertMark, this.hYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveStalkAlertMark, this.lYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStalkFound, this.vYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStalkFailed, this.MYe);
  }
  cYe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddAlterMark, this.sYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveAlterMark, this.aYe);
    this.nYe = true;
  }
  uYe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddAlterMark, this.sYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveAlterMark, this.aYe);
    this.nYe = false;
  }
  CYe(t) {
    if (EventSystem_1.EventSystem.HasWithTarget(this.rYe.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.pYe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.rYe.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.pYe);
      this.rYe = t;
      EventSystem_1.EventSystem.AddWithTarget(this.rYe.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.pYe);
    }
  }
  ProcessPendingMarkInfo() {
    if (ModelManager_1.ModelManager.AlertMarkModel.PendingMarkInfos.size !== 0) {
      for (var [t, [e, i, s]] of ModelManager_1.ModelManager.AlertMarkModel.PendingMarkInfos) {
        switch (i) {
          case 2:
            this.hYe(t, e);
            break;
          case 3:
            this.y2n(t, e, s);
        }
      }
      ModelManager_1.ModelManager.AlertMarkModel?.PendingMarkInfos.clear();
    }
  }
  OnBattleHudVisibleChanged(t) {
    if (SneakController_1.SneakController.IsSneaking) {
      this.SetActive(t);
    }
  }
}
(exports.AlterMarksView = AlterMarksView).SYe = Stats_1.Stat.Create("[AlterMarksView]ListenTag");
//# sourceMappingURL=AlterMarksView.js.map
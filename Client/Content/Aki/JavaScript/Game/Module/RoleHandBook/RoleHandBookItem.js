"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleHandBookItem = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../Ui/UiManager");
const ButtonItem_1 = require("../Common/Button/ButtonItem");
const RoleController_1 = require("../RoleUi/RoleController");
const LguiUtil_1 = require("../Util/LguiUtil");
class RoleHandBookItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.ZAt = undefined;
    this.DHt = undefined;
    this.PlaySequence = () => {
      this.DHt?.SequencePlayer.Play();
    };
    this.qAt = () => {
      if (this.IsCanRoleActive()) {
        RoleController_1.RoleController.SendRoleActiveRequest(this.dFe);
      } else {
        UiManager_1.UiManager.OpenView("RoleHandBookRootView", "RoleHandBookSelectionView");
      }
    };
    this.TTt = () => {
      this.UpdateCostInfo();
    };
    this.OnClickItem = () => {
      let e = undefined;
      for (const t of ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe).ExchangeConsume.keys()) {
        e = t;
        break;
      }
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
    };
    this.dFe = e;
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIButtonComponent]];
    this.BtnBindInfo = [[10, this.OnClickItem]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
  }
  OnStart() {
    if (this.dFe) {
      this.ZAt = new ButtonItem_1.ButtonItem(this.GetItem(4));
      this.ZAt.SetFunction(this.qAt);
      this.UpdateComponent(this.dFe);
      this.AddEventListener();
    }
  }
  UpdateComponent(e) {
    this.dFe = e;
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    this.GetText(0).ShowTextNew(e.Name);
    this.ZAt.UnBindRedDot();
    this.ZAt.BindRedDot("RoleHandBookActiveButton", this.dFe);
    var i = this.GetItem(7);
    var o = this.GetItem(8);
    var r = this.GetItem(9);
    if (this.IsRoleUnlock()) {
      this.ZAt.SetLocalText("Detail");
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "ActiveTime");
      this.GetText(6).SetText(TimeUtil_1.TimeUtil.DateFormat4(new Date(t.GetRoleCreateTime() * TimeUtil_1.TimeUtil.InverseMillisecond)));
      i.SetUIActive(true);
      o.SetUIActive(false);
      r.SetUIActive(false);
    } else {
      if (this.IsCanRoleActive()) {
        this.ZAt.SetLocalText("Tuning");
      } else {
        this.ZAt.SetLocalText("Detail");
      }
      this.UpdateCostInfo();
      i.SetUIActive(false);
      o.SetUIActive(true);
      r.SetUIActive(true);
    }
    if (this.DHt) {
      const s = this.DHt;
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("RoleHandBookItem.UpdateComponent", s);
      });
      this.DHt = undefined;
    }
    t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaEffectConfigByTimesAndQuality(1, e.QualityId);
    ResourceSystem_1.ResourceSystem.LoadAsync(t.FinalShowSequencePath, UE.LevelSequence, e => {
      var t;
      if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
        e = e;
        (t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState = true;
        this.DHt = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined, false);
        this.DHt.PlaybackSettings = t;
        this.DHt.SetSequence(e);
      }
    }, 100, this.MemoryTag);
  }
  UpdateCostInfo() {
    if (this.dFe) {
      var i;
      var o;
      let e = undefined;
      let t = undefined;
      for ([i, o] of ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe).ExchangeConsume) {
        e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i);
        t = o;
        break;
      }
      this.SetTextureByPath(e.Icon, this.GetTexture(1));
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleFragment");
      var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.Id);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "RoleExp", r, t);
    }
  }
  IsRoleUnlock() {
    return ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe) !== undefined;
  }
  IsCanRoleActive() {
    var e;
    var t;
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    var o = this.IsRoleUnlock();
    let r = undefined;
    let s = undefined;
    for ([e, t] of i.ExchangeConsume) {
      r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
      s = t;
      break;
    }
    i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r.Id);
    return !o && i >= s;
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
    this.ZAt.UnBindRedDot();
    this.dFe = undefined;
    if (this.DHt) {
      const e = this.DHt;
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("RoleHandBookItem.OnBeforeDestroy", e);
      });
      this.DHt = undefined;
    }
  }
}
exports.RoleHandBookItem = RoleHandBookItem;
//# sourceMappingURL=RoleHandBookItem.js.map
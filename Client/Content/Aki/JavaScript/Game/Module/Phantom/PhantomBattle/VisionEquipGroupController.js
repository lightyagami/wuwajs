"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionEquipGroupController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const RoleController_1 = require("../../RoleUi/RoleController");
const PhantomUtil_1 = require("../PhantomUtil");
class VisionEquipGroupController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, VisionEquipGroupController.Q5e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, VisionEquipGroupController.Q5e);
  }
  static async RequestVisionEquipGroupInfo() {
    var e = new Protocol_1.Aki.Protocol.Dv_();
    var e = await Net_1.Net.CallAsync(23978, e);
    ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(e.Zb_);
  }
  static RequestDeleteVisionEquipGroup(e) {
    var o = new Protocol_1.Aki.Protocol.Ov_();
    o.c5n = e;
    Net_1.Net.Call(24012, Protocol_1.Aki.Protocol.Ov_.create(o), e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18029);
      } else {
        ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(e.Zb_);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionGroupDataDelete);
      }
    });
  }
  static RequestPutVisionGroupToTop(e) {
    var o;
    if (e === 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionGroupDataToTop);
    } else {
      (o = new Protocol_1.Aki.Protocol.Fv_()).c5n = e;
      Net_1.Net.Call(28248, Protocol_1.Aki.Protocol.Fv_.create(o), e => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19570);
        } else {
          ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(e.Zb_);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionGroupDataToTop);
        }
      });
    }
  }
  static RequestApplyVisionGroup(o, r) {
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(215).HasTag(-1720844833)) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionSkilling");
    } else {
      let e = false;
      var t = EntitySystem_1.EntitySystem.Get(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id);
      var t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(t, Number(Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision));
      if (e = t && t.Entity.Active ? true : e) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionSkilling");
      } else if (!RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()) {
        (t = new Protocol_1.Aki.Protocol.xy_()).c5n = o;
        t.Q6n = r;
        Net_1.Net.Call(27442, Protocol_1.Aki.Protocol.xy_.create(t), e => {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26588);
          } else {
            for (const o of e.UBs) {
              ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(o);
              ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(o.Q6n);
            }
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("VisionAssembleHasUseTips");
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquip);
          }
        });
      }
    }
  }
}
exports.VisionEquipGroupController = VisionEquipGroupController;
(_a = VisionEquipGroupController).Q5e = () => {
  _a.RequestVisionEquipGroupInfo();
};
VisionEquipGroupController.RequestAddVisionEquipGroup = async (e, o) => {
  var r = new Protocol_1.Aki.Protocol.kv_();
  r.Q6n = e;
  r.H8n = o;
  var e = await Net_1.Net.CallAsync(22419, r);
  if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20842);
  } else {
    ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(e.Zb_);
    o = ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList().length;
    r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomEquipGroupCountMax();
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("VisionAssembleHasSave", o, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionGroupDataAdd);
  }
  return e.Q4n;
};
VisionEquipGroupController.RequestChangeVisionGroupName = async (e, o) => {
  var r = new Protocol_1.Aki.Protocol.Nv_();
  r.c5n = e;
  r.H8n = o;
  var e = await Net_1.Net.CallAsync(24318, r);
  if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19570);
  } else {
    ModelManager_1.ModelManager.VisionEquipGroupModel.RefreshVisionEquipGroupData(e.Zb_);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionGroupDataChangeName);
  }
  return e.Q4n;
}; //# sourceMappingURL=VisionEquipGroupController.js.map
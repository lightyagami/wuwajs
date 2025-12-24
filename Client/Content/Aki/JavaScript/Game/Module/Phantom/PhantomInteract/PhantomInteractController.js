"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDefine_1 = require("../../../NewWorld/Character/Common/Component/Input/InputLayerFunction/InputDefine");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const PhantomInteractDefine_1 = require("./PhantomInteractDefine");
const PhantomInteractModel_1 = require("./PhantomInteractModel");
class PhantomInteractController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(22103, PhantomInteractController.rgf);
    Net_1.Net.Register(20034, PhantomInteractController.ogf);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22103);
    Net_1.Net.UnRegister(20034);
  }
  static OpenPhantomVisionSummonView(e, t) {
    var n = ModelManager_1.ModelManager.PhantomInteractModel;
    n.InitEditViewModel(0);
    n.CacheOpenSkillInfo(e, t);
    UiManager_1.UiManager.OpenView("PhantomInteractSummonView", n.InteractInfoData);
  }
  static OpenPhantomVisionEditView(e = 0, t = false) {
    var n = ModelManager_1.ModelManager.PhantomInteractModel;
    n.InitEditViewModel(e);
    var o = new PhantomInteractDefine_1.PhantomInteractEditViewParam();
    o.InfoData = n.InteractInfoData;
    o.OpenSlotIndex = e;
    o.FromSummonView = t;
    UiManager_1.UiManager.OpenView("PhantomInteractEditView", o);
  }
  static BeginVisionSkill(e) {
    var t;
    var n = ModelManager_1.ModelManager.PhantomInteractModel;
    var o = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    if (o && (t = o.GetComponent(41), o = o.GetComponent(218), t) && o) {
      n.SetSummonMonsterId(e);
      t.BeginSkillAsync(InputDefine_1.SKILL_ID_SHOW_VISION);
    }
  }
  static UpdateEquippedPhantom() {
    var t = ModelManager_1.ModelManager.PhantomInteractModel;
    var n = Protocol_1.Aki.Protocol._ff.create();
    for (let e = 0; e < t.InteractInfoData.EquippedVisionData.length; e++) {
      var o = t.InteractInfoData.EquippedVisionData[e];
      n.vff[e] = o.MonsterId;
    }
    Net_1.Net.CallAsync(16869, n);
  }
  static UpdateEquippedPhantomSkin(e, t) {
    var n = Protocol_1.Aki.Protocol.cff.create();
    n.Sff = [{
      TIs: e,
      Z7n: t
    }];
    Net_1.Net.CallAsync(29162, n);
  }
}
(exports.PhantomInteractController = PhantomInteractController).rgf = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("PhantomInteraction", 95, "收到声骸互动全量信息");
  }
  ModelManager_1.ModelManager.PhantomInteractModel.InteractInfoData.LoadFromProto(e);
};
PhantomInteractController.ogf = e => {
  ModelManager_1.ModelManager.PhantomInteractModel.InteractInfoData.UpdateFromProto(e);
  var t = e.yff?.TIs ?? 0;
  if (e?.yff?.Cff) {
    PhantomInteractModel_1.PhantomInteractModel.SetPhantomInteractUnlockRedDot(t, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomInteractNewUnlock, t);
  }
}; //# sourceMappingURL=PhantomInteractController.js.map
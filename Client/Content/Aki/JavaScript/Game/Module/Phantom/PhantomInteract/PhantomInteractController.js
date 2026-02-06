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
const PhantomUtil_1 = require("../PhantomUtil");
const PhantomInteractDefine_1 = require("./PhantomInteractDefine");
const PhantomInteractModel_1 = require("./PhantomInteractModel");
class PhantomInteractController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18139, PhantomInteractController.HSf);
    Net_1.Net.Register(23094, PhantomInteractController.jSf);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18139);
    Net_1.Net.UnRegister(23094);
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
    var n;
    var o = ModelManager_1.ModelManager.PhantomInteractModel;
    var r = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    if (r && (t = r.GetComponent(43), n = r.GetComponent(220), t) && n) {
      n = PhantomUtil_1.PhantomUtil.BeforeVisionSkillExecute(r, e);
      o.SetSummonMonsterId(e);
      t.BeginSkillAsync(InputDefine_1.SKILL_ID_SHOW_VISION, n);
    }
  }
  static UpdateEquippedPhantom() {
    var t = ModelManager_1.ModelManager.PhantomInteractModel;
    var n = Protocol_1.Aki.Protocol.Opf.create();
    for (let e = 0; e < t.InteractInfoData.EquippedVisionData.length; e++) {
      var o = t.InteractInfoData.EquippedVisionData[e];
      n.Qpf[e] = o.MonsterId;
    }
    Net_1.Net.CallAsync(24919, n);
  }
  static UpdateEquippedPhantomSkin(e, t) {
    var n = Protocol_1.Aki.Protocol.Fpf.create();
    n.Xpf = [{
      TIs: e,
      Z7n: t
    }];
    Net_1.Net.CallAsync(29115, n);
  }
}
(exports.PhantomInteractController = PhantomInteractController).HSf = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("PhantomInteraction", 95, "收到声骸互动全量信息");
  }
  ModelManager_1.ModelManager.PhantomInteractModel.InteractInfoData.LoadFromProto(e);
};
PhantomInteractController.jSf = e => {
  ModelManager_1.ModelManager.PhantomInteractModel.InteractInfoData.UpdateFromProto(e);
  var t = e.Kpf?.TIs ?? 0;
  if (e?.Kpf?.$pf) {
    PhantomInteractModel_1.PhantomInteractModel.SetPhantomInteractUnlockRedDot(t, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomInteractNewUnlock, t);
  }
}; //# sourceMappingURL=PhantomInteractController.js.map
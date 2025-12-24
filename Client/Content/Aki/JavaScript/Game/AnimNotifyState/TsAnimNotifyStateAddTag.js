"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
const TsUiSceneRoleActor_1 = require("../Module/UiComponent/TsUiSceneRoleActor");
const UiTagAnsContext_1 = require("../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiTagAnsContext");
class TsAnimNotifyStateAddTag extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.Tag = undefined;
    this.给召唤者添加 = false;
    this.UiTagAnsContext = undefined;
  }
  Constructor() {
    this.UiTagAnsContext = undefined;
  }
  K2_NotifyBegin(t, e, o) {
    var t = t.GetOwner();
    var i = this.Tag?.TagId;
    if (t instanceof TsBaseCharacter_1.default && i) {
      let e = t.CharacterActorComponent?.Entity;
      if (this.给召唤者添加) {
        r = e?.GetComponent(0)?.GetSummonerId() ?? 0;
        e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity;
      }
      if (e) {
        var r = e.GetComponent(215);
        if (r) {
          r.TagContainer.UpdateExactTag(4, i, 1);
          return true;
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "No Entity for TsBaseCharacter", ["Name", t.GetName()], ["location", t.D_K2_GetActorLocation()]);
      }
    } else if (i && t instanceof TsUiSceneRoleActor_1.default) {
      this.UiTagAnsContext = new UiTagAnsContext_1.UiTagAnsContext(i);
      t.Model?.CheckGetComponent(6).AddAns("UiTagAnsContext", this.UiTagAnsContext);
    }
    return false;
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner();
    var o = this.Tag?.TagId;
    if (t instanceof TsBaseCharacter_1.default && o) {
      let e = t.CharacterActorComponent?.Entity;
      if (this.给召唤者添加) {
        i = e?.GetComponent(0)?.GetSummonerId() ?? 0;
        e = ModelManager_1.ModelManager.CreatureModel.GetEntity(i)?.Entity;
      }
      if (e) {
        var i = e.GetComponent(215);
        if (i) {
          i.TagContainer.UpdateExactTag(4, o, -1);
          return true;
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "No Entity for TsBaseCharacter", ["Name", t.GetName()], ["location", t.D_K2_GetActorLocation()]);
      }
    } else if (this.UiTagAnsContext && t instanceof TsUiSceneRoleActor_1.default) {
      t.Model?.CheckGetComponent(6).ReduceAns("UiTagAnsContext", this.UiTagAnsContext);
    }
    return false;
  }
  GetNotifyName() {
    return "添加TAG";
  }
}
exports.default = TsAnimNotifyStateAddTag;
//# sourceMappingURL=TsAnimNotifyStateAddTag.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionVarContextHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbEntityTemplateContext_1 = require("./FbEntityTemplateContext");
const FbEntityVarContext_1 = require("./FbEntityVarContext");
const FbLevelPlayVarContext_1 = require("./FbLevelPlayVarContext");
const FbQuestVarContext_1 = require("./FbQuestVarContext");
class UnionVarContextHelper {
  static GetUnionVarContextObject(t) {
    switch (t) {
      case fb_action_1.UnionVarContext.EntityTemplateContext:
        return new fb_action_1.EntityTemplateContext();
      case fb_action_1.UnionVarContext.EntityVarContext:
        return new fb_action_1.EntityVarContext();
      case fb_action_1.UnionVarContext.LevelPlayVarContext:
        return new fb_action_1.LevelPlayVarContext();
      case fb_action_1.UnionVarContext.QuestVarContext:
        return new fb_action_1.QuestVarContext();
      default:
        return;
    }
  }
  static ReadUnionVarContext(t, e) {
    if (e !== undefined) {
      switch (t) {
        case fb_action_1.UnionVarContext.EntityTemplateContext:
          return FbEntityTemplateContext_1.FbEntityTemplateContext.Create(e);
        case fb_action_1.UnionVarContext.EntityVarContext:
          return FbEntityVarContext_1.FbEntityVarContext.Create(e);
        case fb_action_1.UnionVarContext.LevelPlayVarContext:
          return FbLevelPlayVarContext_1.FbLevelPlayVarContext.Create(e);
        case fb_action_1.UnionVarContext.QuestVarContext:
          return FbQuestVarContext_1.FbQuestVarContext.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionVarContextHelper = UnionVarContextHelper;
//# sourceMappingURL=UnionVarContextHelper.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badVarPosMessage = badVarPosMessage;
exports.VariablesInAllowedPosition = VariablesInAllowedPosition;

var _error = require('../../error');

var _definition = require('../../type/definition');

var _wrappers = require('../../type/wrappers');

var _typeComparators = require('../../utilities/typeComparators');

var _typeFromAST = require('../../utilities/typeFromAST');

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function badVarPosMessage(varName, varType, expectedType) {
  return 'Variable "$' + varName + '" of type "' + String(varType) + '" used in ' + ('position expecting type "' + String(expectedType) + '".');
}

/**
 * Variables passed to field arguments conform to type
 */
function VariablesInAllowedPosition(context) {
  var varDefMap = Object.create(null);

  return {
    OperationDefinition: {
      enter: function enter() {
        varDefMap = Object.create(null);
      },
      leave: function leave(operation) {
        var usages = context.getRecursiveVariableUsages(operation);

        usages.forEach(function (_ref) {
          var node = _ref.node,
              type = _ref.type;

          var varName = node.name.value;
          var varDef = varDefMap[varName];
          if (varDef && type) {
            // A var type is allowed if it is the same or more strict (e.g. is
            // a subtype of) than the expected type. It can be more strict if
            // the variable type is non-null when the expected type is nullable.
            // If both are list types, the variable item type can be more strict
            // than the expected item type (contravariant).
            var schema = context.getSchema();
            var varType = (0, _typeFromAST.typeFromAST)(schema, varDef.type);
            if (varType && !(0, _typeComparators.isTypeSubTypeOf)(schema, effectiveType(varType, varDef), type)) {
              context.reportError(new _error.GraphQLError(badVarPosMessage(varName, varType, type), [varDef, node]));
            }
          }
        });
      }
    },
    VariableDefinition: function VariableDefinition(node) {
      varDefMap[node.variable.name.value] = node;
    }
  };
}

// If a variable definition has a default value, it's effectively non-null.
function effectiveType(varType, varDef) {
  return !varDef.defaultValue || (0, _definition.isNonNullType)(varType) ? varType : (0, _wrappers.GraphQLNonNull)(varType);
}
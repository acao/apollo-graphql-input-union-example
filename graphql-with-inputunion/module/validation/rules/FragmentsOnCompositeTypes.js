
import { GraphQLError } from '../../error'; /**
                                             * Copyright (c) 2015-present, Facebook, Inc.
                                             *
                                             * This source code is licensed under the MIT license found in the
                                             * LICENSE file in the root directory of this source tree.
                                             *
                                             * 
                                             */

import { print } from '../../language/printer';

import { isCompositeType } from '../../type/definition';

import { typeFromAST } from '../../utilities/typeFromAST';

export function inlineFragmentOnNonCompositeErrorMessage(type) {
  return 'Fragment cannot condition on non composite type "' + String(type) + '".';
}

export function fragmentOnNonCompositeErrorMessage(fragName, type) {
  return 'Fragment "' + fragName + '" cannot condition on non composite ' + ('type "' + String(type) + '".');
}

/**
 * Fragments on composite type
 *
 * Fragments use a type condition to determine if they apply, since fragments
 * can only be spread into a composite type (object, interface, or union), the
 * type condition must also be a composite type.
 */
export function FragmentsOnCompositeTypes(context) {
  return {
    InlineFragment: function InlineFragment(node) {
      var typeCondition = node.typeCondition;
      if (typeCondition) {
        var type = typeFromAST(context.getSchema(), typeCondition);
        if (type && !isCompositeType(type)) {
          context.reportError(new GraphQLError(inlineFragmentOnNonCompositeErrorMessage(print(typeCondition)), [typeCondition]));
        }
      }
    },
    FragmentDefinition: function FragmentDefinition(node) {
      var type = typeFromAST(context.getSchema(), node.typeCondition);
      if (type && !isCompositeType(type)) {
        context.reportError(new GraphQLError(fragmentOnNonCompositeErrorMessage(node.name.value, print(node.typeCondition)), [node.typeCondition]));
      }
    }
  };
}
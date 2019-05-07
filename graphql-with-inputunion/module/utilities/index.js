/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

// The GraphQL query recommended for a full schema introspection.
export { getIntrospectionQuery,
// Deprecated, use getIntrospectionQuery()
introspectionQuery } from './introspectionQuery';


// Gets the target Operation from a Document
export { getOperationAST } from './getOperationAST';

// Convert a GraphQLSchema to an IntrospectionQuery
export { introspectionFromSchema } from './introspectionFromSchema';

// Build a GraphQLSchema from an introspection result.
export { buildClientSchema } from './buildClientSchema';

// Build a GraphQLSchema from GraphQL Schema language.
export { buildASTSchema, buildSchema, getDescription } from './buildASTSchema';

// Extends an existing GraphQLSchema from a parsed GraphQL Schema language AST.
export { extendSchema } from './extendSchema';

// Print a GraphQLSchema to GraphQL Schema language.
export { printSchema, printType, printIntrospectionSchema } from './schemaPrinter';

// Create a GraphQLType from a GraphQL language AST.
export { typeFromAST } from './typeFromAST';

// Create a JavaScript value from a GraphQL language AST with a type.
export { valueFromAST } from './valueFromAST';

// Create a JavaScript value from a GraphQL language AST without a type.
export { valueFromASTUntyped } from './valueFromASTUntyped';

// Create a GraphQL language AST from a JavaScript value.
export { astFromValue } from './astFromValue';

// A helper to use within recursive-descent visitors which need to be aware of
// the GraphQL type system.
export { TypeInfo } from './TypeInfo';

// Coerces a JavaScript value to a GraphQL type, or produces errors.
export { coerceValue } from './coerceValue';

// @deprecated use coerceValue
export { isValidJSValue } from './isValidJSValue';

// Determine if AST values adhere to a GraphQL type.
export { isValidLiteralValue } from './isValidLiteralValue';

// Concatenates multiple AST together.
export { concatAST } from './concatAST';

// Separates an AST into an AST per Operation.
export { separateOperations } from './separateOperations';

// Comparators for types
export { isEqualType, isTypeSubTypeOf, doTypesOverlap } from './typeComparators';

// Asserts that a string is a valid GraphQL name
export { assertValidName } from './assertValidName';

// Compares two GraphQLSchemas and detects breaking changes.
export { BreakingChangeType, DangerousChangeType, findBreakingChanges, findDangerousChanges } from './findBreakingChanges';


// Report all deprecated usage within a GraphQL document.
export { findDeprecatedUsages } from './findDeprecatedUsages';
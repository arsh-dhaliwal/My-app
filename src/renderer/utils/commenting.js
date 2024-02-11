/**
 * This utility module provides functions to add extensive comments to the codebase.
 * It is designed to help maintain the code and make it easier for developers to understand
 * the structure and functionality of the application.
 */

/**
 * Adds a header comment to a file.
 * @param {string} filename - The name of the file.
 * @param {string} description - A brief description of the file's purpose.
 * @returns {string} - The header comment.
 */
function addFileHeaderComment(filename, description) {
  return `/**
 * ${filename}
 *
 * ${description}
 *
 * This file is part of the ThermWatch application, a temperature monitoring solution
 * for high value assets located inside plants. It is responsible for ${description.toLowerCase()}.
 */
`;
}

/**
 * Adds a function comment.
 * @param {string} functionName - The name of the function.
 * @param {string} description - A brief description of the function's purpose.
 * @param {Object[]} params - An array of parameters the function takes.
 * @param {string} returns - The description of the return value.
 * @returns {string} - The function comment.
 */
function addFunctionComment(functionName, description, params, returns) {
  const paramsComments = params.map(param => ` * @param {${param.type}} ${param.name} - ${param.description}`).join('\n');
  return `/**
 * ${functionName}
 *
 * ${description}
 *
${paramsComments}
 * @returns {${returns.type}} - ${returns.description}
 */
`;
}

/**
 * Adds a class comment.
 * @param {string} className - The name of the class.
 * @param {string} description - A brief description of the class's purpose.
 * @returns {string} - The class comment.
 */
function addClassComment(className, description) {
  return `/**
 * ${className}
 *
 * ${description}
 *
 * This class is part of the ThermWatch application and is used for ${description.toLowerCase()}.
 */
`;
}

/**
 * Adds an inline comment to a section of code.
 * @param {string} comment - The comment text.
 * @returns {string} - The inline comment.
 */
function addInlineComment(comment) {
  return `// ${comment}`;
}

// Export the commenting functions to be used throughout the application
module.exports = {
  addFileHeaderComment,
  addFunctionComment,
  addClassComment,
  addInlineComment
};
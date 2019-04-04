/* global draft */

/**
 * Format the draft content as a quote with optional attribution
 *
 * A title line is not supported, because in most cases you'll probably just
 * want to enter a quote and be done with it.
 *
 * The first line from the bottom of the file beginning with a dash and a space
 * (`- `) will be interpretated as an attribution line. The dash will be
 * replaced with an em dash, and the remainder of the line after the dash+space
 * will be stored in the `attribution` template tag.
 *
 * Lines beginning with `- ` are okay in the quote body (above the attribution
 * line), but lines beginning with `- ` below the desired attribution line are
 * not allowed because they'll be interpreted as the attribution instead.
 *
 * With a draft content like this:
 *
 * ```
 * Here's some text to be interpreted as a quote.
 *
 * There can be multiple lines.
 *
 * - There can be
 * - Lists
 *
 * - Attribution
 *
 * You might also have other commentary or information about the source here.
 * ```
 *
 * You should get content that looks like this:
 *
 * ```md
 * > Here's some text to be interpreted as a quote.
 *
 * > There can be multiple lines.
 *
 * > - There can be
 * > - Lists
 *
 * —Attribution
 *
 * You might also have other commentary or information about the source here.
 * ```
 *
 * @author Chris Montgomery <chris@montchr.io>
 */

const lines = draft.content.split('\n');

// Find an attribution line and save it as the `attribution` template tag
// Note that this will iterate through the lines in reverse -- see note in the
// file comment above.
const attributionLineIndex = lines
  .reverse()
  .findIndex((line, i) => lines[i - 1] === '' && line.slice(0, 2) === '- ');
const attributionLine = attributionLineIndex !== -1 ? lines[attributionLineIndex] : '';
console.log(attributionLine);

const attribution = attributionLine.replace(/^(- )/, '');
draft.setTemplateTag('attribution', attribution);

const newContent = lines.map((line, i) => {
  // Leave blank lines untouched
  if (line === '') return line;
  // Prepare the attribution
  if (i === attributionLineIndex) return `— ${attribution}`;
  // Leave lines after the attribution untouched
  if (i > attributionLineIndex) return line;
  // All others should be blockquotes
  return `> ${line}`;
});

draft.content = newContent.join('\n');

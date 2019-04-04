/* global draft */

/**
 * Format the draft content as a quote with optional attribution
 *
 * A title line is not supported, because in most cases you'll probably just
 * want to enter a quote and be done with it.
 *
 * The first line beginning with a double dash (`--`) will be interpretated as
 * an attribution line. The double dash will be replaced with an em dash, and
 * the remainder of the line after the double dash will be stored in the
 * `attribution` template tag.
 *
 * With a draft content like this:
 *
 * ```md
 * Here's some text to be interpreted as a quote.
 *
 * There can be multiple lines.
 *
 * - There can be
 * - Lists
 *
 * -- Attribution
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

// Find a line beginning with `--` and interpret it as the attribution
const attributionLineIndex = lines.findIndex(line => line.slice(0, 2) === '--');
const attributionLine = attributionLineIndex !== -1 ? lines[attributionLineIndex] : '';
console.log(attributionLine);

const attribution = attributionLine.replace(/^(--)/, '').replace(/^\s/, '');
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
